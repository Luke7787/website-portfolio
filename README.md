# Luke Zhuang — Portfolio

🌐 **Live Site:** https://lukezhuang.onrender.com  

A modern personal portfolio built with **Next.js**, **React**, and **TypeScript**.  
The site features a dark theme, smooth section navigation, interactive animations, and project showcases designed to highlight both technical depth and personality.

---

## Overview

This portfolio is organized into five core sections:

| Section | Description |
|----------|--------------|
| **Home** | Hero section with animated intro text and an interactive Vanta.js birds background powered by Three.js. |
| **About** | Professional bio with an integrated photo & video slideshow (images, video, captions, arrow navigation). |
| **Projects** | Featured full-stack and systems projects with descriptions, slideshows, and links to live demos and GitHub repositories. |
| **Skills** | Technical expertise displayed in a 3-column grid: Programming Languages, Infrastructure, and Professional Skills. |
| **Contact** | “Let’s Connect” section with email and social links, plus interactive background effects. |

---

## Highlights

- **Interactive Vanta.js Bird Animation**  
  Three.js-powered animated background triggered on hover/tap in the Home and Contact sections.

- **Custom Text Effects**  
  Text scramble animation for the intro line and animated name reveal in the hero section.

- **Multimedia Slideshow**  
  Image and video gallery with smooth navigation and captions.

- **Project Showcases**  
  Each featured project includes:
  - Short technical description  
  - Live Demo link  
  - GitHub repository link  

- **Clean Navigation Experience**  
  Smooth section scrolling without hash fragments in the URL. Refreshing always loads the base route.

- **Responsive Design**  
  Mobile-friendly layout with adaptive navigation and grid structures.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Frontend:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **3D & Effects:** Three.js, Vanta.js (Birds)
- **Icons:** Font Awesome
- **Image Optimization:** Next.js Image component

---

## Getting Started

```bash
npm install
npm run dev
```

Then open:

http://localhost:3000

Edit `src/app/page.tsx` to start customizing. Changes hot-reload automatically.

---

## Deployment

The application is static-friendly and can be deployed on:

- Vercel  
- Render  
- Any Node.js-compatible hosting platform  

For more details, see the official Next.js deployment documentation.
