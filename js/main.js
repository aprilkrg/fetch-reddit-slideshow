console.log("good morning developers")
// fetch
// triggered by submission of form
// prevent default
// fetch . then .catch

// select form input from dom 
let formInput = document.querySelector("#formInput")

function fetchReddit(e) {
    e.preventDefault()
    // placehold value - hardcoded right now, but later we'll use user input
    // let value = "dogs" // testing only
    // gather user input
    console.log("input =>",formInput.value)

    fetch(`http://www.reddit.com/search.json?q=${formInput.value}+nsfw:no`)
        .then(result => result.json())
        .then(results => {
            console.log(results.data.children)
            let resultImages = results.data.children.map(child => {
                return {
                    url: child.data.url,
                    title: child.data.title
                }
            })
            console.log(resultImages)
        })
        .catch(console.warn)
}
// fetchReddit() // used for testing only

// select dom elements and dave to variables
// create event listeners

let stopBtn = document.querySelector("#stopBtn")
stopBtn.addEventListener("click", function(){
    console.log("stop")
})
let submitBtn = document.querySelector("#submitBtn")
submitBtn.addEventListener("click", fetchReddit)