import React from 'react';

import { ServiceProvider } from '../service';
import { Dashboard } from '../dashboard';

export default function DashboardPage() {
  return (
    <ServiceProvider>
      <Dashboard projectId="p1"/>
    </ServiceProvider>
  );
}
