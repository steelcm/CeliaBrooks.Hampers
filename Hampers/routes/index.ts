﻿/// <reference path="../typings/tsd.d.ts" />

import express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express is AWESOME' });
});
export = router;
