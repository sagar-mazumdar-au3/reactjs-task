import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import NoPage from "./component/NoPage";
import { useSelector } from 'react-redux';
import {
  selectStore
} from './redux/productSlice';

function App() {
  const state = useSelector(selectStore);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={!state.isLoggedIn ? <Navigate to="/sign-in" /> : <Home />} />
          <Route path="sign-in" element={!state.isLoggedIn ? <Signin /> : <Navigate to="/" />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
