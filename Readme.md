# Analysis of data on the IT labor market in Poland

This project uses Docker Compose to manage multi-container applications. It includes a server service (Express application) and a database service (MongoDB).

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. **Build the Docker images**

   Run the following command to build the Docker images for the server and database services:

   ```bash
   docker-compose build
   ```

2. **Start the containers**

   Run the following command to start the server and database containers:

   ```bash
   docker-compose up
   ```

   If you want to run the containers in the background, use the `-d` option:

   ```bash
   docker-compose up -d
   ```

   For development, you can use the `--build` option to rebuild the images:

   ```bash
    docker-compose up --build
    ```
    or 
    ```bash
    docker-compose up --build -d
    ```

3. **Access the application**

   The server service is exposed on port `4444` of your host machine. You can access it at `http://localhost:4444`.

   The database service is exposed on port `27027` of your host machine. You can access it at `mongodb://localhost:27027`.

## Testing

To test the application, you can use any API testing tool like Postman or curl. Make sure the containers are running before you start testing.

```bash
curl http://localhost:4444
```
ore get some data
```bash
curl http://localhost:4444/api/items
```

## Stopping the Containers

To stop the running containers, use the following command:

```bash
docker-compose down
```

This command also removes the containers, networks, and volumes defined in your `docker-compose.yml`