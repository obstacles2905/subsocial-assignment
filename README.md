# Subsocial assigment

## Description

Subsocial off-chain application for processing and storing users posts to an IPFS

## API

# Queries

1. GET /posts - list all posts.

# Mutations
2. POST /post - create a new post.

## Environment
Required environment variables
```bash
APPLICATION_PORT

POSTGRES_HOST
POSTGRES_PORT
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD

SUBSOCIAL_AUTH_KEY
SUBSTRATE_NODE_URL
IPFS_NODE_URL

```

Copy .env.example to a new .env file. Env variables are already put (obviously storing env variables in such way is not safe :) )

## How to run

1. Install dependencies with:

```bash
npm install
```

2. Setup Postgres container by running a

```bash
docker-compose up -d
```

3. Initialize DB structure

```
npm run typeorm schema:sync
```

4. Launch application with watcher

```bash
npm run start:dev
```

After performing those operations a server will start. A default port is 3000.