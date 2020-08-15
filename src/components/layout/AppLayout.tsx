import React, { ReactNode } from 'react';
import { Appbar } from '../appbar';

import { useAppLayoutStyles } from './styles';

export interface Props {
  children: ReactNode
}
export default function AppLayout({ children }: Props) {
  const classNames = useAppLayoutStyles();

  return (
    <div className={classNames.root}>
      <Appbar/>
      <div className={classNames.content}>
        {children}
      </div>
    </div>
  );
}
