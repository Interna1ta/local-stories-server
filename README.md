# Agora

Agora is a microblogging service that I started this project as the final project of [Ironhack Web Development Bootcamp](www.ironhack.com/). 

## User stories

User can:

* Signup
* Login
* Logout
* Write and delete tweets
* See all the tweets written before
* Write and delete articles
* See all the articles written before
* Follow/unfollow other users

## Technologies

For the backend (this repository) I used Express generator, and some packages.

For the frontend [Client](https://github.com/Interna1ta/local-stories-client) I used Angular CLI as a project generator and [SASS](https://sass-lang.com/) to style.

The local database was [MongoDB](https://docs.mongodb.com/), and [NodeJs](https://nodejs.org/en/) as a local server.
And [Heroku](https://www.heroku.com/home) as a cloud platform for the deployment.

## Try the app on Chrome and Mozilla Firefox(not available on Safari, yet...)

[Agora](https://agoranews.herokuapp.com/)

## Back-end Routes

### Auth

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|post    |/auth/login                  | creates a new session                    |
|post    |/auth/signup                 | creates a new user and logs them in      |
|delete  |/auth/logout                 | deletes user session                     |
|get     |/auth/me                     | checks user session                      |

### Tweets

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/stories                     | shows the list of stories                |
|post    |/stories                     | creates a new story                      |
|put     |/stories/:id/                | updates a story                          |
|put     |/stories/:id/delete          | delete the story                         |

### News

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/articles                    | shows the list of articles               |
|post    |/articles                    | creates a new article                    |
|put     |/articles/:id/               | updates a article                        |
|put     |/articles/:id/delete         | delete the article                       |

### Activity

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/notifications/:id           | shows the list of notifications          |
|post    |/notifications/:id/signup    | welcome message                          |
|post    |/notifications/:id/follow    | warns the user about a new follower      |

### User

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/users/:id                   | shows the users detail page              |
|put     |/users/:id/follow            | follow the user                          |
|put     |/users/:id/unfollow          | unfollow the user                        |
|get     |/users/:id/followers         | shows who follow the user                |
|get     |/users/:id/following         | shows who is following the user          |
|get     |/users/:id/addPeople         | shows all the users list                 |
|put     |/users/:id/edit              | update the user profile                  |
|put     |/users/:id/image             | update the image of the user profile     |

### Profile

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|put     |/profile/update              | updates an user                          |
