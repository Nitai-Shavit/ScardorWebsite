const db = require("../../mongo/dbActions");
const userModel = require("../../mongo/models/userModel");
const refreshModel = require("../../mongo/models/refreshModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const generateRefreshToken = (user, refresh) => {
  return jwt.sign(
    { userId: user, tokenId: refresh },
    process.env.ACCESS_TOKEN_SECRET
  );
};

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};

const verifyRefresh = (token) => {
  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return err;
  }
};

const getNewToken = async (req, res) => {
  const currentRefreshToken = verifyRefresh(req.body.refreshToken);
  if (currentRefreshToken) {
    await db.remove(refreshModel, { owner: req.body.id });
    const refreshDoc = await db.insert(refreshModel, {
      owner: req.body.id,
    });
    const refreshToken = generateRefreshToken(req.body.id, refreshDoc._id);
    const accesstoken = generateAccessToken(req.body.id);
    res.json({
      id: req.body.id,
      accesstoken,
      refreshToken,
    });
  }
};

const login = async (req, res) => {
  await db
    .get(userModel, { username: req.query.username })
    .then(async (data) => {
      if (data && (await argon2.verify(data[0].password, req.query.password))) {
        await db.remove(refreshModel, { owner: data[0]._id });
        await db
          .insert(refreshModel, { owner: data[0]._id })
          .then(async (refreshData) => {
            const refreshToken = await generateRefreshToken(
              refreshData.owner,
              refreshData._id
            );
            const accessToken = await generateAccessToken(refreshData.owner);
            res
              .status(200)
              .json({
                id: data[0]._id,
                accessToken,
                refreshToken,
                authorization: data[0].authorization,
              });
          });
      } else
        res.status(409).json({ message: "username or password incorrect" });
    })
    .catch((err) => res.status(400).send(err));
};

const register = async (req, res) => {
  let user = {
    ...req.body,
    password: await argon2.hash(req.body.password),
  };
  await db
    .insert(userModel, user)
    .then(async (data) => {
      await db
        .insert(refreshModel, { owner: data._id })
        .then(async (refreshData) => {
          const refreshToken = await generateRefreshToken(
            refreshData.owner,
            refreshData._id
          );
          const accesstoken = await generateAccessToken(refreshData.owner);
          res.status(200).json({ id: data._id, accesstoken, refreshToken });
        })
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
};

const updateUser = async (req, res) => {
  await db
    .update(userModel, req.query, req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send(err));
};
const deleteUser = async (req, res) => {
  await db
    .remove(userModel, req.query)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send(err));
};

module.exports = {
  login,
  register,
  updateUser,
  deleteUser,
  getNewToken,
};
