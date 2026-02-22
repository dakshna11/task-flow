'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import styles from '@/styles/layout.module.scss';


export default function Sidebar() {
    const { role } = useAuth();
    return (
         <aside className={styles.sidebar}>
                <h3>Task Tracker</h3>
                <nav>
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/tasks">Tasks</Link></li>
                        {role === 'admin' && (
                            <li><Link href='tasks/create'>Create Task</Link></li>
                        )}
                    </ul>
                </nav>
            </aside>
    )
}