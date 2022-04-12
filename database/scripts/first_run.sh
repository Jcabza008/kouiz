#!/bin/bash
# Root User 
ROOTUSER="root"
ROOTPASS="vkEy8!rJnp"
ROOTDB="admin"
ROOTROLE="root"
# KM User
KMUSER="kmserver"
KMPASS="wkh!hZn8c3"
KMDB="kouizmedb"
KMROLE="readWrite"

# Start MongoDB service
echo "Starting MongoDB for Initial Setup..."
/usr/bin/mongod --dbpath /data/db --nojournal --fork --logpath /data/mongodb.log

# Create Root User
echo "Creating Root User..."
mongo $ROOTDB --eval "db.createUser({ user: '$ROOTUSER', pwd: '$ROOTPASS', roles: [ { role: '$ROOTROLE', db: '$ROOTDB'} ] });"

# Create KMServer User
echo "Creating KM User..."
mongo $KMDB --eval "db.createUser({ user: '$KMUSER', pwd: '$KMPASS', roles: [ { role: '$KMROLE', db: '$KMDB' } ] });"

# Stop MongoDB service
echo "Stopping MongoDB after Initial Setup..."
/usr/bin/mongod --dbpath /data/db --shutdown

echo "========================================================================"
echo "MongoDB Root User: \"$ROOTUSER\""
echo "MongoDB Root Password: \"$ROOTPASS\""
echo "MongoDB Root Database: \"$ROOTDB\""
echo "========================================================================"
echo "========================================================================"
echo "MongoDB KM User: \"$KMUSER\""
echo "MongoDB KM Password: \"$KMPASS\""
echo "MongoDB KM Database: \"$KMDB\""
echo "MongoDB KM Role: \"$KMROLE\""
echo "========================================================================"

rm -f /.first_run