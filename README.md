# Portfolio

## Dev server
1. `nix-shell -p miniserve`
2. `miniserve . --header "Cross-Origin-Opener-Policy:same-origin" --header "Cross-Origin-Embedder-Policy:require-corp" --index index.html`

## Converting to webp
1. `nix-shell -p imagemagick`
2. `magick image.png -quality 80 image.webp`

## Creating image srcsets
Ensure the image is already in webp format.
1. Find the max sizes for the image on desktop, tablet, and mobile.
2. `nix-shell -p imagemagick`
3. i.e. for resizing to 800px `magick image.webp -resize 800x image-800.webp`
4. Repeat for each image size
5. Update HTML (assuming 1000px is the default size on desktop)
```html
<img
  src="/_assets/images/image-1000.webp"
  srcset="
    /_assets/images/image-400.webp 400w,
    /_assets/images/image-500.webp 500w,
    /_assets/images/image-1000.webp 1000w
  "
  <!-- The width and height of the default image -->
  <!-- This is used to set the aspect ratio for width=100% height=auto styles -->
  width="1000"
  height="800"
  <!-- 37.5rem = 600px for mobile, 62.5rem = 1000px for tablet, last is for desktop --> 
  <!-- This is the same as media max width CSS rules -->
  <!-- We specify the size of the image for mobile, tablet, desktop. -->
  <!-- This should match your CSS, i.e. width=95% goes to 95vw, width=1000px goes to 1000px -->
  sizes="(max-width: 37.5rem) 95vw, (max-width: 62.5rem) 80vw, 1000px"
  alt="Blurred background image."
/>
```
