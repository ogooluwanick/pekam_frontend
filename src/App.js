import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './App.scss';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';

function App() {
  return (
        <Router>
                <main className="App">
                        <Toaster />
                        <Routes>
                                        <Route   path='/' element={<Navigate to="/signup"/>}/>
                                        <Route   path='/signup' element={<Signup/>}/>
                                        <Route   path='/signin' element={<Signin/>}/>
                        </Routes>
                </main>
        </Router>

  );
}

export default App;
