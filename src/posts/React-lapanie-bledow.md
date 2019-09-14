---
title: Obsługa błędów w React
date: 2019-02-26 16:55:53
tags:
- kurs react
- javascript
category: post
intro: Proste techniki łapania błędów w komponentach z użyciem componentDidCatch.
cover: ./cover-error-handling.jpg
full_cover: ./cover-error-handling.jpg
---

Pisanie kodu w Reactcie jest łatwe i przyjemne. Jednak żadna biblioteka nie jest w stanie zagwarantować nam, że nigdy nic się nie wysypie. Twórcy Reacta wiedzą o tym doskonale więc przygotowali bardzo fajne mechanizmy ułatwiające łapanie i obsługę błędów w komponentach.

Bugi lub błędy (jak kto woli) to nierozłączny element pracy z kodem. Każdy programista popełnia błędy i niech pierwszy rzuci kamieniem ten co nie miał gdzieś nulla czy undefined. Takich błędów nie należy się wstydzić dopóki dopóty nie wychodzą one poza środowisko lokalne i uderzają w prawdziwych użytkowników. W sytuacji gdy w naszej aplikacji mamy kilka komponentów zagnieżdżonych w sobie i jeden z nich rzuca błędem to nagle cała aplikacja może stać nie użyteczna. Na całe szczęście można uniknąć takich przykrych sytuacji.

W poniższym nagraniu pokazuję proste techniki obsługi błędów w Reactcie. Techniki te powinno się stosować wyłącznie do obsługi błędów samych komponentów (np. Błędy w montowaniu).

<div class="aspect-ratio aspect-ratio--16x9 mv5">
  <iframe src="https://www.youtube.com/embed/yBOnI6cC1hM" class="aspect-ratio--object" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>

Wszelkie błędy w funkcjach zewnętrznych, bądź zdarzeniach wywołanych przez użytkowników powinny zostać obsłużone z użyciem wbudowanych w JS mechanizmów: try/catch lub reject dla Promise.



