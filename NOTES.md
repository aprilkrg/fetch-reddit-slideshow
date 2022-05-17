# SET UP STEPS
- fork and clone this [repo](https://github.com/WDI-SEA/fetch-reddit-slideshow)
- create js file 
- connect js to html file

Commands:
```bash
git clone https://github.com/<TACOTACOTACO>/fetch-reddit-slideshow
cd fetch-reddit-slideshow
touch js/main.js
code .
```
Link the javascript file to the html file by including the script tag and setting the source to the relative path.
In `index.html`, add this line to the "head" section:
```html
<script src="./js/main.js"></script>
```
Add a connection test to the javascript file by writing a console log.
In `main.js`, add this line:
```js 
console.log("FETCH!")
```









<!-- 
# SOLUTION FROM 124
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reddit Slideshow</title>
  <link  href="./css/styles.css" rel="stylesheet"/>
</head>
<body>
  <div class="center">
    <h1 id="title-header">Fetch Some Reddit</h1>
  </div>

  <div class="center">
    <p id="description-p">enter a search below to fetch some reddit</p>
  </div>

  <div class="center">
    <form id="search-form">
      <label for="search-input">Search:</label>
      <input type="text" id="search-input" placeholder="search reddit!" />

      <input type="submit" id="submit-button" />
    </form>
  </div>

  <div class="center">
    <button id="stop-button">STOP THE MADNESSS!!!!</button>
  </div>

  <div class="center">
    <div id="slideshow-container"></div>
  </div>

  <script src="./js/script.js"></script>
</body>
</html>
```

```js
// http://www.reddit.com/search.json?q=cats+nsfw:no&limit=100

// APP STATE
// ms speed of the interval
const TIMER_SPEED = 1000
// interval for the slideshow
let slideshowInterval
// current image index
let imageIndex = -1
// an array of images to display
let images = []

// DOM ELEMENTS 
let titleHeader, descriptionP, searchForm, searchInput, stopButton, slideshowContainer

// FUNCTIONS
// invokes on fomr submit and fetches reddit
function fetchReddit(e) {
  e.preventDefault()
  // searchInput.value = 'chonkers' // TODO: remove this when finished
  if (!searchInput.value) return searchInput.placeholder = 'type something in!'
  const searchUrl =  `http://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no&limit=100`
  fetch(searchUrl)
    .then(response => response.json())
    .then(redditJson => {
      images = redditJson.data.children.map(child => {
        return {
          url: child.data.url,
          sub: child.data.subreddit,
          author: child.data.author
        }
      })
      .filter(child => child.url.slice(-4) ==='.jpg' || child.url.slice(-4) === '.png')

      // start the slideshow
      // hide everything on screen
      titleHeader.style.display = 'none'
      descriptionP.style.display = 'none'
      searchForm.style.display = 'none'
      // show the stop button and slideshow div
      stopButton.style.display = 'inline'
      // show slideshow container
      slideshowContainer.style.display = 'block'
      // start the interval for the slideshow
      slideshowInterval = setInterval(changeSlide, TIMER_SPEED)
    })
    .catch(console.log)
}

function changeSlide() {
  // increment the current index
  imageIndex++
  // if the current index is too large -- reset to the beginning
  if (imageIndex >= images.length) imageIndex = 0
  
  while (slideshowContainer.firstChild) {
    slideshowContainer.removeChild(slideshowContainer.firstChild)
  }

  // create some elements and append them to the slideshow div
  const image = document.createElement('img')
  image.src = images[imageIndex].url
  image.alt = 'image fetched from reddit'
  image.width = window.innerWidth
  image.height = window.innerHeight
  const author = document.createElement('h4')
  author.innerText = images[imageIndex].author
  const sub = document.createElement('p')
  sub.innerText = images[imageIndex].sub
  // append new els on the slideshow el
  slideshowContainer.appendChild(image, author, sub)
 }

function stopSlideshow() {
  // hide the slideshow 
  stopButton.style.display = 'none'
  slideshowContainer.style.display = 'none'
  // reset app state
  clearInterval(slideshowInterval)
  images = []
  imageIndex = -1
  // show original landing page
  titleHeader.style.display = 'inline'
  descriptionP.style.display = 'inline'
  searchForm.style.display = 'block'
}

// DOM CONTENT LOAD INITIALIZER
document.addEventListener('DOMContentLoaded', () => {
  titleHeader = document.querySelector('#title-header')
  descriptionP = document.querySelector('#description-p')
  searchForm = document.querySelector('#search-form')
  searchInput = document.querySelector('#search-input')
  stopButton = document.querySelector('#stop-button')
  slideshowContainer = document.querySelector('#slideshow-container')
  // console.log(titleHeader, descriptionP, searchForm, searchInput, stopButton, slideshowContainer)
  // listen for submits
  searchForm.addEventListener('submit', fetchReddit)
  // listen clicks on the stop button
  stopButton.addEventListener('click', stopSlideshow)
  // show the stop button and slideshow div
  stopButton.style.display = 'none'
  slideshowContainer.style.display = 'none'
})
```
 -->