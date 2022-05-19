import { FormEvent, useState } from 'react';

import './styles/global.scss';

import styles from './styles/home.module.scss';

export function App() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function getLyrics(event: FormEvent) {
    event.preventDefault();

    if (artist.length === 0 || song.length === 0) {
      return;
    }

    const response = await fetch(
      `https://api.lyrics.ovh/v1/${artist}}/${song}`
    );
    const { status } = response;
    if (status !== 200) {
      if (status === 404) {
        setErrorMessage('<span>Artist</span> or <span>Song</span> not found');
      }
      return;
    }

    const { lyrics } = await response.json();
    setErrorMessage('');
    setLyrics(lyrics);
  }

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

      <form className={styles.formContainer} onSubmit={getLyrics}>
        <div className={styles.inputWrapper}>
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(event) => setArtist(event.target.value)}
            placeholder="Type an artist"
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="music">Music</label>
          <input
            type="text"
            id="music"
            value={song}
            onChange={(event) => setSong(event.target.value)}
            placeholder="Type a song"
          />
        </div>

        <button className={styles.buttonForm} type="submit" onClick={getLyrics}>
          Get Lyrics
        </button>
      </form>

      {lyrics && !errorMessage && (
        <section className={styles.lyricsContainer}>
          <p className={styles.lyrics}>{lyrics}</p>
        </section>
      )}

      {errorMessage && (
        <section className={styles.errorMessageContainer}>
          <span
            className={styles.errorMessage}
            dangerouslySetInnerHTML={{ __html: errorMessage }}
          ></span>
        </section>
      )}
    </main>
  );
}
