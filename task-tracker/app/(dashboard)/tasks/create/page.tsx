'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from '@/styles/createTask.module.scss';

export default function CreateTaskPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('medium');
    const [tag, setTag] = useState('personal');
    const session = useSession();
    const userId = (session?.data?.user as { id?: string })?.id;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, status, priority, userId, tag })
        })

        if(res.ok) {
            alert('Task created successfully!');
            setTitle('');
            setDescription('');
            setStatus('');
            setPriority('medium');
            setTag('');
        } else {
            alert('Error in creating task');
        }
    }

    return (
        <div>
             <main className={styles.mainContent}>
                <div className={styles.pageHeader}>
                    <h1>Create Task</h1>
                    <p>Organize your workflow efficiently</p>
                </div>

                <div className={styles.taskFormCard}>
                    <form onSubmit={handleSubmit}>
                
                        <div className={styles.formGroup}>
                        <label>Task Title</label>
                        <input 
                            type="text" 
                            placeholder="Enter task title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea 
                                rows={6} 
                                placeholder="Add task description..." 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className={styles.gridTwo}>
                            <div className={styles.formGroup}>
                                <label>Priority</label>

                                <div className={styles.priorityButtons}>
                                <button type="button" className={styles.low} onClick={() => setPriority('low')}>
                                    Low
                                </button>

                                <button type="button" className={styles.medium} onClick={() => setPriority('medium')}>
                                    Medium
                                </button>

                                <button type="button" className={styles.high} onClick={() => setPriority('high')}>
                                    High
                                </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.gridTwo}>
                        <div className={styles.formGroup}>
                            <label>Status</label>

                            <select value={status} onChange={(e) => setStatus(e.target.value)} defaultValue="pending">
                            <option value="pending">Pending</option>
                            <option value="inprogress">In Progress</option>
                            <option value="done">Done</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Tags</label>

                            <input 
                                type="text" 
                                placeholder="Add tags..." 
                                value={tag}
                                onChange={(e) => setTag(e.target.value.toLowerCase())}
                            />

                            <div className={styles.tagsWrapper}>
                            <span className={styles.tag + ' ' + styles.blue}>Work</span>
                            <span className={styles.tag + ' ' + styles.green}>Personal</span>
                            <span className={styles.tag + ' ' + styles.red}>Urgent</span>
                            </div>
                        </div>
                        </div>

                        {/* Actions */}
                        <div className={styles.formActions}>

                        <button type="submit" className={styles.createBtn}>
                            Create Task
                        </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}