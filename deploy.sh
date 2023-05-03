#!/bin/bash

npm run build;
docker-compose -f ./docker/development/docker-compose.yml down;
docker-compose -f ./docker/development/docker-compose.yml build;
docker-compose -f ./docker/development/docker-compose.yml up -d;