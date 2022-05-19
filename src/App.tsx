import { FormEvent, useState } from 'react';

import LoadingIcon from './assets/loading.gif';

import './styles/global.scss';

import styles from './styles/home.module.scss';

export function App() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function getLyrics(event: FormEvent) {
    event.preventDefault();

    if (artist.length === 0 || song.length === 0) {
      return;
    }

    setIsLoading(true);
    const response = await fetch(
      `https://api.lyrics.ovh/v1/${artist}}/${song}`
    );

    const { status } = response;
    if (status !== 200) {
      if (status === 404) {
        setErrorMessage('<span>Artist</span> or <span>Song</span> not found');
      }
      setIsLoading(false);
      return;
    }

    const { lyrics } = await response.json();
    setErrorMessage('');
    setLyrics(lyrics);
    setIsLoading(false);
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

      {isLoading && (
        <div className={styles.loadingContainer}>
          <img src={LoadingIcon} alt="Loading" className={styles.loadingGif} />
        </div>
      )}

      {lyrics && !isLoading && !errorMessage && (
        <section className={styles.lyricsContainer}>
          <p className={styles.lyrics}>{lyrics}</p>
        </section>
      )}

      {errorMessage && !isLoading && (
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
