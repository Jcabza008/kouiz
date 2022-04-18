#! /bin/bash

# Initialize first run
if [[ -f "/scripts/first_run.sh" ]]; then
    echo "First Run"
    /scripts/first_run.sh
fi

# Start MongoDB
echo "Starting MongoDB..."
/usr/bin/mongod --dbpath /data/db --auth --bind_ip_all