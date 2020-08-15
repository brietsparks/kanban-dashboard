import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  comment: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    borderLeft: 'solid 1px #ccc'
  },
  commentHeader: {
  },
  childrenContainer: {
    marginLeft: theme.spacing(2),
  },
  newCommentButtons: {
    display: 'flex',
    flexDirection: 'row-reverse'
  }
}));
