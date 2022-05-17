import supertest from "supertest";
import { app } from "../server";

describe('Root Route', () => {
    it('should connect correctly', async () => {
        await supertest(app)
            .get('/')
            .expect(200)
    });
});