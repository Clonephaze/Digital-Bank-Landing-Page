# Frontend Mentor - Digitalbank landing page solution

This is a solution to the [Digitalbank landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/digital-bank-landing-page-WaUhkoDN). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page

### Links

- Solution URL: [GitHub](https://github.com/Clonephaze/Digital-Bank-Landing-Page)
- Live Site URL: [Live Site](https://clonephaze.github.io/Digital-Bank-Landing-Page/)

## My process

### Built with

- Semantic HTML5
- Modern CSS (nesting, custom properties, `clamp()`, logical properties)
- CSS Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

The most interesting part was coordinating the hero layout between mobile and desktop. The mockup image bleeds off the top of the viewport on desktop while sitting inside the background shape, so I used absolute positioning relative to the hero section rather than treating it as a regular content image. Native CSS nesting made the responsive rules for that section a lot cleaner to maintain in one place.

### Continued development

The hero background SVG shapes are a bit involved to position precisely across breakpoints and I want to keep sharpening that instinct for when designs use decorative background elements that bleed off the edges. Getting those to feel right without magic numbers takes some practice.

I also want to explore CSS `@layer` more on larger projects where cascade management starts to get tricky.

### AI Collaboration

- Tools used: GitHub Copilot
- How: used it to generate documentation lookups and map out the implementation roadmap before writing code
- What worked: having a structured plan upfront made the actual build go much smoother

## Author

- Website - [Clonephaze](https://www.clonecore.net)
- Frontend Mentor - [@Clonephaze](https://www.frontendmentor.io/profile/Clonephaze)
