# Codebase Analysis: Portfolio Website

## Overview
This repository contains a simple, lightweight, and modern Single Page Application (SPA) built for a portfolio website. It uses completely Vanilla web technologies (HTML, CSS, JavaScript) without any build steps, external frameworks, or bundlers. The application renders dynamically on the client-side based on a mock database provided via a JavaScript file.

## File Breakdown

### `index.html`
- The entry point for the application.
- Extremely minimal structure containing only a `<main id="app">` element.
- Loads two Google Fonts: **Inter** (sans-serif) and **JetBrains Mono** (monospace).
- Includes the stylesheet (`style.css`), the data file (`data.js`), and the main logic (`script.js`).

### `data.js`
- Serves as the local content database.
- Defines a large `projects` array containing multiple objects. Each project object is structured with keys such as `id`, `title`, `category`, `thumbnail`, `description`, and `content`.
- The `content` array inside each project object holds a sequence of building blocks used to render the project details page (e.g., `Title`, `Tags`, `Video`, `Paragraph`, `Link`, `Image`).
- Defines a `bio` object containing personal information, a brief bio (with basic Markdown-style links), and social media handles.
- Contains references to various local assets (thumbnails and icons defined in the `assets/` subdirectory).

### `script.js`
- Encapsulates the core logic and routing of the SPA inside an `app` object.
- **State Management:** Manages state properties like `currentView` ('home' or 'project'), `filter`, and `selectedProject`.
- **Rendering & DOM Manipulation:** Dynamically builds and updates the DOM using ES6 template literals. It injects content into the root `<main id="app">` element.
- **Filtering System:** Implements a prominent category-based filtering UI. It allows **multiple categories** to be selected simultaneously in the `filter-bar` (e.g., "Installations", "Creative Coding"). A project's `category` property (which can be a comma-separated string like `"Workshops, Creative Coding"`) is intersected with the active filters; if it matches *all* selected categories (strict AND logic), it is rendered in the grid. The "All" button serves as a global reset to clear all filters.
- **Routing:** Handles switching views between the main project grid (`showHome`) and individual project detail pages (`showProject`).
- **Content Parsing:** Contains a `linkify` utility method to process basic markdown-formatted links `[text](url)` and bare URLs in the project descriptions and paragraphs to convert them into clickable HTML `<a>` tags.
- Includes a DOMContentLoaded event listener to bootstrap the app via `app.init()`.

### `style.css`
- A clean, modern stylesheet designed with a monochrome and minimalist aesthetic (`--color-bg: #ffffff`, `--color-text: #1a1a1a`).
- Relies heavily on CSS Custom Properties (`:root` variables) for easy theming of typography, colors, and layout constraints.
- Employs a responsive CSS Grid system (`grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`) to handle the project grid layout.
- Provides styling for individual component structures, including the hero bio section, category filter bar, tag pills, project cards (with hover scaling details), and fully expanded project views.
- Includes smooth but minimalistic transitions and a basic `fadeIn` keyframe animation for page transitions.

## Architecture & Strengths
- **Simplicity:** The lack of framework dependencies makes it extremely easy to host (can be deployed via simple static hosting like GitHub Pages).
- **Extensibility:** The data structure explicitly defines atomic "blocks" (`type: "Paragraph"`, `type: "Video"`, etc.), making the rendering engine capable of displaying rich and varied content types for any given project.
- **Performance:** Very small foot-print with no large JavaScript library overhead.

## Potential Areas for Enhancement
- **Styling consistency:** `style.css` defines rules for a `<header>` element with a navigation bar that isn't actually generated or present inside `script.js` or `index.html`.
- **Routing:** Since routing relies completely on JavaScript memory state and clicking elements, there is no History API implemented. Users cannot use the browser's "Back" or "Forward" buttons, and direct deep-linking to specific projects is not currently possible.

## Proposed Improvements & Architecture Shifts

While maintaining the overarching goal of keeping the codebase framework-free and incredibly simple (Vanilla UI ecosystem), here are several problems and their corresponding solutions:

### 1. Adding Dates and Chronological Sorting
**Problem:** The `data.js` entries currently have no temporal awareness, meaning the `projects` grid simply outputs them in the exact order they are authored, which might become messy over time.
**Solution:**
- Add a new `date` property (e.g., `"2023-10"` or `"2023-10-15"`) to every root object inside `data.js`.
- During the `renderProjects()` cycle in `script.js`, execute a native array sort before generating the HTML: 
  `projects.sort((a,b) => new Date(b.date) - new Date(a.date))`
- The date string can also be injected into `<span class="detail-category">` on the Project details page.

### 2. Shifting Data Architecture (Global JS vs JSON/ESM)
**Problem:** Defining a massive array of objects into the global scope in `data.js` via a `<script>` tag is prone to race conditions if not careful with script deferrals and bloats the global `window` object. Secondly, the custom JSON-like tree of "blocks" for the `content` array (`{ type: "Paragraph", value: "..."}`) is very verbose to author manually.
**Solution:**
- **Architecture Shift A (JSON Fetching):** Move the database to an explicit `data.json` file. Refactor `app.init()` to be asynchronous: `const res = await fetch('data.json'); this.state.projects = await res.json();`. This cleanly separates data from runtime logic. *(Note: This does require basic local webservers to bypass CORS rules when developing locally via `file://`)*.
- **Architecture Shift B (ES Modules):** Use `<script type="module" src="script.js">` in `index.html`, and `export const projects = [...]` inside `data.js`. Both files remain purely local, globally scoped variables are eradicated, and we get proper dependency management.
- **Authoring Shift (Markdown):** Instead of an array of objects to build the page structure, convert the `content` property to evaluate a pure Markdown string. Adding a micro-library like [marked.js](https://marked.js.org/) (4kB) via CDN enables extremely fast and expressive project authoring (`## Title\n\nSome text with **bold**.`) while gracefully accepting complex HTML embeds.

### 3. Supporting Other kinds of Media
**Problem:** The runtime currently only parses `{ type: "Image" }` and `{ type: "Video" }` (which strictly requires raw iframe HTML as its value string). It fails if you want to cleanly embed Audio elements, GitHub gists, or literal syntax-highlighted code.
**Solution:**
If staying with the custom block array parser, simply expand the `showProject()` if/else logic loop:
- **Audio:** Parse `{ type: "Audio", src: "..." }` to generate a native HTML5 tag: `<audio controls src="${block.src}"></audio>`.
- **Code:** Parse `{ type: "Code", lang: "javascript", value: "..." }` to generate `<pre><code class="language-${block.lang}">${block.value}</code></pre>`.
- **Generic Embeds:** Add an `{ type: "Embed", iframeUrl: "..." }` type strictly for platforms like Spotify, Soundcloud, or CodePen to sanitize inputs cleanly instead of dropping raw iframes into `data.js`.

### 4. Resolving Routing (URL Deep Linking)
**Problem:** Refreshing the page while inside a project drops you back onto the home grid. You cannot share URLs leading directly to a specific project.
**Solution:**
Implement Vanilla JavaScript "Hash Routing" (`window.location.hash`). It operates entirely locally and doesn't require a backend:
- When clicking a project, JS updates the URL: `window.location.hash = '#project/' + project.id`.
- Attach a listener: `window.addEventListener('hashchange', routerLogic)`.
- If the browser detects `#project/...`, it extracts the ID and calls `showProject(extractedId)`. If it detects `#home` or an empty hash, it calls `showHome()`. 
- This enables user-friendly URLs and natively enables the browser's standard Back/Forward buttons without using the complex History API.
