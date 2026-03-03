#!/bin/sh
npm install critters
pages=$(find -name "index.html")
for page in $pages; do
  node --input-type=module -e "
    import Critters from 'critters';
    import { readFileSync, writeFileSync } from 'fs';

    const filePath = '$page';
    const critters = new Critters({ path: '.' });

    const html = readFileSync(filePath, 'utf8');
    const result = await critters.process(html);

    writeFileSync(filePath, result);
  "
done
