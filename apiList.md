# Dev Tinder API

## Auth Router
- POST /signup
- POST /login
- POST /logout

## Profile Router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## ConnectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## User Router
- GET /user/connections
- GET /user/requests/received
- GET /user/feeds - Gets you the profiles 


Status: ignored,interested,accepted,rejected
