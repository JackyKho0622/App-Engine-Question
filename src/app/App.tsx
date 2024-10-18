import React from 'react';
import {
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom';
import {
  Page,
  AppHeader,
} from '@dynatrace/strato-components-preview/layouts';
import { Home } from './pages/Home';
import { Task1 } from './pages/Task1';
import { Header } from './components/Header';
import { Data } from './pages/Data';
import { Task2 } from './pages/Task2';
import { Task3 } from './pages/Task3';

export const App = () => {
  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/Task1" element={<Task1 />} />
          <Route path="/Task2" element={<Task2 />} />
          <Route path="/Task3" element={<Task3 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Page.Main>
    </Page>
  );
};

