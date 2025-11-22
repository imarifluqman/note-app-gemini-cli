import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './screens/signup/Signup';
import Login from './screens/login/Login';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import NotFound from './screens/NotFound';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
