import { cache as cache } from './fireworks.mjs';
import { hash } from './hash.mjs';

export const login = async (req, res) => {
  const { roomId, password, nickname } = req.body;
  const key = `room-${roomId}`;
  const roomExists = cache.has(key);
  if (roomExists) {
    const room = cache.get(key);
    if (password) {
      const hashedPass = hash(password);
      const passwordFits = room.password === hashedPass;
      if (passwordFits) {
        res.sendStatus(204); // No Content
        return;
      } else {
        res.sendStatus(403); // Forbidden
        return;
      }
    } else {
      res.sendStatus(204); // No Content
      return;
    }
  } else {
    const newRoom = {
      users: [nickname],
    };
    if (password) {
      const hashedPass = hash(password);
      newRoom.password = hashedPass;
    }
    cache.set(key, newRoom);
    res.sendStatus(201); // Created
    return;
  }
};

export const getCache = async (_req, res) => {
  res.status(200).send(cache.keys());
};

export const deleteCache = async (_req, res) => {
  cache.flushAll();
  res.sendStatus(200);
};
