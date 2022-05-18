# FETCH REDDIT
## SET UP STEPS
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
In `index.html`, add this line to the end of the body section:
```html
<script src="./js/main.js"></script>
```
Add a connection test to the javascript file by writing a console log.
In `main.js`, add this line:
```js 
console.log("FETCH!")
```
Navigate to the browser and confirm you can see the html in the page, and the  message in the console. 
## FETCH FROM REDDIT

### !!! === CHECK IN === !!!
can you see:
- "Hello Front-End" in page
- "FETCH" in console


## CREATE FORM
Things to think about:
- html form elements ( button click test, semantic html )
- javascript form behavior ( prevent default, save user input )


Add html form elements to `index.html`:
```html
<form id="form">
      <label for="searchInput">Enter term to search</label>
      <input type="text" name="search" id="searchInput" placeholder="search term">
      <input type="submit" value="submit">
</form>
```
Now that we have workable html, baby step towards a button click. 


Steps:
- query DOM for button
- save to variable
- add event listener
- log a string when button is clicked


In `main.js`:
```js
const form = document.querySelector("#form")
console.log(form)
form.addEventListener("submit", function(e){
    e.preventDefault()
    console.log("click")
})
```


Bigger step:
- log input on button click

In `main.js`, add second argument to console log:
```js
console.log("click", e.target.search.value)
```

### !!! === CHECK IN === !!!
Can you see:
- click message after button click
- the submitted text in the console


## CREATE AJAX REQUEST

Beef up js submit function:
- write a callback that will fetch to a specfied url
- inside submit function invoke the callback


API request functions are not one size fits all, here's one for fetching from "random user" which returns an array of objects:
```js
const randomUserFetch = function(url){
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            // console log the data to see how we need to drill into the obj, using "data", "results", ect
            // randomUser api uses .results
            console.log(jsonData.results, 'data in fetch')
        })
}
randomUserFetch("https://randomuser.me/api/")
```

We can't access the "results" property on reddit data because that's not how it's structured. Let's try a different function:
```js
const redditFetch = function(url){
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            // console log the data to see how we need to drill into the obj, using "data", "results", ect
            // reddit api uses .data
            console.log(jsonData.data, 'data in fetch')
            jsonData.data.children.forEach((item, index) => {
                console.log(item.data, index)
            })
        })
}
redditFetch("http://www.reddit.com/search.json?q=cats+nsfw:no")
```

Now lets try to get the image urls to log in the console
```js
const redditFetch = function(url){
    console.log(url)
    const images = []
    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            jsonData.data.children.forEach((item, index) => {
                if(item.data.preview) {
                    images.push({img: item.data.preview.images[0].source.url})
                }
            })
        })
    console.log(images, 'images in arr')
}

const form = document.querySelector("#form")
console.log(form, "this is the form el")

form.addEventListener("submit", function(e){
    e.preventDefault()
    console.log("click", e.target.search.value)
    const searchTerm = e.target.search.value
    const url = `http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`
    redditFetch(url)
    e.target.search.value = ""
})
```


### !!! === CHECK IN === !!!
Can you see:
- array of objects in console
- urls as the value in each object


## ADD REQUEST DATA TO DOM
steps:
- start by appending each of the images to the DOM
- then append one at a time, and change it's source after an interval of time

Add to `index.html`:
```html
<div id="form-container">
```



### !!! === CHECK IN === !!!








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