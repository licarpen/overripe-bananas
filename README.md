# overripe-bananas
<<<<<<< HEAD

## Overview
Overripe Bananas is a RESTful movie review API built with a non-relational database (mongoDB), nodeJS, mongoose, and express. Developer tools include easy seeding of a development database with desired number of films, studios, reviewers, and reviews.  Authentication is implemented with bcryptjs, jsonwebtoke, and cookie-parser.  All routes and models are tested using jest with the aid of data helpers and supertest.  

## Models

* Actor
  * name (string)
  * dob (date)
  * pob (string)
  * virtual: films

* Film
  * title (string)
  * studio (string)
  * released (date)
  * cast
    * role (string)
    * actor (ref)
  * methods
    * populateWithReviews()

* Review
  * rating (integer 1-5)
  * reviewer (ref)
  * film (ref)

* Reviewer
  * name (string)
  * company (string)
  * virtual: reviews
  * methods
    * findByIdAndDeleteIfNoReviews(id)

* Studio
  * name (string)
  * address
    * city (string)
    * state (string)
    * country (string)
  * virtual: films

* User
  * email (string)
  * passwordHash (string)
  * role (enum: ['admin', 'user])
  * virtual: password
  * methods
    * findByToken(token)
    * authorize(email, password)
    * authToken()

## Routes

* actors
  * POST '/'
  * GET '/'
  * GET '/:id'

* auth
  * POST '/signup'
  * POST '/login'
  * post '/logout'
  * GET '/verify'

* films
  * POST '/'
  * GET '/'
  * GET '/:id'

* reviewers
  * POST '/'
  * GET '/'
  * GET '/:id'
  * PATCH '/:id'
  * DELETE '/:id'

* reviews
  * POST '/'
  * GET '/'
  * DELETE '/:id'

* studios
  * POST '/'
  * GET '/'
  * GET '/:id'


=======
A bit grosser than rotten tomatoes, this movie review API will let you know what films downright stink.  This was an exercise in testing and building a relational database using mongoose and MongoDB.  Routes were written using express.  Unit tests were written for all models and API routes.
>>>>>>> b74d82e3fb4674531b73ae4df29b271a260c8d2e
