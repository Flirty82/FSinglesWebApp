import React from 'react';
import Home from './pages/Home';

function App() {
    return <Home />;
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Membership from './pages/Membership';
import Payment from './pages/Payment';
import ProfileSetup from './pages/ProfileSetup';
import Home from './pages/Home'; // activity feed

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Membership />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Membership from './pages/Membership';
import Payment from './pages/Payment';
import ProfileSetup from './pages/ProfileSetup';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;


