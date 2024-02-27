const app = require("../src/App");
const session = require("supertest");
const agent = session(app);

const { email, password } = require("../src/utils/users")[0];
const character1 = { id: 1, name: "Rick" };
const character2 = { id: 2, name: "Morty" };

describe("Test de RUTAS", () => {
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async () => {
            await agent.get("/rickandmorty/character/1").expect(200);
        });
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = (await agent.get("/rickandmorty/character/1"))
                .body;
            expect(response).toHaveProperty("id");
            expect(response).toHaveProperty("name");
            expect(response).toHaveProperty("species");
            expect(response).toHaveProperty("gender");
            expect(response).toHaveProperty("status");
            expect(response).toHaveProperty("origin");
            expect(response).toHaveProperty("image");
        });
        it("Si hay un error responde con status: 500", async () => {
            await agent.get("/rickandmorty/character/123456").expect(500);
        });
    });
    describe("GET /rickandmorty/login", () => {
        it("Retorna objeto con propiedad access = true", async () => {
            const { email, password } = require("../src/utils/users")[0];
            await agent
                .get("/rickandmorty/login")
                .query({ email, password })
                .expect({ access: true })
                .expect(200);
        });
        it("Retorna objeto con propiedad access = false", async () => {
            await agent
                .get("/rickandmorty/login")
                .query({ email: "false@gmail.com", password: "falsePassword" })
                .expect({ access: false })
                .expect(200);
        });
    });
    describe("POST /rickandmorty/fav", () => {
        it("Retorna un Json enviando un arreglo con lo enviado por body", async () => {
            const response = await agent
                .post("/rickandmorty/fav")
                .send(character1);
            expect(response.body).toEqual([character1]);
        });
        it("Retorna un Json enviando un arreglo con lo enviado por body sin perder lo anterior", async () => {
            const response = await agent
                .post("/rickandmorty/fav")
                .send(character2);
            expect(response.body).toContainEqual(character1);
            expect(response.body).toContainEqual(character2);
        });
    });
    describe("DELETE /rickandmorty/fav/:id", () => {
        it("No modifica el array de favoritos su el id pasado no corresponde a ninguno de los personajes", async () => {
            const response = await agent.delete("/rickandmorty/fav/8");
            expect(response.body).toContainEqual(character1);
            expect(response.body).toContainEqual(character2);
        });
        it("Elimina el personaje si el id pasado corresponde a ninguno de los personajes", async () => {
            const response = await agent.delete("/rickandmorty/fav/1");
            expect(response.body).not.toContainEqual(character1);
            expect(response.body).toContainEqual(character2);
        });
    });
});
