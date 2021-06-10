# Site changelog

> You can help with the site development by joining us on [Github](https://github.com/alakajam-team/alakajam)!

### June 2021

* Restore the Jamician as the owner of the site

### March 2021

* Add support for read-only mode (just in case of the server room burning down, requiring a restoration from a very old database back until we recover - or not - a more recent version of the database)
* Add support for YouTube channels
* Better support for special awards in events
* Entry page layout changes (mostly metadata reorganization)
* Give a temporary karma penalty to games without links
* Let admins refresh the games Karma event-wise
* Let mods change the division of games

### February 2021

* Remind people to set links and platforms in their entries
* Make event stats in homepage clickable
* Add clickable anchors in docs

### January 2021

* Simplify links in headers, small Events page layout changes
* Filter homepage Twitchs embed to feature Alakajam-related streams only

### December 2020

* Reinforce user registration Captcha

### November 2020

* Minor layout changes in event results page
* Make border colors around form elements more consistent

### October 2020

* Replace Jamician sprite with the Jellymancer throughout the site
* Slow down requests to prevent "denial of service" attacks
* Slow down requests heavily to prevent brute forcing of passwords

### September 2020

* Support theme shortlists of arbitrary sizes
* Rewrite shortlist system to let mods eliminate themes manually
* Improve shortlist UX on mobiles
* Add a "contribute" link to articles
* Let mods manage certain admin settings

### August 2020

* Migrate entire templating system from Nunjucks to JSX
* Change icon for post/entry owner in comment sections
* Add PNG bomb protection in file uploads

### June 2020

* Ability to enter the event as a streamer
* Streamer listing page
* Streamers can rate games 
* Embed live channels in home page, streamer list page, user profile
* Approbation process for streamers
* ScoreSpace x Alakajam: Support restricting tournaments to streamers only
* ScoreSpace x Alakajam: Custom podium for special awards
* Event administration: support closing ratings without revealing the results
* Minor homepage layout changes
* Add themes block to event dashboard
* Minor mobile support improvements

## [18 June 2020: ScoreSpace x Alakajam! launch](https://alakajam.com/scorespace-alakajam)

### May 2020

* Join button for events
* Move event links and more to participation dashboard
* Minor front page styling improvements

### April 2020

* User registration: fix too restrictive check against existing usernames

### March 2020

* Introduce a "hotness" rating for games, used for sorting in the global Games tab
* Improve responsiveness for various pages (tournaments, podium...)
* Fix support for details/summary tags in posts

### February 2020

* New front page with cleaner layout, comment feed
* Remove expand/collapse toggle for blog posts
* Let user allow use of their games for tournaments

### January 2020

* Migrate website to Bootstrap 4 (minor visual changes in all pages)
* Support adding a little ad in the entry form to suggest entering the game to the next tournament
* Improve presentation of the admin settings page
* Set up automated tests on most website features, so that we can quickly detect regressions

### November 2019

* Let users set their timezone in their settings to adapt all displayed dates
* Reorganize user menu links
* Make the "hamburger" user menu look better on mobile
* Drop support for post embeds that don't let us disable tracking cookies (Vimeo, Soundcloud, etc.)
* Remove Google Analytics completely

### October 2019

* Make podium pages support ties
* Display a warning to prevent asking for votes during voting phases
* Replace unranked jam icon to a wizard hat
* Fix high score submission times (were updated every time the score ranking changed)

### September 2019

* Split Docs section into Docs and About
* Entry importer: improve presentation

### June 2019

* Major code refactoring (reorganize and split source files, switch from CSSNext to SASS)
* User dashboard: enable pagination to browse older blog posts
* Add "Voxel's practical tips" article to the docs

### May 2019

* Preview pictures before they are uploaded
* Improve spoiler tag in posts
* Give delete buttons a consistent look throughout the site

### April 2019

* Migrate website sources from JavaScript to TypeScript

### March 2019

* Reworked user profile using tabs
* Display unranked games in the event results page
* Display recent scores near the tournament game list
* People page: display how many entries users have
* Display pending invites in the entry page (only visible to the owner)
* Support searching games with high scores support
* Replace divisions selector when searching games
* Better consistency of Markdown renderer with editor preview
* Ludum Dare game importer improvements
* Add press kit page
* Accept donations

### February 2019

* Generate thumbnails on games to make pages much lighter
* Make game pictures display consistently at a 16:9 ratio
* Support searching games having high scores
* Rework division selector in games search
* Add press kit
* Add Donate button
* Support progress bars in blog posts
* Take karma in account in the game rescue system

### January 2019

* Make Twitter cards use pictures from blog posts & entry pages
* Batch of long overdue bugfixes

### November 2018

* Feature Discord chat on chat page

## [1 November 2018: November Challenge 2018 launch](https://alakajam.com/november-challenge-2018)

### October 2018

* Use Wilson score to select themes & trigger elimination
* Let mods change the type of a post

### September 2018

* Template system to let mods create events more easily
* Event presets to let mods change the state of events more easily

### August 2018

* Rework events page (move non-major events to a second tab)
* Special tab under People to list mods & admins
* Display the non-profit constitution on the website
* Basic registration captcha

### July 2018

* Like system on blog posts
* Support Soundcloud embeds
* Support serviv static assets from a separate domain, to optimize performance
* JSON API: event timeline

### June 2018

* Entry links can be reordered using drag'n'drop
* Users can browse all personal scores from the dashboard
* Implement automatic saving for entry ratings
* Game importer for ldjam.com
* Rename "Feedback Score" concept to "Karma"
* Comment/Post editor now has better mobile compatibility
* Game search: Own entry is now hidden if "rated or commented" is selected
* Game voting: Rated and commented entries are now hidden from the front page suggestions
* Make Google Analytics no longer use cookies, in order to fit GDPR better
* Better support of older browsers

### May 2018

* Let users delete their accounts
* Add a Privacy policy page
* Add CSRF protection on all forms

## [1 May 2018: 1st AKJ Tournament launch](https://alakajam.com/1st-akj-tournament)

### April 2018

* Support for enabling high scores on any game (using pictures as proofs)
* Support for organizing tournaments where users have to beat high scores on a selection of games
* Event banners can be set by admins as backgrounds on various pages
* Game importer for itch.io
* Make entry submission work with JavaScript-free browsers
* Support for buttons and styling them in posts and comments

### March 2018

* Large client-side code refactoring
* Slightly reorganize the Events page (now more mobile-friendly)
* Let users subscribe to comment threads
* Let admins view and moderate all tags
* Make the header shrink with a nice animation when scrolling down

### February 2018

* Support setting tags to games, and searching games by tags
* Support eliminating shortlist themes one by one in the moments before the jam starts
* Front page layout improvements
* Game importer for ludumdare.com
* Improvements on the Games page
* Upgrade the dropdown library, impacting the styling of various forms
* Add post pagination to user profile, event announcements list
* Expose theme shortlist info in the JSON API

### November 2017

* Mods can now manage events just like admins
* Non-visible work on back end: rework CSS/JS build toolchain (switching to webpack)

### October 2017

* Rework competition results page, with pretty trophy pictures
* Add final rankings and ratings to the entry page
* Let people filter out the games they rated/commented on
* Support closing theme voting without revealing the winner
* Add game rescue block
* Add lazy loading for most pictures to make pages load faster
* Events page displays the winners of the past events
* Ratings management: team & solo entries are split into two columns
* Imgur GIFV embeds are allowed in posts
* Admins can customize the divisions per-event
* Event results page: display the number of games per division
* Reorganize the front page, adding the schedule for the next events
* Rework logo
* Expose ratings & rankings in the REST API
* Non-visible work on back end: tweak asset URLs to support CloudFlare

## [13 October 2017: 1st Kajam! launch](https://alakajam.com/1st-kajam)

### September 2017

* Theme voting system is completed (stats, theme elimination, appearance to anonymous users, shortlist ranking phase)
* Game browser added as a global tab
* Entries can opt-out of graphics/audio
* Support for Unranked division
* Support for anonymous comments
* Adding people to a team now sends them an invite, that they have to accept or decline
* Users can see the voting count progress on their own entry
* Add support for featured links & hidden posts (to be used temporarily for wallpapers, streamers etc.)
* Better display of the event navbar on thin mobile screens
* Make logging in redirect to the previous page
* Platform management is now distinct from links
* Markdown editor has new formatting options (text/images alignment)
* People page now has a search form
* Add pagination to various pages
* Custom Markdown guide added (click "?" in the editor toolbar)
* User names now appear next to display names if they differ, to aid mentions
* Posts and comments can now be much longer than before
* Raw URLs put inside posts are now converted to links automatically
* Feedback Score takes votes in account
* Articles now fetch their Markdown directly from Github, so they can update without re-reploying the server
* Games page features pagination
* Reorganize entry sidebar
* Games page displays entries from the current event by default, sorted by Feedback Score
* Changes are no longer lost when there's a validation error upon saving an entry
* Some pages like the game browser & the user dashboard are now full-width
* Posts styling and layout have been tweaked
* Changelog & JSON API pages now integrate the Help sidebar
* Admins can enable an event-related "call to action" block on the home page
* Browsers now make you confirm before closing the tab if you have pending changes in a post
* Alakajam! links now look pretty when shared on Facebook
* Rewritten article system with Markdown files as the backend, to let anyone contribute
* Non-visible work on back end: reorganize client-side JS to make development easier
* Non-visible work on back end: replace form parsing library to fix various major bugs

## [22 September 2017: 1st Alakajam! launch](https://alakajam.com/1st-alakajam)

### August 2017

* Entry voting system, with the ability to view past votes
* Event results page
* Users can add games made in external jams
* Team members can leave the entry
* Team support: users can add other people to their games, granting access rights and listing those people as team members
* JSON API
* HTTP calls are throttled to 1 per second (except static resources)
* Basic theme voting system
* The help section has a sidebar (configurable through an admin setting)
* Entry links let you choose platforms
* Site header looks better on mobile & tablets

### July 2017

* Notification system
* Revamped home page
* Reorganized personal dashboard
* Multiple SEO improvements
* Small performance improvements through caching
* Feedback Score system for sorting entries
* Alakajam! links look pretty when shared on Twitter

## [11 July 2017: 1st Feedback Fortnight launch](https://alakajam.com/1st-feedback-fortnight)

### June 2017

* Support for making posts (including announcements for moderators)
* Comments work (both on blog posts and games)
* Entries can have multiple links
* Add support for embeds & tables in Markdown
* Let the users set to which event a post should be attached
* Add pagination to blog posts
* New event countdown (can be tweaked by editing the event)
* New "People" page in the header
* Article system (see the new "Feedback" header link)
* Events can have theme voting and game results tabs. While the features are missing, admins can display blog posts in it instead.
* User dashboards have a cool home page with a comment feed (not unlike Feedback Friends...)
* Admins can manage events and create new ones
* Admins can edit other users, and promote them to mods/admins
* Mods can edit any post or any game thanks to a special toolbar
* Changes to the user registration process
* Form data is sanitized
* URLs are pretty
* Various theme changes and bugfixes, better mobile support

## [22 June 2017: Site launch](https://alakajam.com/post/2/welcome-to-alakajam)

## [3 June 2017: Nightly site launch](http://nightly.alakajam.com)
