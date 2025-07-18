import React from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function AuthComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in!');
            // Redirect upon UI
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value )} placeholder="Email"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value )} placeholder="Password"/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default AuthComponent;