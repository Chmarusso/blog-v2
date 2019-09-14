---
title: Wywoływanie akcji (dispatch) w Redux
date: 2019-03-20 16:55:53
tags:
- kurs redux
- javascript
category: post
intro: Wywoływanie akcji i produkowanie nowego state z użyciem funkcji dispatch
cover: ./redux3.jpg
full_cover: ./redux3.jpg
---

Funkcja reducer’a opisuje w jaki sposób stan aplikacji powinien wyglądać po wywołaniu konkretnej akcji.
Reducer zwykle buduje się w oparciu o switch, z domyślną wartością.
Jest to zabezpieczenie przed tym by wywołanie nieznanej akcji nie zrobiło żadnych zmian w stanie aplikacji.

Wynikiem działania funkcji createStore jest obiekt, który posiada kilka przydatnych w dalszej pracy metod:
* getState (pobranie aktualnego stanu)
* dispatch (wywołanie akcji, która powoduje wyprodukowanie nowego aktualnego stanu)
* subscribe (nasłuchiwanie zmian zachodzących w storze)

Na poniższym nagraniu możecie zobaczyć jak wygląda wywoływanie akcji:
<div class="aspect-ratio aspect-ratio--16x9 mv5">
  <iframe src="https://www.youtube.com/embed/vOaUHH2PArc" class="aspect-ratio--object" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>

Kod z tego odcinka: [Github](https://github.com/Chmarusso/podstawy-redux/commit/830527a733ffe4d6976714219ec51205672cfe9c)

Zadanie domowe: Zrób reducer, który przyjmuje akcje pozwalające na dodawanie, aktualizowanie i usuwanie konkretnych elementów w storze.

