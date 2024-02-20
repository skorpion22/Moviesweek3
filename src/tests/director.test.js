const request = require('supertest')
const app = require('../app')

const URL_DIRECTORS = '/directors'
const director = {
firstName:"loman", 
lastName:"Corne",
nationality:"Usa",
image:"lorem20",
birthday:"1968-05-31",
}

let directorId

test("POST -> 'URL_DIRECTORS' should return statusCode 201, and res.body to be defined and res.body.firstName = director.firstName", async() => {
    
    const res = await request(app)
    .post(URL_DIRECTORS)
    .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET ALL-> '/URL_DIRECTORS' should return status code 200, res.body tobe defined and res.body.length = 1", async () => {
    const res = await request(app)
    .get(URL_DIRECTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("PUT -> '/URL_DIRECTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName to be Juanes", async( ) => {
    const res = await request(app)
    .put(`${URL_DIRECTORS}/${directorId}`)
    .send({firstName:"Juanes"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("Juanes")
})

test("DELETE -> '/URL_DIRECTORS/:id', should return statusCode 204", async() => {
    const res = await request(app)
    .delete(`${URL_DIRECTORS}/${directorId}`)

    expect(res.status).toBe(204)
})
