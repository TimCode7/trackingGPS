#!/bin/bash

export IP=$(hostname -I | awk '{print $1}')

docker-compose -f docker-compose.producer2.yml up
