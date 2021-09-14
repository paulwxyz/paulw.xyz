# PaulW.XYZ

This is a draft of the rationale behind writing pages the way I have. I do not like the traditional web conventions so this is where I experiment the most with interfacing elements. The navigation pane-based design works when they are simple and easy to understand. When they get too complex, people rely on using search bars to get where they want. My goal is to find a method to eliminate the visual noise of the complex navigation panes and find a reasonable alternative them while being easy to use. 

## Page Categorization
The home page or the index page solely acts as a gateway to all the other pages on the site.
The accessible pages are categorized on a need-based system. Since I currently do not have multiple pages, I have them all under one single directory.

As with other typical static webpages, the `stylesheet/` directory contains the CSS files and the `scripts/` directory contains the JS files.

## Design Principles
The goal of my home page's design is to keep this minimal. There is no need for unnecessary content to waste people's time. The rule is simple: only waste one's time if they willingly do so.

Modern webpages tend to be bulky. This entire site should retain the modern design while being as minimal and static as possible.
- minimal: a page should not overly rely on programming logic unless the focus is programming logic
- static: informational pages should not be dynamically changing as the focus is on the content itself

### Design Problems
A new user would never understand how this site works.
My ideal navigation system would involve having as few navigation elements as possible. This is the reason why I chose to add solely the fuzzy-search bar. However, I have not been able to find a good way to give users of my pages a good way to interact in case they do not use the search bar. I previously used to list them all but it was not easy on the eyes and looked lazy. Maybe a command system that does not use symbols (considering touch devices do not support non-Latin character insertions easily). Maybe something similar to \*nix commands. The site somewhat vaguely follows the basic file-system structure. However, this goes against my goal of "ease-of-use" which is why I have not done it yet.
