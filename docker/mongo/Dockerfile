# Use the official MongoDB image as the base image
FROM mongo:5.0.23

# Heads Up!
# Once we upgrade to a later version, we may need to tweak this, see the guide:
# https://medium.com/workleap/the-only-local-mongodb-replica-set-with-docker-compose-guide-youll-ever-need-2f0b74dd8384

# Initializes a single-node replica set
# https://copyprogramming.com/howto/mongodb-with-replica-set-in-docker-compose
RUN echo "rs.initiate({'_id':'rs0', members: [{'_id':1, 'host':'host.docker.internal:27017'}]});" > "/docker-entrypoint-initdb.d/init_replicaset.js"
RUN echo "12345678" > "/tmp/key.file"
RUN chmod 600 /tmp/key.file
RUN chown 999:999 /tmp/key.file

CMD ["mongod", "--replSet", "rs0", "--bind_ip_all", "--keyFile", "/tmp/key.file"]
