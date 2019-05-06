const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { userList, userPages } = require('../views');

//route mounted of users

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(userList(allUsers));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    const allPages = await Page.findAll({ where: { authorId: id } });
    res.send(userPages(user, allPages));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
