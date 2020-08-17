import { v4 as uuid } from 'uuid';
import { emptyProjectData } from '../dashboard/store';
import { Project, ProjectData, ProjectMeta } from '../dashboard/store/types';
import { createBoilerplateState } from './boilerplate';
import starterData from './starter-data';

const localStorageKey = 'kanban_dashboard_projects';

export interface ServiceClient {
  getUserProjectsMeta(): Promise<ProjectMeta[]>
  createProject(title: string, description: string, boilderplate: boolean): Promise<string>
  getProject(id: string): Promise<Project>
  updateProject(id: string, project: Project): Promise<void>
  deleteProject(id: string): Promise<void>
}

export class LocalStorageServiceClient implements ServiceClient{
  async getUserProjectsMeta() {
    const projects = await this.getProjects();
    return Object.values(projects).map((project: Project) => project.meta);
  }

  async createProject(title: string, description: string, boilerplate: boolean) {
    const id = uuid();
    const data = boilerplate ? createBoilerplateState() : emptyProjectData;

    const project: Project = {
      meta: { id, title, description, ts: new Date() },
      data
    };

    await this.putProject(id, project);

    return id;
  }

  async getProject(id: string): Promise<Project> {
    const projects = await this.getProjects();
    return projects[id];
  }

  async updateProject(id: string, project: Project) {
    const existing = await this.getProject(id);
    if (!existing) {
      throw new Error(`project ${id} does not exist`);
    }

    return this.putProject(id, project);
  }

  async updateProjectData(id: string, projectData: ProjectData) {
    const project = await this.getProject(id);
    if (!project) {
      throw new Error(`project ${id} does not exist`);
    }

    project.data = projectData;

    return this.putProject(id, project);
  }

  async deleteProject(id: string) {
    const projects = await this.getProjects();
    delete projects[id];
    const persistable = JSON.stringify(projects);
    localStorage.setItem(localStorageKey, persistable);
  }

  private async getProjects(): Promise<Record<string, Project>> {
    let persistable = localStorage.getItem(localStorageKey);

    return persistable
      ? JSON.parse(persistable)
      : starterData
  }

  private async putProject(id: string, project: Project) {
    const projects = await this.getProjects();
    projects[id] = project;
    const persistable = JSON.stringify(projects);
    localStorage.setItem(localStorageKey, persistable)
  }
}
