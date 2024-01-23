#!/bin/bash

KAFKA_BROKER="$KAFKA_HOST"

TOPIC_NAME="coordinates"

kafka-topics.sh --create --if-not-exists --topic $TOPIC_NAME --bootstrap-server $KAFKA_BROKER --partitions 1 --replication-factor 1

echo "Topic '$TOPIC_NAME' créé ou déjà existant."
