import React, { Fragment } from 'react';
import Link from 'next/link'
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ProjectsIcon from '@material-ui/icons/Apps';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';

import UsersMenu from './UsersMenu';
import { useCurrentUsername } from './CurrentUser';
import { useMenubarStyles } from './styles';

const noop = () => {
};

export interface MenubarProps {
  title: string,
  projectsUrlPath: string,
}

export default function Menubar({ title, projectsUrlPath }: MenubarProps) {
  const classes = useMenubarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const currentUsername = useCurrentUsername();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <MuiAppBar position="static">
        <Toolbar>
          <Link href={projectsUrlPath}>
            <IconButton
              onClick={noop}
              className={classes.menuButton}
              edge="start"
              color="inherit"
            ><ProjectsIcon/></IconButton>
          </Link>

          <Typography variant="h6" className={classes.title}>{title}</Typography>

          <div className={classes.currentUser}>
            <Typography variant="subtitle2" className={classes.currentUsername}>
              {currentUsername}
            </Typography>

            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle/>
            </IconButton>
          </div>
        </Toolbar>
      </MuiAppBar>

      <Drawer open={open} anchor="right" onClose={handleClose}>
        <div style={{ width: 300 }}>
          <UsersMenu/>
        </div>
      </Drawer>
    </Fragment>

  );
}
