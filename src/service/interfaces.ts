import { ProjectData } from '../dashboard/store/types';

export interface ServiceClient {
  getUserProjectsMeta(): Promise<ProjectMeta[]>
  createProject(title: string, description: string, boilderplate: boolean): Promise<string>
  getProject(id: string): Promise<Project>
  updateProject(id: string, project: Project): Promise<void>
  deleteProject(id: string): Promise<void>
}

export interface Project {
  meta: ProjectMeta,
  data: ProjectData,
}

export interface ProjectMeta {
  id,
  title: string,
  description: string,
  ts: Date
}
