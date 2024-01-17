const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: '172.17.7.213:9092' });
const Producer = kafka.Producer;
const producer = new Producer(client);
const topic = 'coordinates';

// fonction pour générer aléatoirement des coordonnées dans un rayon de 1000m autour de la position précédente
function getRandomCoordinatesAround(latitude, longitude) {
    const radiusInDegrees = 1000 / 111000;
    const u = Math.random();
    const v = Math.random();
    const w = radiusInDegrees * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);
    const new_x = x / Math.cos(latitude);
    const foundLongitude = parseFloat(new_x) + parseFloat(longitude);
    const foundLatitude = parseFloat(y) + parseFloat(latitude);
    return { latitude: foundLatitude, longitude: foundLongitude };
}

producer.on('ready', function () {
    let i = 0;
    let data = {
        latitude: "48.096430214146935",
        longitude: "0.52138240299672"
    };
    setInterval(() => {
        if (i != 0) {
            data = getRandomCoordinatesAround(data.latitude, data.longitude);
        }
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
        i++;
    }, 1000);
});

producer.on('error', function (err) {
    console.log('error', err);
});
