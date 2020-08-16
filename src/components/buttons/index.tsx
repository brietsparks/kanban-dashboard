import React, { ReactNode, HTMLAttributes } from 'react';
import IconButton, { IconButtonProps as MuiIconButtonProps } from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useStyles } from './styles';

export type IconButtonProps = MuiIconButtonProps & {
  iconProps?: OverridableComponent<SvgIconTypeMap>
}

export const AddButton = ({ iconProps, ...props }: IconButtonProps) =>
  <IconButton {...props}><AddIcon {...iconProps} /></IconButton>;

export const DeleteButton = ({ iconProps, ...props }: IconButtonProps) =>
  <IconButton {...props}><DeleteIcon {...iconProps} /></IconButton>;

export const OptionsButton = ({ iconProps, ...props }: IconButtonProps) =>
  <IconButton {...props}><MoreHorizIcon {...iconProps} /></IconButton>;

export const EditButton = ({ iconProps, ...props }: IconButtonProps) =>
  <IconButton {...props}><EditIcon fontSize="small" {...iconProps} /></IconButton>;

export const CloseButton = ({ iconProps, ...props }: IconButtonProps) =>
  <IconButton {...props}><CloseIcon {...iconProps} /></IconButton>;

export const CheckButton = ({ iconProps, ...props }: IconButtonProps) =>
  <IconButton {...props}><CheckIcon {...iconProps} /></IconButton>;


export interface TextButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
}
export const TextButton = ({ children, ...props }: TextButtonProps) => {
  const classNames = useStyles();
  return <button className={classNames.textButton} {...props}>{children}</button>
};

export interface ConfirmationButtonsProps {
  onCancel: () => void,
  onConfirm: () => void,
  cancelLabel?: string,
  confirmLabel?: string,
  confirmColor?: 'primary' | 'secondary'
}

export function ConfirmationButtons({
  onCancel,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Done',
  confirmColor = 'primary'
}: ConfirmationButtonsProps) {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
          <Button fullWidth onClick={onCancel}>{cancelLabel}</Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth onClick={onConfirm} color={confirmColor}>{confirmLabel}</Button>
        </Grid>
      </Grid>
    </div>
  );
}
