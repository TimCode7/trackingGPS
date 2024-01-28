# Tracking GPS

# Avant d'exécuter le programme, récupérez l'ip de l'hôte

## Effectuez cette commande sur le terminal de l'hôte : 
`hostname -I | awk '{print $1}'`


# Ensuite avant de lancer le consumer, ou un producer effectuez cette commande : 
`export IP="$IP"`
(Remplacez $IP par la valeur de l'IP de l'hôte)


# Vous pouvez maintenant lancer le consumer et producers : 

## Pour lancer le consumer, effectuez la commande  : 
`docker-compose -f docker-compose.consumer.yml up`

## Pour lancer le premier producer, effectuez la commande : 
`docker-compose -f docker-compose.producer1.yml up`

## Pour lancer le deuxième producer, effectuez la commande : 
`docker-compose -f docker-compose.producer2.yml up`

## Une fois le consumer démarré, accédez à la map à cette adresse : [Map](http://localhost:3000)
