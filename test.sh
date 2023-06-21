#!/bin/bash

export STAGE=local
export DATABASE_URL=postgres://root:password@localhost:54323/db 

npm run seed && \
npm run test:cov
