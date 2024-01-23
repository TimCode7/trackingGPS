#!/bin/bash

export IP=$(hostname -I | awk '{print $1}')
echo $IP

docker-compose -f docker-compose.consumer.yml up