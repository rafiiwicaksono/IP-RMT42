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
    username: `user2`,
    email: `user2@gmail.com`,
    password: `halo123`
}


beforeAll(async () => {
    await User.create(user1)
})

describe(`/register`, () => {
    test(`success add new user (201)`, async () => {
        let {status, body} = await request(app)
            .post(`/register`)
            .send(user2)
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("id", expect.any(Number))
        expect(body).toHaveProperty("email", "user2@gmail.com")
    })

    test(`username not fill (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/register`)
            .send({
                email: `user2@gmail.com`,
                password: `halo123`
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty(`message`, expect.any(Array))
        expect(body.message).toContain("Username is Required")
    })

    test(`email not fill (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/register`)
            .send({
                username: `user2`,
                password: `halo123`
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty(`message`, expect.any(Array))
        expect(body.message).toContain("Email is Required")
    })

    test(`password not fill (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/register`)
            .send({
                username: `user2`,
                email: `user2@gmail.com`,
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty(`message`, expect.any(Array))
        expect(body.message).toContain("Password is Required")
    })

    test(`username is empty (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/register`)
            .send({
                username: ``,
                email: `user2@gmail.com`,
                password: `halo123`
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty(`message`, expect.any(Array))
        expect(body.message).toContain("Username is Required")
    })

    test(`email is empty (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/register`)
            .send({
                username: `user2`,
                email: ``,
                password: `halo123`
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty(`message`, expect.any(Array))
        expect(body.message).toContain("Email is Required")
    })

    test(`password is empty (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/register`)
            .send({
                username: `user2`,
                email: `user2@gmail.com`,
                password: ``
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty(`message`, expect.any(Array))
        expect(body.message).toContain("Password is Required")
    })

    test(`failed registered with duplicate email (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/register`)
            .send({
                username: `user3`,
                email: `user@gmail.com`,
                password: `halo123`,
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", expect.any(Array))
        expect(body.message).toContain("Email is already registered")
    })

    test(`invalid format email (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/register`)
            .send({
                username: `user2`,
                email: `user2gmail.com`,
                password: `halo123`
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", expect.any(Array))
        expect(body.message).toContain("Email Must be Email Format")
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
}) 