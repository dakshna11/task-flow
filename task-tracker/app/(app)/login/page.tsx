"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '@/styles/login.module.scss';
import Image from 'next/image';

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
            <div className={styles.formContainer}>
                <h1>Login</h1>
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
                <form onSubmit={handleLogin} >
                    <div className={styles.field}>
                        <label>Email</label>
                        <input 
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Password</label>
                        <input 
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}