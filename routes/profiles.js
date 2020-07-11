const express = require('express');
const service = require("../bin/service");

const router = express.Router();


router.get('/', async (req, res, next) => {
  const {profiles} = await service();
  res.json(profiles)
});

router.get('/:id', async (req, res, next) => {
  const {profiles} = await service();
  const result = profiles.filter(item => item.id === parseInt(req.params.id, 10))[0] || {}
  res.json(result)
});

module.exports = router;
