#!/bin/bash

rm -rf docs/
npm run build
git pull
git add -A
git commit -a -m "blog update from publish.sh"
git push
