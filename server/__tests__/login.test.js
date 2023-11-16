const app = require(`../app`)
const request = require('supertest');
const {sequelize, User} = require(`../models`);
let {queryInterface} = sequelize

const user1 = {
    username: `user1`,
    email: `user@gmail.com`,
    password: `halo123`,
}

const user2 = {
    email: `user2@gmail.com`,
    password: `halo123`
}

beforeAll(async () => {
    await User.create(user1)
})

describe.skip(`/login`, () => {
    test(`success login and get access_token (200)`, async () => {
        let {status, body} = await request(app)
            .post(`/login`)
            .send(user1)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("access_token", expect.any(String))
    })

    test(`email not fill (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/login`)
            .send({
                email: ``,
                password: `halo123`
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "email must be fill")
    })

    test(`password not fill (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/login`)
            .send({
                email: `user@gmail.com`,
                password: ``
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "password must be fill")
    })

    test(`invalid email (401)`, async () => {
        let {status, body} = await request(app)
            .post(`/login`)
            .send(user2)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Invalid email/password")
    })

    test(`invalid password (401)`, async () => {
        let {status, body} = await request(app)
            .post(`/login`)
            .send(user2)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Invalid email/password")
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
}) 