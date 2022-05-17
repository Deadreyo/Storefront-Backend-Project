import orderStore, { Order } from "../../models/orderModel";
import { testUsers } from "./1userModelSpec";

const store = new orderStore()

export const testOrders: Order[] = [
    {
        id: 1,
        user_id: testUsers[0].id,
        status: "active"
    },
    {
        id: 2,
        user_id: testUsers[1].id,
        status: "active"
    },
    {
        id: 3,
        user_id: testUsers[2].id,
        status: "active"
    },
]

describe('Order Model', () => {
    it('should be created correctly', () => {
        expect(store).toBeDefined();
    })
    it('should create orders correctly', async () => {
        const orders: Order[] = []
        orders[0] = await store.create(testOrders[0])
        orders[1] = await store.create(testOrders[1])
        orders[2] = await store.create(testOrders[2])

        orders.forEach( (order, i) => {
            expect(order.user_id).toEqual(testOrders[i].user_id)
            expect(order.status).toEqual(testOrders[i].status)
        })
    })
    it('should get all created orders from index correctly', async () => {
        const result = await store.index()
        expect(result.length).toEqual(testOrders.length)
    })
    it('should get order by ID correctly', async () => {
        const result = await store.get(2)
        expect(result.user_id).toEqual(testOrders[1].user_id)
        expect(result.status).toEqual(testOrders[1].status)
    })
})