FROM ubuntu

# Install MongoDB
RUN apt-get update && \
apt-get install -y ca-certificates gnupg wget && \
rm -rf /var/lib/apt/lists/*
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
RUN apt-get update
RUN apt-get install -y mongodb-org

# Add scripts
ADD scripts /scripts
RUN chmod +x /scripts/*.sh

# Command to run
ENTRYPOINT ["/scripts/run.sh"]

# Expose listen ports
EXPOSE 27017
EXPOSE 28017

# Expose data volumes
VOLUME ["/data/db"]