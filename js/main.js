/*
===== FUNCTIONS =====
// domcontentloaded (event listeners)
// render (set DOM and page elements)
// timer
// change picture
// stop timer & change picture
// fetch images
*/

/*
===== DOM CONTENT VARIABLES =====
// form input
// form submit
// stop button
// image
// interval object
// fetched image array
*/

const render = () => {
    console.log("render invoked")
    // select form
    // set form display to block
    // set form input value to string
    // select img
    // set img display to none
}

const stopFetch = () => {
    console.log("stop the fetch")
    // clear interval timer
    // invoke render function
}

const formHandleSubmit = () => {
    console.log("form submitted")
    // pass event object
    // prevent default form behavior
    // save target search value to variable
    // interpolate search variable into url
    // pass url variable as param in invocation of reddit fetch function
    // set form style display to none
}

const redditFetch = () => {
    console.log("reddit fetching")
    // set header options
    // invoke fetch
    // promise: jsonify response
    // promise: map & filter jsonified data to images array
    // promise: set interval to change img element src, select from images array
    // catch errors like good devs
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded")
    // invoke render function
    // add event listener to form (form handle submit)
    // add event listener to stop button (stop fetch)
})