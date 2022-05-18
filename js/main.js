console.log("FETCH!")
// function that fetches to random user api
// the response is set up only for this api and how it returns data
// const randomUserFetch = function(url){
//     console.log(url)
//     fetch(url)
//         .then(response => response.json())
//         .then(jsonData => {
//             // console log the data to see how we need to drill into the obj, using "data", "results", ect
//             // randomUser api uses .results
//             console.log(jsonData.results, 'data in fetch')
//         })
// }
// randomUserFetch("https://randomuser.me/api/")


// stop the interval that switches images
const stopFetch = function() {
    // smallest step:
    // console.log("click")
    clearInterval(intervalObj)
    render()
}
// reset DOM elements to original state
const render = function() {
    // select form & add event listener to form with callback function(=> 3.A)
    const form = document.querySelector("#form")
    form.style.display = "block"
    // select & hide my kitten image so I can change the source later
    const kittenImg = document.querySelector("#img")
    kittenImg.style.display = "none"
    // set input text to empty string
    form.search.value = ""
}


// 3.B.
// function that fetches to url param
const redditFetch = function(url){
    // smallest step:
    // console.log(url, 'url param')
    // B.i
    // create array where we can store images, return arr at end of function
    const images = []
    // B.ii
    // create object to store fetch request header options
    // NOTE: thought I could solve cors issues with acao:* but it didn't work that way when I tried
    const options = {
        headers: {
            "Accept": "applicaiton/json",
            // "Access-Control-Allow-Origin": "*"
        }
    }
    // B.iii
    // fetch data 
    fetch(url, options)
        // iii.a
        // chain promise - get response and jsonify it
        .then(response => response.json())
        // iii.b
        // chain promise - do something with the jsonified data
        .then(jsonData => {
            // smallest step: 
            // MOST IMPORTANT STEP !!! ~SHAPE OF DATA REVEALED HERE~ !!! DEBUG HERE
            // console.log(jsonData.data, 'data in fetch')
            // b.1
            // iterate over data with a for each loop
            jsonData.data.children.forEach((item, index) => {
                // smallest step:
                // console.log(item.data, index)
                // 1.A
                // if object has a url property, add it to images array
                if(item.data.url) {
                    images.push({img: item.data.url})
                }
            })
        })
        // iii.c
        // chain promise - set the img src to change on interval
        .then(() => {
            // smallest step:
            // console.log(images, 'image url array')
            // c.1
            // select img from DOM and set it's src property to the first image in arr
            const targetImg = document.querySelector("#img")
            targetImg.src = images[2].img
            // c.2
            // change display attribute on image variable
            targetImg.style.display = "block"
            // c.3
            // set interval that changes kitten image source
            intervalObj = setInterval(function(){
                for(let i = 3; i < images.length; i++) {
                    targetImg.src = images[i].img
                    console.log(targetImg.src, 'source in interval')
                }
            }, 4000)
        })
        // iii.d
        // prepare error handling like good devs
        .catch(err => console.warn("there was an error", err))
}




// 3.A
// callback function - invoked when form is submitted, bound in step 3
const handleFormSubmit = function(e){
    // A.i
    // prevent default form behavior
    e.preventDefault()
    // smallest step:
    // console.log("click", e.target.search.value)
    // A.ii
    // save search term to variable
    const searchTerm = e.target.search.value
    // A.iii
    // create url string interpolated with search term variable
    const url = `http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`
    // A.iv
    // invoke fetch function with url variable(=> 3.B)
    const resultImgs = redditFetch(url)
    // smallest step:
    // console.log(resultImgs, "fetch results in event listener")
    // A.v
    // reset search target value in case I wanna use it again
    e.target.search.value = ""
    // A.vi
    // hide form from DOM
    form.style.display = "none"
}

// 1. 
// add event listener to DOM
document.addEventListener("DOMContentLoaded", () => {
    // 2.
    // render starting position
    render()
    // 3.
    // select form & add event listener to form with callback function(=> 3.A)
    const form = document.querySelector("#form")
    form.addEventListener("submit", handleFormSubmit)
    
    // create global interval cvariable
    let intervalObj
    // select stop button & add event listener to clear interval and rerender DOM
    const stopBtn = document.querySelector("#stop-btn")
    stopBtn.addEventListener("click", stopFetch)

    // 4. 
})