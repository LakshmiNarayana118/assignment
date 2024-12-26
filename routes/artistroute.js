// const express=require('express');
// const authMiddleware = require('../middleware/authMiddleware');
// const artistcontroller=require('../controller/artistcontroller');
// const artistrouter =express.Router();
// artistrouter.get('/',authMiddleware(['Admin','Editor']),artistcontroller.getArtist);
// module.exports=artistrouter;



const express = require('express');
const {
    getArtists,
    addArtist,
    updateArtist,
    deleteArtist,
    getArtistsById
} = require('../controller/artistcontroller');
const authMiddleware = require('../middleware/authMiddleware');
const validateArtist = require('../middleware/validateartist');

const router = express.Router();

// Routes
router.get('/', authMiddleware(['Admin', 'Editor', 'Viewer']), getArtists); // Authenticated users can view artists
router.post('/add-artist', authMiddleware(['Admin', 'Editor']), addArtist); // Admin/Editor can add artists
router.put('/:id', authMiddleware(['Admin', 'Editor']),  updateArtist); // Admin/Editor can update artists
router.delete('/:id', authMiddleware(['Admin']), deleteArtist); // Only Admin can delete artists
router.get('/:id', authMiddleware(['Admin', 'Editor']), getArtistsById);
module.exports = router;
