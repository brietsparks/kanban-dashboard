import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  buttons: {
    marginTop: theme.spacing(1)
  },
  textButton: {
    border: 0,
    padding: 0,
    cursor: 'pointer',
    color: theme.palette.primary.main,
    fontSize: 11,
    '&:focus': {
      outline: 0
    },
    '&:hover': {
      textDecoration: 'underline'
    },
    background: theme.palette.background.paper,
  },
}));

