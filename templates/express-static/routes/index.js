var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/greetings', (req, res) => {
	res.json({ message: 'Hello from backend :)' })
})

module.exports = router
