---
title: Zapytania do API (redux-thunk)
date: 2019-04-24 16:55:53
tags:
- kurs redux
- javascript
category: post
intro: Naucz się jak odpytywać asynchronicznie API
cover: ./redux-thunk-cover.jpg
full_cover: ./redux-thunk-cover.jpg
---
Aplikacje webowe bardzo często mają potrzebę pobrać lub zapisać coś na serwerze. Zwykle dzieje się to użyciem protokołu HTTP poprzez wywoływanie konkretnych endpointów przez klienta (zapytanie HTTP). Z tej lekcji dowiesz się w jaki sposób wykonywać zapytania asynchroniczne do zewnętrznego serwera API.

Zanim przystąpisz do kodowania potrzebować będziesz serwer, który możesz odpytać po jakieś dane. Na końcu tego artykułu znajdziesz link do przykładowego serwera NodeJS, który łatwo można uruchomić lokalnie.

Na potrzeby tego tutoriala skorzystamy z biblioteki [redux-thunk](https://github.com/reduxjs/redux-thunk), która pozwala wykonać nam takie zapytania i zmienić odpowiednio stan aplikacji.


<div class="aspect-ratio aspect-ratio--16x9 mv5">
  <iframe src="https://www.youtube.com/embed/2aez-KIF_SU" class="aspect-ratio--object" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>

```javascript
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllMovies } from '../duck/operations.js'

const MoviesContainer = ({movies, getAllMovies}) => {
  useEffect(() => { getAllMovies() }, [])

  return <ul>
    {movies.list.map(movie => <li>{movie}</li>)}
  </ul>
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

const mapDispatchToProps = dispatch => ({
  getAllMovies: () => dispatch(getAllMovies())
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(MoviesContainer)
```

Kod z tego odcinka: [Github](https://github.com/Chmarusso/podstawy-redux/commit/50413eb67ebe5640a58168b80fb46ce348a4a703)

Przykładowe API do uruchomienia lokalnie: [Github](https://github.com/Chmarusso/movies_api_hapi)

Zadanie domowe: Wykonaj zapytanie do API aby dodać nowy film (formularz).


