# Welcome to my Portfolio site!

It uses the following technologies:
- [React](https://react.dev/)
- [Remix](https://remix.run/docs)
- [Tailwind](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)

and is hosted on Vercel at [teawell.me](https://teawell.me)

## Remix
Currently the website doesn't make full use of the great features of Remix, like [outlets](https://remix.run/docs/en/main/components/outlet) or any of the API calling functionality. It does however create very optimised files ensuring great site speed.

## Canvas
This was my first time using canvas, I thoroughly enjoyed getting to know the intricacies of how it works. The most complex aspect ended up being the collision algorithm. 

Originally for each animation frame I had each particle check to see if it was colliding but I found that whilst this worked great on some devices, older devices struggled to keep up with the computation.

As a result I made 2 changes; the first to pause animations while the canvas is out of view and the second was to change the algorithm to look ahead. The algorithm will now calculate how many animation frames it will be until a potential collision occurs and then render for that many frames. This way we don't need to run a check every single frame for every single particle, depending on screen size this could be up to 1000 less checks per particle!

