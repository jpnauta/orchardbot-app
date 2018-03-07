#!/usr/bin/env bash

set -e

# Go to project directory script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

# Pull latest code
git pull origin master

# Build and launch docker config
docker volume create --name=mongodb || true
docker-compose -f docker-compose.production.yml build
docker-compose -f docker-compose.production.yml up -d
