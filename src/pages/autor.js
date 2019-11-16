import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="Autor" />
    <h1>Dzień dobry!</h1>
    <p>
      Z tej strony <b>Artur</b> - autor tego bloga i podcasta. Znajdziesz tutaj
      wszystkie materiały jakie tworzę na temat technologii webowych. Interesuje się
      zarówno front jak i back-endem stąd nazwa <b>FullStak</b> (<i>od full-stack development</i>).
    </p>
    <p>
      Swoją pierwszą stronę WWW stworzyłem w 2003 roku (niestety nie jest ona już nigdzie dostępna).
      Była to bardzo prosta witryna gdzie można było pobrać wtyczki do komunikatora Gadu Gadu.
      W 2006 roku zrobiłem portal o grach MMO i ten projekt ma się całkiem dobrze do dziś.
      Pracując nad swoim portalem nauczyłem się PHP (korzystałem z Smarty), MySQL oraz wielu innych
      rzeczy, które sprawiły, że od tamtych czasów informatyka to moja pasja.
    </p>

    <p>
      Gdzieś około 2008-2009 roku podjąłem decyzję o nauce Ruby i przepisaniu swojego portalu na Ruby on Rails.
      Była to bardzo dobra decyzja, bo do PHP całe szczęście już nigdy więcej nie wróciłem,
      a w Ruby i Railsach pracuje do dzisiaj.
    </p>

    <p>
      W czasie studiów zorientowałem się, że dużo frajdy i satysfakcji sprawia mi przekazywanie
      wiedzy innym. Uczestniczyłem kilka razy w warsztatach Rails Girls jako mentor, prowadziłem warsztaty z Ruby on Rails dla studentów oraz miałem przyjemność występować jako prelegent na meetupach i konferencjach IT.
    </p>

    <p>
      Na moim kanale YouTube publikuję tutoriale o wszystkim co mnie interesuje (React, JavaScript, Blockchain, Serverless, testowanie).
    </p>

    <p>Bardzo się cieszę, że tutaj wpadłeś/aś!
      <br/>W razie pytań lub propozycji współpracy zachęcam do kontaktu przez któryś z serwisów społecznościowych poniżej:</p>
  </Layout>
)

export default SecondPage
