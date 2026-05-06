"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
       const res = await signIn('credentials', {
            email,
            password,
            redirect: false
       })

       if(!res?.error){
        console.log("Login successful");
        router.push('/dashboard');
       }
    }

    return(
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input 
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}