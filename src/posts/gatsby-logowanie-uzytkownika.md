---
title: Gatsby - Logowanie użytkownika
date: 2020-01-2 16:55:53
tags:
- gatsby
- react
- headless cms
category: post
intro: Dowiedz się jak dodać funkcjonalność sesji użytkownika do projektów napisanych w Gatsby
cover: ./gatsby-logowanie-strapi.jpg
full_cover: ./gatsby-logowanie-strapi.jpg
---
Gatsby jest to generator stron statycznych dzięki któremu możemy budować super szybkie witryny internetowe serwowane ze zwykłych plików HTML. Nie musimy więc posiadać na serwerze obsługi PHP, Node.js czy innych server-side bibliotek. Znacząco upraszcza to wdrożenie strony na serwer i zwiększa jej szybkość. Nic jednak nie stoi na przeszkodzie by pewne podstrony (lub fragmenty statycznych stron) były generowane dynamicznie z pomocą naszego ukochanego i wspaniałego JavaScript'u.

Doskonałym przykładem gdzie posiadanie statycznych i dynamicznych stron ma sens są sklepy internetowe. Zwykle strony produktów zmieniają się rzadko, więc nie ma problemu by były one generowane raz na jakiś czas przez Gatsby (idealnie w momencie gdy zmienimy cenę, opis czy inne elementy). Statyczna strona będzie ładować się piekielnie szybko oraz zostanie lepiej zaindeksowana przez roboty wyszukiwarek (tak wiem, że Google radzi sobie z JS). Mimo to sklep internetowy nie może być w pełni statycznym projektem. Musimy przecież zarejestrować nowego klienta, obsłużyć zamówienie lub przyjąć płatność. Do wszystkich tych elementów potrzebujemy na pewno serwera, który bezpiecznie zapisze dane tak by tylko sprzedawca i klient mieli do nich dostęp.

Całe szczęście możemy to łatwo zrobić. W poniższym materiale pokazuje jak stworzyć dynamicznie generowane strony w Gatsby z użyciem Reacta. Jako backend (serwer) posłuży nam instancja Strapi (Headless CMS, który omawiam w innych materiałach na tej stronie), ale naturalnie możecie użyć innego systemu jeżeli tylko macie na to ochotę.

<div class="aspect-ratio aspect-ratio--16x9 mv5">
  <iframe src="https://www.youtube.com/embed/jtUikA_G1Vo" class="aspect-ratio--object" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>


