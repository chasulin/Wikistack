const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { main, addPage, wikiPage, editPage } = require('../views');

//route mounted on wiki

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages)); //passing all pages into main view
  } catch (err) {
    next(err);
  }
});

router.get('/add', (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    next(err);
  }
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const thisSlug = req.params.slug;
    const thisPage = await Page.findOne({
      where: {
        slug: thisSlug,
      },
    });
    if (thisPage === null) {
      res.sendStatus(404);
    } else {
      const author = await thisPage.getAuthor();
      res.send(editPage(thisPage, author));
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const thisSlug = req.params.slug;
    const findPage = await Page.findOne({
      where: {
        slug: thisSlug,
      },
    });
    const author = await findPage.getAuthor();
    console.log('foundPage:', findPage);
    res.send(wikiPage(findPage, author));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// CONFUSED ::
router.post('/:slug', async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug,
      },
      returning: true,
    });

    res.redirect('/wiki/' + updatedPages[0].slug);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    console.log('req.body', req.body);
    const page = await Page.create(req.body);
    await page.setAuthor(user);
    // console.log('new page:', newPage);
    res.redirect('/wiki/' + page.slug);

    // res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug/delete', async (req, res, next) => {
  try {
    await Page.destroy({ where: { slug: req.params.slug } });
    res.redirect('/wiki');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
