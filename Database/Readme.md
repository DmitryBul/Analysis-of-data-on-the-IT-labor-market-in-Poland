docker build -t database -f Dockerfile.mongo .


docker run -d -p 27027:27017 --name database database