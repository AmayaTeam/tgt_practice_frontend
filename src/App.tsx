import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import List from "./components/list/List.tsx";
import Display from "./components/display/Display.tsx";
import Header from "./components/header/Header.tsx";
import './App.css';

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    );
}

const HomePage: React.FC = () => {
    return (
        <div className="container">
            <Header/>
            <List />
            <Display />
        </div>
    );
};

export default App;
