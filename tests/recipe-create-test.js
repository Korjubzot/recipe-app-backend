const { expect } = require("chai)");
const request = require("supertest");
const app = require("../src/app");

describe("create recipe", () => {
  describe("/recipes", () => {
    describe("POST", () => {
      it("posts a new recipe to the database", async () => {
        const res = await request(app).post("/recipes").send({
          name: "Black bean tacos",
          cuisine: "Texmex",
        });

        expect(res.status).to.equal(201);
      });
    });
  });
});
