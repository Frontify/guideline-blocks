#!/bin/bash

# Go into the packages directory
cd packages || exit

# Loop through all directories
for dir in */ ; do
  if [ -d "$dir" ]; then
    echo "Deploying in $dir"
    cd "$dir" || continue
    pnpm run deploy
    cd ..
  fi
done
