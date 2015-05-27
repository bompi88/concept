#!/bin/bash

# create a dummy directory
mkdir ./private/backup

# unzip the backup data
tar -xzf ./private/concept-backup-27.05.2015.tar.gz -C ./private/backup

# Restore database from backup data
mongorestore -h localhost:3001 -d meteor private/backup/concept

# Clean up
rm -rf ./private/backup