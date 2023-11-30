const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'broker:29092' });
const { Pool } = require('pg');

// Connexion db postgres : 
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'kafka_tracking',
    password: 'kafka',
    port: 5432,
});

const consumer = new Consumer(
    client,
    [ { topic: 'coordinates', partition: 0 } ],
    { autoCommit: false }
);

consumer.on('message', function (message) {
    console.log(message);
    let latlong = JSON.parse(message.value);
    console.log(latlong.latitude);
    const text = 'INSERT INTO coordonnees (latitude, longitude, key) VALUES($1, $2, $3) RETURNING *';
    const values = [ latlong.latitude, latlong.longitude, message.key ];
    pool.query(text, values, (err, res) => {
        if (err) {
            console.log("Erreur lors de l'insertion des données", err);
        } else {
            console.log("Insertion réussie", res.rows[ 0 ]);
        }
    });
});



consumer.on('error', function (err) {
    console.error('Erreur lors de la consommation des messages:', err);
});
