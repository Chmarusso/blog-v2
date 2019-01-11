---
title: 'First program in Go: web scraper'
date: 2017-03-26 13:45:37
tags:
- dajsiepoznac2017
- getnoticed
- Go
- Golang
intro: I've heard many positive opinions about Golang, so I decided to give it a try and write the first program.
cover: /images/golang1.jpg
---

Golang is an open source compiled and statically typed language created by Google. My first impression is that syntax is very similar to C but little more readable. If you want to learn more about Golang or even write some code in your browser just go to https://tour.golang.org .

Installation Go into your system is very smooth. I've just grabbed a [package](https://golang.org/dl), installed it and Go was up and running (OSX). One surprising fact is that all Go projects are located in one workspace ([details](https://golang.org/doc/code.html#Workspaces)). I'm used to Ruby approach that allows you to write scripts anywhere and then just execute them with `ruby $DIR` command, but Go approach is not so problematic either.

After installation, I compiled Hello world program just to make sure the Go environment is working. The program worked, so now it is a time for something little more serious. Let's write a program that scraps PacktPub web page and prints out the name of book which currently is available for free download.

My skills in Go are not so powerful yet, so I decided to use [goquery](https://github.com/PuerkitoBio/goquery) package which will help me with DOM parsing. Goquery is something like jQuery, but for Go. In order to use it in our simple program we need to fetch it to our workspace first:
```
$ go get github.com/PuerkitoBio/goquery
```

After that package is ready to use and it can be included in our program:
```go
package main

import (
  "fmt"
  "log"

  "github.com/PuerkitoBio/goquery"
)
```

Now let's fetch HTML body of PackPub web page, locate the DOM element which contains a title of the book and finally print out it on the screen:

```go
func PacktPubScraper() {
  doc, err := goquery.NewDocument("https://www.packtpub.com/packt/offers/free-learning")
  if err != nil {
    log.Fatal(err)
  }

  doc.Find(".dotd-title h2").Each(func(i int, s *goquery.Selection) {
    free_book := s.Text()
    fmt.Printf("%s\n", free_book)
  })
}
```
Once the program is ready we need to compile it. We can do it by accessing the directory with the program and running `go install`. Once compilation is finished without errors we can change directory to `bin/` folder inside our Go workspace and see if our scraper works:
```
cd ~/go/bin
./webscraper
```

Scraper works, but the title of the book is printed out with white spaces. Let's fix this by trimming them out. To do so we can use strings package:

```go
package main

import (
  "fmt"
  "log"
  "strings"

  "github.com/PuerkitoBio/goquery"
)

func PacktPubScraper() {
  doc, err := goquery.NewDocument("https://www.packtpub.com/packt/offers/free-learning")
  if err != nil {
    log.Fatal(err)
  }

  doc.Find(".dotd-title h2").Each(func(i int, s *goquery.Selection) {
    free_book := s.Text()
    fmt.Printf("%s\n", strings.TrimSpace(free_book))
  })
}

func main() {
  PacktPubScraper()
}
```

And that's it, my first program in Go is done! I have to admit that I really liked the syntax and speed of compilation and runtime. That means that I will definitely spend little more time using Golang and you can expect  more posts on this subject in the future.
