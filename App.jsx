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
import { useParams } from 'react-router-dom';
import Chat from './pages/Chat';
import WelcomePage from './pages/WelcomePage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';

function ChatWrapper() {
    const { userId, targetUserId } = useParams();
    return <Chat userId={userId} targetUserId={targetUserId} />;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Membership />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/feed" element={<ActivityFeed userId={loggedInUserId} />} />
                <Route path="/edit-profile" element={<EditProfile userId={loggedInUserId} />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/search" element={<Search />} />
                <Rotue path="/chat/:userId/:targetUserId" element={<ChatWrapper />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/games" element={<Games />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/Bingo" element={<Bingo />}/>
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


