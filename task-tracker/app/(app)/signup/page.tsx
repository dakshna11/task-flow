"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
       
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        if(res.ok){
            alert("Signup successful");
            router.push('/login');
        } else {
            alert("Signup failed");
        }
    }

    return(
        <div>
            <form onSubmit={handleSignup}>
                <h2>Signup</h2>
                <input 
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
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
                <input 
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}