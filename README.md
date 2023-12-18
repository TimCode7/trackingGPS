# trackingGPS

## Pour lancer l'application effectuez la commande : 
`docker-compose up`

## Pour tester le changement de coordonnées en temps réel : 

### Aller dans la base de données :
`psql -h localhost -p 5432 -U postgres -W` \
`\c kafka_tracking`
#### Ajouter en base de données une coordonnées : 
`INSERT INTO coordonnees (latitude, longitude, key) VALUES({latitude}, {longitude}, {'IP1'|'IP2'});`
