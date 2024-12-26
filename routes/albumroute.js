const express = require('express')
const albumcontroller = require('../controller/albumcontroller')
const authMiddleware = require('../middleware/authMiddleware.js')
const albumRouter = express.Router()

albumRouter.get('/',authMiddleware(['Viewer','Admin']),albumcontroller.getAlbums);
albumRouter.get('/:id',authMiddleware(['Viewer','Admin']),albumcontroller.getAlbumById);
albumRouter.post('/add-album',authMiddleware(['Admin']),albumcontroller.createAlbum);
albumRouter.put('/:id',authMiddleware(['Editor','Admin']),albumcontroller.UpdateAlbum);
albumRouter.delete('/:id',authMiddleware(['Editor','Admin']),albumcontroller.deleteAlbum)

module.exports = albumRouter