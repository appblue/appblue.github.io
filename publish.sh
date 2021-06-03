#!/bin/bash

mv docs docs.old
npm run build
git pull
git add -A
git commit -a -m "blog update from publish.sh"
git push
rm -rf docs.old/
