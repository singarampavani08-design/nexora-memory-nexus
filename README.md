# Nexora: Your Meeting Memory

Build a complete, modern, production-quality web application called “Nexora – AI Meeting Prep Agent” for an 8-hour AI hackathon.

## PROJECT CONTEXT
Team Name: Nexora
Project: AI Meeting Prep Agent
The application helps professionals prepare for meetings by remembering previous interactions with the same contact. The core differentiator is persistent memory using Hindsight.

The agent should remember:
* Previous meeting discussions
* Important topics
* Concerns raised
* Decisions made
* Promises and commitments
* Pending follow-ups
* User preparation preferences
* Relevant context from previous interactions

When the user prepares for a new meeting, the application should retrieve relevant previous memories and generate a personalized meeting preparation brief.

The most important part of the application is demonstrating:
Meeting → Store Memory → Future Meeting → Recall Memory → Personalized Preparation

Do NOT build this as a generic chatbot. Make persistent memory the central feature.

## DESIGN STYLE
Create a premium AI SaaS dashboard with a professional hackathon-demo appearance.
Visual direction: Modern, Clean, Futuristic but professional, Minimal, Premium, Easy for judges to understand within 30 seconds.
Use: Dark navy / deep blue background, white and light-gray text, blue/purple accent gradients, subtle glassmorphism, soft shadows, rounded cards, thin borders, subtle glowing elements, modern typography, plenty of whitespace.

## ANIMATIONS & INTERACTIONS
Smooth, polished animations, smooth scrolling, fade-ins, slide-up card animations, subtle hover effects, card lift, loading animation while generating a brief, skeleton loaders, animated memory retrieval visualization. Respect prefers-reduced-motion.

## KEY PAGES & FEATURES
1. Landing / Home Page with hero section ("Your AI Meeting Memory. Your Next Meeting Advantage."), visual pipeline (Past Meetings → Hindsight Memory → Relevant Context → Personalized Brief), problem explanation, and feature cards.
2. Main Dashboard with stats, upcoming meetings, quick action to prepare, and welcome banner.
3. Prepare Meeting page with contact selector, meeting title, date, purpose, and "Generate Meeting Brief" action using previous context.
4. Meeting Brief view with previous discussion, key concerns, commitments, pending follow-ups, context, suggested questions, and recommended focus, plus "View Memory Sources".
5. Memory Center & Visualization showing memory flow, animated memory cards with relevance indicators, topics, and memory growth over time.
6. "Memory in Action" interactive demo section ("Watch Nexora Learn") demonstrating Step 1 (First meeting & retain memory) and Step 2 (Future meeting, recall memory, generate personalized brief).
7. Before vs After comparison ("Without Memory" vs "With Nexora Memory").
8. Contacts directory & Contact Detail page with meeting timeline and memory history.
9. Meeting History with search and filtering by contact and date.
10. AI Assistant slide-over panel ("Nexora AI") to ask about meeting context and past commitments.
11. Clean Hindsight integration architecture / service layer (`retainMeetingMemory`, `recallMeetingMemory`, `reflectOnMeetingContext`).
12. Pre-populated realistic demo data (fictional contacts like Rahul Sharma at Acme Tech, Priya Patel, etc.).
13. Guided Hackathon Demo Mode button ("Launch Demo") running the complete 60-second end-to-end judge walkthrough.
14. Footer with Team Nexora credits (Sahithi, Supriya, Pavani, Pavithra, Sandhya, Greeshma).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fcfb3825-88f1-4eee-9e96-fff5527b5b4b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
