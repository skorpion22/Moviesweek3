require('../models')
const request = require('supertest')
const app = require('../app')

const URL_MOVIES = '/movies'
const movie = {
name:"titan", 
image:"lorem20",
synopsis:"lorem40",
releaseYear:2022,
}

let movieId

test("POST -> 'URL_MOVIES' should return statusCode 201, and res.body to be defined and res.body.name = movie.name", async() => {
    
    const res = await request(app)
    .post(URL_MOVIES)
    .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GET ALL-> '/URL_MOVIES' should return status code 200, res.body tobe defined and res.body.length = 1", async () => {
    const res = await request(app)
    .get(URL_MOVIES)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("PUT -> '/URL_MOVIES/:id', should return statusCode 200, res.body to be defined and res.body.name to be avengers", async( ) => {
    const res = await request(app)
    .put(`${URL_MOVIES}/${movieId}`)
    .send({name:"avengers"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("avengers")
})

test("DELETE -> '/URL_MOVIES/:id', should return statusCode 204", async() => {
    const res = await request(app)
    .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(204)
})
