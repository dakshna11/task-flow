import styles from '@/styles/home.module.scss';

export default function Home() {
  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>
        Task <span className={styles.highlight}>Flow</span>
      </h1>
      <div className={styles.btnContainer}>
        <button className={styles.signUp}>Sign Up</button>
        <button className={styles.logIn}>Log In</button>
      </div>
    </div>
    <h2 className={styles.description}>Your ultimate task management <span className={styles.highlight}>solution</span>!</h2>
    </>
  );
}
