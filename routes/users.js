const
	express = require('express'),
	usersRouter = new express.Router(),
	usersCtrl = require('../controllers/users.js'),
	{ verifyToken } = require('../serverAuth.js')

usersRouter.get('/', usersCtrl.index)
usersRouter.post('/', usersCtrl.create)
usersRouter.post('/authenticate', usersCtrl.authenticate)

//Below line of code runs verify token middleware on all routes which follow it
usersRouter.use(verifyToken)
usersRouter.get('/:id', usersCtrl.show)
usersRouter.patch('/me', usersCtrl.update)
usersRouter.delete('/me', usersCtrl.destroy)

module.exports = usersRouter