# Transformers - REST API

## Guide

1. Installation
2. Starting application
3. Usage

## Prerequisites

- Docker v18.09.2
- docker-compose v1.23.2

## Installation

---

1. Clone this repo to your local drive and checkout to develop branch

```bash
    git clone && git checkout develop
```

2.  Navigate to the cloned folder and rename `microservice-variables.env.example` to `microservice-variables.env`

3.  Enter credentials of your Facebook app (inside microservice-variables.env)

## Starting application

---

- For production environment issue command

```bash
    docker-compose -f docker-compose.prod.yml up -d
```

- For development environment issue command

```bash
    docker-compose up -d
```

<small>Note: If you are switching from one environment to another use `--build --no-cache` arguments on above commands to avoid collisions. E.g.</small>

```bash
    docker-compose up -d --build --no-cache
```

- Check application state by issuing

```bash
    docker-compose logs -f
```

<small>Note: For production you have to include docker-compose file `-f docker-compose.prod.yml`</small>

- When everything is up and running you can start executing request commands to the server

## Usage

---

Application consists of profile autocomplete feature, which means you can fetch profiles from social networks.
For now only facebook social site is implemented.

### Curl commands

You can start searching for profiles in two ways:

1. By entering search query

```bash
curl -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     -d '{"type": "facebook", "query": "john doe", "currentValues": []}' \
     "http://localhost:3000/profile-autocomplete"
```

2. By providing an id for a specific profile (e.g. on facebook)

```bash
curl -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     "http://localhost:3000/profile-autocomplete?type=facebook&id=649695231808930"
```

<small>Note: If you are running an app in local environment then use http://localhost:3000, otherwise use the one specific to your host provider</small>

Paramters

1. type
   - required
   - one of [facebook]
2. query
   - required
   - empty string not allowed
3. currentValues
   - required
   - empty array allowed
