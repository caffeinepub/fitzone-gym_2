# FitZone Gym

## Current State
New project -- no existing code.

## Requested Changes (Diff)

### Add
- Hero section with motivational tagline, CTA buttons, and a bold gym background
- Gym locations section with 4-5 gym place cards (name, address, hours, amenities)
- Equipment shop section with 6-8 gym equipment items for sale (image, name, price, buy button)
- Workouts section with 6 workout cards (name, muscle group, difficulty, description, steps)
- Motivational quotes section (rotating/static carousel of 6+ quotes)
- Diet planner section: user fills a form (goal, weight, height, activity level, dietary preference) and gets a personalized diet plan back
- Chatbot widget (floating bottom-right) for personal help -- answers gym, workout, diet, equipment questions using rule-based responses
- Responsive navigation bar with mobile hamburger menu
- Footer with links and social icons

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: store diet plan requests and chatbot FAQ data; expose query for diet recommendation based on user profile
2. Frontend:
   - Design system: dark/energetic theme (blacks, deep grays, electric orange/red accents)
   - Nav: sticky, mobile responsive with hamburger
   - Hero: full-screen with animated headline and CTA
   - Gym Locations: grid of cards with map pin icon, hours, amenities
   - Equipment Shop: product grid with price, add-to-cart style buttons
   - Workouts: expandable cards with difficulty badge and steps
   - Quotes: auto-rotating carousel
   - Diet Planner: form -> call backend -> display personalized meal plan
   - Chatbot: floating button, slide-up panel, handles common gym/diet/workout questions
   - Footer

## UX Notes
- Mobile-first responsive layout
- Bold, high-contrast dark theme with orange/red accents for energy
- Smooth scroll between sections
- Chatbot should feel friendly and helpful
- Diet planner should feel personalized and actionable
