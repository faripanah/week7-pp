const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

const jobs = [
  {
    title: "mnbvcx",
    type: "full time",
    description: "jhgfcdx",
    company: {
      name: "bbvc",
      contactEmail: "jhgf@vcd",
      contactPhone: "987654354",
    },
  },
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});

  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    email: "john@example.com",
    password: "R3g5T7#gh",
    phone_number: "1234567890",
    gender: "Male",
    date_of_birth: "1990-01-01",
    membership_status: "Inactive",
  });

  if (result.status !== 201 || !result.body.token) {
    throw new Error("Signup failed, check your API!");
  }

  token = result.body.token;
});

describe("Job Routes with Auth", () => {
  it("should create a new job when authenticated", async () => {
    const result = await api
      .post("/api/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send(jobs[0]);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("title", "mnbvcx");
  });

  it("should return an error when creating a job without authentication", async () => {
    const result = await api.post("/api/jobs").send(jobs[0]);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("error");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
