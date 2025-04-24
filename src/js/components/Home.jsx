import React, { useState, useRef, useEffect } from "react";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [songIndex, setSongIndex] = useState(0);
  const audio = useRef(null);

  useEffect(() => {
    fetch("https://playground.4geeks.com/sound/songs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("ha ocurrido un error");
        }
        return response.json();
      })
      .then((dataRecived) => {
        console.log(dataRecived);
        setSongs(dataRecived.songs);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const playSong = (index) => {
    setSongIndex(index);
    audio.current.src = `https://playground.4geeks.com${songs[index].url}`;
    audio.current.load();
    audio.current.play();
  };

  const pauseSong = () => {
    audio.current.pause();
  };

  const nextSong = () => {
    const next = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
    playSong(next);
  };

  const prevSong = () => {
    const prev = songIndex > 0 ? songIndex - 1 : songs.length - 1;
    playSong(prev);
  };

  return (
    <>
      <nav
        style={{
          backgroundColor: "#FFC0CB",
          padding: "20px",
          textAlign: "center",
          borderBottom: "5px solid #FF69B4",
        }}
      >
        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#FF1493",
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
          }}
        >
          Reproductor de Audio 
        </span>
      </nav>
      <div style={{ padding: "20px", backgroundColor: "#FFF0F5", minHeight: "calc(100vh - 200px)" }}>
        <ol
          className="list-group list-group-numbered"
          style={{
            padding: "0",
            listStyle: "none",
            margin: "0 auto",
            maxWidth: "400px",
          }}
        >
          {songs.map((song, index) => (
            <li
              key={song.id}
              style={{
                backgroundColor: songIndex === index ? "#FFB6C1" : "#FFFFFF",
                border: "2px solid #FF69B4",
                borderRadius: "10px",
                padding: "10px",
                margin: "10px 0",
                cursor: "pointer",
                textAlign: "center",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                color: "#FF1493",
              }}
              onClick={() => playSong(index)}
            >
              {song.name}
            </li>
          ))}
        </ol>
      </div>
      <footer
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          backgroundColor: "#FFC0CB",
          padding: "20px",
          borderTop: "5px solid #FF69B4",
          textAlign: "center",
        }}
      >
        <audio ref={audio}></audio>
        <div className="d-flex justify-content-around align-items-center fs-1">
          <button
            style={buttonStyle}
            onClick={prevSong}
          >
            <i className="bi bi-skip-backward-fill"></i>
          </button>
          <button
            style={buttonStyle}
            onClick={pauseSong}
          >
            <i className="bi bi-pause-fill"></i>
          </button>
          <button
            style={buttonStyle}
            onClick={() => playSong(songIndex)}
          >
            <i className="bi bi-play-fill"></i>
          </button>
          <button
            style={buttonStyle}
            onClick={nextSong}
          >
            <i className="bi bi-skip-forward-fill"></i>
          </button>
        </div>
      </footer>
    </>
  );
};

const buttonStyle = {
  backgroundColor: "#FF69B4",
  border: "none",
  borderRadius: "50%",
  color: "#FFFFFF",
  fontSize: "24px",
  padding: "15px",
  cursor: "pointer",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

export default Home;