import productStore, { Product } from "../../models/productModel";

const store = new productStore();

export const testProducts: Product[] = [
    {
        id: 1,
        name: "product1",
        price: 10,
        category: "cat1",
        purchase_count: 0
    },
    {
        id: 2,
        name: "product2",
        price: 30,
        category: "cat2",
        purchase_count: 0
    },
    {
        id: 3,
        name: "product3",
        price: 15,
        category: "cat3",
        purchase_count: 0
    },
    {
        id: 4,
        name: "product4",
        price: 60,
        category: "cat1",
        purchase_count: 0
    },
]

describe('Product Store', () => {
    it('should be created correctly', () => {
        expect(store).toBeDefined();
    })
    it('should create products correctly', async () => {
        const products: Product[] = []

        products[0] = await store.create(testProducts[0])
        products[1] = await store.create(testProducts[1])
        products[2] = await store.create(testProducts[2])
        products[3] = await store.create(testProducts[3])

        products.forEach( (product, i) => {
            expect(product.name).toEqual(testProducts[i].name)
            expect(product.category).toEqual(testProducts[i].category)
            expect(product.price).toEqual(testProducts[i].price)
        })
    })

    it('should get all created products from index correctly', async () => {
        const result = await store.index()
        expect(result.length).toEqual(testProducts.length)
    })

    it('should get product by ID correctly', async () => {
        const result = await store.get(2)
        expect(result.name).toEqual(testProducts[1].name)
        expect(result.category).toEqual(testProducts[1].category)
        expect(result.price).toEqual(testProducts[1].price)
    })
})