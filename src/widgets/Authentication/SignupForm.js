'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSpace } from '@/context/SpaceProvider';
import { useAuth } from '@/context/AuthProvider';


const SignupForm = ({ onClose, isAuthPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useAuth()
    const spaceContext = useSpace()
    const space = spaceContext?.space
    const setIsCurrentUserSpaceOwner = spaceContext?.setIsCurrentUserSpaceOwner

    const router = useRouter()

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await res.json();
          setMessage(data.message || data.error);
          setTimeout(async() => {
            if(data.user){
              setUser(data.user);
              setIsCurrentUserSpaceOwner && setIsCurrentUserSpaceOwner(space?.owner?.id === data.user.id)
              // Different behaviours depending on where the user is signing in from
              if(!isAuthPage){
                onClose();
              } else {
                router.push('/jumping')
              }
            }
          }, 2000);
        } catch (error) {
          setMessage('Signup failed.');
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className='default-button'>Sign Up</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default SignupForm;