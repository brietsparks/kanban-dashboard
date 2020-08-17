import { makeStyles } from '@material-ui/core/styles';

export const useDashboardStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - 65px)`, // 65 is height of appbar
  }
}))

export const useMenubarStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  currentUser: {
    display: 'flex',
    alignItems: 'center',
  },
  currentUsername: {
    marginRight: 4,
  }
}));

export const useUserItemStyles = makeStyles(() => ({
  editBtn: {
    marginLeft: 4,
  }
}))

export const useUserEditorStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  listItem: {
    alignItems: 'self-end'
  }
}))

export const useCommonStyles = makeStyles(() => ({
  dragHandle: {
    position: 'absolute',
    left: 4,
    top: 10,
    color: 'rgba(0, 0, 0, 0.54)'
  },
}));

export const useBoardStyles = makeStyles((theme) => ({
  board: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
  },
  lanes: {
    flexGrow: 1,
    display: 'flex',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    padding: theme.spacing(1.5)
  },
  laneContainer: {
    flexBasis: 350,
    flexGrow: 0,
    flexShrink: 0,
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: theme.spacing(1.5),
    border: '1px solid #e1e4e8',
  },
  newStatusLane: {
    flexBasis: 350,
    minWidth: 100,
    margin: theme.spacing(1.5),
    border: '3px dashed #e1e4e8',
    borderRadius: 0,
  },
  dialog: {
    padding: theme.spacing(2)
  }
}));

export const useLaneStyles = makeStyles((theme) => ({
  lane: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#eff1f3',
  },
  laneHeader: {
    padding: theme.spacing(1),
    display: 'flex',
    width: '100%'
  },
  laneTitle: {
    flexGrow: 1,
    marginLeft: theme.spacing(6),
    fontWeight: 'bold'
  },
  buttons: {
  },
  form: {
    padding: theme.spacing(1.5)
  },
  tasks: {
    padding: theme.spacing(1.5),
  },
  taskContainer: {
    marginBottom: theme.spacing(.5),
    display: 'flex',
  },
  dialog: {
    padding: theme.spacing(2)
  }
}));

export const useCardStyles = makeStyles((theme) => ({
  task: {
    padding: theme.spacing(1),
    width: '100%',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    marginTop: 2,
  },
  dialog: {
    padding: theme.spacing(2)
  },
}));

export const useTaskDetailsStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1.5),
  },
  closeBtn: {
    marginLeft: theme.spacing(1.5),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    width: '100%'
  },
  section: {
    marginTop: theme.spacing(3),
  }
}));

export const useCommentStyles = makeStyles(theme => ({
}));

export const useTaskAssignmentStyles = makeStyles(theme => ({
  container: {
    display: 'flex'
  },
  select: {
    width: '50%'
  },
  unassignBtn: {
    padding: theme.spacing(1)
  }
}));
