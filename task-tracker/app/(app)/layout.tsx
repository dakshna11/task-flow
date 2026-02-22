import styles from '@/styles/layout.module.scss';
import { AuthProvider } from "../context/AuthContext";
import Sidebar from './Sidebar';

export default function Applayout({ children }: { children: React.ReactNode }) {
    
    return(
        <AuthProvider>
            <div className={styles.container}>
            <Sidebar />
            <main className={styles.main}>{children}</main>
        </div>
        </AuthProvider>
    )
}