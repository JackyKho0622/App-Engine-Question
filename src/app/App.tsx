import React from 'react';
import {
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import {
  Page,
  AppHeader,
} from '@dynatrace/strato-components-preview/layouts';
import { Home } from './pages/Home';
import { HostList } from './pages/Task1';
import { Header } from './components/Header';
import { Data } from './pages/Data';
import { Task2 } from './pages/Task2';

export const App = () => {
  return (
    <Page>
      <Page.Header>
        <AppHeader>
          <AppHeader.NavItems>
            <AppHeader.AppNavLink as={Link} to="/" />
            <AppHeader.NavItem as={Link} to="/data">
              Explore Data
            </AppHeader.NavItem>
          </AppHeader.NavItems>
      </AppHeader>
      </Page.Header>
      <Page.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/Task1" element={<HostList />} />
          <Route path="/Task2" element={<Task2 />} />
        </Routes>
      </Page.Main>
    </Page>
  );
};

