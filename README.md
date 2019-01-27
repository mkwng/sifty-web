# Sifty

A space for your digital documents

![Demo of current status](./demo/2019-01-19.gif)
> Status of app as of Jan 19, 2019

## Features:
* Connect and link to documentation and files across all your digital workspaces
* Annotate files and spaces for quick previews and summaries of what you’re looking for
* Search across or within spaces for that one hard to find file
* Integrate seamlessly into Slack channels
* Get notified when files change or are updated 

## Todo:
### Sharing
* Create invitation objects
* Sharing collaborator & viewer roles
* Publically accessible collections

### Presentation
* Fetch collection data on collections.js
* Remove dependency on Absolute React Grid
* Auto poll of new collections seems to be broken

### Screencaps
* Loading state when grabbing screenshot
* Image http vs https issues
* Determine if the provided image is not high quality
* Remove dependency on ScreenShotLayer and use browserhot

### SSR
* Port to Next.js for SSR and correct routing

### Misc
* Linting issue with name sanitizer in NewCollection.js