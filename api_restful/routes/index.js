var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var tweetsController = require('../controllers/tweetsController');

/******************************TWEETS*********************************/
/* GET home page. */
router.get('/', homeController.Home); 
/* GET Users. */
router.get('/tweets/users', tweetsController.getUsers);
/* GET Langs. */
router.get('/tweets/langs', tweetsController.getLangs);
/* GET Count. */
router.get('/tweets/count', tweetsController.getCount);

/*********************************************************************/

module.exports = router;