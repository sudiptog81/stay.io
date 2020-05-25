const request = require("supertest");

const app = require("../src/server");
const db = require("../src/config/database");

let uid, token, providerUid, providerToken, lid, lid2, cid, cid2, rid, rid2;

beforeAll(async () => {
  await db.sync();
});

describe("user management apis", () => {
  it("POST /api/user/register", async () => {
    const res = await request(app).post("/api/user/register").send({
      email: "user101@ghosh.pro",
      password: "user101@123",
      firstName: "User",
      lastName: "101",
    });

    expect(res.body).toHaveProperty("uid");
    expect(res.body).toHaveProperty("token");

    uid = res.body.uid;
    token = res.body.token;
  });

  it("POST /api/user/register/provider", async () => {
    const res = await request(app).post("/api/user/register/provider").send({
      email: "provider101@ghosh.pro",
      password: "provider101@123",
      orgName: "org",
      firstName: "Provider",
      lastName: "101",
    });

    expect(res.body).toHaveProperty("uid");
    expect(res.body).toHaveProperty("token");

    providerUid = res.body.uid;
    providerToken = res.body.token;
  });

  it("GET /api/user/profile/{uid}", async () => {
    const res = await request(app)
      .get("/api/user/profile/" + uid)
      .set("Authorization", "Bearer " + token);

    expect(res.body).toHaveProperty("uid");
  });

  it("PUT /api/user/profile/{uid}", async () => {
    const res = await request(app)
      .put("/api/user/profile/" + uid)
      .set("Authorization", "Bearer " + token)
      .send({
        firstName: "Modified",
        location: "India",
      });

    expect(res.status).toBe(200);
  });

  it("DELETE /api/user/profile/{uid}", async () => {
    const res = await request(app)
      .delete("/api/user/profile/" + uid)
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
  });
});

describe("authentication apis", () => {
  it("POST /api/auth/login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "provider101@ghosh.pro",
      password: "provider101@123",
    });

    expect(res.body).toHaveProperty("uid");
    expect(res.body).toHaveProperty("token");
  });

  it("POST /api/auth/logout", async () => {
    const res = await request(app).post("/api/auth/logout");

    expect(res.status).toBe(200);
  });
});

describe("listing management apis", () => {
  it("GET /api/listing", async () => {
    const res = await request(app)
      .get("/api/listing")
      .set("Authorization", "Bearer " + providerToken);

    expect(res.status).toBe(200);
  });

  it("POST /api/listing", async () => {
    const res = await request(app)
      .post("/api/listing")
      .set("Authorization", "Bearer " + providerToken)
      .send({
        title: "sample",
        description: "sample",
        by: providerUid,
        byOrgName: "org",
      });

    expect(res.body).toHaveProperty("lid");

    lid = res.body.lid;

    const res2 = await request(app)
      .post("/api/listing")
      .set("Authorization", "Bearer " + providerToken)
      .send({
        title: "sample2",
        description: "sample2",
        by: providerUid,
        byOrgName: "org",
      });

    lid2 = res2.body.lid;
  });

  it("GET /api/listing/{lid}", async () => {
    const res = await request(app)
      .get("/api/listing/" + lid)
      .set("Authorization", "Bearer " + providerToken);

    expect(res.body).toHaveProperty("lid");
  });

  it("PUT /api/listing/{lid}", async () => {
    const res = await request(app)
      .put("/api/listing/" + lid)
      .set("Authorization", "Bearer " + providerToken)
      .send({
        firstName: "Modified",
        location: "India",
      });

    expect(res.status).toBe(200);
  });

  it("DELETE /api/listing/{lid}", async () => {
    const res = await request(app)
      .delete("/api/listing/" + lid)
      .set("Authorization", "Bearer " + providerToken);

    expect(res.status).toBe(200);
  });
});

describe("rating management apis", () => {
  it("GET /api/rating/{lid}", async () => {
    const res = await request(app)
      .get("/api/rating/" + lid2)
      .set("Authorization", "Bearer " + providerToken);

    expect(res.status).toBe(200);
  });

  it("POST /api/rating/{lid}", async () => {
    const res = await request(app)
      .post("/api/rating/" + lid2)
      .set("Authorization", "Bearer " + providerToken)
      .send({
        rating: 3,
        by: providerUid,
      });

    expect(res.body).toHaveProperty("rid");

    rid = res.body.rid;
  });

  it("DELETE /api/rating/{lid}/{uid}", async () => {
    const res = await request(app)
      .delete("/api/rating/" + lid2 + "/" + providerUid)
      .set("Authorization", "Bearer " + providerToken);

    expect(res.status).toBe(200);
  });
});

describe("like management apis", () => {
  it("POST /api/like/listing/{lid}", async () => {
    const res = await request(app)
      .post("/api/like/listing/" + lid2)
      .set("Authorization", "Bearer " + providerToken);

    expect(res.status).toBe(200);
  });

  it("DELETE /api/like/listing/{lid}", async () => {
    const res = await request(app)
      .delete("/api/like/listing/" + lid2)
      .set("Authorization", "Bearer " + providerToken);

    expect(res.status).toBe(200);
  });
});

describe("comment management apis", () => {
  it("GET /api/comment/{lid}", async () => {
    const res = await request(app)
      .get("/api/comment/" + lid2)
      .set("Authorization", "Bearer " + providerToken);

    expect(res.status).toBe(200);
  });

  it("POST /api/comment/{lid}", async () => {
    const res = await request(app)
      .post("/api/comment/" + lid2)
      .set("Authorization", "Bearer " + providerToken)
      .send({
        text: "comment",
        commenter: "org",
        by: providerUid,
      });

    expect(res.body).toHaveProperty("cid");

    cid = res.body.cid;
  });

  it("DELETE /api/comment/{lid}/{cid}", async () => {
    const res = await request(app)
      .delete("/api/comment/" + lid2 + "/" + cid)
      .set("Authorization", "Bearer " + providerToken);

    expect(res.status).toBe(200);
  });
});

afterAll(async () => {
  await db.drop();
  await db.close();
});
