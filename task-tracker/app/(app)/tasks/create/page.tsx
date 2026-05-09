'use client';

import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function CreateTaskPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('medium');
    const session = useSession();
    const userId = (session.data?.user as { id?: string })?.id;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, assignee, priority, userId })
        })

        if(res.ok) {
            alert('Task created successfully!');
            setTitle('');
            setDescription('');
            setAssignee('');
            setPriority('medium');
        } else {
            alert('Error in creating task');
        }
    }

    return (
        <div>
            <h2>Create New Task</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    placeholder="Assignee"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    required
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit">Create Task</button>
            </form>
        </div>
    )
}