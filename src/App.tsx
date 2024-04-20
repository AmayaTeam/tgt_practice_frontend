import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import HomePage from "./pages/HomePage";


function App() {
  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage />} />
              </Routes>
          </BrowserRouter>
      </ApolloProvider>
  )
}

export default App
