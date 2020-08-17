import { makeStyles } from '@material-ui/core/styles';

export const useProjectsStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  menu: {
    width: '50%',
    padding: theme.spacing(3)
  },
  image: {
    position: 'relative',
    top: 50
  }
}));

export const useProjectStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
  },
  dialog: {
    padding: theme.spacing(2)
  }
}));
