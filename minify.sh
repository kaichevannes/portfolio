#!/bin/sh
npm install esbuild

for jsFile in $(find _js -type f); do
  npx esbuild "$jsFile" --allow-overwrite --minify --outfile="$jsFile"
done 

cat _css/*.css > _css/styles.css
npx esbuild _css/styles.css --bundle --minify --outfile=_css/styles.css

for htmlFile in $(find . -name "index.html"); do
  perl -0777 -pi -e '
    s|<!-- MATCH START -->\s*
      <link rel="stylesheet" href="/_css/base.css" />\s*
      <link rel="stylesheet" href="/_css/components.css" />\s*
      <link rel="stylesheet" href="/_css/utilities.css" />\s*
      <!-- MATCH END -->|
      <link rel="stylesheet" href="/_css/styles.css" />|gmsx
  ' "$htmlFile"
done
