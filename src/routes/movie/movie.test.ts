import { app } from "../../server";
const supertest = require("supertest");
const request = supertest(app);
const jurassic = require("../../../fixture/movie.json");

//TODO fix this error :  A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.

// This test pass because 1 ===2
it("Testing to see if Jest works", () => {
  expect(1).toBe(1);
});

// Testing endpoints
it("Gets the movie endpoint", async () => {
  // Sends GET Request to /movie endpoint
  const response = await request.get("/movie?title=jurassic");
  expect(response.status).toBe(200);
  expect(response.body.movie).toStrictEqual(jurassic);
});
