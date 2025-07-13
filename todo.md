### New

- admin page
- add dates to articles
- copy link button
- remove body desc from article preview + updated loading boxes
- logic improvements (update article, ...)
- ux improvements (text when no featured articles)
- make sure no extra ! or ? ops null checks

---

### Current

- add check for all update APIs to fail if it is the same

---

### Next

- comment/reply edit: add check if no changes, disable save button
- move featured to DB side, search for articles with featured=True, set from admin page
- search pagination, multiple sizes (10, 25, 50)
- migrate to mongodb atlas?
- make comments/replies less cluttered, things should come from clicking menu option
- redo edit/delete, make it 3 dots dropdown i think
- light +dark mode slider
- add filter by topic
- click to expand articles/comments/replies if too many lines (TBD)
- article sort order
- comment sort order
- add custom images (has to be url) OR preset images by topic
- add users (will prob need to edit mobile navbar + update search page)
- tie reactions to user
- limit actions only if you're logged in
- add jwt for user requests
- password hash + salt
- add fuzzy title search
- censor inappropriate words
- markdown body (TBD)
- fix api path access from browser
- better ui (mobile-first, tailwind?)

---

### Core

- find new node hosting option (vercel?)
- optimize lighthouse
- set up domain (willdufault.dev/...)
