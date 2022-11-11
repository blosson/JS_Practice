- API key가 있어야지 TMDB에서 API 링크를 가져올 수 있음!!

- bootstrap CDN 가져와서 link 와 script를 index.html 파일에 넣어줌

- 원하는 card나 아무거나 링크 가져와서 해당 template에 넣어줌

- bootstrap CDN 가져온 후 class=”container” 작성하면 좁혀짐 (한칸에 들어옴)

- 왜 MovieView에서 src에 poster_path를 조합한 링크를 넣을 수 없었는지
    - 자식 컴포넌트로 프롭해서 data, computed로 넣어주면 가능함 (자식 컴포넌트에서는 for문을 사용하지 않기 때문)
    
    ```jsx
    
    --- MovieView.vue (부모)
    
    <template>
      <div class="container">
        <h1>Movie</h1>
        <br>
        <div class="row row-cols-1 row-cols-lg-3 g-4">
          <div v-for="(movie, index) in movies" :key="index">
            <MovieCard :movie="movie"/>
          </div>
        </div>
      </div>
    </template>
    
    --- MovieCard.vue (자식)
    
    <template>
      <div>
        <div class="container">
            <div class="col">
              <div class="card h-100">
                <img :src="movieSrc" class="card-img-top" :alt="movie.title">
                <div class="card-body">
                  <h5 class="card-title">{{ movie.title }}</h5>
                  <p class="card-text">{{ movie.overview }}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'MovieCard',
      props: {
        movie: Object,
      },
      computed: {
        movieSrc() {
          const movieSrc = `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
          return movieSrc
        }
      }
    }
    </script>
    ```
    

- bootstrap  class 속성 중에 row / row-cols-1 / g-4 등
    - 카드 배치할 때 쓰임

---

<vuex 버전>

- API를 가져올 때 어디서 axios를 받아와야할지 몰랐다.
    - axios가 실행될 때 → .then에서 response~~~~ data를 store/index.js로 보내주었다.
        - 바로 mutattions로 보내주어서 actions 과정을 굳이 하지 않음
    - mutations에서 data에 받은 데이터를 받아주었다. (그럼 이제 state에 저장된 데이터를 다른 곳에서 편하게 쓸 수 있음)
    
    ```jsx
    
    --- MovieView.vue
    
    <script>
    import axios from 'axios'
    import MovieCard from '@/components/MovieCard'
    
    export default {
      name: 'MovieView',
      components: {
        MovieCard,
      },
      data() {
        return {
          movies: [],
        }
      },
      methods: {
        getMovies() {
    
          axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=a10047aa70542f33ac2138abb4e13bb7&language=en-US&page=1',
          })
            .then((response) => {
              this.movies = response.data.results
              this.$store.commit('GET_MOVIES', this.movies)
            })
        },
    
    --- store/index.js
    
    mutations: {
        GET_MOVIES(state, moviesData) {
          state.movies = moviesData
        },
    ```
    

- random함수나 lodash로 정상적으로 하나를 가져와야하는데 실행이 되지 않음
    - 버튼을 클릭해야 null값인 movie가 채워지는데 처음 html을 불러올 때는 그게 안되었다. 그래서 v-show나 v-if를 사용해주면 정상적으로 출력됨!
    
    ```jsx
    --- RandomView.vue
    
    <template>
      <div>
        <h1 v-if="weather">{{ weather.description }}한 날씨에</h1>
        <h3 v-if="movie">{{ genres[movie.genre_ids[0]] }} 영화 어때요?</h3>
        <button @click="pickMovie">PICK</button>
        <br><br>
        <div v-if="movie">
          <div class="card mx-auto" style="width: 18rem;">
            <img :src="movieSrc" class="card-img-top" :alt="movie.title">
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    ```
    

- lodash말고 Math함수로 랜덤값 가져오는법
    - 오른쪽 *가 총 몇 개 중에서 가져오는지를 뜻하는 거였다. 그래서 영화 개수만큼 중에서 한 개를 뽑아오라는 거였음

```jsx
this.movie = this.movies[Math.floor(Math.random() * this.movies.length)]
```

- state에서 isclicked가 변경될 때, 실시간으로 반영이 안 됨. —→ 그래서 computed나 methods에서 바꾸어주어야 함
    - computed에서 data값은 바꿀 수 없음 .기존 데이터값을 기반으로 새로운 건 만들 수 있지만  애초에 바꾸지는 못함
    - 그래서 변수 선언을 해서 값을 받아주거나 애초에 state에서 받아온 값을 return해서 template에서 사용
    - 버튼을 클릭해야 null값인 movie가 채워지는데 처음 html을 불러올 때는 그게 안되었다. 그래서 v-show나 v-if를 사용해주면 정상적으로 출력됨!

- state에서 isclicked가 변경될 때, 실시간으로 반영이 안 됨. —→ 그래서 computed나 methods에서 바꾸어주어야 함
    - computed에서 data값은 바꿀 수 없음 .기존 데이터값을 기반으로 새로운 건 만들 수 있지만  애초에 바꾸지는 못함
    - 그래서 변수 선언을 해서 값을 받아주거나 애초에 state에서 받아온 값을 return해서 template에서 사용
    
    ```jsx
    <template>
      <div>
        <div v-for="(movie, index) in addMovie" :key="index">
          <span
            :class="{ 'is-clicked' : movie.isClicked }"
            @click="updateMovie(movie)"
          >
            {{ movie.title }}
          </span>
          <button @click="deleteMovie(movie)">X</button>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'WatchListItem',
      computed: {
        addMovie() {
          const movie = this.$store.state.dreamMovie
          return movie
        }
    ```
    
- map 사용해서 비교하는 거 (update에서 - 취소선 클릭)
    - 우리 생각에는 분명 같은 title인데 왜 전부다 is-clicked가 변경이 안 되고 해당~~~만 클릭되었는지?
        - 우리가 객체끼리 비교했기 때문에 title과 is-clicked가 같다고 해도 객체의 key값이 다르기 때문에 애초에 다른 것으로 인식함. 그래서 아무 문제 없었던 것임 (운이 좋았다.)
        
        ```jsx
        UPDATE_MOVIE(state, clickedMovie) {
              state.dreamMovie = state.dreamMovie.map((movie) => {
                if (movie === clickedMovie) {
                  movie.isClicked = !movie.isClicked
                }
                return movie
              })
        ```
        

- actions에서 객체를 생성하는 게 바람직함  mutations에서는 push 혹은 state 변경만 하는 것이 바람직!!!!

```jsx
actions: {
    createMovie(context, movieTitle) {
      const movie = {
        title: movieTitle,
        isClicked: false,
      }
      context.commit('CREATE_MOVIE', movie)
```

- 날씨 API 받아오고 ~~한 날씨에 ~~~장르 영화 어때요. 이렇게 띄우고 싶은데
    - PICK 버튼을 눌러야지만 API가 받아와진다. 그런데 날씨 상태를 띄울 h1 태그는 pick 버튼이 나타날 때 띄워지므로 Axios를 methods가 아닌 created에 넣어줘서 이동하자마자 API가 AXIOS로 받아와지게 해준다. 그럼 됨~~~
    
    ```jsx
    <template>
      <div>
        <h1 v-if="weather">{{ weather.description }}한 날씨에</h1>
        <h3 v-if="movie">{{ genres[movie.genre_ids[0]] }} 영화 어때요?</h3>
        <button @click="pickMovie">PICK</button>
        <br><br>
        <div v-if="movie">
          <div class="card mx-auto" style="width: 18rem;">
            <img :src="movieSrc" class="card-img-top" :alt="movie.title">
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <script>
    import axios from 'axios'
    import _ from 'lodash'
    
    export default {
      name: 'RandomView',
      data() {
        return {
          movies: [],
          movie: null,
          weather: null,
          genres: {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Science Fiction",
            10770: "TV Movie",
            53: "Thriller",
            10752: "War",
            37: "Western"
          },
          algorithm: {
            2: [27, 53, 80, 9648, 10752],
            8: [28, 35, 36, 37, 878],
        },
          genreList: [],
          recommendedMovie: [],
        }
      },
      methods: {
        createMovieList() {
          this.movies = this.$store.state.movies
          // this.movie = this.movies[Math.floor(Math.random() * this.movies.length)]
    
          axios({
            method: 'get',
            url: 'https://api.openweathermap.org/data/2.5/weather?lat=37.495435686811&lon=127.02915553846&appid=fc73a0426bff764a1c8dd6fb5b96e300',
          })
            .then((response) => {
              this.weather = response.data.weather[0]
              const weatherId = parseInt(this.weather.id / 100)
              
              this.genreList = this.algorithm[weatherId]
              
              for (const movie of this.movies) {
                for (const id of movie.genre_ids) {
                  if (this.genreList.includes(id)) {
                    this.recommendedMovie.push(movie)
                  }
                }
              }
    
              this.recommendedMovie.sort(function(score1, score2) {
                return score2.vote_average - score1.vote_average
              })
            })
        },
        pickMovie() {
          this.movie = _.sample(this.recommendedMovie)
        }
      },
      computed: {
        movieSrc() {
          const movieSrc = `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
          return movieSrc
        }
      },
      created() {
        this.createMovieList()
        this.pickMovie()
      }
    }
    </script>
    ```
    

많이 배웠습니다 교수님. 

항상 감사드립니다!!

이예진 손민혁 드림.