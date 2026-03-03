#!/bin/sh
npm install critters
pages=$(find -name "index.html")
for page in $pages; do
  node --input-type=module -e "
    import Critters from 'critters';
    import { readFileSync, writeFileSync } from 'fs';
    const critters = new Critters({ path: '.' });
    const html = readFileSync();
    const result = await critters.process(html);
    writeFileSync('$page', result);
  "
done
