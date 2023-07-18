import React from 'react';
import { Routes, Route } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import Header from '../components/header/Header';
import NotFoundPage from "../components/common/NotFoundPage";
import Dashboard from '../components/dashboard/Dashboard';
import Home from '../components/home/Home';


const AppRouter = () => (

    <div>

        <Header />

        <Routes>
            <Route path="/" element={<Home />} exact={true} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
                <AuthenticatedRoute>
                    <Dashboard />
                </AuthenticatedRoute>
            } />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>

    </div>

);

export default AppRouter;