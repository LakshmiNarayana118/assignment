const express=require('express')
const favRouter = express.Router()
const favcontroller=require('../controller/favcontroller')
const authcontroller=require('../middleware/authMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

favRouter.get('/:category',authMiddleware(['Viewer','Admin']),favcontroller.getfavs)
favRouter.post('/add-fav',authMiddleware(['Admin']),favcontroller.createfavs);
favRouter.delete('/remove-favorite/:id',authMiddleware(['Editor','Admin']),favcontroller.deletefavs)

module.exports = favRouter