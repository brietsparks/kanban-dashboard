import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

// @ts-ignore
import ErrorImage from '../../images/error.svg';

export interface Props {
  message?: string
}

export default function ErrorPage({ message }: Props) {
  const classNames = useStyles();
  return (
    <div className={classNames.root}>
      <ErrorImage/>
      <div className={classNames.text}>
        <Typography variant="h2" component="h2">Sorry, an error occurred!</Typography>
        <Typography>{message}</Typography>
      </div>

    </div>
  );
}
