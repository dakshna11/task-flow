import Link from "next/link";
import styles from '@/styles/layout.module.scss';

export default function Applayout({ children }: { children: React.ReactNode }) {
    return(
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h3>Task Tracker</h3>
                <nav>
                    <ul>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/tasks">Tasks</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.main}>{children}</main>
        </div>
    )
}