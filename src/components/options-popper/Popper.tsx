import React from 'react';
import Paper from '@material-ui/core/Paper';
import Popper, { PopperProps } from '@material-ui/core/Popper';

export default function Popover({ children, style, ...props }: PopperProps) {
  return (
    <Popper {...props} style={{ zIndex: 1000, ...style }} disablePortal>
      <Paper>{children}</Paper>
    </Popper>
  );
}
