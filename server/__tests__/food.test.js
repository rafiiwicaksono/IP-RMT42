const app = require(`../app`)
const request = require('supertest');
const { sequelize, User } = require(`../models`);
const { signToken } = require('../helper/jwt');
let { queryInterface } = sequelize

const dataUser = {
    username: `user1`,
    email: `user@gmail.com`,
    password: `halo123`,
}


const invalidToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVJ9.eyJpZCI6SiaWF0IjoxNjk4ODkxODcyfQ.rJhQRIMd5-ODzKDYltksNM02SzHxMiRoZNVdOhm8YZc`

beforeAll(async () => {
    let user = await User.create(dataUser)
    token = signToken({ id: user.id })

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

describe(`/foods`, () => {
    test(`success read foods (200)`, async () => {
        let { status, body } = await request(app)
            .get(`/foods`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Array)
        expect(body[0]).toBeInstanceOf(Object)
        expect(body[0]).toHaveProperty("id", expect.any(Number))
        expect(body[0]).toHaveProperty("name", expect.any(String))
        expect(body[0]).toHaveProperty("imageUrl", expect.any(String))
        expect(body[0]).toHaveProperty("price", expect.any(Number))
        expect(body[0]).toHaveProperty("calory", expect.any(Number))
        expect(body[0]).toHaveProperty("UserId", expect.any(Number))
    })

    test(`failed access_token (401)`, async () => {
        let {status, body} = await request(app)
            .get(`/foods`)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })

    test(`invalid access_token (401)`, async () => {
        let {status, body} = await request(app)
            .get(`/foods`)
            .set(`Authorization`, `Bearer ${invalidToken}`)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
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