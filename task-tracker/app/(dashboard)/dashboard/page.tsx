"use client";

import { BriefcaseBusiness, Check, Menu, Notebook, Plus } from "lucide-react";
import styles from '@/styles/dashboard.module.scss';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Task {
  _id: string;
  title: string;
  status: 'pending' | 'inprogress' | 'done';
  [key: string]: any;
}

interface TaskCounts {
  total: number;
  inProgress: number;
  pending: number;
  completed: number;
}

export default function Dashboard() {
  const router = useRouter();
  const session = useSession();
  
  const [taskCounts, setTaskCounts] = useState<TaskCounts>({
    total: 0,
    inProgress: 0,
    pending: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskCounts = async () => {
      try {
        const response = await fetch('/api/tasks');
        const tasks: Task[] = await response.json();
        
        const counts = {
          total: tasks.length,
          inProgress: tasks.filter(t => t.status === 'inprogress').length,
          pending: tasks.filter(t => t.status === 'pending').length,
          completed: tasks.filter(t => t.status === 'done').length
        };
        
        setTaskCounts(counts);
      } catch (error) {
        console.error('Failed to fetch task counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskCounts();
  }, []);
    return (
      <>
       <div className={styles.dashboardHeader}>
  <div>
    <h1>
      Welcome, {session.data?.user?.name} <span>👋</span>
    </h1>

    <p>Here's what's happening with your tasks today.</p>
  </div>

  <button className={styles.createTaskBtn} onClick={() => router.push('tasks/create')}>
    + Create Task
  </button>
</div>

{/* Stats Grid */}

  <div className={styles.dashboardStatsGrid}>
  {/* Card */}

  <div className={styles.statsCard + ' ' + styles.purple}>
    <div className={styles.iconBox}><Menu className={styles.icon} size={35}/></div>

    <div className={styles.statsContent}>
      <h4>Total Tasks</h4>
      <h2>{taskCounts.total}</h2>
      <p>All tasks</p>
    </div>
  </div>

  {/* Card */}

  <div className={styles.statsCard + ' ' + styles.blue}>
    <div className={styles.iconBox}><Notebook className={styles.icon} size={35}/></div>

    <div className={styles.statsContent}>
      <h4>In Progress</h4>
      <h2>{taskCounts.inProgress}</h2>
      <p>Tasks in progress</p>
    </div>
  </div>

  {/* Card */}

  <div className={styles.statsCard + ' ' + styles.orange}>
    <div className={styles.iconBox}><BriefcaseBusiness className={styles.icon} size={35}/></div>

    <div className={styles.statsContent}>
      <h4>Pending</h4>
      <h2>{taskCounts.pending}</h2>
      <p>Tasks pending</p>
    </div>
  </div>

  {/* Card */}

  <div className={styles.statsCard + ' ' + styles.green}>
    <div className={styles.iconBox}><Check className={styles.icon} size={35}/></div>

    <div className={styles.statsContent}>
      <h4>Completed</h4>
      <h2>{taskCounts.completed}</h2>
      <p>Tasks completed</p>
    </div>
  </div>
</div>
      </>
      
    )
}