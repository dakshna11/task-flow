import styles from '@/styles/layout.module.scss';
import { AuthProvider } from "../context/AuthContext";
import Sidebar from './Sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

export default async function Applayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    
    return(
        <AuthProvider>
            <div className={styles.container}>
            {session && <Sidebar />}
            <main className={styles.main}>{children}</main>
        </div>
        </AuthProvider>
    )
}