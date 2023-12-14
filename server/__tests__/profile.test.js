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

    await queryInterface.bulkInsert(`Profiles`, [
        {
            fullName: `gojo`,
            address: `tokyo`,
            phoneNumber: `08216762`,
            UserId: user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
})

describe(`/profile`, () => {
    test(`success read profile (201)`, async () => {
        let { status, body } = await request(app)
            .get(`/profile`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("id", expect.any(Number))
        expect(body).toHaveProperty("fullName", expect.any(String))
        expect(body).toHaveProperty("address", expect.any(String))
        expect(body).toHaveProperty("phoneNumber", expect.any(String))
    })

    test(`failed access_token (401)`, async () => {
        let {status, body} = await request(app)
            .get(`/profile`)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })

    test(`invalid access_token (401)`, async () => {
        let {status, body} = await request(app)
            .get(`/profile`)
            .set(`Authorization`, `Bearer ${invalidToken}`)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Profiles', null, {
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