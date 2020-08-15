import React from 'react';

import { ServiceProvider } from '../service';
import AppLayout from '../components/layout/AppLayout';
import { Project } from '../dashboard';

export default function DashboardPage() {
  return (
    <ServiceProvider>
      <AppLayout>
        <Project id="p1"/>
      </AppLayout>
    </ServiceProvider>
  );
}
