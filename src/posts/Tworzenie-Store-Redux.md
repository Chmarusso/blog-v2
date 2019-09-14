---
title: Tworzenie store'a w Redux
date: 2019-03-19 16:55:53
tags:
- kurs redux
- javascript
category: post
intro: Z tej lekcji dowiesz się jak utworzyć store w Redux oraz jak odczytywać jego stan
cover: ./redux1.jpg
full_cover: ./redux1.jpg
---

Drzewo całego stanu aplikacji tworzonych z użyciem Redux przechowywane jest w storze. Store jest to więc serce naszych danych, bez którego nie wykonamy żadnego kroku dalej.
By zacząć korzystanie z Reduxa musimy stworzyć store. W tym celu wystarczy skorzystać z funkcji createStore, którą oferuje nam redux:
```javascript
import { createStore } from 'redux'

 const initialMovies = {
  movies: [
    'Rambo III', 'Hakerzy', 'Matrix'
  ]
}

 function movies(state = initialMovies, action) {
  switch (action.type) {
    default:
      return state
  }
}

const store = createStore(movies)
```

Wynikiem działania funkcji createStore jest obiekt, który posiada kilka przydatnych w dalszej pracy metod:
* getState (pobranie aktualnego stanu)
* dispatch (wywołanie akcji, która powoduje wyprodukowanie nowego aktualnego stanu)
* subscribe (nasłuchiwanie zmian zachodzących w storze)

Na poniższym nagraniu możecie zobaczyć w praktyce tworzenie store’a w Reduxie.
<div class="aspect-ratio aspect-ratio--16x9 mv5">
  <iframe src="https://www.youtube.com/embed/RywCSX24N1E" class="aspect-ratio--object" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>

Kod z tego odcinka: [Github](https://github.com/Chmarusso/podstawy-redux/commit/51eeba4f4b41842530491bb53241aaeb670e97cf)


Zadanie domowe: Stwórz store, który posiada początkowe dane. Z użyciem funkcji subscribe i console.log nasłuchuj zmian zachodzących w storze. Wywołaj parę akcji przez dispatch i zobacz czy zmiany wyświetlają się w Twojej konsoli.



