// export default getArtist(req,res) {
//     console.log(req.user)
//     try{

//     }
// };



const  Artist  = require('../entities/artist'); // Ensure the Artist model is defined
const {Op}=require('sequelize');

// Get all artists
const getArtists = async (req, res) => {
    try {
        const { limit = 5, offset = 0, grammy, hidden } = req.query;
        console.log(grammy,hidden);
        const filters = {};
         filters.grammy = {
            [Op.between]:[0,grammy]
         };
         filters.hidden = false;
         console.log(filters);
        const artists = await Artist.findAll({
            attributes:["artist_id","name","grammy","hidden"],
            where: filters,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        console.log(artists);

        res.status(200).json({
            status: 200,
            data: artists,
            message: "Artists retrieved successfully.",
            error: null,
        });
    } catch (error) {
        console.error("Error fetching artists:", error);
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Add a new artist
const addArtist = async (req, res) => {
    try {
        const { name, grammy=0 , hidden = false } = req.body;
        console.log(Artist);
        if (!name) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "Missing required fields: name",
                error: null,
            });
        }

        const newArtist = await Artist.create({ name, grammy, hidden },{
            fields:["name","grammy","hidden"]
        });

        res.status(201).json({
            status: 201,
            data: newArtist,
            message: "Artist added successfully.",
            error: null,
        });
    } catch (error) {
        console.error("Error adding artist:", error);
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Update an artist
const updateArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, grammy, hidden } = req.body;

        const artist = await Artist.findByPk(id);
        if (!artist) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: "Artist not found.",
                error: null,
            });
        }

        await artist.update({ name, grammy, hidden });

        res.status(204).send(); // No Content
    } catch (error) {
        console.error("Error updating artist:", error);
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Delete an artist
const deleteArtist = async (req, res) => {
    try {
        const { id } = req.params;

        const artist = await Artist.findByPk(id);
        if (!artist) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: "Artist not found.",
                error: null,
            });
        }

        await artist.destroy();

        res.status(200).json({
            status: 200,
            data: { artist_id: id },
            message: `Artist deleted successfully.`,
            error: null,
        });
    } catch (error) {
        console.error("Error deleting artist:", error);
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
const getArtistsById=async (req,res) =>{
    const {id} = req.params.id;
    try{
        const artistIdData = await Artist.findOne(id)
        if(!artistIdData){
            return res.status(404).json({
                status:404,
                data: null,
                message: "Artist not found",
                error: null
            })
        }
        return res.status(200).json({
            status:200,
            data:artistIdData,
            message:"Artists retrieved successfully.",
            error:null
        })
    }
    catch(error){
        return res.status(500).json({
            status:404,
            data: null,
            message: "Internal server error",
            error: error.message,
        })
    }



}

module.exports = {
    getArtists,
    addArtist,
    updateArtist,
    deleteArtist,
    getArtistsById
};
