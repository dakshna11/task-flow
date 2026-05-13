"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '@/styles/login.module.scss';

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
        <div className={styles.container}>
            <div className={styles.circle}></div>
            <h2>Login</h2>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
            <form onSubmit={handleLogin} className={styles.formContainer}>
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