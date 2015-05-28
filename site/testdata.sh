#!/bin/bash

# create a dummy directory
mkdir ../resources/backup

# unzip the backup data
tar -xzf ../resources/concept-backup-27.05.2015.tar.gz -C ../resources/backup

# Restore database from backup data
mongorestore -h localhost:3001 -d meteor ../resources/backup/concept

# Clean up
rm -rf ../resources/backup