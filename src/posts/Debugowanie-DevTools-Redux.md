---
title: Debugowanie Redux w DevTools
date: 2019-03-21 16:55:53
tags:
- kurs redux
- javascript
category: post
intro: Naucz się jak debugować kod Redux w przeglądarce
cover: ./redux4.jpg
full_cover: ./redux4.jpg
---

W codziennej pracy z Reduxem bardzo przydaje się [wtyczka](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) do przeglądarki internetowej (Chrome, Firefox, Brave), która pozwala w czasie rzeczywistym podglądać stan naszego store’a oraz chronologiczną listę wszystkich wykonanych akcji. Dodatkową przydatną funkcją jest możliwość odpalania akcji z poziomu wtyczki, zapisywanie aktualnego stanu do pliku oraz słynne podróżowanie w czasie (time travelling debugging).

Przypomnij sobie ile razy w swojej aplikacji musiałeś/aś odtworzyć dany stan. Zwykle polega to na odświeżeniu aplikacji oraz “wyklikaniu” stanu komponentów do momentu aż mamy sytuację, którą chcemy zbadać. Dzięki tej wtyczce możemy zaoszczędzić sporo czasu i dokładnie przeanalizować co robią wywołane przez nas akcje. Jest to szczególnie nieocenione w dynamicznych aplikacjach gdzie wiele akcji może zostać odpalonych w krótkim odstępie czasu.

Z tej lekcji dowiesz się jak posługiwać się wtyczką do debugowania z poziomu Twojej przeglądarki internetowej.

<div class="aspect-ratio aspect-ratio--16x9 mv5">
  <iframe src="https://www.youtube.com/embed/vKL6OV-sJIY" class="aspect-ratio--object" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>

Zadanie domowe: Wykonaj parę akcji i sprawdź jak zmieniał się stan Twojego stora wewnątrz wtyczki.

