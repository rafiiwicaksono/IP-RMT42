const app = require(`../app`)
const request = require('supertest');
const { sequelize, User } = require(`../models`);
const { signToken } = require('../helper/jwt');
let { queryInterface } = sequelize

const dataUser = {
    username: `user1`,
    email: `user@gmail.com`,
    password: `halo123`,
    role: `admin`
}

const dataUser2 = {
    username: `user2`,
    email: `user2@gmail.com`,
    password: `halo123`,
    role: `user`
}

const dataInput = {
    name: "Stevia-Sweetened Currant Banana Bread",
    imageUrl: "https://spoonacular.com/recipeImages/149241-312x231.jpg",
    price: 424,
    calory: 186,
    UserId: 1
}


const invalidToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVJ9.eyJpZCI6SiaWF0IjoxNjk4ODkxODcyfQ.rJhQRIMd5-ODzKDYltksNM02SzHxMiRoZNVdOhm8YZc`

beforeAll(async () => {
    let user = await User.create(dataUser)
    let user2 = await User.create(dataUser2)
    tokenAdmin = signToken({ id: user.id })
    tokenUser = signToken({ id: user2.id })
})

describe(`/foods/admin`, () => {
    test(`success create food with role admin (201)`, async () => {
        let { status, body } = await request(app)
            .post(`/foods/admin`)
            .set(`Authorization`, `Bearer ${tokenAdmin}`)
            .send(dataInput)
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("id", expect.any(Number))
        expect(body).toHaveProperty("name", expect.any(String))
        expect(body).toHaveProperty("imageUrl", expect.any(String))
        expect(body).toHaveProperty("price", expect.any(Number))
        expect(body).toHaveProperty("calory", expect.any(Number))
        expect(body).toHaveProperty("UserId", expect.any(Number))
    })

    test(`failed access_token (401)`, async () => {
        let { status, body } = await request(app)
            .post(`/foods/admin`)
            .send(dataInput)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })

    test(`invalid access_token (401)`, async () => {
        let { status, body } = await request(app)
            .post(`/foods/admin`)
            .set(`Authorization`, `Bearer ${invalidToken}`)
            .send(dataInput)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })


    test(`validation required (400)`, async () => {
        let {status, body} = await request(app)
            .post(`/foods/admin`)
            .set(`Authorization`, `Bearer ${tokenAdmin}`)
            .send({
                imageUrl: "test gambar",
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty(`message`, expect.any(Array))
        expect(body.message).toContain("Name is Required")
        expect(body.message).toContain("Price is Required")
        expect(body.message).toContain("Calory is Required")
    })

    test(`forbidden create data food (403)`, async () => {
        let {status, body} = await request(app)
            .post(`/foods/admin`)
            .set(`Authorization`, `Bearer ${tokenUser}`)
            .send(dataInput)
        expect(status).toBe(403)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Forbidden Error")
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Food', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
}) 