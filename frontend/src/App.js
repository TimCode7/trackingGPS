import React, { useEffect } from 'react';
import './App.css';
import Map from './Components/Map';


function App() {
  let socket;

  useEffect(() => {
    socket = new WebSocket('ws://localhost:5002/ws');

    socket.onopen = function (e) {
      console.log("Connexion WebSocket ouverte");
      socket.send("Bonjour, API!")
    };

    socket.onerror = function (error) {
      console.error("Erreur WebSocket", error);
    };

    return () => {
      socket.close(1000, "Fermeture normale");
      console.log("Connexion WebSocket fermée");
    };
  }, []);

  const sendMessage = () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send("bonjour");
      console.log('fait')
    } else {
      console.log("La connexion WebSocket n'est pas ouverte.");
    }
  };

  return (
    <div className="App">
      <h1>Map</h1>
      <Map />
      <button onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
}

export default App;
