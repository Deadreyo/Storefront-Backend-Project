import userStore, {User} from "../../models/userModel";

const store = new userStore()

export const testUsers: User[] = [
    {
        id: 1,
        firstname: "Jack",
        lastname: "Fady",
        password: "password"
    },
    {
        id: 2,
        firstname: "Ahmed",
        lastname: "Atwa",
        password: "passy"
    },
    {
        id: 3,
        firstname: "Freddy",
        lastname: "Willy",
        password: "yes123"
    },
];

describe('User Model', () => {
    it('should be created correctly', () => {
        expect(store).toBeDefined();
    })
    it('should create users correctly', async () => {
        let result: User[] = []
        result[0] = await store.create(testUsers[0]);
        result[1] = await store.create(testUsers[1]);
        result[2] = await store.create(testUsers[2]);
        testUsers.forEach( (user, i) => {
            expect(result[i].firstname).toBe(user.firstname);
            expect(result[i].lastname).toBe(user.lastname);
        })
    })

    it('should get all created users from index correctly', async () => {
        const result = await store.index();
        expect(result.length).toEqual(testUsers.length)
    })
    it('should get a user by ID correctly', async () => {
        const result = await store.get(2);
        expect(result.firstname).toBe(testUsers[1].firstname);
        expect(result.lastname).toBe(testUsers[1].lastname);
    })
    it('should authenticate user correctly', async () => {
        const result = await store.authenticate(testUsers[0])
        expect(result).toBeTruthy();
    })
})