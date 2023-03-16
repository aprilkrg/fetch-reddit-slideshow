console.log("good morning developers")
// fetch
// triggered by submission of form
// prevent default
// fetch . then .catch

// select form input from dom 
let formInput = document.querySelector("#formInput")
let slideshowEl = document.querySelector("#slideshow")

// access the images globally
let resultImages
let slideshowInterval

function fetchReddit(e) {
    e.preventDefault()
    // placehold value - hardcoded right now, but later we'll use user input
    // let value = "dogs" // testing only
    // gather user input
    console.log("input =>",formInput.value)

    fetch(`http://www.reddit.com/search.json?q=${formInput.value}+nsfw:no`)
        .then(result => result.json())
        .then(results => {
            // console.log(results.data.children)
            resultImages = results.data.children.map(child => {
                return {
                    url: child.data.url,
                    title: child.data.title
                }
            })
            // filter out bad results
            .filter(image => {
                let imgExtension = image.url.slice(-4)
                return imgExtension === ".jpg" || imgExtension === ".png"
            })
            console.log("inside fetch", resultImages)
            // invoke a function and pass images as argument
            // slideshow(resultImages)
            slideshowInterval = setInterval(() => {
                slideshow(resultImages)
            }, 3000)

        })
        .catch(console.warn)
}
// fetchReddit() // used for testing only
let imgIndex = 0 

// slideshow function
function slideshow(resultImages) {
    console.log("imgs =>",resultImages)
    console.log("el =>", slideshowEl.src)
    // slideshowEl.src = resultImages[0].url // testing only
    if(imgIndex >= resultImages.length) {
        imgIndex = 0
    }
    slideshowEl.src = resultImages[imgIndex].url
    imgIndex = imgIndex + 1
}



// select dom elements and dave to variables
// create event listeners
let stopBtn = document.querySelector("#stopBtn")
stopBtn.addEventListener("click", function(){
    console.log("stop")
    clearInterval(slideshowInterval)
})
let submitBtn = document.querySelector("#submitBtn")
submitBtn.addEventListener("click", fetchReddit)