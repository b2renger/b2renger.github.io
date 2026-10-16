const projects = [
  {
    id: "voice-interaction-kit",
    year: "2026",
    title: `Voice interaction kit`,
    category: "IA, Audio, Teaching",
    tags: ["desktop", "#voice-ux", "#local-ai", "#p5js", "#cables"],
    thumbnail: "assets/images/voice_kit_1.png",
    description: `A kit for design students to shape the identity of a voice agent and the basic vocabulary of voice UX: taking turns, interrupting, thinking, not understanding.`,
    content: `# Voice interaction kit

A kit that lets design students work on the **identity of a voice agent** (its voice, its personality) and on the **basic vocabulary of voice UX**: taking turns, knowing when someone has finished, interrupting, thinking, not understanding, visual and sound feedback, and calls to action.

![The Voice Lab app: engine, persona and voice settings, the agent's face, subtitles and turn timings](assets/images/voice_kit_1.png)

## One brain, several clients

- **Voice Lab** is the brain: a Windows / Mac app that listens, thinks and speaks, either 100% locally with open models (QVAC, no key needed) or online with Gemini Live. It holds the persona, its knowledge and every setting.
- **Its clients** follow the conversation and drive it: a cables.gl op, and p5.js or plain HTML/CSS/JS examples to design your own interface (visuals, animations, subtitles, buttons). Several clients can follow the same conversation at once.

Both engines produce the same states and the same events, so an interface designed with the local engine works with Gemini, and the other way round.

![A typed exchange: the agent answers and offers on-screen choices](assets/images/voice_kit_2.png)

## What you can explore

- **Who is the agent?** Name, persona, creativity, greeting, and a knowledge file next to it (a menu, opening hours, the artworks of a room).
- **Which voice?** 30 Gemini voices or, locally, Supertonic presets, a voice described in words with Parler, or Chatterbox.
- **When have you finished speaking?** How patient the end-of-turn silence is, and the Smart Turn model that hears whether a sentence sounds finished.
- **Can you interrupt it?** A "mm-hm" lets it carry on, "stop" makes it stop and listen.
- **What happens while it thinks?** Reply delay as a design material, thinking sounds, filler lines.
- **What if it didn't understand, or nobody answers?** Repair lines, away events and reprompts.

Every turn is measured (how long the person spoke, the wait you feel before the agent's voice), so design choices can be compared with numbers.

[Code](https://github.com/b2renger/voice-interaction-kit)
`
  },
  {
    id: "moire-motion",
    year: "2026",
    title: `Moiré motion`,
    category: "Graphics, Creative Coding",
    tags: ["web", "#print", "#barrier-grid", "#processing"],
    thumbnail: "assets/images/moire_motion_3.png",
    description: `Turn a short video into a barrier-grid animation: print the combined image, lay the striped grid on top, slide it and the picture moves.`,
    content: `# Moiré motion

Tools for making barrier-grid animations, also called scanimations or "moiré motion": a combined image made of interleaved strips of several frames, and a black grid with clear slits that you lay on top. Slide the grid and the picture moves.

![A barrier-grid animation in motion](assets/images/moire_motion_1.gif)

It started in 2021 as a small Processing sketch, and became in 2026 a web app that runs entirely in the browser (nothing is uploaded):

1. **Frames**: open a short video and set the start and end of one loop, or open a few images.
2. **Pattern**: straight or curved lines in any direction, or a radial grid that animates by turning instead of sliding. Curved and radial grids follow [FabObscura](https://hcie.csail.mit.edu/research/fabobscura/fabobscura.html) (Sethapakdi et al., UIST 2025).
3. **Print**: download the combined image and the grid at the same dpi, and print the grid on transparency film.

A quick tour: open a video, preview the animation, switch from straight lines to a radial grid.

<video controls muted loop playsinline preload="metadata"><source src="assets/videos/moire_motion.mp4" type="video/mp4"></video>

![A radial grid turning over the silhouette of a fish](assets/images/moire_motion_3.png)

[Open the web app](https://b2renger.github.io/Processing_moire_motion/docs/) [Code](https://github.com/b2renger/Processing_moire_motion)
`
  },
  {
    id: "llm-on-lan",
    year: "2026",
    title: `LlmOnLan (LOL)`,
    category: "IA, Teaching",
    tags: ["desktop", "#local-llm", "#ollama", "#open-webui", "#electron"],
    thumbnail: "assets/images/llmonlan_2.png",
    description: `A desktop client and a LAN inference farm: anyone on the school Wi-Fi can chat with a local model, with zero setup, and all data stays on their machine.`,
    content: `# LlmOnLan (LOL)

A desktop client plus a LAN inference farm. The client bundles a pinned, unmodified [Open WebUI](https://github.com/open-webui/open-webui) and connects to the farm by itself, so anyone on the office or school Wi-Fi can chat with a local model with **zero setup**: no URL, no account, no Docker. Chats, documents and RAG data stay on the user's machine; the farm is stateless.

![The LOL client connected to a farm, chatting through Open WebUI](assets/images/llmonlan_1.png)

## The pieces

- **The farm**: a GPU box serves a model with Ollama (or llama.cpp as an opt-in speed engine) behind a single, load-balanced LiteLLM endpoint, and announces itself on the network with a UDP beacon. The **Farm app** installs everything for a non-technical operator and doubles as the admin panel: which model is served, under which name, for how many people at once.
- **The client**: an Electron shell that discovers the farm, runs the bundled Open WebUI and stores everything in a folder you choose. It also hosts **LOL Vibe**, a chat with a coding agent that builds web projects you can preview and push to GitHub, and **the Computer**, boxes wired into small programs that read data, see, hear, speak and drive boards and lights.

![The Computer: boxes wired into small programs, with step-by-step lessons](assets/images/llmonlan_2.png)

## Features

Image understanding and voice (Whisper speech-to-text runs on the device), web search through a shared SearXNG, neural voices with Kokoro, OCR for images and scanned PDFs, an opt-in bridge to drive a local Blender over MCP, and several GPU boxes balanced as one fleet.

It is a sibling of [ComfyQ](#project/comfyq): same visual language, same network discovery and auto-update conventions.

[Code](https://github.com/b2renger/LlmOnLan)
`
  },
  {
    id: "comfyq",
    year: "2026",
    title: `ComfyQ`,
    category: "IA, Teaching",
    tags: ["web", "#comfyui", "#generative-ai", "#scheduler"],
    thumbnail: "assets/images/comfyq_2.jpg",
    description: `A job scheduler and workflow manager for ComfyUI that turns one GPU into a room full of people making things.`,
    content: `# ComfyQ

**ComfyQ turns one GPU into a room full of people making things.**

It is a web-based job scheduler and workflow manager for [ComfyUI](https://github.com/comfyanonymous/ComfyUI), built for classrooms, labs and studios where a dozen people want the same expensive graphics card at once. Students book a slot on a shared timeline, fill in a simple form and watch their job run. Nobody installs anything; nobody touches ComfyUI.

It serves a library of **61 ready-made workflows** (image generation and editing, video generation and editing, 3D, audio, captioning and utilities), each one measured on the machine so the timeline knows how long it really takes.

## For students

- **Book a slot**, or ask for *as soon as possible* and the job queues into the next gap.
- **Fill in the form**: prompts, dropdowns, sliders, file uploads, and for some workflows a mask painter or a visual prompt composer.
- **Watch it run**, with live progress and an ETA from the measured timing, not a guess.
- **Collect the result**: images, video, audio, 3D models and Gaussian splats each have their own viewer, and *Use these settings* refills the form to iterate.

![A machine's page: the session's results, and your own generations on the side](assets/images/comfyq_2.jpg)

## For admins

An admin mode prepares the machine: pick and calibrate workflows, see which models are missing and fetch them onto the rig, update ComfyUI and its node packs, run the whole library as a test (about 2½ hours for 61 workflows on an RTX 5090) and prune unused models. A small desktop app, **ComfyQ Discovery**, finds every ComfyQ machine on the network and shows what each one is doing.

![ComfyQ Discovery: six machines of the lab, each serving a workflow](assets/images/comfyq_1.png)

[Code](https://github.com/b2renger/ComfyQ)
`
  },
  {
    id: "aframe-8thwall-webar",
    year: "2026",
    title: `WebAR examples : A-Frame + 8th Wall`,
    category: "Creative Coding, Teaching",
    tags: ["web", "#webar", "#aframe", "#threejs", "#8thwall"],
    thumbnail: "assets/images/aframe_8thwall_1.png",
    description: `Augmented reality in a phone's browser: 4 sets of 9 progressive examples for image targets and world effects, with A-Frame or raw Three.js.`,
    content: `# WebAR examples : A-Frame + 8th Wall

Augmented reality experiences that run directly in a phone's web browser: no app to download, no app store. A teaching repository built on a self-hosted 8th Wall engine.

It covers the two classic kinds of WebAR:

- **Image targets**: print an image, point your phone at it, and 3D content appears on top of it and follows it. Think of an interactive poster.
- **World effects**: no image needed, tap the floor on your screen and the content is placed in the room.

Each kind comes in two flavours, **A-Frame** (3D described with HTML tags, the easiest start) and **raw Three.js** (more control, newer libraries), which makes 4 sets of the same 9 progressive examples: primitives, text and fonts, images, 3D models, green-screen video, audio, a live p5.js texture, Gaussian splats and multiple targets.

![The landing page listing every example](assets/images/aframe_8thwall_1.png)

The README is written for beginners: how to fork the repository, test on your phone over HTTPS, publish to GitHub Pages and read errors with an on-phone console.

![The image target used by most examples: print it and point your phone at it](assets/images/aframe_8thwall_target.jpg)

[Open the examples](https://b2renger.github.io/Aframe_8thwall_binary/) [Code](https://github.com/b2renger/Aframe_8thwall_binary)
`
  },
  {
    id: "Chromatika",
    year: "2026",
    title: `Chromatika `,
    category: "Creative Coding, Games",
    tags: ["web", "#vibecoding"],
    thumbnail: "assets/images/Chromatika_3.png",
    description: `A color mixer game for mobile where you have to mix colors to match the target color.`,
    content: `# Chromatika

  A color mixer game for mobile where you have to mix colors to match the target color. 
  
  You can import your own images or take a picture from your camera to generate a level.

  Everything is stored client side, so no data is collected, if refresh your cache the levels are gone, but you can save the png image of the level.

  Play it here : [Chromatika](https://b2renger.github.io/Chromatika/)

  ![Image](assets/images/Chromatika_1.png)
  ![Image](assets/images/Chromatika_2.png)
  ![Image](assets/images/Chromatika_3.png)
  ![Image](assets/images/Chromatika_4.png)
 
 
`
  },
  {
    id: "XR808",
    year: "2026",
    title: `XR808 `,
    category: "Creative Coding, Experiments, Audio",
    tags: ["web", "#vibecoding", "audio"],
    thumbnail: "assets/images/XR808_1.png",
    description: `A simple web drum machine that lets you sample sound from your microphone .`,
    content: `# XR808

  A simple drum machine based on the TR-808 drum computer, 
  - it lets you record sounds from your microphone and assign them to the different drum pads.
  - It also has several interesting subdivisions of the beat options.

  It was build as a live videcoding teaching session about web and audio instruments.

    
  [Live Demo](https://b2renger.github.io/step-sequenceur/) and [code](https://github.com/b2renger/step-sequenceur)

  ![Image](assets/images/XR808_1.png)
  ![Image](assets/images/XR808_2.png)
  ![Image](assets/images/XR808_3.png)


 
`
  },
  {
    id: "video2flipbook",
    year: "2025",
    title: `Video2FlipBook`,
    category: "Graphics, Creative Coding",
    tags: ["web", "#print", "#react", "#pdf"],
    thumbnail: "assets/images/video2flipbook_1.png",
    description: `Drop in a video, get print-ready PDF pages to cut and bind into a flipbook.`,
    content: `# Video2FlipBook

A small web app to turn a video into a printed flipbook: choose a video, set the number of frames, their size and the binding margin, and export PDF pages with cut marks, ready to print, cut and bind.

An interactive imposition plan shows the animated result and how the frames are laid out on each sheet.

![Video2FlipBook with frames extracted from a video](assets/images/video2flipbook_1.png)

![The imposition plan](assets/images/video2flipbook_2.png)

[Open the app](https://b2renger.github.io/Video2FlipBook/) [Code](https://github.com/b2renger/Video2FlipBook)
`
  },
  {
    id: "FluidSim",
    year: "2025",
    title: `FluidSim `,
    category: "Creative Coding, Experiments",
    tags: ["web", "#vibecoding"],
    thumbnail: "assets/images/fluidsim.png",
    description: `A fluid simulation for multi touch`,
    content: `# FluidSim

  A simple fluid simulation for multi touch based on this article : https://mofu-dev.com/en/blog/stable-fluids/
  
  [Live Demo](https://b2renger.github.io/Fluid-simulation/) and [code](https://github.com/b2renger/Fluid-simulation)

  <video width="720" controls>
  <source src="assets/videos/fluidsim.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
`
  },
  {
    id: "Harmonicizer",
    year: "2026",
    title: `Harmonicizer`,
    category: "Audio",
    tags: ["web", "#sound", "#waa", "#vibecoding"],
    thumbnail: "assets/images/harmonicizer.png",
    description: `A web based tool to create harmonic sequences. WIP`,
    content: `# Harmonicizer

  ![Image](assets/images/harmonicizer.png)
  
  A web based tool to create harmonic sequences. 
  
  You can compose and edit chords, create chord progressions, generate sound with the built in synths and export them as MIDI files.

  **This work is a Work In Progress.**

  [Live Demo](https://b2renger.github.io/Harmonicizer/)
  
  ![Image](assets/images/harmonicizer4.png)

  ![Image](assets/images/harmonicizer2.png)
  
  ![Image](assets/images/harmonicizer3.png)

 

  And the [code](https://github.com/b2renger/harmonicizer)
`
  },

  {
    id: "granul8",
    year: "2026",
    title: `Granul8`,
    category: "Audio",
    tags: ["web", "#sound", "#waa", "#vibecoding"],
    thumbnail: "assets/images/granul8.png",
    description: `A web based granular sampler with loop station ! WIP`,
    content: `# Granul8

  ![Image](assets/images/granul8.png)
  
  A granular sampler is a sampler that chops up audio into tiny pieces (grains) and plays them back in different ways. 
  It's a great way to create interesting textures and sounds.
  
  This one supports several tabs, a loop station to record traces of inputs and play them back, there are also options to randomize or organize the grains and make patterns.

  **This work is a Work In Progress.**

  [Live Demo](https://b2renger.github.io/granul8/)

  Here is a small peek.
  <video width="720" controls>
  <source src="assets/videos/granul8.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

  And the [code](https://github.com/b2renger/granul8)
`
  },
  {
    id: "motion-motion",
    year: "2022",
    title: `Motion motion : Ateliernum x Franck Lascombes`,
    category: "Installations",
    tags: ["installation", "#motion-design", "#arduino"],
    thumbnail: "assets/images/motionmotion1.png",
    description: `Collaboration with Franck Lascombes for motion motion festival`,
    content: `# Motion motion

  ![Image](assets/images/motionmotion1.png)

  We worked with Franck Lascombes on a motion design installation for the motion motion festival in 2022.

  We created a serie of modules inspired by [Franck's graphic animation work](https://www.instagram.com/franck_lascombes/)

  <video width="720" controls>
  <source src="assets/videos/motionmotion1.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
  <video width="720" controls>
  <source src="assets/videos/motionmotion2.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
  <video width="720" controls>
  <source src="assets/videos/motionmotion3.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
  <video width="720" controls>
  <source src="assets/videos/motionmotion4.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
`
  },
  {
    id: "irrational-duets",
    year: "2016",
    title: `Irrational Duets`,
    category: "Audio, Data Art",
    tags: ["web", "#p5js", "#waa"],
    thumbnail: "assets/images/irrational_duets2.png",
    description: `Making music with irrational numbers`,
    content: `# Irrational Duets

  Creating music with irrational numbers and mathematical sequences.
  
[Try it !](https://b2renger.github.io/p5js_irrational_duets/)

  ![Homescren image](assets/images/irrational_duets.png)
  ![in game image](assets/images/irrational_duets2.png)
   
[Code](https://github.com/b2renger/p5js_irrational_duets)

`
  },
  {
    id: "poolanoid",
    year: "2026",
    title: `Poolanoid`,
    category: "Games",
    tags: ["web", "#Threejs", "#cannonjs", "#waa", "#vibecoding"],
    thumbnail: "assets/images/poolanoid2.png",
    description: `A 3D pool-breakout hybrid game. Aim, shoot, and destroy all the walls using pool-style physics on a top-down table.`,
    content: `# Poolanoid
  ![Homescren image](assets/images/poolanoid.png)
    ![in game image](assets/images/poolanoid2.png)
   
A 3D pool-breakout hybrid game. Aim, shoot, and destroy all the walls using pool-style physics on a top-down table.

[Play now:](https://b2renger.github.io/Poolanoid/)

## Gameplay

- Drag on the ball to aim, release to shoot
- Clear all walls before running out of shots
- Break multiple walls in one shot to build combos and earn bonus shots
- Special walls have unique physics (extra-bounce, sticky, low-bounce) and power-ups (extra shot, bomb, multi-ball)
- Unused shots carry over to the next level

## Stack

- **Three.js** -- 3D rendering, post-processing (bloom)
- **cannon-es** -- Physics simulation
- **Web Audio API** -- Synthesized sound effects (no audio files)
- Vanilla JavaScript ES modules, no build step

[Code](https://github.com/b2renger/Poolanoid)

`
  },

  {
    id: "design-quizz",
    year: "2025",
    title: `Design Quizz`,
    category: "Games",
    tags: ["web", "#js", "#vibecoding"],
    thumbnail: "assets/images/design_quizz3.png",
    description: `A quizz about design an innovation !`,
    content: `# Design Quizz

As I mentionned I work in a design school : [l'école de design Nantes Atlantique](https://lecolededesign.com/fr/la-une/visite-des-ateliers-et-studios-numeriques-avec-berenger-recoules). We do have a bunch of classrooms named after famous designers and innovators.

I just wanted to try vibecoding ;) and created this quizz to share some knowledge with my students.
  

[Play now](https://b2renger.github.io/Design-Quiz/)

  ![Homescren image](assets/images/design_quizz.png)
  ![in game image](assets/images/design_quizz2.png)
  ![in game image](assets/images/design_quizz3.png)


   
[Code](https://github.com/b2renger/Design-Quiz)

`
  },
  {
    id: "droidparty-tutorials",
    year: "2015",
    title: `DroidParty tutorials`,
    category: "Teaching, Audio",
    tags: ["android", "#sound", "#pure-data", "#libpd", "#tutorial"],
    thumbnail: "assets/images/droidparty_tutorials4.png",
    description: `Droidparty is a free android app by Chris McCormick. It lets you load a Pure-Data patch on your android phone effortlessly. This project is a series of tutorials about droidparty, including an implementation of markov chains for musical improvisation.`,
    content: `# DroidParty Examples

<iframe width="720" height="350" src="https://www.youtube.com/embed/nvGCFdo7B0c" frameborder="0" allowfullscreen></iframe>

<video width="720" controls>
  <source src="assets/videos/VID_20150713_164328_1.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Droidparty is a free android app by Chris McCormick. It lets you load a Pure-Data patch on your android phone effort less : it reproduces the gui and gives you access to sensors and multi-touch among other features.

The app shown above is part of a series of tutorials about droidparty. It is the last one... what's fun about it is that it uses an implementation of markov chains. It enables the app to track your inputs on the piano keys and analyse the notes and rythmicity to be able to improvise with you.


![Image](assets/images/droidparty_tutorials1.png)
![Image](assets/images/droidparty_tutorials2.png)
![Image](assets/images/droidparty_tutorials3.png)


Tutorials are availables as readmes in this [github repository](https://github.com/b2renger/droidparty-tutorials)

[Droidparty main site](http://droidparty.net/)

[How to get started](https://forum.pdpatchrepo.info/topic/5496/running-your-patches-on-android-usind-pddroidparty-in-10-steps)

`
  },


  {
    id: "springs",
    year: "2025",
    title: `Springs`,
    category: "Audio",
    tags: ["web", "#sound", "#image", "#simulation", "p5js", "#waa"],
    thumbnail: "assets/images/springs-web2.png",
    description: `Spring is a simple bank of oscillators controlled by a spring simulation algorithms. It gives you control over the parameters of the simulation so you can explore the sonic possibilities of this physical modelled synth.`,
    content: `# Springs

Spring is a simple bank of oscillators controlled by a spring simulation algorithms. It gives you control over the parameters of the simulation so you can explore the sonic possibilities of this physical modelled synth.

I started working on this project in 2012 with a basic experiment and then an android app.
![image](assets/images/springs-web2.png)

I recoded it in 2025 with a web version. **[Check it out](https://b2renger.github.io/Springs-web/)**

Here is a video of the android app back from 2012

<iframe width="720" height="350" src="https://www.youtube.com/embed/tAQflOi_Gt0" frameborder="0" allowfullscreen></iframe>


If you don't have an android phone you can check out the web version.`
  },
  {
    id: "musicbox-3d",
    year: "2025",
    title: `Musicbox 3D`,
    category: "Audio",
    tags: ["web", "#image", "#sound", "#p5js", "#simulation", "#waa"],
    thumbnail: "assets/images/musicbox-web2.png",
    description: `This a simulation of music box : each time a cube executes a full revolution it emits a note.`,
    content: `
# Music Box 3D

![image](assets/images/musicbox-web2.png)

Recoded in 2025 with a web version. **[Check it out](https://b2renger.github.io/MusicbBox3D-web/)**

Here is a video of the android app back from 2013
<iframe width="720" height="350" src="https://www.youtube.com/embed/VOWR4pS67l0" frameborder="0" allowfullscreen></iframe>

This a simulation of music box : each time a cube executes a full revolution it emits a note.`
  },
  {
    id: "pendulum-phase",
    year: "2015",
    title: `Pendulum Phase`,
    category: "Audio",
    tags: ["android", "#sound", "#image", "#simulation", "#processing", "#pure-data", "#libpd"],
    thumbnail: "assets/images/pendulumphases.png",
    description: `An Android audio-visual synthesizer based on pendulum waves: random motion, beatings, travelling or standing waves at your fingertips.`,
    content: `# PendulumPhases

<iframe width="720" height="350" src="https://www.youtube.com/embed/E_nnjXkPYok" frameborder="0" allowfullscreen></iframe>

This app is an audio-visual synthetizer based on harmonic motion. It enables to explore a physical simulation of pendulum oscillations through random motion / beating / travelling waves or standing waves are at the tips of your finger.

Parameters of the simulation such as synchronisation or travelling speed are tweakable. Sound parameters will enable you to explore several harmonic mapping from consonant to most 'bizarre' ones.

It is sadly not available anymore - maybe I will recode it one day with web tech.
`
  },
  {
    id: "ppp",
    year: "2015",
    title: `PPP`,
    category: "Audio",
    tags: ["android", "#sound", "#pure-data", "#libpd"],
    thumbnail: "assets/images/PPP.png",
    description: `An Android framework to publish Pure Data apps that jam together on the same wifi network, synced by a MIDI clock.`,
    content: `# PPP

<iframe width="720" height="350" src="https://www.youtube.com/embed/XEymJGuHoMU" frameborder="0" allowfullscreen></iframe>

PPP is an android framework to publish Pure-Data based application with jamming features.

PPP uses a midi clock paradigm making it compatible with many other hardware or software gears. It basically synch all the midi apps running on the same wifi network.

Have a look at the [PPP website](http://ppp.mgsx.net)`
  },
  {
    id: "rainstick",
    year: "2016",
    title: `Rainstick`,
    category: "Audio",
    tags: ["android", "#sound", "#simulation", "#android", "#libgdx", "#pure-data", "#gdx-pd"],
    thumbnail: "assets/images/rainstick.png",
    description: `An Android audio/visual physics simulation of a rainstick, with procedural sound generated by Pure Data.`,
    content: `
# Rainstick

<iframe width="720" height="350" src="https://www.youtube.com/embed/dQfsuBqcNso?rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

Rainstick was an audio/visual physics simulation of a rainstick. 
Several simulations are available with different kind of physical parameters / geometries etc.

-- Sadly it is not available anymore --

All audio is generated procedurally with pure-data. 
The graphic and physics engine are based on libgdx.`
  },
  {
    id: "webpd-experiments",
    year: "2012",
    title: `Webpd experiments`,
    category: "Experiments",
    tags: ["web", "#sound", "#image", "#simulation", "#pure-data", "#processing"],
    thumbnail: "assets/images/snowflakes_web.png",
    description: `Old experiments from the start of WebPd, when p5js didn't exist yet.`,
    content: `
# WebPd Experiments

This repo contains some old experiments with processing.js at the start of webpd and when p5js didn't exist at the dawn of flash.
This is the beginning of my experiments with sound and you'll recognize some projects that growed out of these ideas.

Probably nothing works anymore ...
**[- but you can still check the code](https://github.com/b2renger/WebPd_processingJS_Experiments)**

Snow Night : just watch closely and listen...

![Image](assets/images/snowflakes_web.png)

Bouncing Sequencer : Click ! click and hold ! click and drag !

![Image](assets/images/bouncing_sequencer_web.png)

MusicBox3D : I wanted to do one as I saw this example on a old website. I later turned into and android application

![Image](assets/images/musicbox-web.png)

FM Culture : Click and drag then fiddle with the controls.

![Image](assets/images/FM_culture.png)
`
  },
  {
    id: "Organic-motions",
    year: "2026",
    title: `Organic motions`,
    category: "Creative Coding, Audio",
    tags: ["web", "#sound", "#image", "#p5*js", "#p5.sound", "#motion", "#simulation"],
    thumbnail: "assets/images/organic_motions.png",
    description: `A sonification of organic motions`,
    content: `
# Organic motions

![Image](assets/images/organic_motion_original.png)

![Image](assets/images/organic_motions.png)

Equations for organic motion is a [codepen.io sketch made by Justin Windle](https://codepen.io/soulwire/pen/ngbXVV).

I added sound to the mix. 

Since I discovered the original link hidden in the code of another project with the mention : this could be interesting here ... 

I always wondered what it sounds like. Recoded in 2026.

[Live](https://b2renger.github.io/p5js_sound_examples/organic_motion/)

[Code](https://github.com/b2renger/p5js_sound_examples)

`
  },
  {
    id: "p5js-sound-experiments",
    year: "2015",
    title: `P5js sound experiments`,
    category: "Experiments, Teaching",
    tags: ["web", "#sound", "#image", "#p5*js", "#p5.sound", "#motion", "#simulation"],
    thumbnail: "assets/images/flock.png",
    description: `This repo contains some experiments with p5.sound library for p5js`,
    content: `
# P5js Sound Experiments

This repo contains some experiments with p5.sound library for p5js. 

[Code](https://github.com/b2renger/p5js_sound_examples)


Flock sonification 

![Image](assets/images/flock.png)

A flocking algorithm describes the movements of a group of autonomous agents. Daniel Shiffman made a pretty neat implementation of it for processing and p5.js. So I used this base and built a sound engine on top of it using the p5.sound library : each boid becomes a tiny helicopter that you can hear when it's close enough.

[Live](https://b2renger.github.io/p5js_sound_examples/flock/)

Sid Lee Sonification

![Image](assets/images/sidlee_white.png)

![Image](assets/images/sidlee_black.png)

Sid Lee agency installed a bunch arduino based sensors in its parisian office. But they also build a server and an open api to get their data ! So here's a little experimentation with p5.js using their api and the p5.sound lib.

Sadly the project has ended and Sid Lee removed the sensors. The code stays here but it won't do much...

`
  },
  {
    id: "happy-birthday-codelab",
    year: "2016",
    title: `Happy Birthday codelab`,
    category: "Experiments, Data Art",
    tags: ["web", "#data-art", "#image", "#sound", "#p5*js", "#pure-data", "#ruby"],
    thumbnail: "assets/images/codelab_sonification.png",
    description: `This repo is about sonifying a twitter feed. It was created for the 2nd aniversary of the french creative coding forum codelab.`,
    content: `# Codelab Sonification

![Image](assets/images/codelab_sonification.png)

This repo is about sonifying a twitter feed. 

It was created for the 2nd aniversary of the french creative coding forum codelab. (meaning it has been 8 years old)

The visual is inspired by the forum skin. The data representation takes into account the last year. 
Each frame corresponds to an hour. 

**[check out the code and writing](https://github.com/b2renger/codelab-sonification/blob/master/README.md)**
`
  },
  {
    id: "rennes-soundscape",
    year: "2013",
    title: `Rennes2 Soundscape`,
    category: "Audio, Data Art",
    tags: ["web", "#webpd", "#processing.js"],
    thumbnail: "assets/images/electronik.png",
    description: `A sound postcard of the Rennes 2 campus for Electroni-k: an interactive map where you mix field recordings with effects.`,
    content: `# Rennes2 Soundscape

![Image](assets/images/electronik.png)

This project was made for Elektoni-k a french association based in Rennes. They asked me to do a sound postcard from the campus of Rennes 2. 

I chose to build a web app representing a map of the campus with sound attached to specific location. 
You can choose to activate the sound and mash them up with a bunch of effects to create new soundscapes.
Beware that the loading time for this page will probably be long as it load raw sounds.

[Live](https://b2renger.github.io/metropole_electronik/index.html)

[Code](https://github.com/b2renger/metropole_electronik)`
  },
  {
    id: "the-midst",
    year: "2013",
    title: `The midst ...`,
    category: "Games, Teaching, Experiments",
    tags: ["web", "#sound", "#image", "#simulation", "#pure-data", "#processing"],
    thumbnail: "assets/images/themidst.png",
    description: `The Midst is a project combining an art-game playable online and a teaching workshop to discover tools for creative coding on the web such as ProcessingJS and W...`,
    content: `# The Midst

![Image](assets/images/themidst.png)

The Midst is a project combining an art-game playable online and a teaching workshop to discover tools for creative coding on the web such as ProcessingJS and Webpd. 

As the whole game is based on pop-up windows opening : you should desactivate the pop-up blocker of your browser.

Synopsis : As it often happens to heroes of videos games : Hero's girlfriend has been abducted...This time it's a gang of white pixels that has accomplished the deed (the white meanies). As a consequence Hero must go through a midst of pop-ups windows to reach to his girl-friend.

[Live](https://b2renger.github.io/TheMidst/) - this is an old project, using an old version of ProcessingJS and Webpd, sadly some things are broken. The sound is not what it used to be and the last level is broken, but it is still kind of playable.

[code](https://github.com/b2renger/TheMidst)`
  },
  {
    id: "la-bibliotheque",
    year: "2017",
    title: `La_bibliothèque`,
    category: "Creative Coding, Data Art",
    tags: ["web", "#image", "#simulation", "#data-art", "#p5js", "#p5-sound"],
    thumbnail: "assets/images/labibliotheque_landscape.jpeg",
    description: `This project has been made possible through a collaboration with La_Bibliothèque : a french library / mediatheque. They gave me "carte blanche" to represent the...`,
    content: `
# La_Bibliothèque

This project has been made possible through a collaboration with La_Bibliothèque : a french library / mediatheque. 

They gave me "carte blanche" to represent the data linked to the documents people borrow over time. 

The result is a four-pannel dynamic data-visualisation. 

![Image](assets/images/labibliotheque_enluminures.jpeg )
[Enluminures](https://labibliotheque.github.io/CBN_2017/lb_enluminures-functions/index.html)

![Image](assets/images/labibliotheque_etoiles.jpeg )
[Etoiles](https://labibliotheque.github.io/CBN_2017/lb_etoiles_quotidiennes/index.html)

![Image](assets/images/labibliotheque_landscape.jpeg )
[Landscape](https://labibliotheque.github.io/CBN_2017/lb_landscape_audio/index.html)

![Image](assets/images/labibliotheque_geo.jpeg )
[geo](https://labibliotheque.github.io/CBN_2017/lb_geopacking/)

A fun part of the project is the backend. I didn't want to write code for a server or a database but I still wanted the folks at La_Bibliothèque to be able to push new data to the visualisations. So I did just that by writing a backend page enabling users with the credentials to push data to the repo via the github api. And it works pretty well !

[Code](https://github.com/labibliotheque/CBN_2017)`
  },
  {
    id: "blends-and-shaders",
    year: "2014",
    title: `Blends and shaders`,
    category: "Experiments",
    tags: ["desktop", "#image", "#processing", "#shader"],
    thumbnail: "assets/images/blends.png",
    description: `A Processing framework to blend anything with anything, with all the blending done in a shader.`,
    content: `
# Blends and Shaders

<iframe width="720" height="350" src="https://www.youtube.com/embed/yCrr04azBu8" frameborder="0" allowfullscreen></iframe>

This repo hosts the code for my framework to experiment with blend modes and shaders in Processing. 

The main goal is to be able to blend anything with anything so you've got a basic blending mechanism (blend a "top layer" with a "low layer" made of a PGraphics object) and then you have a bunch of functions to write several things in those two PGraphics objects. 

All the blending happens with a shader  so it's really fast !

[Code](https://github.com/b2renger/Processing_Blends_Shaders)`
  },
  {
    id: "li-il",
    year: "2015",
    title: `Li-iL`,
    category: "Installations",
    tags: ["desktop", "#image", "#simulation", "#data-art", "#mapping", "#installation", "#processing", "#ruby"],
    thumbnail: "assets/images/Liil.png",
    description: `This installation was build for the 10th anniversary of the "pole image et réseaux" in the Lieu Unique at Nantes.`,
    content: `
# LiiL

<iframe width="560" height="315" src="https://www.youtube.com/embed/pNmLR7zf0QM?si=u4D7saVcpV35Gnl3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This installation was build for the 10th anniversary of the "pole image et réseaux" in the Lieu Unique at Nantes. 

It is a projection mapping on tulle fabric representing the evolution of image & réseaux twitter feed since its creation through several animations which also allowed real-time interaction.

![Image](assets/images/Liil.png)


![Image](assets/images/Liil2.png)


![Image](assets/images/Liil3.png)


`
  },
  {
    id: "open-house",
    year: "2010",
    title: `Open House`,
    category: "Installations",
    tags: ["#sound", "#data-art", "#installation", "#pure-data"],
    thumbnail: "assets/images/openhouse.png",
    description: `A sound installation turning the activity inside an art gallery, a workplace and a house into soundscapes broadcast in the street.`,
    content: `
# Open House

<iframe src="https://player.vimeo.com/video/13211298" width="720" height="350" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<iframe src="https://player.vimeo.com/video/27971456" width="720" height="350" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

This installation was created as the result of an invitation by Jacques Rivet and Marie-Laure Viale from the french association Entre-Deux (artpublic.entredeux.free.fr/) based in Nantes.

The main idea was to illustrate three dimensions of the place which is an art-gallery a workplace and a house. 

Impacts on the floor were recorded with piezo sensors and a few mics were placed to capture actions. 

The recordings were treated as real-time data to create a soundscapes / melodies / rythms to be broadcast in the street as echoes of the activities inside.

This installation is inspired by [Nightingale floors](https://en.wikipedia.org/wiki/Nightingale_floor). `

  },
  {
    id: "neurokiff",
    year: "2013",
    title: `Neurokiff`,
    category: "Data Art",
    tags: ["desktop", "#image", "#data-art", "#simulation", "#processing"],
    thumbnail: "assets/images/neurokiff.png",
    description: `Exploratory visualisations of EEG signals recorded while people listened to a music playlist.`,
    content: `

# Neurokiff

![Image](assets/images/neurokiff.png)

This project is about explorative visualisation of EEG signals from a set of subjects were recorded while they were listenning to a playlist of music. The recording were made using emotiv headset and custom software was build for the data-mining. Subjects also had to fill in a form about their musical test

The first program was built to compare your proximity to each individual regarding the whole community. Filters can be used to compare several kind of data.

<iframe src="https://www.youtube.com/embed/Vs0JMK8WyLE" width="720" height="350" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

This second program was built to compare two sets of recordings. It shows the whole recording with delimiters to identify which song was played and wether the subject liked it or not. Filters can be used to compare several kind of data.

<iframe src="https://www.youtube.com/embed/EuHyf7Lr5TI" width="720" height="350" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

This third representation is field-force map. It uses all the data collected and is suppose to help you find people that are closer to you in terms of eeg signals and music preferences.

<iframe src="https://www.youtube.com/embed/u-K1OxcWYQo" width="720" height="350" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`
  },

  {
    id: "chronophotography",
    year: "2020",
    title: `Chronophotography`,
    category: "Creative Coding, Experiments",
    tags: ["desktop", "#video", "#shaders", "#processing"],
    thumbnail: "assets/images/chronophoto.gif",
    description: `A small Processing app turning a video into chronophotographs: feed it a video, play with the parameters, save the result.`,
    content: `

# Chronophotography
![Image](assets/images/chronophoto.gif)

This repo holds the code for a small chronophotography app made with processing. Feed it a video and play with the parameters and finally save the results.

The app is based on contributed libraries : you'll need to have ffmpeg installed. More info about requirements in the repo !

**[Check out the code](https://github.com/b2renger/processing_chronophotographie )**`
  },
  {
    id: "openprocessing-reinetiere",
    year: "2013",
    title: `Openprocessing - Reinetiere`,
    category: "Teaching, Installations",
    tags: ["web", "#image", "#openprocessing", "#processing"],
    thumbnail: "assets/images/reinetiere2.png",
    description: `This is a page of a one year project made with kids from 11 to 16 at the collège La Reinetière. We worked with openprocessing 1h per week and in the end we show...`,
    content: `# OpenProcessing - La Reinetiere

![Image](assets/images/reinetiere2.png)

This is a page of a one year project made with kids from 11 to 16 at the collège La Reinetière. 
We worked with openprocessing 1h per week and in the end we showed an interactive mosaic made of all the programms

  [Open processing classroom](https://openprocessing.org/class/4441#/)

  [Final project](https://openprocessing.org/sketch/200456)
`
  },
  {
    id: "p5js-typographic-experiments",
    year: "2016",
    title: `P5js typographic experiments`,
    category: "Creative Coding, Experiments, Teaching, Graphics",
    tags: ["web", "#image", "#simulation", "#p5*js", "#typography"],
    thumbnail: "assets/images/typo_3d.png",
    description: `Typographic experiments with p5js and Rune.js, with explanations and the base code for each one.`,
    content: `# P5js typographic experiments

This repo contains some typographic experiments with p5js and Rune.js, before paths were available in p5js.
It features some explanations and the base code for each experiment.

**[Check out the code](https://github.com/b2renger/p5js_typo)**

![Image](assets/images/typo_3d.png)

![Image](assets/images/typo_spot_lights.png)

![Image](assets/images/typo_particles.png)

![Image](assets/images/typo_particle_lines.png)

![Image](assets/images/typo_tentacles.png)

![Image](assets/images/typo_scribble.png)`
  },
  {
    id: "chromateque",
    year: "2017",
    title: `Chromateque`,
    category: "Games",
    tags: ["web", "#colors", "#game", "#p5*js"],
    thumbnail: "assets/images/Chromateque1.png",
    description: `This repo contains the code for "Chromateque" game. You are given a grid of similars colors and should find the matching color to a reference tile. Go fast and ...`,
    content: `

# Chromateque
![Image](assets/images/Chromateque1.png)

You are given a grid of similars colors and should find the matching color to a reference tile.

Go fast and earn points but if you make mistakes the further you are from the right shade the more points you loose. 

Good luck !

[Play the game](https://b2renger.github.io/chromateque/)

[Check out the code](https://github.com/b2renger/chromateque )

![Image](assets/images/Chromateque2.png)
![Image](assets/images/Chromateque3.png)
`
  },
  {
    id: "weekly-challenge",
    year: "2018",
    title: `Weekly Challenge`,
    category: "Creative Coding, Experiments, IA",
    tags: ["web", "#p5*js"],
    thumbnail: "assets/images/WTC1.gif",
    description: `Some students created a weekly theme challenge based on artistic creations. I used code and p5js.`,
    content: `# Weekly Theme Challenge

Students created a weekly theme challenge based on artistic creations. I used code and p5js.
There is a early live style transfer using OG machine learning in the mix ;)

**[Check out the code and live examples](https://github.com/b2renger/weekly-theme-challenge )**

## Generative cactii
![Image](assets/images/WTC1.gif)
## Generative sea
![Image](assets/images/WTC2.gif)
## Samourai Style transfer
![Image](assets/images/WTC3.gif)`

  },
  {
    id: "super-x16-resolution",
    year: "2019",
    title: `Super x16 resolution`,
    category: "Experiments, IA",
    tags: ["#runwayml", "#image", "#machine-learning"],
    thumbnail: "assets/images/Supersupersuperresolution1.png",
    description: `Playing with machine learningand trying to find some artistic value in super resolution algo.`,
    content: `# Super Super Super Super Resolution

Playing with runwayml (before the big company, there was a version to launch and connect several ml tools together) and trying to find some artistic value in super resolution algo.

Images were broken down to 16x16px and upscaled to 4K letting the ml algo guess the missing pixels, hallucinating textures, forms and colors.

  [Check out the dedicated page](https://b2renger.github.io/Runway-experiment-SuperSuperSuperSuperResolution/#modal)

![Image](assets/images/Supersupersuperresolution1.png)
![Image](assets/images/Supersupersuperresolution3.png)
![Image](assets/images/Supersupersuperresolution2.png)
![Image](assets/images/Supersupersuperresolution4.png)`
  },
  {
    id: "pi",
    year: "2019",
    title: `PI`,
    category: "Creative Coding, Data Art",
    tags: ["web", "#p5*js", "#dataviz"],
    thumbnail: "assets/images/PI1.png",
    description: `This is a visualisation of Pi.Decimals are layed out in a grid and if two digits that are next to each other they are joint together.The colors follow a graph...`,
    content: `
# PI by Pascaline

This is a visualisation of Pi.Decimals are layed out in a grid and if two digits that are next to each other they are joint together. 
The colors follow a grapheme - color synesthesic rule. Code by Pascaline Chevrel.

[Live Demo](https://b2renger.github.io/pi-by-pascaline/)

![Image](assets/images/PI1.png)
![Image](assets/images/PI2.png)

[Check out the code](https://github.com/b2renger/pi-by-pascaline )`
  },
  {
    id: "patterns",
    year: "2016",
    title: `Patterns`,
    category: "Creative Coding, Graphics",
    tags: ["web", "#image", "#patterns", "#p5*js"],
    thumbnail: "assets/images/patterns1.png",
    description: `Graphic pattern experiments with p5js, with explanations and live interactive examples.`,
    content: `
# P5js patterns fun

This repo contains some graphic pattern experiments with p5js with explanations and live interactive examples. 

[Check out the code and live interactive examples](https://github.com/b2renger/p5js_patterns)

![Image](assets/images/patterns1.png)
![Image](assets/images/patterns2.png)
![Image](assets/images/patterns3.png)
![Image](assets/images/patterns4.png)
![Image](assets/images/patterns5.png)
![Image](assets/images/patterns6.png)`
  },
  {
    id: "shaders",
    year: "2019",
    title: `Shaders`,
    category: "Experiments, Graphics",
    tags: ["web", "#image", "#simulation", "#p5*js", "#shaders"],
    thumbnail: "assets/images/shader1.gif",
    description: `This repo contains some shader experiments with p5js.`,
    content: `
# P5js shader experiments

This repo contains some graphic shader experiments with p5js. 

**[Code and interactive examples](https://github.com/b2renger/p5js-shaders )**

![Image](assets/images/shader2.gif)
![Image](assets/images/shader1.gif)

`
  },
  {
    id: "pixel-spirit",
    year: "2020",
    title: `Pixel Spirit`,
    category: "Creative Coding, Graphics",
    tags: ["web", "#image", "#p5*js", "#shaders", "motion-design"],
    thumbnail: "assets/images/psd1.gif",
    description: `This repo contains a recode of the pixel spirit deck for p5js with animated cards`,
    content: `
# P5js Pixel Spirit Deck recode

This repo contains a recode of the pixel spirit deck for p5js adding motion animation to each cards

**[Code and live examples](https://github.com/b2renger/p5js_pixel-spirit-deck_shaders )**

![Image](assets/images/psd1.gif)
![Image](assets/images/psd2.gif)
![Image](assets/images/psd3.gif)
![Image](assets/images/psd4.gif)
![Image](assets/images/psd5.gif)
![Image](assets/images/psd6.gif)
`

  },

  // ---- From the old WordPress blog (berengerrecoules.wordpress.com) ----
  {
    id: "website-2015",
    year: "2015",
    title: `b2renger.github.io (2015 edition)`,
    category: "Creative Coding",
    tags: ["web", "#p5js", "#markdown"],
    thumbnail: "assets/images/thiswebsite6.png",
    description: `The first version of this site: articles mapped as a kind of "algae" drawn with p5.js; hovering a node parsed the article's markdown into the page.`,
    content: `# b2renger.github.io : 2015 edition

![The 2015 version of this website](assets/images/thiswebsite6.png)

A new site to publish code and experiment with [p5.js](https://p5js.org). The page was split in two: on the left, a map of the articles drawn as a kind of "algae"; when you hovered a node, the article, written in markdown, was parsed and its HTML built on the right.

It gathered the course material I use to teach Processing and Pure Data, and many web and Android projects and experiments, with all their code on GitHub, mostly under a Creative Commons license.

The node map is available as a standalone example: [p5js_algae_dom](https://github.com/b2renger/p5js_algae_dom).
`
  },
  {
    id: "fresque-numerique",
    year: "2014",
    title: `Fresque numérique`,
    category: "Installations",
    tags: ["performance", "#projection-mapping", "#processing", "#pure-data"],
    thumbnail: "assets/images/fresque_numerique_1.jpg",
    description: `A projection-mapping performance with Mickaël La Fontaine, here on the castle of Blain.`,
    content: `# Fresque numérique

A projection-mapping performance made in collaboration with Mickaël La Fontaine, a digital artist specialised in projection mapping and video.

<iframe width="720" height="405" src="https://www.youtube.com/embed/ZF8gi1Ue5z4" title="Blain : le château fort en numérique" frameborder="0" allowfullscreen></iframe>

More of Mickaël's work on [Vimeo](https://vimeo.com/mickaellafontaine/videos).
`
  },
  {
    id: "processing-sketches-2014",
    year: "2014",
    title: `Processing sketches 2014`,
    category: "Creative Coding, Graphics",
    tags: ["desktop", "#processing", "#generative", "#noise"],
    thumbnail: "assets/images/sketches_2014_noisy_1.png",
    description: `Generative visuals made with Processing (Noisy Works, Snowflakes, Grid, Plante, Spirales, typography) with their source code.`,
    content: `# Processing sketches 2014

A series of generative visuals made with Processing, published with their source code. In most sketches a key press saves the current frame.

## Noisy Works

Experiments with Perlin noise and polar coordinates: click to generate a new seed. The logo at the top of this site is one of them. You'll need to add your own fonts to run the sketch.

![Noisy Works #1](assets/images/sketches_2014_noisy_1.png)
![Noisy Works #2](assets/images/sketches_2014_noisy_2.png)
![Noisy Works #3](assets/images/sketches_2014_noisy_3.png)
![Noisy Works #4](assets/images/sketches_2014_noisy_4.png)

<details>
<summary>Processing code</summary>

\`\`\`java
float edgeX, edgeY;
float radius =325;
float noiseF;
int startTime ;

PFont title, seed, time;
void setup() {
  size(700, 700);

  smooth();

  colorMode(HSB, 255, 100, 100, 100);
  //textMode(CENTER);

  title = createFont("Candara-Bold-16.vlw", 18);
  seed = createFont("Consolas-16.vlw", 12);
  time = createFont("Corbel-16.vlw", 12);
  textAlign(CENTER, CENTER);
  //textFont(seed);
  generate();
}

void draw() {
  if (mousePressed) {
    startTime = millis();
    noiseF = random(5000);
    println("noiseSeed : " + noiseF);
    generate();
  }
}

void generate() {
  background(255);
  translate(width/2, height/2);
  for (int j = 0 ; j < 320 ; j ++ ) {
    stroke(0, 255);
    noFill();
    beginShape();
    for (float i = 0 ; i <= TWO_PI + PI/24 ; i += PI/24) {
      randomSeed(floor(i*100*noiseF));
      edgeX = (radius-j + map(noise(noiseF, i, 20), 0, 1, -150, 150)) * cos (i);
      edgeY = (radius-j + map(noise(noiseF, 25, i), 0, 1, -150, 150)) * sin (i);
      curveVertex(edgeX, edgeY);
      noiseF += 0.00005;
    }
    endShape(CLOSE);
  }
  noStroke();
  fill(0, 210);
  ellipse(0/2, 0/2, 190, 190);
  fill(map(noiseF, 0, 5000, 0, 255), 100, 100);
  ellipse(0/2, 0/2, 170, 170);
  fill(255);
  ellipse(0/2, 0/2, 8, 8);
  fill(255, 0, 100);
  String s ="-- Noisy Works --";
  String s1 = " seed :"+noiseF;
  int endTime = millis();
  int gentime = endTime - startTime;
  println(gentime);
  textFont(title);
  text(s, 0, -35);
  textFont(seed);
  text(s1, 0, 15);
  textFont(seed);
  String s2 = " gen. time : 0."+gentime+" s";
  text(s2, 0, 30);
}
void keyPressed() {
  if (key == 's' || key == 'S') {
    saveFrame("lps-"+year()+"-"+month()+"-"+day()+"-"+hour()+"h"+minute()+"m"+second()+"s.png");
  }
}
\`\`\`

</details>

## Snowflakes

Based on an [L-system](https://en.wikipedia.org/wiki/L-system) implementation. Press the right arrow to generate a new snowflake, any other key saves the image.

![Snowflake](assets/images/sketches_2014_snowflakes_2.png)
![Snowflake](assets/images/sketches_2014_snowflakes_4.png)
![Snowflake](assets/images/sketches_2014_snowflakes_3.png)
![Snowflake](assets/images/sketches_2014_snowflakes_5.png)
![A grid of snowflakes](assets/images/sketches_2014_snowflakes_7.png)
![A grid of snowflakes](assets/images/sketches_2014_snowflakes_8.png)

<details>
<summary>Processing code</summary>

\`\`\`java
int maxLevel =10;
int numChildren =1;
float angle = PI/4;

Branch trunk;

void keyPressed() {
  if (key == CODED && keyCode == RIGHT) {
    maxLevel = int(random(5, 25));
    angle = PI/(int(random(1, 15))*2);
    newTree();
    trunk.siz = random(50, 500);
  } else {
    saveFrame("snowFlake-######.png");
  }
}

void setup() {
  size(1280, 766);
  noFill();
  smooth();
  newTree();
  background(0);
  stroke(255);
}

void newTree() {
  pushMatrix();
  translate(width/2, height/2);
  trunk = new Branch(1, 0, 0, 0);
  trunk.drawMe();
  popMatrix();
}

void draw() {
  noStroke();
  fill(0, 150);
  rect(0, 0, width, height);
  //background(0);

  stroke(255);
  pushMatrix();
  translate(width/2, height/2);
  trunk.updateMe(0, 0);
  trunk.drawMe();
  popMatrix();
}

class Branch {
  float level, index;
  float x, y;
  float endx, endy;
  float noiseF2;

  float siz =100;

  Branch[] children = new Branch[0]; //

  Branch (float lev, float ind, float ex, float wy) {
    level =lev;
    index =ind;
    updateMe(ex, wy);

    if (level<maxLevel) { // avoid infinite loop
      children = new Branch[numChildren];
      for (int i = 0; i<numChildren;i++) {
        children[i] = new Branch(level+1, i, endx, endy);
      }
    }
  }

  void updateMe(float ex, float wy) {
    x =ex;
    y =wy;

    float newsiz =map (maxLevel-level, 0, maxLevel, 1, siz);
    endx = x;
    endy = y-newsiz/3;
    //siz -=10;

    for (int i =0; i<children.length; i++) {
      children[i].updateMe(endx, endy);
    }
  }

  void drawMe() {
    //siz-=1;
    float newsiz =map (maxLevel-level+1, 0, maxLevel, 2, siz);
    for (float i = 0 ; i < TWO_PI ; i+=angle) {
      rotate(i);
      strokeWeight(map(maxLevel-level+1, 0, maxLevel, 0.005, 0.5));
      pushMatrix();
      beginShape();
      vertex(x-newsiz, y);
      vertex(x, y+newsiz*2/3);
      vertex(x+newsiz, y);
      vertex(x, y+newsiz*1/3);
      vertex(x-newsiz, y);
      endShape();
      popMatrix();
    }

    for (int i = 0 ; i<children.length;i++) {
      //children[i].updateMe();
      children[i].drawMe();
    }
  }
}
\`\`\`

</details>

## Grid #1

Rounded squares breathing between circles and stars; click to change the seed.

![Grid #1](assets/images/sketches_2014_grid_1.png)
![Grid #1](assets/images/sketches_2014_grid_2.png)
![Grid #1](assets/images/sketches_2014_grid_3.png)
![Grid #1](assets/images/sketches_2014_grid_4.png)

<details>
<summary>Processing code</summary>

\`\`\`java
int size = 80;

float seed;

float rect_round ;

float steps;

color [] colors = {
  #F5E0A7, #CFA678, #BBD7AF, #56AA9B, #026376
};
//color [] colors = { #92EDF0, #12223D, #DE1818, #040505};

void setup() {
  size(800, 600, P2D);
  smooth();

  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 255);
  noStroke();

  frameRate(30);
}

void draw() {

  steps+=0.035;
  background(0, 0, 100);
  randomSeed(floor(seed));

  for (int i = size/2 ; i < 1200 ; i+=size*39/50) {
    for (int j = size/2 ; j < 600 ; j+=size*36/50) {

      float p = random(100);
      for (int k = 1 ; k <= colors.length ; k++) {
        if (p< k*100/colors.length && p>(k-1)*100/colors.length) {
          fill(colors[k-1], 100);
        }
      }

      rect_round = map(sin(steps), -1, 1, -145, 40);
      pushMatrix();
      translate(i, j);
      rotate(PI/4);
      rect(0, 0, size, size, rect_round);
      popMatrix();
    }
  }

  // saveFrame("/frames/70s-####.tiff");
}
void mousePressed() {
  seed = floor(random(5000));
  println("seed : " +seed);
}

void keyPressed() {
  if (key == 's' || key == 'S') {
    saveFrame("70s-"+year()+"-"+month()+"-"+day()+"-"+hour()+"h"+minute()+"m"+second()+"s.png");
  }
}
\`\`\`

</details>

## Plante #1

Circles drifting upwards on noise, shrinking as they grow into a plant. Press U to pause the growth.

![Plante #1](assets/images/sketches_2014_plante_1.jpg)
![Plante #1](assets/images/sketches_2014_plante_2.jpg)

<details>
<summary>Processing code</summary>

\`\`\`java
color [] colors = {
  #C5E0DC, #DAF5F0, #F9E9CC, #FAF6D6,#FFD0C1
};

Circles[] cir = new Circles [5];
boolean update = true;
void setup() {
  size(800, 600);
  background(0);
  frameRate(60);
  ellipseMode(CENTER);
  noStroke();
  //strokeWeight(0.5);
  smooth();

  //stroke(0, 180);
  // colorMode(HSB, 360, 100, 100);

  for (int i = 0 ; i < cir.length ; i++) {
    int size = int(random(25, 50));
    cir[i] = new Circles (colors[0], width/2, height, size);
  }
}

void draw() {

  for (int i = 0 ; i < cir.length ; i++) {

    cir[i].update();
    cir[i].draw();

    if (frameCount%20==0 && update) {

      if (cir[i].circle_size == 1 ) {
        int size = int(random(25, 125));
        cir[i] = new Circles (colors[0], width/2,random(height-50,height), size);
      }
    }
  }
}

void keyReleased(){
  if (key == 'u' || key =='U'){
    update = !update;
  }

  if (key == 's' || key =='S'){
    saveFrame("/images/bigorneaux-####.jpg");
  }
}
class Circles {

  int circle_size = 1200;
  color c;

  float xpos, ypos;

  float noiseF;

  int steps = 0;
  int max_step=5;

  Circles(color c, float xpos, float ypos, int circle_size) {
    this.c = c;
    this.xpos = xpos;
    this.ypos = ypos;
    // circle_size = int( random(50, 250));
    noiseF = random(500);
    this.circle_size = circle_size;
    max_step =int(random(2,10));
    //steps = int(random(15));
  }

  void update() {
    if (circle_size > 1) {
      circle_size--;
    }

    noiseF += 0.005;
    xpos += map(noise(noiseF, ypos/100, 25), 0, 1, -8,8);
    ypos += map(noise(noiseF, xpos/100, 56), 0, 1, -6, 0);

    steps +=1;
    //noStroke();
    if (steps == max_step) {
      int index = int(random(colors.length));
      c = colors[index];
      steps = 0;
      max_step =int(random(2,15));
      // stroke(0.15);
    }
  }

  void draw() {
    fill(c);
    ellipse(xpos, ypos, circle_size, circle_size);
  }

  void setColor (color c) {
    this.c =c;
  }
}
\`\`\`

</details>

## Spirales

![Spirales](assets/images/sketches_2014_spirales_1.png)
![Spirales](assets/images/sketches_2014_spirales_2.png)
![Spirales](assets/images/sketches_2014_spirales_3.png)

<details>
<summary>Processing code</summary>

\`\`\`java
float r=0;
float rand=0;

void setup(){
  size(1680,945);
  background(0);
  smooth();
  noStroke();

}

void draw(){

  translate(250,150);
  rand= random(100);

  if (rand<35){
    fill(200,random(40,80));
  } else {

    fill(255,random(90,150));
  }

  rotate(r);
  float circle_size = random(17,25);
  ellipse(r+0.1,10,circle_size, circle_size);
  r = r+0.021;

}

void keyPressed(){
  save("####.png");
  println("Image sauvegardée");
}
\`\`\`

</details>

## Typography

Generative typography made with Processing and [Geomerative](https://github.com/rikrd/geomerative); part of the code is in the [Journées du code créatif](#project/journees-code-creatif) workshop repository, [stereolux/Workshops-JCC2-](https://github.com/stereolux/Workshops-JCC2-).

![Generative typography: Processing](assets/images/sketches_2014_typo_1.png)
![Generative typography: Code créatif](assets/images/sketches_2014_typo_2.jpg)
![Generative typography: particles](assets/images/sketches_2014_typo_3.png)
![Generative typography: Code créatif](assets/images/sketches_2014_typo_4.png)

![Generative typography: Bigorneaux](assets/images/sketches_2014_typo_5.jpg)
`
  },
  {
    id: "journees-code-creatif",
    year: "2012",
    title: `Journées du code créatif`,
    category: "Teaching",
    tags: ["event", "#stereolux", "#pure-data", "#processing"],
    thumbnail: "assets/images/sketches_2014_typo_1.png",
    description: `Two days of talks, performances and workshops I designed and programmed with Stereolux: Pure Data in 2012 (with Miller Puckette), Processing in 2014.`,
    content: `# Journées du code créatif

I took part in designing the format, the artistic and educational programme and the organisation of the *Journées du code créatif* (creative coding days) at Stereolux, Nantes: two days of talks, performances, screenings and workshops, ending with a codelab get-together with all the participants.

## 2012 : Pure Data

The first edition was dedicated to [Pure Data](https://puredata.info). The guests included Miller Puckette, Andy Farnell, Katja Vetter and IOhannes Zmölnig.

## 2014 : Processing

The second edition was dedicated to [Processing](https://processing.org). The workshops' material is on GitHub: [stereolux/Workshops-JCC2-](https://github.com/stereolux/Workshops-JCC2-).

![Generative typography: Processing](assets/images/sketches_2014_typo_1.png)
![Generative typography: Code créatif](assets/images/sketches_2014_typo_2.jpg)

[Programme (Slideshare)](https://fr.slideshare.net/stereolux/processing-depliant-web) [Processing sketches 2014](#project/processing-sketches-2014)
`
  },
  {
    id: "dmims-2012",
    year: "2012",
    title: `Designing Musical Interaction for Mobile Systems`,
    category: "Audio, Experiments",
    tags: ["ios", "#pure-data", "#network", "#research"],
    thumbnail: "assets/images/dmims_4.jpg",
    description: `A paper and demos on collaborative music making with networked smartphones, at the DIS 2012 conference in Newcastle.`,
    content: `# Designing Musical Interaction for Mobile Systems

I took part in *Designing Musical Interaction for Mobile Systems*, a workshop of the international conference DIS 2012 (Designing Interactive Systems, Newcastle). I presented a paper on networked music with smartphones and demonstrated iPhone prototypes, following a residency at Stereolux on a mobile application.

[Paper : Collaborative Music Creation Using Smartphones (PDF)](https://berengerrecoules.wordpress.com/wp-content/uploads/2013/05/collaborative_music_creation_using_smartphones_2012-cr.pdf) [Slides (PDF)](https://berengerrecoules.wordpress.com/wp-content/uploads/2013/05/dmims-talk.pdf)

![The talk](assets/images/dmims_4.jpg)
![Demonstrating the prototypes](assets/images/dmims_1.jpg)
![Workshop session](assets/images/dmims_2.jpg)
![Workshop session](assets/images/dmims_3.jpg)
![Newcastle](assets/images/dmims_5.jpg)
![DIS 2012 badge](assets/images/dmims_6.jpg)
`
  },
  {
    id: "interfaces-neuronales",
    year: "2012",
    title: `Journées Interfaces neuronales`,
    category: "Data Art, Teaching",
    tags: ["event", "#eeg", "#emotiv", "#processing", "#pure-data"],
    thumbnail: "assets/images/interfaces_neuronales_1.jpg",
    description: `Two days about brain-computer interfaces at Stereolux: real-time brainwave visualisations, an Emotiv workshop and an EEG-controlled drawing app.`,
    content: `# Journées Interfaces neuronales

*Interfaces neuronales : 2 jours dans le vif du cerveau* ("two days in the thick of the brain") at Stereolux, Nantes. I took part in the programming and organisation of the event, and:

- created animated visualisations of brainwaves, projected in real time during the talks;
- led a one-day workshop on the Emotiv headset and its use with Processing and Pure Data;
- presented a drawing application controlled by an Emotiv headset.

![Real-time brainwave visualisation](assets/images/interfaces_neuronales_1.jpg)

![Brainwave visualisation](assets/images/interfaces_neuronales_7.jpg)
![Brainwave visualisation](assets/images/interfaces_neuronales_8.jpg)
![Drawing with an EEG headset](assets/images/interfaces_neuronales_2.png)
![Drawing with an EEG headset](assets/images/interfaces_neuronales_3.png)
![Brainwave timeline](assets/images/interfaces_neuronales_5.png)
![Brainwave timeline](assets/images/interfaces_neuronales_6.png)

See also [Neurokiff](#project/neurokiff), visualisations of EEG recordings made while listening to music.
`
  },
  {
    id: "pure-data-smartphones",
    year: "2011",
    title: `Pure Data on smartphones`,
    category: "Audio, Teaching",
    tags: ["android", "ios", "#pure-data", "#libpd", "#droidparty"],
    thumbnail: "assets/images/pure_data_smartphones_2.png",
    description: `A monthly series of tutorials (2011) and a full documentation (2013) on making collaborative music apps for smartphones with Pure Data, with Stereolux.`,
    content: `# Pure Data on smartphones

From July to December 2011, with the support of Stereolux, I published a monthly article on using Pure Data on mobile platforms: how to build "performance" tools with our smartphones, so that several people can play together. The project relied on [libpd](https://github.com/libpd/libpd) and DroidParty, which had just made it possible to use Pure Data as a programming tool in almost any project, on almost any platform.

![The series on the Scopitone website](assets/images/pure_data_smartphones_1.jpg)

In 2013 it grew into a complete documentation with detailed tutorials for iOS and Android.

[Documentation in English (PDF)](https://berengerrecoules.wordpress.com/wp-content/uploads/2013/06/stereolux-applicationsmobiles-eng.pdf) [Documentation en français (PDF)](https://berengerrecoules.wordpress.com/wp-content/uploads/2013/06/stereolux-applicationsmobiles.pdf)

![A step sequencer patch](assets/images/pure_data_smartphones_2.png)
![A pad controller patch](assets/images/pure_data_smartphones_3.png)
![An app running on a phone](assets/images/pure_data_smartphones_4.png)
![An app running on a phone](assets/images/pure_data_smartphones_5.png)

The patches and examples are archived on [Google Code](https://code.google.com/archive/p/some-pure-data-projects). See also the later [DroidParty tutorials](#project/droidparty-tutorials).
`
  },
  {
    id: "bd-sonore",
    year: "2011",
    title: `BD Sonore`,
    category: "Teaching, Audio",
    tags: ["workshop", "#comics", "#sound-design", "#audacity"],
    thumbnail: "assets/images/bd_sonore_1.jpg",
    description: `Sound comics written, drawn and sound-designed by a 6th-grade class of collège Auguste Mailloux, with the association l'Olympic.`,
    content: `# BD Sonore

*Association l'Olympic, collège Auguste Mailloux (Loire-Atlantique)*

*BD sonore* (sound comics) brought a class of pupils from a school marked by economic hardship and cultural isolation into a collective project, through workshops of graphic and sound creation, collaborative writing and scenography. Pupils were involved in every step, creating their own pieces with today's multimedia tools and stories close to their everyday world. The project ended with a CD and an illustrated booklet.

Five stories came out of it:

- ***David***: David is a DJ; coming home from work one night in Marseille, he gets kidnapped…
- ***La guerre des clans***: when Mr Ver's neighbours throw a party, it's a declaration of war…
- ***Lola et son rêve mystérieux***: on her way to the supermarket, Lola meets her "friend" Benoît the robot…
- ***La racaille des bacs à sable***: Railey, a hip-hop dancer, sets off on a shady trip before a competition…
- ***Steph Cop***: Steph Cop is an alien who has decided to spend his summer holidays on Mars.

<iframe src="https://player.vimeo.com/video/27971503" width="720" height="405" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>
<iframe src="https://player.vimeo.com/video/27971742" width="720" height="405" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>
<iframe src="https://player.vimeo.com/video/27971854" width="720" height="405" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>
<iframe src="https://player.vimeo.com/video/27971820" width="720" height="405" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>
<iframe src="https://player.vimeo.com/video/27971935" width="720" height="405" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>

With Laure Del Pino; teacher Bruno Pavoni, librarian Françoise Sellin, coordination Mélanie Legrand, and of course the pupils of class 6e E. Some sounds come from [freesound.org](https://freesound.org). Supported by the Conseil Général de Loire-Atlantique.

[Audacity guide (PDF, fr)](https://berengerrecoules.wordpress.com/wp-content/uploads/2011/08/audacity-guide.pdf) [Sound preparation session (PDF, fr)](https://berengerrecoules.wordpress.com/wp-content/uploads/2011/08/seance-prc3a9paratoire-son.pdf)
`
  },
  {
    id: "ccpp",
    year: "2011",
    title: `CCPP`,
    category: "Installations",
    tags: ["installation", "#pure-data", "#light", "#sound-design"],
    thumbnail: "assets/images/ccpp_1.jpg",
    description: `An interactive sound and light installation for a joint call of the French ministries of Culture, Education and Health.`,
    content: `# CCPP

An interactive installation produced for a joint call for projects of the French ministries of Culture, Education and Health. It was shown at the école d'architecture de Paris-Belleville, at the Ministry of Culture and at the Beaux-Arts de Paris.

My contribution: creating, programming and setting up the interactive sound and light system, and the overall sound design of the installation.

![CCPP](assets/images/ccpp_1.jpg)
`
  },
  {
    id: "visual-tracker",
    year: "2011",
    title: `Visual Tracker`,
    category: "Audio",
    tags: ["desktop", "#pure-data", "#sequencer", "#diy"],
    thumbnail: "assets/images/visual_tracker_1.png",
    description: `A timeline sequencer written entirely in Pure Data, open and hackable in real time, presented at the Pure Data Convention 2011 in Weimar.`,
    content: `# Visual Tracker

Visual Tracker is an abstraction for Pure Data extended to arrange elements along a timeline, like in any music or video sequencing software. Its strength is to be written entirely in Pure Data, so it is completely open and "hackable": you can modify the code at any time, in real time, or adapt it to your needs.

It was presented, with two workshops, at the international Pure Data Convention 2011 in Weimar, organised by the Bauhaus-Universität.

![Visual Tracker](assets/images/visual_tracker_1.png)

A track made only with Visual Tracker and [pdLive!](#project/pdlive):

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Track made with Visual Tracker" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21580028&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

[Code (Google Code archive)](https://code.google.com/archive/p/visualtracker/)
`
  },
  {
    id: "experimental-compositions",
    year: "2011",
    title: `Experimental compositions`,
    category: "Audio",
    tags: ["#pure-data", "#electroacoustic", "#live"],
    thumbnail: "assets/images/compositions_cover.png",
    description: `Electroacoustic pieces and live manipulations with Pure Data.`,
    content: `# Experimental compositions

## Interférences

Live manipulation with Pure Data.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Interférences" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21464706&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

## Duc

Live sample manipulation and frequency tracking with Pure Data.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Duc" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21464288&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

## Chrysalide magnétique

A small electroacoustic piece based on transformation: each element can modify or introduce another one…

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Chrysalide magnétique" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21463927&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

The sound sketch for *Phantom Orchestra* is on the [Ondes de chocs vs Phantom Orchestra](#project/ondes-de-chocs) page.
`
  },
  {
    id: "sound-commissions",
    year: "2011",
    title: `Music & sound design commissions`,
    category: "Audio",
    tags: ["#sound-design", "#music", "#commission"],
    thumbnail: "assets/images/commissions_cover.png",
    description: `Music and sound ambiances commissioned for a Nespresso e-learning module (Enerjitim) and for MTV Made France (LittleBigProd).`,
    content: `# Music & sound design commissions

## Nespresso e-learning, for Enerjitim

For an e-learning module made by Enerjitim for Nespresso: the ambiance of a research and development lab, and two pieces of music in Costa Rican and Brazilian styles.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Nespresso: lab ambiance" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21465485%3Fsecret_token%3Ds-rRGmi&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Nespresso: Costa Rica" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21578709%3Fsecret_token%3Ds-taOYF&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Nespresso: Brazil" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21465296%3Fsecret_token%3Ds-ILbFM&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

## MTV Made France, for LittleBigProd

Two tracks commissioned by LittleBigProd for season 3 of MTV Made France: *Sad Joy* and *Not a Wall*.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Sad Joy" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21464985&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Not a Wall" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21464920&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>
`
  },
  {
    id: "ondes-de-chocs",
    year: "2010",
    title: `Ondes de chocs vs Phantom Orchestra`,
    category: "Installations, Audio",
    tags: ["installation", "#pure-data", "#transducers", "#scopitone"],
    thumbnail: "assets/images/ondes_de_chocs_12.jpg",
    description: `Two sound installations in the Blockhaus DY10 for the Scopitone festival: a bunker shaken by sonic shocks, and instruments resonating with electronic sound.`,
    content: `# Ondes de chocs vs Phantom Orchestra

*Festival Scopitone, Blockhaus DY10, Nantes*

Two sound installations, one in each ground-floor room of the Blockhaus DY10. Both work on making a space or an object resonate, using vibration acoustics to shape a classic electronic signal.

<iframe src="https://player.vimeo.com/video/28310062" width="720" height="405" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>

## Ondes de chocs

*Ondes de chocs* (shock waves) reveals the acoustics of a place. A spatialised sound system emits sonic "jolts" that set the space vibrating for only a few hundredths of a second, creating small shock waves. It refers to Hollywood sound effects and big video-game productions, except that instead of standardised effects, it is the space itself, through its dimensions and its spirit, that gives the deepest effect it can produce. Not a stage effect but the breathing of the place: no spectacular trappings, yet physically striking.

## Phantom Orchestra

*Phantom Orchestra* gives a sonic dimension to seemingly inert objects. Electronic sound is amplified inside the resonating body of musical instruments (a piano, a double bass, a trombone and a microphone) and released into the room, creating a ghostly electroacoustic resonance. The instruments are within reach: visitors can "excite" them too, and microphones pick up their sounds, mixing the electronic processes with the visitors' playing.

The project relies on transducers that make materials vibrate, and favours intimate listening, at volumes that invite you to listen rather than impose themselves.

A sound sketch made while preparing *Phantom Orchestra*:

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Phantom Orchestra sketch" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21464478&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

![Phantom Orchestra: a double bass played by electronic sound](assets/images/ondes_de_chocs_12.jpg)
![Ondes de chocs in the bunker](assets/images/ondes_de_chocs_10.jpg)
![Phantom Orchestra](assets/images/ondes_de_chocs_11.jpg)
![Visitors playing the trombone](assets/images/ondes_de_chocs_9.jpg)
![The Blockhaus DY10](assets/images/ondes_de_chocs_6.jpg)
![Setting up](assets/images/ondes_de_chocs_4.jpg)

![The Ondes de chocs patch](assets/images/ondes_de_chocs_1.png)
![The Phantom Orchestra patch](assets/images/ondes_de_chocs_2.png)

Thanks to the Blockhaus DY10, Desevedavy Nantes and l'Olympic.
`
  },
  {
    id: "pdlive",
    year: "2010",
    title: `pdLive!`,
    category: "Audio",
    tags: ["desktop", "#pure-data", "#live", "#sampler", "#sequencer"],
    thumbnail: "assets/images/pdlive_1.jpg",
    description: `A set of Pure Data patches arranged to be played live: samplers, sequencers, virtual instruments, noises and generative processes synced to a master clock.`,
    content: `# pdLive!

pdLive! is a set of Pure Data patches, organised and arranged so they can be used live. You'll find samplers, sequencers, virtual instruments, noises, synthesis processes and generative controls, all synchronised to a master metronome.

It still requires a minimum of knowledge about how Pure Data works, especially about sending and receiving signals and data between patches.

![pdLive!](assets/images/pdlive_1.jpg)

[Code (Google Code archive)](https://code.google.com/archive/p/pdlive/) [Visual Tracker](#project/visual-tracker)
`
  },
  {
    id: "emissions-urbaines",
    year: "2009",
    title: `Émissions urbaines`,
    category: "Teaching, Audio",
    tags: ["workshop", "#soundscape", "#public-space", "#field-recording"],
    thumbnail: "assets/images/emissions_urbaines_8.jpg",
    description: `A "sensitive survey" of the sound environment of three neighbourhoods of Saint-Denis with the Cochenko collective: urban walks and sound workshops with the inhabitants.`,
    content: `# Émissions urbaines

*Cochenko collective, Saint-Denis (93)*

![Qu'entendez-vous par là ?](assets/images/emissions_urbaines_1.jpg)

The Cochenko collective proposed a "sensitive survey" of the sound environment of the Joliot-Curie, Bel-Air and Franc-Moisin neighbourhoods in Saint-Denis. From September to November 2009, urban walks and sound and visual creation workshops were led with inhabitants, ending with a public presentation on 14 November 2009: soundscapes and inhabitants' voices along a sound and visual trail.

A previous project in the same neighbourhood had shown how much noise, notably from the traffic axes, reinforced the partitioning of the territory. Starting from this negatively experienced sound environment, *Émissions urbaines* was about listening to the city again: paying attention to the routes we no longer see and the sounds we no longer hear out of habit.

- **Recycle the sound of the city**: thinking about the "urban bandwidth", and recording it.
- **Create links**: foster dialogue between neighbouring areas and understand, by listening, how sound shapes individual and collective behaviour.
- **Let inhabitants tell their territory**: oral transmission around the memory of places.
- **Experiment with your close environment**: listen to familiar places in a renewed, even re-enchanted way.
- **Become the conductor of your environment**: own the sound space through choices and a sharpened awareness.
- **Mix professional and amateur practice**: recording technique and creation (radio, music) with the support of professionals.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Émissions urbaines: teaser" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21731571&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Émissions urbaines" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21731647&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Émissions urbaines" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21731716&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

![Workshop](assets/images/emissions_urbaines_8.jpg)
![Workshop](assets/images/emissions_urbaines_4.jpg)
![Urban walk](assets/images/emissions_urbaines_3.jpg)
![Urban walk](assets/images/emissions_urbaines_7.jpg)
![Exhibition along the street](assets/images/emissions_urbaines_5.jpg)
![Exhibition along the street](assets/images/emissions_urbaines_9.jpg)
`
  },
  {
    id: "basse-continue",
    year: "2009",
    title: `Basse continue`,
    category: "Installations, Teaching",
    tags: ["installation", "#public-space", "#kids", "#sound"],
    thumbnail: "assets/images/basse_continue_7.jpg",
    description: `A travelling sound exhibition created with nursery-school children in Les Lilas: put your ear on a tree, listen to a bush, feel a window vibrate.`,
    content: `# Basse continue

*Espace Khiasma, Les Lilas (93)*

This travelling exhibition shared seven months of adventures with the pupils of the Courcoux and Calmette nursery schools, discovering sound and sound creation.

Workshop after workshop, with each class and in collaboration with their teachers, the children questioned the place of sound in how they perceive reality, and learned to compose their own sound worlds. Each sound and visual piece is part of this collective experience and was set in the Sentes neighbourhood: from the Courcoux school to the Henri-Dunant centre, the pieces revealed a moving sound image of the two schools and of the secret life that animates them. Designed as a trail, the exhibition drew a sensitive territory where you could put your ear on a tree, listen to a bush, or feel a bay window vibrate!

The *Basse continue* trail was initiated for the Seine-Saint-Denis contemporary art biennial *Art Grandeur Nature 2008* and produced by Khiasma. It was designed and made by Roselyne Burger, Olivier Marboeuf, Kerwin Rolland and Bérenger Recoules.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Basse continue" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21721100&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Basse continue" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21721356&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

![Listening](assets/images/basse_continue_7.jpg)
![Listening to a tree](assets/images/basse_continue_8.jpg)
![Children against the vibrating window](assets/images/basse_continue_2.jpg)
![A girl against the window](assets/images/basse_continue_4.jpg)
![Listening on the sound cubes](assets/images/basse_continue_3.jpg)
![Listening](assets/images/basse_continue_5.jpg)
`
  },
  {
    id: "mots-publics",
    year: "2008",
    title: `Mots publics : Ici, je suis ailleurs`,
    category: "Installations",
    tags: ["installation", "#public-space", "#nuit-blanche", "#sound"],
    thumbnail: "assets/images/mots_publics_1.jpg",
    description: `Nuit Blanche 2008, square des Cardeurs (Paris 20e): inhabitants' words projected on the façades, and 20 sound pieces hidden in bins, bushes, benches and shop windows.`,
    content: `# Mots publics : Ici, je suis ailleurs

*Nuit Blanche 2008, square des Cardeurs, Paris 20e*

![Words projected on the façades of the square](assets/images/mots_publics_1.jpg)

*Mots publics* is a set of artistic interventions designed by Malte Martin for the City of Paris, as part of the redevelopment of a large area around the Porte de Montreuil. The 2008 edition was based on orality and exchanges about the urban environment between Malte Martin, mediators and inhabitants, producing stories, testimonies and dialogues, all reused for the Nuit Blanche of 4 October 2008.

Words and testimonies were video-projected on the façades of the buildings around the square, together with sound diffusions of the collected stories. From six months of recordings on the theme *"ici, je suis ailleurs"* ("here, I am elsewhere"), we made 20 small sound pieces, empathetic or offbeat.

The sound installation used many loudspeakers directing sound towards small, circumscribed areas: 3 shop windows, 4 bins, 2 air vents, 6 bushes and trees, 3 public benches, a car-park entrance, a letterbox and 2 lawns. Entering the square, people could not hear all the sounds at once, but saw the ballet of the audience walking from one listening spot to the next, in a game of discovery.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Ici, je suis ailleurs" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21731785&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Ici, je suis ailleurs" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21731837&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

![The projections](assets/images/mots_publics_2.jpg)
![Listening at night](assets/images/mots_publics_4.jpg)
![The square at night](assets/images/mots_publics_6.jpg)
![Projection on a building](assets/images/mots_publics_7.jpg)
![Projection on a building](assets/images/mots_publics_5.jpg)
![Projection on a building](assets/images/mots_publics_8.jpg)

Designed and made by Bérenger Recoules, Kerwin Rolland, Malte Martin, David Séchaud, Valentin Adam, Cédric Andrzejczak, Marion Mieze and Alice Leborgne.

[Presentation (PDF, fr)](https://berengerrecoules.wordpress.com/wp-content/uploads/2008/10/mp08_presentation_ici_je_suis_ailleurs.pdf)
`
  },
  {
    id: "silence-plateau",
    year: "2008",
    title: `Silence plateau ?`,
    category: "Audio, Experiments",
    tags: ["residency", "#psychoacoustics", "#listening", "#field-recording"],
    thumbnail: "assets/images/silence_plateau_6.jpg",
    description: `A two-month residency on the Millevaches plateau, studying how inhabitants perceive, remember and put into words the sounds of their territory.`,
    content: `# Silence plateau ?

*Association Appelboom, La Pommerie (Corrèze)*

A study of the psychoacoustic relationship between the sounds of the Millevaches plateau and its inhabitants, made during a two-month artist residency (July and August 2008) organised by Appelboom at La Pommerie, in the heart of the Millevaches regional natural park.

We interviewed inhabitants of the plateau (local associations, volunteers or chance encounters, of different ages and occupations) with a very open questionnaire about how they perceive the sound of the places they live in. We then confronted this remembered listening, the idea they have of certain soundscapes, with listening in situ. The idea was also to see how language structures listening, and the other way round, both in the memory of sound scenes and in a real situation, on a given territory.

The aim was a sensitive study that moves inhabitants towards remarkable listening points: a way of activating a territory through a topology rarely represented, that of sound perception.

![Listening map](assets/images/silence_plateau_1.jpg)
![Listening map](assets/images/silence_plateau_2.jpg)
![Listening map](assets/images/silence_plateau_3.jpg)
![The plateau](assets/images/silence_plateau_6.jpg)

![A listening point](assets/images/silence_plateau_4.jpg)
![A listening point](assets/images/silence_plateau_5.jpg)
![A listening point](assets/images/silence_plateau_7.jpg)
![A listening point](assets/images/silence_plateau_8.jpg)

Project written by Kerwin Rolland, made by Kerwin Rolland and Bérenger Recoules.

[Presentation of the work (PDF, fr)](https://berengerrecoules.wordpress.com/wp-content/uploads/2008/11/k_rollandb_recoules_silenceplateau_presresid_appelboom_08_kr081013.pdf)
`
  },
  {
    id: "theodore-de-banville",
    year: "2007",
    title: `Exposition Théodore de Banville`,
    category: "Audio, Installations",
    tags: ["exhibition", "#sound-design", "#museography"],
    thumbnail: "assets/images/theodore_de_banville_1.jpg",
    description: `Sound design for the exhibition "Théodore de Banville et le théâtre" at the Centre national du costume de scène in Moulins.`,
    content: `# Exposition Théodore de Banville

*Centre national du costume de scène, Moulins (03)*

Sound design for the museography of the exhibition *Théodore de Banville et le théâtre*.

![The exhibition poster](assets/images/theodore_de_banville_1.jpg)
`
  },
  {
    id: "writings-on-sound",
    year: "2006",
    title: `Writings on sound`,
    category: "Audio, Teaching",
    tags: ["research", "#sound-design", "#cognition", "#psychoacoustics"],
    thumbnail: "assets/images/writings_cover.png",
    description: `Research papers on sound design and auditory cognition: a methodology for sound installations, the forms of sound, cognition and emotion, perceptive vs functional analysis.`,
    content: `# Writings on sound

Research documents written between 2006 and 2008, between sound design and the cognitive sciences (in French).

## Support théorique aux installations sonores (2006)

A methodology for approaching a sound-installation project. First, analyse and characterise the sound space itself: its acoustics and architecture, and our perception of it, as objectively as possible. Then, a conceptual approach to an "environmental music" for sound installations, splitting the action on the sound space into conditioning and articulation. Finally, a list of acoustic phenomena (physical, psychoacoustic, architectural and physiological) with their possible applications, explained as simply as possible and gathered in a summary table.

[Read (PDF)](https://berengerrecoules.wordpress.com/wp-content/uploads/2008/11/supporttheoriqueauxinstallationssonores_br_060725.pdf) [Summary table (PDF)](https://berengerrecoules.wordpress.com/wp-content/uploads/2008/11/tableau-recapitulatifbr-25_07_2006.pdf)

## Entre cognition et émotion, comment classer les sons ? (2007)

A reflection built across music and musicology, the cognitive sciences (memorisation and perception processes) and the psychology of emotions. It formalises a set of readings, not only scientific articles but also musicology courses and personal and professional experiences.

[Read (PDF)](https://berengerrecoules.wordpress.com/wp-content/uploads/2008/11/cognitionvsemotion_br070513.pdf)

## Les différentes formes du son (2007)

A reflection on the different "forms" that have been given to sound in order to better interpret it.

[Read (PDF)](https://berengerrecoules.wordpress.com/wp-content/uploads/2008/11/lesformesduson_br_071123c2a0.pdf)

## Comparaison entre analyse perceptive et analyse fonctionnelle (2008)

A master's research thesis critiquing sound-design methods in industry. It argues that a design study should also evaluate with purely subjective criteria, showing the role of emotions in a global perceptive approach; otherwise subjects lock themselves into categorisation tasks that don't reflect what they feel.

[Read (PDF)](https://berengerrecoules.wordpress.com/wp-content/uploads/2008/11/m2r_memoire_br_080616.pdf)
`
  },
  {
    id: "toujours-lorage",
    year: "2006",
    title: `Toujours l'orage`,
    category: "Audio",
    tags: ["theatre", "#sound-design", "#clarinet", "#double-bass", "#improvisation"],
    thumbnail: "assets/images/toujours_lorage_1.jpg",
    description: `Sound creation for Enzo Cormann's play, staged by the Compagnie l'Alchimiste in Colmar.`,
    content: `# Toujours l'orage

*Compagnie l'Alchimiste, Colmar (68)*

Sound creation for *Toujours l'orage* by Enzo Cormann. At the end of the 20th century, on a cold night, Nathan Goldring, a young Austrian director, comes to ask Theo Steiner, a mythical figure of post-war Viennese theatre, to end 25 years of silence and exile and play Lear on a Berlin stage. Both haunted by the shadow of Lear, they lock themselves in a huis clos punctuated by the incessant return of the storm and fragments of Shakespeare's text.

A revisiting of Shakespeare, a cruel meditation on history and the Holocaust, a ferocious game of verbal chess: *"un théâtre de la parole, méditatif […] un théâtre de mémoire ; un théâtre pensif"* (E. Cormann, H. Bornstein).

![Toujours l'orage](assets/images/toujours_lorage_1.jpg)

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Toujours l'orage 1" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21469986&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Toujours l'orage 2" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21470031&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Toujours l'orage 3" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21470068&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" title="Toujours l'orage 4" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/21470120&color=%23553832&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

Sound creation and production: Romain Drogoul and Bérenger Recoules.
`
  },
];

const bio = {
  "title": "b2renger",
  "paragraphs": [
    "I play with code, electronics, graphics and sound in the fields of new media, AI, XR, interactive experiences with web tech stacks.",
    "I am teaching at [l'école de design Nantes Atlantique](https://lecolededesign.com/fr/la-une/visite-des-ateliers-et-studios-numeriques-avec-berenger-recoules). With [Valentin Dupas](https://valentindupas.com/) and [LucieMrc](https://luciemrc.github.io/) and we built [ateliernum](https://ateliernum.github.io/) a place of tutorials and resources for geeks."
  ],
  "socials": [
    {
      "name": "Github",
      "url": "https://github.com/b2renger",
      "icon": "<svg class=\"social-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path></svg>"
    },
    {
      "name": "Twitter",
      "url": "https://x.com/b2renger",
      "icon": "<svg class=\"social-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z\"></path></svg>"
    },
    {
      "name": "Instagram",
      "url": "https://www.instagram.com/ateliernum/",
      "icon": "<svg class=\"social-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\" ry=\"5\"></rect><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"></path><line x1=\"17.5\" y1=\"6.5\" x2=\"17.51\" y2=\"6.5\"></line></svg>"
    },
    {
      "name": "LinkedIn",
      "url": "https://www.linkedin.com/in/b%C3%A9renger-recoules-09889826/",
      "icon": "<svg class=\"social-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle></svg>"
    }
  ],
  "art_links": [
    {
      "name": "fxhash",
      "url": "https://www.fxhash.xyz/u/b2renger/",
      "icon": "<svg class=\"social-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 22V8a4 4 0 0 1 4-4h2 M4 12h6 M14 22L22 12 M14 12l8 10\"></path></svg>"
    },
    {
      "name": "Teia",
      "url": "https://teia.art/b2renger",
      "icon": "<svg class=\"social-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 22 12 12 22 2 12\"></polygon><path d=\"M12 17V7 M8 7h8\"></path></svg>"
    }
  ]
};
