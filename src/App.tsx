// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import LogIn from "./pages/LogIn/LogIn.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx"; // Импортируем HomePage компонент
import './App.css';
import {GetAtoken} from "./GetAtoken.tsx";

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LogIn />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/getAtoken" element={<GetAtoken />} />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
