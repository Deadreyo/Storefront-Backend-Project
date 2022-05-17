import { response } from "express";
import supertest from "supertest"
import { app } from "../../server"
import { signUserToken } from "../../services/jwt";
import { testOrders } from "../models/2ordersModelSpec";

describe('Orders Routes', () => {
    const token = signUserToken("unit test1", "unit test2")

    let createdId: number;
    it('should post order correctly', async () => {
        await supertest(app)
            .post('/orders')
            .set("Authorization", "Bearer "+token)
            .send({
                "user_id": 3,
                "status": "active"
            })
            .expect( res => {
                if(res.status != 200) throw new Error("status not 200, instead: "+res.status);
                if(res.body.user_id != 3) throw new Error("user_id != 3, instead: "+res.body.user_id);
                createdId = +res.body.id;
            });
    })
    it('should get order correctly', async () => {
        await supertest(app)
            .get('/orders/'+createdId)
            .set("Authorization", "Bearer "+token)
            .expect( res => {
                if(res.status != 200) throw new Error("status not 200, instead: "+res.status);
                if(res.body.user_id != 3) throw new Error("user_id != 3, instead: "+res.body.user_id);
            })
    })
    it('should get orders in index', async () => {
        await supertest(app)
            .get('/orders')
            .set("Authorization", "Bearer "+token)
            .expect(200, [...testOrders, {id: createdId, user_id: 3, status: "active"}])
    })
})