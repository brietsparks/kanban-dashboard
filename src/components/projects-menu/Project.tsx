import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { ConfirmationButtons, } from '../buttons';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import NavigateIcon from '@material-ui/icons/OpenInNew';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';

import { OptionsPopper } from '../options-popper';
import { useProjectStyles } from './styles';

export interface ProjectProps {
  id: string,
  title: string,
  description: string,
  onDelete: (id: string) => void,
}

const noop = () => {};

export default function Project({ id, title, description, onDelete }: ProjectProps) {
  const classNames = useProjectStyles();

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const openDeleteConfirm = () => setIsDeleteConfirmOpen(true);
  const closeDeleteConfirm = () => setIsDeleteConfirmOpen(false);
  const handleDeleteConfirm = () => onDelete(id)

  return (
    <div key={id} className={classNames.root}>
      <div className={classNames.header}>
        <Typography variant="h4" component="h2">{title}</Typography>

        <div className={classNames.buttons}>
          <OptionsPopper>
            <ProjectOptions onClickDelete={openDeleteConfirm}/>
          </OptionsPopper>

          <Link href={`/${id}`}>
            <IconButton onClick={noop}><NavigateIcon/></IconButton>
          </Link>
        </div>
      </div>

      <div>
        <Typography>{description}</Typography>
      </div>

      <Dialog open={isDeleteConfirmOpen}>
        <Paper className={classNames.dialog}>
          <Typography>Delete column "{title}"?</Typography>
          <ConfirmationButtons
            onCancel={closeDeleteConfirm}
            onConfirm={handleDeleteConfirm}
            confirmColor="secondary"
            confirmLabel="Delete"
          />
        </Paper>
      </Dialog>
    </div>
  );
}

export interface ProjectOptionsProps {
  onClickDelete: () => void
}

export function ProjectOptions({ onClickDelete }: ProjectOptionsProps) {
  return (
    <List>
      <ListItem button onClick={onClickDelete}>
        <ListItemText primary="Delete Project"/>
      </ListItem>
    </List>
  );
}
