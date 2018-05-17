# localstories
A hyperlocal community stories service

---

## Back-end Routes

---

## AUTH
Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|post    |/auth/login                  | creates a new session                    |
|post    |/auth/login/recover          | checks email vs email and send           |
|put     |/auth/login/new_password     | updates user information an logs them in |
|post    |/auth/signup                 | creates a new user and logs them in      |
|delete  |/auth/logout                 | deletes user session                     |
|get     |/auth/me                     | checks user session                      |

---

## STORIES
Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/stories                     | shows the list of stories                |
|post    |/stories                     | creates a new story                      |
|put     |/stories/:id/                | updates a story                          |
|put     |/stories/:id/cancel          | cancels the story                        |

---

## USER
Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/users/:id                   | shows the users detail page              |

---

## PROFILE
Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|put     |/profile/update              | updates an user                          |

