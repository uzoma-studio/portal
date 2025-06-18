'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLastVisitedSpace } from '../../utils/spaces';
import { useAuth } from '@/context/AuthProvider';

const LoginForm = ({ onClose, isAuthPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useAuth()

    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          // TODO: User server function for auth instead https://payloadcms.com/docs/local-api/server-functions#login
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
          });
          const data = await res.json();

          setMessage(data.message || data.error);
          setTimeout(async () => { 
            if(data.user){
              setUser(data.user);
              // Different behaviours depending on where the user is logging in from
              if(!isAuthPage){
                onClose();
              }
              // } else {
                // const lastVisitedSpace = await getLastVisitedSpace(data.user.id)
                // if(lastVisitedSpace){
                //   router.push(process.env.NODE_ENV === 'development' ?
                //     `http://${lastVisitedSpace}.localhost:3000?userId=${data.user.id}` //TODO: Set domain name as env var
                //     :
                //     `https://${lastVisitedSpace}.portal8.space?userId=${data.user.id}`
                //   )
              else {
                router.push('/jumping')
              }
            }
          }, 2000);
        } catch (error) {
          setMessage('Login failed.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
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
            <button type="submit" className='default-button'>Log In</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default LoginForm;