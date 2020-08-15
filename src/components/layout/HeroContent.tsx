import React, { ReactNode } from 'react';
import { useHeroContentStyles } from './styles';

export interface Props {
  children: ReactNode
}

export default function HeroContent({ children }: Props) {
  const classes = useHeroContentStyles();

  return (
    <div className={classes.outer}>
      <div className={classes.inner}>
        {children}
      </div>
    </div>
  );
}
