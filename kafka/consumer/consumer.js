const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
const { Pool } = require('pg');
const admin = new kafka.Admin(client);
const topic = 'coordinates';

// Connexion db postgres : 
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'kafka_tracking',
    password: 'kafka',
    port: 5432,
});


async function createTopic(topic) {
    try {
        const result = await new Promise((resolve, reject) => {
            admin.listTopics((err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });

        console.log("Résultat de listTopics :", JSON.stringify(result, null, 2));

        if (!result[ 1 ].metadata[ topic ]) {
            console.log('Le topic n\'existe pas, il va être créé');
            await new Promise((resolve, reject) => {
                admin.createTopics([ {
                    topic: topic,
                    partitions: 1,
                    replicationFactor: 1
                } ], (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
            });
            console.log("Topic créé");
        } else {
            console.log('Le topic existe déjà');
        }
    } catch (error) {
        console.error('Erreur lors de la création du topic', error);
    }
}

async function startConsumer(topic) {
    await createTopic(topic);

    const consumer = new Consumer(
        client,
        [ { topic: topic, partition: 0 } ],
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
}
console.log("Topic :", topic);
startConsumer(topic);