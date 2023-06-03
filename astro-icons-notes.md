# Notes on Astro-icon

see: coding in public / net ninja: Build a Static Site with Figma & Astro #6 - Astro Structure & Components
[Build a Static Site with Figma & Astro #6 - Astro Structure & Components] (https://www.youtube.com/watch?v=0xiMkffs87g)
around 12m 45s in

also here's a whole video about astro-icon
[Astro Icon Component](!https://www.youtube.com/watch?v=8LRY7-985yE)

if astro-icons doesn't work, it might need svgo adding to the config.mjs
see: [!https://www.youtube.com/watch?v=DLTVZFzjPDs] 6m 44s
but it looks like this now comes as dependency of astro-icons

npm install and setup in #5 - Astro Intro & Setup:
[!https://www.youtube.com/watch?v=DLTVZFzjPDs&t=238s]

**NB needs autoprefixer and postcss!**

```
npm i -D postcss autoprefixer
```

**NB** remember to add browserslist to package.json for the autoprefixer

don't think we need to add a postcss config file (postcss.config.cjs)
it's just for the open props and just-in-time props
see Build a Static Site with Figma & Astro #5 7mins

If you want to use local SVGs, create a folder 'icons' in 'src'

To use Icon Packs see:

[Icones] (https://icones.js.org/)
[Material-Symbols] (https://icones.js.org/collection/material-symbols)

This doesn't seem to work. Tried installing @iconify/json. Nope