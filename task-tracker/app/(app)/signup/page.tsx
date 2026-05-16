"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/login.module.scss';

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
        <div className={styles.container}>
             <div className={styles.formContainer}>
            <h1>Sign Up</h1>
            <p>Already have an account? <a href="/login">Login</a></p>
            <form onSubmit={handleSignup}>
                <div className={styles.field}>
                    <label>Full Name</label>
                     <input 
                        type='text'
                        placeholder='Full Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <div className={styles.field}>
                    <label>Confirm Password</label>
                     <input 
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className={styles.button}>Signup</button>
            </form>
        </div>
        </div>
       
    )
}