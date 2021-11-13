require("dotenv").config();
import supertest from "supertest";
import mongoose from "mongoose";
import axios from 'axios'
import app from "../src/app";
import connectDB from "../src/utils/db";

const api = supertest(app);
const prefix = `/api/${process.env.API_VERSION}`;

jest.mock('axios');

describe("Routes", () => {
  test("returns 404 error for an invalid endpoint", async () => {
    const response = await api.get("/unknown").expect("Content-Type", /json/);
    expect(response.status).toBe(404);
  });
});

describe("Hello", () => {
  test("requests return 204 status code", async () => {
    const response = await api
      .post(`${prefix}/hello`)
      .send({
        response_url: "http://www.test.com",
        text: "hello",
      })
      .set("Accept", "application/json");
    expect(response.status).toBe(204);
  });
});

describe("Interactions", () => {
  beforeAll(async() => {
    await mongoose.connection.collection("interactions").deleteMany({});
  });
  
  afterAll(() => {
    mongoose.connection.close();
  });

  test("returns an empty array", async () => {
    const response = await api
      .get(`${prefix}/interactions`)
      .expect("Content-Type", /json/)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.data.length).toEqual(0);
  });

  test("can handle post request", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: [
        {
          userId: 1,
          id: 1,
          title: 'My First Album'
        },
        {
          userId: 1,
          id: 2,
          title: 'Album: The Sequel'
        }
      ]
    });

    const response = await api
      .post(`${prefix}/interactions`)
      .send({
        payload: JSON.stringify({
          type: "block_actions",
          user: {
            id: "U02LYG23ZD4",
            username: "temitope.emmanuel63",
            name: "temitope.emmanuel63",
            team_id: "T02LQHVE8EB",
          },
          api_app_id: "A02LQM5HR2B",
          token: "RCNN8E1CN7IArY5JjLxTXD9P",
          container: {
            type: "message",
            message_ts: "1636837058.000500",
            channel_id: "C02M28S1P3P",
            is_ephemeral: true,
          },
          trigger_id:
            "2746349802736.2704607484487.5fb6f996264f3434cb5c42f014fcfba3",
          team: { id: "T02LQHVE8EB", domain: "test-assessment" },
          enterprise: null,
          is_enterprise_install: false,
          channel: { id: "C02M28S1P3P", name: "general" },
          state: { values: { r5g: [Object] } },
          response_url: "https://ho.slack.com/actions/T02LQHVE",
          actions: [
            {
              action_id: "Welcome. How are you doing?",
              block_id: "r5g",
              selected_option: [Object],
              type: "radio_buttons",
              action_ts: "1636837062.166814",
            },
          ],
        }),
      })
      .set("Accept", "application/json");
    expect(response.status).toBe(204);
  });

  test("returns an array with", async () => {
    const response = await api
      .get(`${prefix}/interactions`)
      .expect("Content-Type", /json/)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.data.length).toEqual(1);
  });
});
