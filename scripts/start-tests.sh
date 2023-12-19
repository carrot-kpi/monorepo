#!/bin/bash

docker compose -f docker-compose.e2e.yaml \
    run --build synpress \
    -e INFURA_PROJECT_ID \
    -e WALLETCONNECT_PROJECT_ID \
    -e FATHOM_SITE_ID \
    -e FATHOM_API_KEY
