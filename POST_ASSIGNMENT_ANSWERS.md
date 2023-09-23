## Post Assignment Questions/Answers

**_Describe the major design/build decisions and why you made them._**

I opted for Next.js due to its out of the box functionalities, making server-side API setups and frontend development with React and TypeScript straightforward. It also provides Webpack for efficient bundling. Because of GitHub's rate limits and the drawbacks of frequent fetching, I cached data (via file write) for persistence and enhanced performance.

To further boost efficiency, the search input was throttled. Given Meta Lab's design reputation, I used `styled-components` for its dynamic theming and component-focused styling. I also chose Chart.js and `react-chartjs` for data visualization, a tool I'm familiar with. Plus, how can you go wrong with over 1 million of weekly downloads!

I also used zustand for state management because I want to abstract as much state and async logic from my UI components as possible. It's similar to a library I use at my current work.

**_How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging")._**

The coding exercise took approx 8 hours to complete.
Here is the breakdown.

**Setting up Framework**: (30mins)

- Next js (20mins)
- styled-components
- zustand (state-management)

**Backend Coding:**: (3.5 hr)

- Planning feature work flow and BE data structure for FE.
- Learning GitHub endpoints how to use, read documentations
- Fetch with GIT endpoints
- Create Endpoints: After finishing the first endpoint, the other were similar.
  - Search API CRUD , side quests
  - Watch API CRUD (custom api)
  - Aciivity API CRUD
- Debugging (--inspect didn't work!!!!!)

**Frontend Coding:** 4hrs

- Activity Chart
  - Learning ChartJS configs took the longest
- Search Input / AutoComplete
  - Throttle
  - Saving item to watch and activity
- Watch Item
  - Hover State
  - Saving / Deleting Item
  - Hover State with Line
- Styling
- Utils for labels and values
- Debugging

**Miscellanous**: 1.5hr

- Understanding assignment
- Planning/Discovery
- Reading Docs
- Post/Pre Write Up

**_If you could go back and give yourself advice at the beginning of the project, what would it be?_**

- Caching search requests to file was unnecessary. this would have cut alot of time, do it at the end instead.
- Explore scaffolding API endpoints
- Ask more questions regarding search.
- Spend even more time in planning data structure / BE, or invest in connecting to a DB
- Take breaks because after a break, the solution was apparent

**_Did you learn anything new?_**

Balancing a full-time job, family, and pets is challenging. Stepping out of my daily work routine to tackle this project was enlightening (more enjoyable than I thought!). It was both a refresher and a valuable learning experience. Thank you!

**_Do you feel that this assignment allowed you to showcase your abilities effectively?_**

Given the time constraints, this feature would typically take a full sprint cycle, extensive testing, designer feedback, and code reviews. Although, there's still so much to refactor and potential bugs to uncover, I believe it's a solid showcase.

**_Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?_**

The world of programming is vast and ever-evolving. There's so much I've yet to explore or showcase. What I've demonstrated is often a reflection of specific job requirements.

If there's something new, no worries. I've jumped into unfamiliar tech stacks in past jobs and adapted fast. Remote work over the years taught me that!
