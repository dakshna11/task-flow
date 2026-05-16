'use client';
import styles from '@/styles/home.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logoWrapper}>
          <Image
            src="/logo.png"
            alt="Task Flow Logo"
            width={100}
            height={100}
          />
          <h1>Task <span>Flow</span></h1>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.signUp} onClick={() => router.push('/signup')}>
            Sign Up
          </button>
          <button className={styles.logIn} onClick={() => router.push('/login')}>
            Login
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.leftPane}>
          <h2 className={styles.heroTitle}>
            Plan. Prioritize. <br />Complete. <span>Repeat.</span>
          </h2>
          <p className={styles.heroDescription}>
            Task Flow helps you organize tasks, track progress,
            and stay focused every day.
          </p>
          <div className={styles.featureList}>
            <div className={styles.featureCard}>
                <Image
                  src="/tasks.png"
                  alt="Tasks"
                  width={80}
                  height={80}
                />

              <div className={styles.featureContent}>
                <h3>Organize Tasks</h3>

                <p>
                  Create, categorize and manage all your tasks
                  in one place.
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
                <Image
                  src="/progress.png"
                  alt="Progress"
                  width={80}
                  height={80}
                />

              <div className={styles.featureContent}>
                <h3>Track Progress</h3>

                <p>
                  Visualize your progress and achieve more every day.
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
                <Image
                  src="/reminder.png"
                  alt="Reminder"
                  width={80}
                  height={80}
                />

              <div className={styles.featureContent}>
                <h3>Stay on Track</h3>

                <p>
                  Set reminders and never miss what matters.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightPane}>
          <Image
            src="/landing-preview.png"
            alt="Task Flow Dashboard Preview"
            width={1200}
            height={650}
            priority
          />
        </div>
      </div>
    </>
  );
}
