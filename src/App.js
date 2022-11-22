import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DrawToolPage from './pages/DrawToolPage';
import Layout from './layouts/Layout';
import FormBuilderPage from './pages/FormBuilderPage';
import FormGeneratorPage from './pages/FormGeneratorPage';
import Diagram from './pages/Diagram';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/paper/:id' element={<Diagram title='JointJS+' />} />
      <Route
        path='/formbuilder'
        element={
          <Layout>
            <FormBuilderPage />
          </Layout>
        }
      />
      <Route
        path='/formgenerator'
        element={
          <Layout>
            <FormGeneratorPage />
          </Layout>
        }
      />
      <Route
        path='/'
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
