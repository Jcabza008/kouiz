#!/bin/bash
# Root User 
ROOTUSER="root"
ROOTPASS="vkEy8!rJnp"
ROOTDB="admin"
# KM User
SPUSER="qm-restapi"
SPPASS="vkEy8!rJnp"
SPDB="kouizmedb"
SPROLE="readWrite"

# Start MongoDB service
echo "Starting MongoDB for Initial Setup..."
/usr/bin/mongod --dbpath /data --nojournal --fork --logpath /data/mongodb.log

# Create SP Database
echo "Creating SP Database..."
mongo $SPDB --eval "db.createCollection('Test');"

# Create Root User
echo "Creating Root User..."
mongo $ROOTDB --eval "db.createUser({ user: '$ROOTUSER', pwd: '$ROOTPASS', roles: [ { role: 'userAdminAnyDatabase', db: '$ROOTDB'}, { role: 'readWriteAnyDatabase', db: '$ROOTDB'}] });"

# Create SP User
echo "Creating SP User..."
mongo $SPDB --eval "db.createUser({ user: '$SPUSER', pwd: '$SPPASS', roles: [ { role: '$SPROLE', db: '$SPDB' } ] });"

# Stop MongoDB service
echo "Stopping MongoDB after Initial Setup..."
/usr/bin/mongod --dbpath /data --shutdown

echo "========================================================================"
echo "MongoDB Root User: \"$ROOTUSER\""
echo "MongoDB Root Password: \"$ROOTPASS\""
echo "MongoDB Root Database: \"$ROOTDB\""
echo "========================================================================"
echo "========================================================================"
echo "MongoDB QM User: \"$SPUSER\""
echo "MongoDB QM Password: \"$SPPASS\""
echo "MongoDB QM Database: \"$SPDB\""
echo "MongoDB QM Role: \"$SPROLE\""
echo "========================================================================"

rm -f /.first_run