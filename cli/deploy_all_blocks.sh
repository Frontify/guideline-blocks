#!/bin/bash

# Navigate to the packages directory
cd packages

# Find directories that contain 'manifest.json' and have '-block' in their name
for dir in *-block; do
   if [ -d "$dir" ] && [ -f "$dir/manifest.json" ]; then
       echo "Deploying in $dir..."
       cd $dir && pnpm run deploy
       cd ../
   else
       echo "Skipping $dir, no manifest.json found."
   fi
done

echo "Deployment completed."
