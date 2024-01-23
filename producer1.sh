#!/bin/bash

export IP=$(hostname -I | awk '{print $1}')

docker-compose -f docker-compose.producer1.yml up