const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const data = []

const listTab = document.getElementById('list-tab')
const dataPanel = document.querySelector('.data-panel')

const genrelabel = document.querySelector('.movie-item-body')

const genreList = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

axios.get(INDEX_URL)
  .then((response) => {
    data.push(...response.data.results)
    displayDataList(results)
  }).catch((error) => {
    console.log(error)
  })

//genres list's bar
function list(genreList, list) {
  let textContent = ''
  textContent = `<a class="list-group-item list-group-item-action" data-toggle="list" role="tab" href="#" data-id="${list + 1}">${Object.values(genreList)[list]}</a>`
  listTab.innerHTML += textContent
}

for (let i = 0; i < Object.keys(genreList).length; i++) {
  list(genreList, i)
}

// 監聽list
listTab.addEventListener('click', event => {
  const moviesgenre = Number(event.target.dataset.id)
  const genre = event.target.matches('[data-toggle="list"]')
  let results = []
  results = data.filter(movie => movie.genres.includes(moviesgenre))
  if (!genre) {
    return
  }
  displayDataList(results)
})

//印出電影卡片
function displayDataList(data) {
  let htmlContent = ''
  data.forEach(function (item, index) {
    htmlContent += `
      <div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h5 class="card-title">${data[index].title}</h5>            
    `
    data[index].genres.forEach(function (value) {
      htmlContent += `<p class="d-inline-block bg-light mx-1 ${value}">${genreList[value]}</p>`
    })

    htmlContent += `
          </div >
        </div >
      </div >
    `
  })
  dataPanel.innerHTML = htmlContent
}
