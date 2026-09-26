1. Design Direction
The website should feel like a premium developer/productivity tool, not a typical AI startup website.
The visual language should be:
Minimal
Elegant
Professional
Modern
Fast
Typography-focused
Spacious
Clean
Subtle interactions
No unnecessary visual effects
The goal is that someone visiting the site should think:
"This is a professionally designed productivity tool."
Not:
"This looks like an AI-generated website."
Core visual identity
Primary: Black / White
Secondary: Blue
Style: Minimal, refined, technical
Effects: Very subtle
Corners: Moderate radius, not excessive rounded cards
Shadows: Soft and restrained
Gradients: Minimal or none
Glassmorphism: Avoid or use extremely lightly
Neon: Avoid
Particles: Avoid
Floating blobs: Avoid
AI-style glowing backgrounds: Avoid
2. Theme System
The website needs a proper Light / Dark theme toggle.
Dark Theme
Background:
#0A0A0A
Primary text:
#F5F5F5
Secondary text:
#A1A1AA
Borders:
#27272A
Cards:
#111111
Blue accent:
#2563EB
Blue hover:
#1D4ED8
Light Theme
Background:
#FFFFFF
Primary text:
#111111
Secondary text:
#666666
Borders:
#E5E7EB
Cards:
#F8F8F8
Blue accent:
#2563EB
Blue hover:
#1D4ED8
The blue should remain consistent across both themes.
3. Theme Toggle
Place the theme toggle in the navbar.
Desktop:
Logo     Generate   Explore   Improve   About      ☼ / ☾
The toggle should be compact and elegant.
Avoid a huge colorful switch.
Behavior
Light → Dark
Dark → Light
Remember user's choice
Respect system preference on first visit
Smooth transition
No page reload
Store preference using:
localStorage
4. Typography
Typography should carry much of the design.
Recommended font:
Inter
Alternative:
Geist
Manrope
Plus Jakarta Sans
Use a maximum of two font families.
Typography hierarchy
Hero heading:
56–72px desktop
38–44px mobile
Weight:
600–700
Body:
16–18px
Navigation:
14–15px
Buttons:
14–15px
Small labels:
12–13px
Avoid huge text everywhere.
5. Navbar
The navbar should be simple.
Desktop
┌─────────────────────────────────────────────────────────┐
│ PromptForge    Generate   Explore   Improve   About  ◐  │
└─────────────────────────────────────────────────────────┘
Use a thin bottom border.
No giant floating glass navbar.
Logo
Use a simple wordmark.
Example:
PromptForge
Optional small blue mark beside it.
Do not use an overly complicated AI logo.
6. Mobile Navbar
Mobile:
PromptForge                              ☰
Opening the menu:
────────────────────

Generate

Explore

Improve

Categories

About

────────────

Theme

────────────
The menu should slide/fade in smoothly.
7. Homepage
The homepage should be intentionally spacious.
Hero
Centered layout:
                    PROMPT ENGINEERING TOOL

             Turn your ideas into better prompts.

      Create structured prompts for coding, studying,
       writing, image generation, research and more.

           [ Generate Prompt ]   [ Explore Library ]
Small blue eyebrow text above the heading.
No giant AI robot illustration.
No glowing brain.
No random 3D shapes.
No stock AI artwork.
8. Hero Background
Keep it almost completely clean.
Dark mode:
#0A0A0A
Light mode:
#FFFFFF
Optionally add an extremely subtle radial blue glow behind the hero.
It should be barely visible.
If the blue glow immediately catches the user's attention, it is too strong.
9. Hero Prompt Preview
Under the hero CTA, show a realistic example.
┌──────────────────────────────────────────────────────────┐
│ Example prompt                                    Copy ↗  │
│                                                          │
│ You are an experienced frontend developer...             │
│                                                          │
│ Build a responsive portfolio website using...             │
│                                                          │
│ Requirements:                                            │
│ • Responsive layout                                      │
│ • Accessible components                                  │
│ • Clean architecture                                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
This immediately communicates what the product does.
10. Category Section
Heading:
Built for the way you work
Subheading:
Create prompts for different tasks and workflows.
Use a clean grid.
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Coding        │ │ Studying      │ │ Writing       │
│ Build better  │ │ Learn faster  │ │ Write clearly │
└───────────────┘ └───────────────┘ └───────────────┘

┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Image         │ │ Research      │ │ Marketing     │
│ Visual prompts│ │ Analyze better │ │ Better copy   │
└───────────────┘ └───────────────┘ └───────────────┘
Cards should have:
subtle border
small icon
title
one-line description
arrow
On hover:
border becomes slightly blue
arrow moves a few pixels
subtle background change
No excessive animations.
11. Generator Page
This is the core product.
URL:
/generate
Page heading:
What do you want to accomplish?
Subheading:
Describe your goal. We'll help structure it into a useful prompt.
12. Generator Layout
Desktop:
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Category                     Your goal                  │
│  ┌─────────────────┐          ┌────────────────────────┐ │
│  │ Coding          │          │ I want to build...     │ │
│  │ Studying        │          │                        │ │
│  │ Writing         │          │                        │ │
│  │ Image           │          │                        │ │
│  │ Research        │          │                        │ │
│  └─────────────────┘          └────────────────────────┘ │
│                                                          │
│                    [ Generate Prompt ]                   │
│                                                          │
└──────────────────────────────────────────────────────────┘
Keep the interface compact.
Do not turn every field into a giant card.
13. Smart Configuration
After the user enters their goal, display only relevant options.
Example for coding:
Programming Language
Framework
Experience Level
Requirements
Constraints
Output Format
Example for image generation:
Subject
Style
Environment
Lighting
Composition
Aspect Ratio
Mood
This keeps the interface clean.
14. Generated Prompt
The result should feel like a professional code editor.
┌──────────────────────────────────────────────────────────┐
│ Generated Prompt                         94 / 100        │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ You are an experienced frontend developer...         │ │
│ │                                                      │ │
│ │ OBJECTIVE                                            │ │
│ │ Build a responsive portfolio website...              │ │
│ │                                                      │ │
│ │ REQUIREMENTS                                         │ │
│ │ 1. Use semantic HTML...                              │ │
│ │ 2. Ensure responsive behavior...                     │ │
│ └──────────────────────────────────────────────────────┘ │
│                                                          │
│ [ Copy ] [ Edit ] [ Improve ] [ Regenerate ]             │
└──────────────────────────────────────────────────────────┘
15. Prompt Editor
Use a clean editor.
Features:
Text editing
Line wrapping
Copy
Select all
Character count
Word count
Fullscreen mode
Don't make it look like a fake terminal.
It should resemble a professional writing/code editor.
16. Blue Accent Usage
Blue should be an accent, not the main color.
Use blue for:
Primary CTA
Links
Active navigation
Focus states
Selected category
Important icons
Progress indicators
Small highlights
Do NOT make:
entire sections blue
giant blue gradients
blue backgrounds everywhere
glowing borders everywhere
Rule:
Around 90% neutral colors, 10% blue accent.
17. Buttons
Primary:
┌──────────────────────┐
│  Generate Prompt  →  │
└──────────────────────┘
Blue background.
Secondary:
┌──────────────────────┐
│  Explore Library     │
└──────────────────────┘
Neutral background with border.
Button height:
42–48px
Border radius:
8–10px
Avoid pill-shaped buttons everywhere.
18. Explore / Prompt Library
URL:
/explore
Header:
Prompt Library
Explore ready-to-use prompts for work, learning and creativity.
Search:
┌────────────────────────────────────────────────────┐
│ Search prompts...                                  │
└────────────────────────────────────────────────────┘
Filters:
All
Coding
Study
Writing
Image
Research
Marketing
Business
19. Prompt Cards
Keep them editorial and clean.
┌──────────────────────────────────────┐
│ React Code Review                    │
│ Coding                               │
│                                      │
│ Review a React component for...      │
│                                      │
│ Used 1.2k times                     →│
└──────────────────────────────────────┘
No fake ratings.
Only display statistics that actually exist.
20. Prompt Detail Page
Example:
/prompts/react-code-review
Layout:
Coding

React Code Review

Review React code for bugs,
performance problems and
maintainability issues.

──────────────────────────

Prompt

┌──────────────────────────┐
│ ...                      │
└──────────────────────────┘

[ Copy Prompt ]

──────────────────────────

How to use it

...

Related prompts
...
This page should also be designed for Google search.
21. Improve Page
URL:
/improve
Hero:
Improve an existing prompt
Paste your prompt below.

┌─────────────────────────────────────┐
│                                     │
│ Paste your prompt...                │
│                                     │
└─────────────────────────────────────┘

Improve for:

☐ Clarity
☐ Specificity
☐ Structure
☐ Context
☐ Output format

[ Improve Prompt ]
22. How It Works
Three simple steps:
01
Describe

Tell us what you're trying to accomplish.

02
Configure

Add context and requirements that matter.

03
Generate

Get a structured prompt ready to use.
Use typography and spacing instead of illustrations.
23. Trust / Quality Section
Instead of generic AI marketing claims, explain the product.
Heading:
Designed around better instructions
Three points:
Clear
Prompts are structured around the actual goal.
Specific
Relevant context and constraints are included.
Flexible
Edit and adapt the result before using it.
This feels more credible than:
"Powered by revolutionary next-generation AI."
Avoid that kind of language.
24. Footer
Minimal footer.
PromptForge

A simple tool for creating better AI prompts.

Product
Generate
Explore
Improve

Resources
Blog
Guides
Prompt Engineering

Company
About
Contact
Privacy
Terms

© 2026 PromptForge
No huge footer.
25. Micro Interactions
Interactions should be subtle.
Hover
Card:
border → slightly blue
background → slightly lighter
Button
translateY(-1px)
Copy
Button changes:
Copy
↓
Copied
for around 1.5 seconds.
Page transitions
Small fade/slide.
Avoid dramatic animations.
26. Animation Rules
Use animation only when it communicates something.
Good:
Button hover
Menu transition
Modal opening
Prompt generation state
Copy confirmation
Theme transition
Avoid:
constantly moving backgrounds
floating objects
spinning logos
particle systems
excessive parallax
animated gradients
text constantly changing
The site should feel calm and intentional.
27. Dark Mode Design
Dark mode should not simply mean:
Everything black.
Use a layered hierarchy:
#080808  Page
#0F0F0F  Sections
#141414  Cards
#1C1C1C  Inputs
#272727  Borders
#F5F5F5  Primary text
#A1A1AA  Secondary text
#2563EB  Accent
This gives depth without gradients.
28. Light Mode Design
Use:
#FFFFFF  Page
#FAFAFA  Sections
#F7F7F7  Cards
#FFFFFF  Inputs
#E5E7EB  Borders
#111111  Primary text
#666666  Secondary text
#2563EB  Accent
Avoid pure black text everywhere if it feels too harsh.
29. Responsive Design
Desktop
Three-column layouts where useful.
Tablet
Two-column layouts.
Mobile
Single-column layout.
Important:
The generator should be mobile-first.
The prompt editor must remain easy to use on a phone.
30. Mobile Generator
Mobile flow:
Generate

Category
↓
Goal
↓
Options
↓
Generate
↓
Result
↓
Copy
The result should take almost the entire screen.
Sticky bottom action:
┌─────────────────────────────────┐
│          Copy Prompt            │
└─────────────────────────────────┘
This makes the main action accessible.
31. Accessibility
The professional design should also be accessible.
Requirements:
WCAG-conscious contrast
Keyboard navigation
Focus indicators
Semantic HTML
Proper labels
Reduced-motion support
Screen-reader friendly controls
Theme switching must preserve readable contrast.
32. SEO Design
Every public prompt page should have:
unique title
unique description
one H1
descriptive URL
canonical URL
Open Graph metadata
Twitter/X metadata
structured data where appropriate
internal links
Example:
Prompt Library
   ↓
Coding
   ↓
React Prompts
   ↓
React Code Review Prompt
This creates a clean information architecture.
33. Performance
The design should prioritize speed.
Target:
Fast first render
Minimal client-side JavaScript
Optimized fonts
No unnecessary animation libraries
Lazy-load noncritical components
Optimized SVG icons
Responsive images
Server-render public SEO pages
A minimal design naturally helps performance.
34. Iconography
Use one consistent icon set.
Recommended:
Lucide Icons
Icons should be:
16–20px
thin/simple
consistent stroke width
Don't mix random icon styles.
35. Design System
Create reusable components:
Button
Input
Textarea
Select
Card
Badge
Modal
Dropdown
Tooltip
Tabs
PromptEditor
CategoryCard
PromptCard
Navbar
Footer
ThemeToggle
Toast
LoadingState
This keeps the entire website visually consistent.
36. Design Tokens
Use CSS variables.
--background
--foreground
--muted
--border
--card
--accent
--accent-hover
--radius
--shadow
Then create separate Light and Dark theme values.
This makes the theme system easy to maintain.
37. What the Website Should NOT Look Like
Avoid these common AI website patterns:
❌ Giant glowing AI brain
❌ Purple/blue gradient everywhere
❌ Excessive glassmorphism
❌ Neon borders
❌ Floating 3D objects
❌ Huge animated blobs
❌ Random futuristic illustrations
❌ "AI-powered revolutionary..." marketing copy
❌ Every button being a pill
❌ Excessive rounded cards
❌ Too many icons
❌ Excessive animations
❌ Fake statistics
❌ Fake testimonials
❌ Fake user counts
❌ Generic stock photos
❌ Overly complicated dashboard
The design should look like a real software product designed by a strong product designer.
38. Overall Visual Reference
The design philosophy should sit somewhere between:
Modern developer tool + premium productivity application + clean editorial website.
Think:
Minimal
     +
Professional
     +
Technical
     +
Human
     +
Fast
Not:
AI startup
+
Neon
+
Gradients
+
3D
+
Hype
39. Final Visual Hierarchy
The entire website should follow:
BLACK / WHITE
     ↓
Typography
     ↓
Spacing
     ↓
Borders
     ↓
Blue Accent
     ↓
Subtle Motion
The blue accent should support the design rather than dominate it.
40. Final Design Goal
When someone opens the website, the first impression should be:
"This is a clean, serious tool that I can actually use."
The design should feel polished enough that a developer, student, designer, or professional would be comfortable using it every day.
The product should look purpose-built, not like a generic AI landing-page template.