echo "Starting import of BSON files..."

for file in /home/dump/*.bson
do
    collection_name=$(basename "$file" .bson)
    echo "Importing $file into collection $collection_name..."
    mongorestore --db docker-projekt --collection "$collection_name" "$file"
done

echo "Import finished."