import React, { useState, useEffect, useRef } from 'react';

const MP3Player = () => {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Efecto 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Efecto 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, title: 'Efecto 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (songs.length > 0 && audioRef.current) {
      const currentSong = songs[currentSongIndex];
      if (currentSong && currentSong.url) {
        audioRef.current.src = currentSong.url;
        audioRef.current.load();
        console.log('Reproduciendo:', currentSong.title);
      }
    }
  }, [currentSongIndex, songs]);

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Error al intentar reproducir la canción:', error);
        });
    }
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
  };

  const handleSongClick = (index) => {
    setCurrentSongIndex(index);
    playSong();
  };

  return (
    <div className="mp3-player">
      <h1>Reproductor MP3</h1>
      <div className="song-list">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="song-item"
            onClick={() => handleSongClick(index)}
          >
            <p>{song.title}</p>
          </div>
        ))}
      </div>

      <audio ref={audioRef} controls />
      
      <div className="controls">
        <button onClick={handlePrevious}>Anterior</button>
        <button onClick={isPlaying ? stopSong : playSong}>
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </button>
        <button onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default MP3Player;
