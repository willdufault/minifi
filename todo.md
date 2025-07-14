### New

- admin page
- add dates to articles
- copy link button
- remove body desc from article preview + updated loading boxes
- logic improvements (update article, ...)
- ui improvements
  - fixed overflow-wrap=anywhere on container
- ux improvements
  - text when no featured articles
  - enter press triggers comment+reply create
- make sure no extra ! or ? ops null checks

---

### Current

---

### Next

- move featured to DB side, search for articles with featured=True, set from admin page
- add check for all update APIs to fail if it is the same
- comment/reply edit: add check if no changes, disable save button
- search pagination, multiple sizes (10, 25, 50)
- make comments/replies less cluttered, things should come from clicking menu option
- redo edit/delete, make it 3 dots dropdown i think
- light + dark mode
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

- client test cases
- server test cases
- migrate to mongodb atlas (required for vercel)
- find new node hosting option (vercel?)
- optimize lighthouse
- set up domain (willdufault.dev/...)
