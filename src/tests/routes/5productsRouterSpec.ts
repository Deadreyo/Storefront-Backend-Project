import { response } from "express";
import supertest from "supertest"
import { app } from "../../server"
import { signUserToken } from "../../services/jwt";
import { testProducts } from "../models/3productsModelSpec";

describe('Products Routes', () => {
    const token = signUserToken("unit test1", "unit test2")
    
    let createdId: number;
    let obj = {
        name: "testRouteObj",
        price: 25,
        category: "unitTest"
    };
    it('should post product correctly', async () => {
        await supertest(app)
            .post('/products')
            .set('Authorization', 'Bearer '+token)
            .send(obj)
            .expect(200)
            .expect( res => {
                if(res.body.name != obj.name) throw new Error(`name != '${obj.name}', instead: ${res.body.name}`);
                createdId = +res.body.id;
            });
    })
    it('should get product correctly', async () => {
        await supertest(app)
            .get('/products/'+createdId)
            .expect(200)
            .expect( res => {
                if(res.body.name != obj.name) throw new Error(`name != ${obj.name}, instead: ${res.body.name}`);
            })
    })
    it('should get products in index', async () => {
        await supertest(app)
            .get('/products')
            .expect(200, [...testProducts, {...obj, id: createdId, purchase_count: 0}])
    })
    it('should get top products', async () => {
        await supertest(app)
            .get('/products/top')
            .expect(200);
    })
    it('should add product to order', async () => {
        await supertest(app)
            .post('/products/'+createdId)
            .set('Authorization', 'Bearer '+token)
            .send({
                order_id: 2,
                quantity: 6
            })
            .expect(200);
    })
})