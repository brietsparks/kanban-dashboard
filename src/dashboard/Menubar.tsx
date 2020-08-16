import React, { Fragment } from 'react';
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

export interface MenubarProps {
  onClickProjects: () => void,
}

export default function Menubar({ onClickProjects }: MenubarProps) {
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
          <IconButton
            onClick={onClickProjects}
            className={classes.menuButton}
            edge="start"
            color="inherit"
          ><ProjectsIcon /></IconButton>

          <Typography variant="h6" className={classes.title}>Current Project</Typography>

          <div className={classes.currentUser}>
            <Typography variant="subtitle2" className={classes.currentUsername}>
              {currentUsername}
            </Typography>

            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
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
