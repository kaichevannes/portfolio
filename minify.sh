#!/bin/sh
npm install esbuild

for jsFile in $(find _js -type f); do
  npx esbuild "$jsFile" --minify --outfile="$jsFile"
done 

cat _css/*.css > _css/styles.css
npx esbuild _css/styles.css --bundle --minify --outfile=styles.css

for htmlFile in $(find -name "index.html"); do
  sed -i '' -E 's|\
<!-- MATCH START -->[[:space:]]*\
<link rel="stylesheet" href="/_css/base.css" />[[:space:]]*\
<link rel="stylesheet" href="/_css/components.css" />[[:space:]]*\
<link rel="stylesheet" href="/_css/utilities.css" />[[:space:]]*\
<!-- MATCH END -->' "$htmlFile"
done
