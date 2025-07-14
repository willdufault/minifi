<br/>
<div align="center">
  <img width="250" alt="image" src="https://github.com/user-attachments/assets/6be84766-1438-4dc2-b653-9118d840827a" />
</div>
<br/>

# Minifi: A minimalistic tech article-sharing platform

## Release notes
### 1.1 (7/13/2025)
* Added admin page (/admin)
* Added article dates
* Added copy link button
* UI improvements:
  * Fixed text wrapping on mobile
  * Standardized button colors
* UX improvements:
  * Added text when home page featured articles or admin list results are empty
  * Pressing enter on comments & replies now posts it
### 1.0 (7/11/2025)
* Added basic functionality:
  * Writing, editing, and deleting articles
  * Adding reactions to articles
  * Searching articles by title
  * Posting comments and replies
  * Adding likes to comments and replies
  * Responsive UI

## Architecture
![image](https://github.com/user-attachments/assets/437f59d6-b8ed-47a7-bc83-ccad28305131)

**(NOTE: WILL BE MIGRATING FROM MongoDB Realm -> Atlas TO COMPLY WITH VERCEL RESTRICTIONS.)**

The UI is built with React and Tailwind using a mobile-first approach. Client requests are sent via Axios to a Node/Express server, which queries a MongoDB Realm database and returns responses. Data is validated on both client and server for added security.
