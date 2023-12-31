import React from "react"
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './App.scss';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Assessment from "./pages/Assessment/Assessment";

function App() {
  return (
        <Router>
                <main className="App">
                        <Toaster />        {/* Display a notification Toaster for displaying toast messages. */}

                        {/* Define routes for different page components using the Routes component. */}
                        <Routes>
                                        <Route   path='/' element={<Navigate to="/signup"/>}/>
                                        <Route   path='/signup' element={<Signup/>}/>
                                        <Route   path='/signin' element={<Signin/>}/>
                                        <Route   path='/assessment' element={<Assessment/>}/>
                        </Routes>
                </main>
        </Router>

  );
}

export default App;
