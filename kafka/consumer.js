const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); // Remplacez par votre serveur Kafka

const consumer = new Consumer(
    client,
    [ { topic: 'coordinates', partition: 0 } ],
    { autoCommit: false }
);

consumer.on('message', function (message) {
    console.log('Message reçu:', message);
});

consumer.on('error', function (err) {
    console.error('Erreur lors de la consommation des messages:', err);
});
