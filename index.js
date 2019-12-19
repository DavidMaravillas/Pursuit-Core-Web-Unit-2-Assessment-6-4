let filmList = document.querySelector("#filmList")
let filmQuery = document.querySelector("#filmQuery")

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

fetchMovieList()
movieInfo()