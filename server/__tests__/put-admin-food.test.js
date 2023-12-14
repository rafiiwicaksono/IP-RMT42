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
    name: "salmon",
    imageUrl: "dada",
    price: 4241,
    calory: 189,
    UserId: 1
}

const foodId = 2
const invalidFoodId = 9

const invalidToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVJ9.eyJpZCI6SiaWF0IjoxNjk4ODkxODcyfQ.rJhQRIMd5-ODzKDYltksNM02SzHxMiRoZNVdOhm8YZc`

beforeAll(async () => {
    let user = await User.create(dataUser)
    let user2 = await User.create(dataUser2)
    tokenAdmin = signToken({ id: user.id })
    tokenUser = signToken({ id: user2.id })

    await queryInterface.bulkInsert(`Food`, [
        {
            id: 1,
            name: "Stevia-Sweetened Currant Banana Bread",
            imageUrl: "https://spoonacular.com/recipeImages/149241-312x231.jpg",
            price: 424,
            calory: 186,
            UserId: user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            "id": 2,
            name: "Alouette Crumbled Feta Mediterranean Caponata",
            imageUrl: "https://spoonacular.com/recipeImages/632243-312x231.jpg",
            price: 903,
            calory: 175,
            UserId: user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            "id": 3,
            name: "Best Potato Cheese Soup in a bread bowl",
            "imageUrl": "https://spoonacular.com/recipeImages/634927-312x231.jpg",
            price: 1690,
            calory: 750,
            UserId: user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            "id": 4,
            name: "Blackberry Walnut Cookies",
            imageUrl: "https://spoonacular.com/recipeImages/635248-312x231.jpg",
            price: 641,
            calory: 142,
            UserId: user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
})

describe(`/foods/admin/:id`, () => {
    test(`success create food with role admin (200)`, async () => {
        let { status, body } = await request(app)
            .put(`/foods/admin/${foodId}`)
            .set(`Authorization`, `Bearer ${tokenAdmin}`)
            .send(dataInput)
        expect(status).toBe(200)
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
            .put(`/foods/admin/${foodId}`)
            .send(dataInput)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })

    test(`invalid access_token (401)`, async () => {
        let { status, body } = await request(app)
            .put(`/foods/admin/${foodId}`)
            .set(`Authorization`, `Bearer ${invalidToken}`)
            .send(dataInput)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })

    test(`Food not found (404)`, async () => {
        let { status, body } = await request(app)
            .put(`/foods/admin/${invalidFoodId}`)
            .set(`Authorization`, `Bearer ${tokenAdmin}`)
        expect(status).toBe(404)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Food not found")
    })

    test(`validation required (400)`, async () => {
        let { status, body } = await request(app)
            .put(`/foods/admin/${foodId}`)
            .set(`Authorization`, `Bearer ${tokenAdmin}`)
            .send({
                name: "",
                imageUrl: "dada",
                price: "",
                calory: ""
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty(`message`, expect.any(Array))
        expect(body.message).toContain("Name is Required")
        expect(body.message).toContain("Price is Required")
        expect(body.message).toContain("Calory is Required")
    })

    test(`forbidden update data food (403)`, async () => {
        let { status, body } = await request(app)
            .put(`/foods/admin/${foodId}`)
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