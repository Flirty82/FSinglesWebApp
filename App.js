import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ActivityFeed from './pages/ActivityFeed';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Friends from './components/Friends';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import ActivityFeed from './pages/ActivityFeed';
import Payment from './pages/Payment';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import Services from './pages/Services';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/feed" element={<ActivityFeed/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/friends" element={<Friends/>}/>
                <Route path="/navbar" element={<Navbar/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/bingo" element={<Bingo/>}/>
                <Route path="/matches" element={<Matches/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/services" element={<Services/>}/>
            </Routes>
        </Router>
    );
}

export default App;