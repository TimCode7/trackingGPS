const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });  // Remplacez par votre serveur Kafka
const Producer = kafka.Producer;
const producer = new Producer(client);
const topic = 'coordinates';

producer.on('ready', function () {
    setInterval(() => {
        const data = {
            latitude: Math.random() * 180 - 90,
            longitude: Math.random() * 360 - 180
        };
        const key = "IP2";
        const payloads = [
            { topic: topic, messages: JSON.stringify(data), key: key }
        ];

        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    }, 2000);
});

producer.on('error', function (err) {
    console.log('error', err);
});
