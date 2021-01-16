const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
  res.sendFile('public/index.html');
});
router.get('/admin', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/admin.html' ));
});
module.exports = router;
