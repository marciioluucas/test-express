const express = require('express');
const service = require("../bin/service");
const router = express.Router();

const mapPosts = (profiles) => {
  const result = [];

  profiles.forEach(profile => {
    const u = JSON.parse(JSON.stringify(profile))
    delete u.posts;

    profile.posts.forEach(post => {
      result.push({
        ...post,
        profile: u,
      })
    })
  });

  return result;
}

router.get('/', async (req, res, next) => {
  const {profiles} = await service();

  res.json(mapPosts(profiles))
});

router.get('/:id', async (req, res, next) => {
  const {profiles} = await service();
  const result = mapPosts(profiles).filter(item => item.id === parseInt(req.params.id, 10))

  res.json(result)
});

router.get('/profile/:user', async (req, res, next) => {
  const {profiles} = await service();
  const result = mapPosts(profiles).filter(item => item.userId === parseInt(req.params.user, 10));
  res.json(result)
});

module.exports = router;
