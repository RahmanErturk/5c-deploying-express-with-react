import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import albumRouter from "./router/albumRouter.js";
import photoRouter from "./router/photoRouter.js";

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());
// server.use(cors({ origin: "*" }));

server.use("/api/albums", albumRouter);
server.use("/api/photos", photoRouter);

server.use("/", express.static("./files/frontend"));
server.get("/*", (req, res) =>
  res.sendFile(__dirname + "/files/frontend/index.html")
);

server.use((req, res) => res.status(404).end());

server.use((err, req, res, next) => {
  console.log("There is an error", err);
  res.status(500).send("It's not because of you, it's because of me...");
});

server.listen(port, () => {
  console.log("listening on port " + port);
});
