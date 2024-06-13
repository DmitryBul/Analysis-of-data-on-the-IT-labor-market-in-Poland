# This is a simple Node.js project container with Express
## Workflow

### Build the image
Navigate to project folder containing the Dockerfile and run the following command to build the image.
```bash
docker build -t server -f Dockerfile.express .
```

### Run the container
Run the following command to start the container.
```bash
docker run -d -p 4444:4444 --name server server
```

### Test the container

```bash
curl http://localhost:4444
```
response should be `Hello bro`

### Stop the container
Run the following command to stop the container.
```bash
docker stop server
```

### Remove the container
Run the following command to remove the container.
```bash
docker rm server
```

Note: 
The server is running on port 4444. You can change the port by modifying the command in RUN section.
The server will not run if database container is not running. Make sure to run the database container first.