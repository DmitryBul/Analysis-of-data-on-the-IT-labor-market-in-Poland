# This is a simple Mongo database container with imported data
## Workflow

### Build the image
Navigate to project folder containing the Dockerfile and run the following command to build the image.
```bash
docker build -t database -f Dockerfile.mongo .
```

### Run the container
Run the following command to start the container.
```bash
docker run -d -p 27027:27017 --name database database
```
### Test the container
Run the following command to test the container.
```bash
docker exec -it database mongo
```
or get some data
```bash
docker exec -it database mongo --eval 'db.datas.find({avg_Salary:{$gt:25500}}).pretty()'
```

### Stop the container
Run the following command to stop the container.
```bash
docker stop database
```

### Remove the container
Run the following command to remove the container.
```bash
docker rm database
```