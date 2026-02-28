'use client';

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";


export default function TaskList({tasks}: {tasks: any[]}) {
    const [taskList, setTaskList] = useState(tasks);

    const { role } = useAuth();
    console.log("User role:", role);

    const updateStatus = async (id: string, status: string) => {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (res.ok) {
            const updatedStatus = await res.json();
            setTaskList(prevTasks => 
                prevTasks.map(task => 
                    task._id === id ? updatedStatus : task
                )
            );
        }
    };

    const updateAssignee = async (id: string, assignee: string) => {
        await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ assignee })
        });
        setTaskList(prevTasks => 
            prevTasks.map(task => 
                task._id === id ? {...task, assignee} : task
            )
        );
    }

    return(
        <div>
            {taskList.map((task) => (
                <div key={task._id} style={{border: '1px solid #ccc', padding: '10', marginBottom: '10'}}>
                    <h3>{task.title}</h3>
                    <p>Status:</p>
                    <select 
                        value={task.status} 
                        onChange={(e) => updateStatus(task._id, e.target.value)} 
                        disabled={role !== "admin" && role !== "user"}
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                     <p>Assignee:</p>
                        {role === 'admin' ? (
                            <input
                                defaultValue={task.assignee}
                                onBlur={e => updateAssignee(task._id, e.target.value)}
                            />) : (
                            <span>{task.assignee}</span>
                        )}
                </div>
            ))}
        </div>
    )
}