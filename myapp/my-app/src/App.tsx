import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './list/List';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<List />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;