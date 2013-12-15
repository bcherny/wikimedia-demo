wikimedia demo
==============

I spent about 1.5 hours on this demo.

## Features

- Click to toggle topics
- Threaded comments, unlimited depth

## Future

- Reply feature
- Authors linked to their profiles
- Formatting support (markdown, wiki)
- Media support
- Voting on comments
- An algorithm to sort comments based on factors like age (`+new Date - date`), popularity (total votes), quality (determined with NLP algorithms), commenter history/rank, and upvotes
- Auto-moderation based on comment score
- Improve performance by lazy-loading comments where depth or index exceed a certain threshold

I've implemented several custom comment systems in the past. What I've learned is that unless you have very unusual requirements, it is *always* better to use an existing, active, open source solution for the following reasons:

- It will have better features than a custom solution
- It will have fewer bugs than a custom solution
- It will be more usable than a custom solution

This is because:

- It's been around longer than a custom solution
- It's seen more users than a custom solution
- It's seen more edge case browsers and devices than a custom solution
- It has more unit tests than a custom solution
- It has more contributors than a custom solution
- It will be more secure than a custom solution
- Bugs for it will be patched more quickly than for a custom solution

In general the best comment systems I've seen, that a new system should probably be modeled after, are on Slashdot, Reddit, and HackerNews. They are effective at (1) promoting good content, (2) hiding bad content, (3) encouraging original content, and (4) encouraging discussion. Additionally, without more information about wikipedia's userbase, I would consider switching to markdown for its less verbose output than wikitext. It's also more intuitive, faster to author, and more readable.

## Notes

- I didn't fetch http://unicorn.wmflabs.org/techtask/discussion.json directly because of CORS restrictions. A more robust solution would be to use another, CORS-enabled server as a proxy, and request the JSON from there instead.