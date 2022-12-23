import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("db/data.json"));

// await db.read();

export const getAllPhotos = async (req, res) => {
  await db.read();

  res.status(200).json(db.data.photos);
};

export const getPhoto = async (req, res) => {
  await db.read();
  const photo = db.data.photos.find((p) => p.id === +req.params.id);

  if (!photo) return res.status(404).send("Not Found");

  res.status(200).json(photo);
};

export const editPhoto = async (req, res) => {
  await db.read();

  const index = db.data.photos.findIndex((p) => p.id === +req.params.id);

  if (index < 0) return res.status(404).send("Not Found");

  db.data.photos[index] = { ...db.data.photos[index], ...req.body };
  await db.write();
  res.status(202).json("updated");
};

export const deletePhoto = async (req, res) => {
  await db.read();

  const index = db.data.photos.findIndex((p) => p.id === +req.params.id);

  if (index < 0) return res.status(404).send("Not Found");

  db.data.photos.splice(index, 1);

  db.write();

  res.status(202).json(`${req.params.id} deleted`);
};

export const savePhoto = async (req, res) => {
  await db.read();

  const nextID = Math.max(...db.data.photos.map((p) => p.id)) + 1;

  db.data.photos.push({ ...req.body, id: nextID });

  db.write();

  res.status(201).json(`Album ${nextID} created successfully`);
};
