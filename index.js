let filmList = document.querySelector("#filmList")
let filmQuery = document.querySelector("#filmQuery")
let filmReview = document.querySelector("#film_review")
let display = document.querySelector("#display")
let selectedFilm = ""
let currentMovieTitle = ""

const appendFilmList = (arr) =>{
    arr.forEach(el=>{
        let option = document.createElement("option")
        option.innerText = el["title"]
        option.value = el["url"]
        filmList.appendChild(option)
    })
}

const fetchMovieList = async ()=>{
    let url = "https://ghibliapi.herokuapp.com/films"
    try {
        let movieList = await axios.get(url)
        let movies = movieList.data
        appendFilmList(movies)
    } catch (err){
        console.log(err)
    }
}

const fetchMovieInfo = async (url)=>{
    try {
        display.innerHTML = ""
        let film = await axios.get(url)
        movieInfo = film.data
        let h3 = document.createElement("h3")
        let releaseYear = document.createElement("p")
        let desc = document.createElement("p")
        h3.innerText = movieInfo["title"]
        releaseYear.innerText = movieInfo["release_date"]
        desc.innerText = movieInfo["description"]
        display.appendChild(h3)
        display.appendChild(releaseYear)
        display.appendChild(desc)
        currentMovieTitle = movieInfo["title"]

    } catch (err){
        console.log(err)
    }

}

const buildReview = () =>{
    let userReview = document.querySelector("userReview")
    let form = document.createElement("form")
        let input = document.createElement("input")
        let submit = document.createElement("input")

        form.action = "submit"
        form.id = "userReview"
        input.type = "text"
        input.id = "review"
        submit.innerText = "Submit Review"
        submit.type = "submit"
        form.appendChild(input)
        form.appendChild(submit)
    let reviewUl = document.createElement("ul")

    reviewUl.id = "reviewUl"
    form.appendChild(reviewUl)
    filmReview.appendChild(form)
}

fetchMovieList()


filmList.addEventListener("change",(event) =>{
    selectedFilm = event.currentTarget.value
})

buildReview()

filmQuery.addEventListener("submit",(event)=>{
    event.preventDefault()
    fetchMovieInfo(selectedFilm)
    let userReview = document.querySelector("#userReview")
    userReview.addEventListener("submit", (event)=>{
        event.preventDefault()
        let review = document.querySelector("#review")
        let reviewUl = document.querySelector("#reviewUl")
        if(!review.value){
            alert("submit a review")
        } else {
            let li = document.createElement("li")
            currentMovieTitle
            li.innerText = `${currentMovieTitle} ${review.value}`
            reviewUl.appendChild(li)
        }
        
    })
})


