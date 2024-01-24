#!/usr/bin/env bash
echo "Creating mongo users..."
mongosh admin --host localhost -u $MONGO_ADMIN_USER -p $MONGO_PASSWORD --eval "db.createUser({user: '$MONGO_USER', pwd: '$MONGO_PASSWORD', roles: [{role: 'readWrite', db: '$MONGO_DB'}]});"
echo "Mongo users created."
