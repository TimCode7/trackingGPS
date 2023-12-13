import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Components/Map';


function App() {
  let socket;
  const [ latestData, setLatestData ] = useState({});

  useEffect(() => {
    socket = new WebSocket('ws://localhost:5002/ws');

    socket.onopen = function (e) {
      console.log("Connexion WebSocket ouverte");
    };

    socket.onerror = function (error) {
      console.error("Erreur WebSocket", error);
    };

    socket.onmessage = function (event) {
      const receivedData = JSON.parse(event.data);
      setLatestData(receivedData);
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(`Connexion fermée proprement, code=${event.code}, raison=${event.reason}`);
      } else {
        console.log('Connexion interrompue');
      }
    };

    return () => {
      socket.close(1000, "Fermeture normale");
      console.log("Connexion WebSocket fermée");
    };
  }, []);

  const sendMessage = () => {
    console.log("plus rien ici");
  };

  return (
    <div className="App">
      <h1>Map</h1>
      <Map latestData={latestData} />
      <button onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
}

export default App;
