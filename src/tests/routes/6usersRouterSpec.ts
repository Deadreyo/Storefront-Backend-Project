import { response } from "express";
import supertest from "supertest"
import { User } from "../../models/userModel";
import { app } from "../../server"
import { signUserToken } from "../../services/jwt";
import { testUsers } from "../models/1userModelSpec";

describe('Users Routes', () => {
    const token = signUserToken("unit test1", "unit test2")
    
    let createdId: number = 4;
    let obj = {
        firstname: "testRouteObj",
        lastname: "lastName",
        password: "pass12"
    };
    it('should post user correctly', async () => {
        await supertest(app)
            .post('/users')
            .send(obj)
            .expect(200)
    })
    it('should get user correctly', async () => {
        await supertest(app)
            .get('/users/'+createdId)
            .set("Authorization", "Bearer "+token)
            .expect(200)
            .expect( res => {
                if(res.body.firstname != obj.firstname) throw new Error(`firstname != ${obj.firstname}, instead: ${res.body.firstname}`);
            })
    })
    it('should get users in index', async () => {
        let testArray = [...testUsers, {...obj}];
        await supertest(app)
            .get('/users')
            .set("Authorization", "Bearer "+token)
            .expect(200)
            .expect( resArr => {
                resArr.body.forEach( (res: User, i: number) => {
                    if(res.firstname != testArray[i].firstname) throw new Error(`firstname != ${testArray[i].firstname}, instead: ${res.firstname}`);
                    if(res.lastname != testArray[i].lastname) throw new Error(`lastname != ${testArray[i].lastname}, instead: ${res.lastname}`);
                })
            })
    })
    it('should get active orders for user', async () => {
        await supertest(app)
            .get(`/users/1/active`)
            .set("Authorization", "Bearer "+token)
            .expect(200)
    })
    it('should get complete orders for user', async () => {
        await supertest(app)
            .get(`/users/1/complete`)
            .set("Authorization", "Bearer "+token)
            .expect(200)
    })
    it('should authorize user', async () => {
        await supertest(app)
            .post('/users/auth')
            .send({
                firstname: testUsers[0].firstname,
                lastname: testUsers[0].lastname,
                password: testUsers[0].password,
            })
            .expect(200)
    })
})