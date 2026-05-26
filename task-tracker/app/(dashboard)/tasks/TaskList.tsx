'use client';

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import styles from '@/styles/taskList.module.scss';


export default function TaskList({tasks}: {tasks: any[]}) {
    const [taskList, setTaskList] = useState(tasks);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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

    const deleteTask = async (id: string) => {
        console.log("Deleting task with ID:", id);
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        });
        setTaskList(prevTasks => prevTasks.filter(task => task._id !== id));
    }
    console.log("Task list:", taskList);

    return(
        <div>
            { /* <div className={styles.taskTabs}>
                <button className={styles.active}>All</button>
                <button>Pending</button>
                <button>In Progress</button>
                <button>Completed</button>
            </div> */}
            <div className={styles.taskTableHeader}>
                <p>Task</p>
                <p>Tags</p>
                <p>Priority</p>
                <p>Status</p>
                <p>Actions</p>
            </div>
            {taskList.length > 0 ? taskList?.map((task) => (
                <div key={task._id} className={styles.taskListWrapper}>
                    <div className={styles.taskRow}>
                        <div className={styles.taskInfo}>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        </div>

                        <div className={styles.tags}>
                        <span className={styles.purple}>{task.tag}</span>
                        </div>

                        <div className={styles.priority + ' ' + styles.high}>{task.priority}</div>

                        <div className={styles.status + ' ' + styles.progress}>{task.status}</div>

                        <div className={styles.actionWrapper}>
                        <button type="button" className={styles.actionBtn} onClick={() => setOpenMenuId(openMenuId === task._id ? null : task._id)}>
                            ⋮
                        </button>

                        {openMenuId === task._id && (
                            <div className={styles.actionMenu}>
                                <button type="button" onClick={() => { deleteTask(task._id); setOpenMenuId(null); }}>Delete</button>
                            </div>
                        )}
                        </div>
                    </div>
            </div>
            )) : <p>No tasks found.</p>}
        </div>
    )
}