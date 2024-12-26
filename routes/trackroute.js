const express = require('express')
const trackRouter=express.Router()
const authMiddleware=require('../middleware/authMiddleware.js')
const trackcontroller =require('../controller/trackcontroller.js')

trackRouter.get('/',authMiddleware(['Viewer','Admin']),trackcontroller.getTracks)
trackRouter.get('/:id',authMiddleware(['Viewer','Admin']),trackcontroller.getTracksById)
trackRouter.post('/add-track',authMiddleware(['Admin']),trackcontroller.createTrack)
trackRouter.put('/:id',authMiddleware(['Editor','Admin']),trackcontroller.UpdateTrack)
trackRouter.delete('/:id',authMiddleware(['Editor','Admin']),trackcontroller.deleteTrack)

module.exports=trackRouter