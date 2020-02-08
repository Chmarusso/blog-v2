---
title: Checklista - 8 rzeczy na produkcji
date: 2020-01-29 16:55:53
tags:
- porady
- programowanie
category: post
intro: Jeżeli wrzucasz swój kod na produkcje to musisz pamiętać o kilku ważnych rzeczach. No chyba, że lubisz mieć problemy...
cover: ./web-dev-checklista.jpg
full_cover: ./web-dev-checklista.jpg
---

W życiu każdego developera w końcu przychodzi moment, w którym kod musi zostać wypchnięty na produkcje. Pisząc "produkcja" mam oczywiście na myśli serwer produkcyjny, z którego korzystać będą nasi prawdziwi klienci. Rzadko się zdarza, że praca developera kończy się w tym miejscu. Tworzenie oprogramowania to zwykle cały proces. Klient po jakimś czasie wymaga zmian, naprawy bugów (błędów) lub wdrożenia nowych i jeszcze lepszych funkcjonalności.

Gdy pracujemy sobie na swoim deweloperskim serwerze wszystko zawsze jest dobrze. Jak utracimy jakieś dane lub coś sknocimy to zwykle nie ma z tego żadnych konsekwencji. Inaczej rzecz się ma na serwerze produkcyjnym. Tam wyciek danych lub błąd przy składaniu zamówienia w sklepie może wygenerować potężne straty finansowe. Przypadkowe wykonanie komendy `rm -rf /` na serwerze może bezpowrotnie pozbawić nas danych wprowadzonych przez naszych klientów. Błędna konfiguracja serwera może powodować długi czas odpowiedzi na żądania klientów.

Na szczęście tych wszystkich problemów można łatwo uniknąć. Z mojego najnowszego materiału dowiesz się o czym warto pamiętać. Wspomniałem m.in o backupie, logach, monitoringu, wysyłce emaili, wydajności i paru innych rzeczach na które warto zwrócić uwagę.

Zapomniałem chyba tylko o tym, że co do zasady nie deployuje się w piątek po południu oraz po wrzuceniu kodu na produkcję warto zrobić celebracje z zespołem 😁

<div class="aspect-ratio aspect-ratio--16x9 mv5">
  <iframe src="https://www.youtube.com/embed/UdhyBnZmkrk" class="aspect-ratio--object" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
</div>


