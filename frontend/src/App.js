import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Components/Map';
import axios from 'axios';


function App() {
  let socket;
  const [ latestData, setLatestData ] = useState({});
  const [ firstData, setFirstData ] = useState({});

  useEffect(() => {
    socket = new WebSocket('ws://0.0.0.0:5002/ws');

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

    axios.get('http://0.0.0.0:5002/last_two_coords')
      .then((response) => {
        setFirstData(response.data);
      }).catch((error) => {
        console.log(error);
      });


    return () => {
      socket.close(1000, "Fermeture normale");
      console.log("Connexion WebSocket fermée");
    };
  }, []);

  return (
    <div className="App">
      <h1>Map</h1>
      <Map latestData={latestData} firstData={firstData} />
    </div>
  );
}

export default App;
