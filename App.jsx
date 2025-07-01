<><Route path="/edit-profile" element={<EditProfile userId={loggedInUserId} />} /><Route path="/chat/:userId/:targetUserId" element={<ChatWrapper />} /></>
import { useParams } from 'react-router-dom';
import Chat from './pages/Chat';
import friends from './components/Friends';
import TruthOrDare from "./components/games/TruthOrDare";
import Karaoke from "./components/games/Karaoke";
<><Route path="/karaoke" element={<Karaoke />} /><Route path="/truth-or-dare" element={<TruthOrDare />} /></>
import TruthOrDare from "./components/games/TruthOrDare";
import Navbar from './components/Navbar';
<Route path="/truth-or-dare" element={<TruthOrDare />} />
import Karaoke from "./components/games/Karaoke";
<Route path="/karaoke" element={<Karaoke />} />



function ChatWrapper() {
    const { userId, targetUserId } = useParams();
    return <Chat userId={userId} targetUserId={targetUserId}/>;

}

import BingoGame from "./components/games/BingoGame";

// Inside <Routes>
<Route path="/bingo" element={<BingoGame />} />


import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Friends from './components/Friends';
import Welcome from './pages/Welcome';
import Navbar from './components/Navbar';

<Navbar/>
<Routes>
     <Route path="/" element={<Welcome/>}/>
<><><Route path="/profile" element={<Profile />} /><Route path="/dashboard" element={<Dashboard />} /></><Route path="/friends" element={<Friends />} /></>
</Routes>

