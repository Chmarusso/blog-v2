---
title: Połączenie React z Redux
date: 2019-04-03 16:55:53
tags:
- kurs redux
- javascript
category: post
intro: Naucz się jak wyświetlać i zmieniać dane z poziomu komponentów React
cover: ./redux-react.jpg
full_cover: ./redux-react.jpg
---
Dane umieszczamy w stanie Redux ponieważ chcemy je wyświetlać lub zmieniać z użyciem komponentów React. Inaczej trzymanie ich tam nie miałoby większego sensu. Połączenie tych dwóch światów jest możliwe dzięki funkcji redux-connect . W poniższych lekcjach pokazuję w jaki sposób używać podejścia mapStateToProps oraz mapDispatchToProps. Tłumaczę także czym jest HOC (Higher Order Component) i dlaczego konieczne jest użycie go w naszych komponentach React.

Na początek nauczymy się jak podłączyć React do store'a w Reduxie i wyświetlić wycinek danych:

<div class="aspect-ratio aspect-ratio--16x9 mv5">
  <iframe src="https://www.youtube.com/embed/8h2Rlt-U2Mc" class="aspect-ratio--object" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>
Następnie warto opanować technikę zmiany danych, które mamy w storze po przez wykonywanie akcji:
<div class="aspect-ratio aspect-ratio--16x9 mv5">
  <iframe src="https://www.youtube.com/embed/S8YRyutrRTA" class="aspect-ratio--object" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>

```javascript
import React from 'react'
import { connect } from 'react-redux'

 const MoviesContainer = ({movies}) =>
  <ul>
    {movies.list.map(movie => <li>{movie}</li>)}
  </ul>

 const mapStateToProps = (state) => ({
  movies: state.movies
})

 export default connect(
  mapStateToProps, {}
)(MoviesContainer)
```

```javascript
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../duck/actions'

 const MoviesForm = ({add}) => {
  const movieInput = React.createRef()

   const addMovie = (event) => {
    event.preventDefault()
    add(movieInput.current.value)
    movieInput.current.value = ''
  }

   return <form onSubmit={addMovie}>
    <input ref={movieInput} />
    <button type='submit'>Add movie</button>
  </form>
}

 const mapDispatchToProps = dispatch => ({
  add: (movie) => dispatch(actions.add(movie))
})

 export default connect(null, mapDispatchToProps)(MoviesForm)
```

Kod z tego odcinka: [Github](https://github.com/Chmarusso/podstawy-redux/commit/50413eb67ebe5640a58168b80fb46ce348a4a703)

Zadanie domowe: Wyświetl dane z Redux i zmień je używając formularza HTMl.

