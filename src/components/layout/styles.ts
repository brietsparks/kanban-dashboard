import { makeStyles } from '@material-ui/core/styles';

export const useAppLayoutStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
  }
}));

export const useHeroContentStyles = makeStyles(theme => ({
  outer: {
    height: '100%',
    width: '100%',
  },
  inner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
}));
