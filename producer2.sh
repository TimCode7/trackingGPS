#!/bin/bash

# Changer la valeur de l'IP pour qu'elle corresponde à celle de l'hôte sur le réseau
export IP="192.168.210.114"

docker-compose -f docker-compose.producer2.yml up
