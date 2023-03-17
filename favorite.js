//命名網址
const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies'
const POSTER_URL = BASE_URL + '/posters/'

const movies = JSON.parse(localStorage.getItem('favoriteMovies')) || []
const dataPanel = document.querySelector('#data-panel')

function renderMovieList(data){
  // console.log(data)
  let rawHTML =``
  data.forEach(function(item){
    // console.log(item)
    rawHTML += `
    <div class="col-sm-3">
      <div class="mb-2">
        <div class="card">
          <img src="${POSTER_URL + item.image}" class="card-img-top" alt="Movie-poster">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-show-movie"
            data-bs-toggle="modal"
            data-bs-target="#movie-modal"
            data-id="${item.id}"
            >更多</button>
            <button class="btn btn-danger btn-add-favorite" data-id="${item.id}">X</button>
          </div>
        </div>
      </div>
    </div>`
  })
  dataPanel.innerHTML = rawHTML
}


function showMovieModal(id){
  // console.log(id)
  const movieTitle = document.querySelector('#movie-modal-title')
  const movieDate = document.querySelector('#movie-modal-date')
  const movieDescription = document.querySelector('#movie-modal-description')
  const movieImage = document.querySelector('#movie-modal-image')
  axios.get(INDEX_URL +'/'+ id).then(function(response){
    const data = response.data.results
    console.log(data)
    movieTitle.innerText = data.title;
    movieDate.innerText = data.release_date;
    movieDescription.innerText = data.description;
    movieImage.innerHTML = `
    <img src="${POSTER_URL + data.image}" alt="movie-poster" class="img-fluid">
    `
  })
}

function removeFromFavorite(id){
  // console.log(id)
  function isMovieIdMatched(movie){
    return movie.id === id
  }
  const movieIndex = movies.findIndex(isMovieIdMatched)
  movies.splice(movieIndex,1)
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  renderMovieList(movies)
}

dataPanel.addEventListener("click",function onPanelClicked(event){
  // console.log(event.target.matches('.btn-show-movie'))
  if(event.target.matches('.btn-show-movie')){
    // console.log(event.target.dataset.id)
    showMovieModal(Number(event.target.dataset.id))
  }else if(event.target.matches('.btn-add-favorite')){
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

renderMovieList(movies)