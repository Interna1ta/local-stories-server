# Local-stories

This project is the final project of Ironhack Web Development Bootcamp. 

It is a hyperlocal community stories service.

## User stories

User can:

* Signup
* Login
* Logout
* Create a story
* See all the stories written before
* Follow/unfollow other users

## Technologies

For the backend (this repository) I used Express generator, and some packages.

For the frontend [Local-Stories-Client](https://github.com/Interna1ta/local-stories-client) I used Angular CLI as a project generator and SASS to style.

The local database was [MongoDB](https://docs.mongodb.com/), and [NodeJs](https://nodejs.org/en/) as a local server.
And [Heroku](https://www.heroku.com/home) as a cloud platform for the deployment.

## Try the app

[Local-Stories](https://lighttwitter.herokuapp.com/)

## Back-end Routes

# Auth

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|post    |/auth/login                  | creates a new session                    |
|post    |/auth/login/recover          | checks email vs email and send           |
|put     |/auth/login/new_password     | updates user information an logs them in |
|post    |/auth/signup                 | creates a new user and logs them in      |
|delete  |/auth/logout                 | deletes user session                     |
|get     |/auth/me                     | checks user session                      |

# Stories

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/stories                     | shows the list of stories                |
|post    |/stories                     | creates a new story                      |
|put     |/stories/:id/                | updates a story                          |
|put     |/stories/:id/cancel          | cancels the story                        |

# User

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/users/:id                   | shows the users detail page              |

# Profile

Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|put     |/profile/update              | updates an user                          |
