const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'broker:29092' });
const Producer = kafka.Producer;
const producer = new Producer(client);
const topic = 'coordinates';


producer.on('ready', function () {
    setTimeout(() => {
        const data = {
            latitude: "-58.096430214146935",
            longitude: "57.52138240299672"
        };
        const key = process.env.PRODUCER_KEY;
        const payloads = [
            { topic: topic, messages: JSON.stringify(data), key: key }
        ];
        console.log(key, payloads)

        producer.send(payloads, function (err, data) {
            if (err) {
                console.error("Erreur lors de l'envoi du message:", err);
            } else {
                console.log("Résultat de l'envoi du message:", data);
            }
        });
    }, 2000);
});

producer.on('error', function (err) {
    console.log('error', err);
});
