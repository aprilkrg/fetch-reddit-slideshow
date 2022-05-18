console.log("FETCH!")
// function that fetches to random user api
// the response is set up only for this api and how it returns data
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
// randomUserFetch("https://randomuser.me/api/")


// function that fetches to url param
const redditFetch = function(url){
    // console.log(url)
    // create array where we can store images, return arr at end of function
    const images = []
    const options = {
        headers: {
            "Accept": "applicaiton/json",
            // "Access-Control-Allow-Origin": "*"
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(jsonData => {
            // console log the data to see how we need to drill into the obj, using "data", "results", ect
            // reddit api uses .data
            // console.log(jsonData.data, 'data in fetch')
            jsonData.data.children.forEach((item, index) => {
                console.log(item.data, index)
                if(item.data.url) {
                    images.push({img: item.data.url})
                }
            })
        })
        .then(() => {
            const box = document.querySelector("#form-container")
            console.log(box, 'box el in then', images)
            images.forEach((item, index) => {
                console.log(item.img, 'img url')
                let newPic = document.createElement("img")
                newPic.setAttribute("id", index)
                newPic.setAttribute("src", item.img)
                box.append(newPic)
            })
            
        })
        .catch(err => console.warn("there was an error", err))
    // console.log(images, 'images in arr')
    // return images
}
// redditFetch("http://www.reddit.com/search.json?q=cats+nsfw:no")


// query DOM for input id 
// save queried element to variable
const form = document.querySelector("#form")
// console.log(form, "this is the form el")
// set event listener on that variable
form.addEventListener("submit", function(e){
    e.preventDefault()
    // console.log("click", e.target.search.value)
    const searchTerm = e.target.search.value
    // create url to fetch here
    const url = `http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`
    // invoke fetch function with provided reddit url
    const resultImgs = redditFetch(url)
    // console.log(resultImgs, "fetch results in event listener")
    // reset input box to blank value
    e.target.search.value = ""
})
