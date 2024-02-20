const request = require('supertest')
const app = require('../app')

const URL_ACTORS = '/actors'
const actor = {
firstName:"Federico", 
lastName:"Lopez",
nationality:"Cubano",
image:"lorem20",
birthday:"1997-02-12",
}

let actorId

test("POST -> 'URL_ACTORS' should return statusCode 201, and res.body to be defined and res.body.firstName = actor.firstName", async() => {
    
    const res = await request(app)
    .post(URL_ACTORS)
    .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GET ALL-> '/URL_ACTORS' should return status code 200, res.body tobe defined and res.body.length = 1", async () => {
    const res = await request(app)
    .get(URL_ACTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("PUT -> '/URL_ACTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName to be Matthew", async( ) => {
    const res = await request(app)
    .put(`${URL_ACTORS}/${actorId}`)
    .send({firstName:"Matthew"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("Matthew")
})

test("DELETE -> '/URL_ACTORS/:id', should return statusCode 204", async() => {
    const res = await request(app)
    .delete(`${URL_ACTORS}/${actorId}`)

    expect(res.status).toBe(204)
})
