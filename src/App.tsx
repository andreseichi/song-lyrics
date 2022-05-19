import './styles/global.scss';

import styles from './styles/home.module.scss';

export function App() {
  return (
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <h1>
          <span>Song</span> Lyrics
        </h1>
        <p>
          Get lyrics from a <span>song</span>
        </p>
      </section>

      <form className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <label htmlFor="artist">Artist</label>
          <input type="text" id="artist" />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="music">Music</label>
          <input type="text" id="music" />
        </div>
      </form>
    </main>
  );
}
