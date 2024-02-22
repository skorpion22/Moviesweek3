require('../models')
const request = require('supertest')
const app = require('../app')
const Genre = require('../models/Genre')
const Director = require('../models/Director')
const Actor = require('../models/Actor')

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

test("POST -> '/URL_MOVIES/:id/genres', should return statusCode 200, res.body to be defined and ...", async () => {
    const genre = await Genre.create({name:"romance"})

    const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/genres`)
    .send([genre.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(genre.id)

    await genre.destroy()
    
})

test("POST -> '/URL_MOVIES/:id/directors', should return statusCode 200, res.body to be defined and ...", async () => {
    const director = await Director.create({
        firstName:"loman", 
        lastName:"Corne",
        nationality:"Usa",
        image:"lorem20",
        birthday:"1968-05-31",
        })

    const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/directors`)
    .send([director.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(director.id)

    await director.destroy()
    
})

test("POST -> '/URL_MOVIES/:id/actors', should return statusCode 200, res.body to be defined and ...", async () => {
    const actor = await Actor.create({
        firstName:"Federico", 
        lastName:"Lopez",
        nationality:"Cubano",
        image:"lorem20",
        birthday:"1997-02-12",
        })

    const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([actor.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(actor.id)

    await actor.destroy()
    
})

test("DELETE -> '/URL_MOVIES/:id', should return statusCode 204", async() => {
    const res = await request(app)
    .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(204)
})
