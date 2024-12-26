const Album = require('../entities/album')
const Artist = require('../entities/artist')

const getAlbums = async (req,res)=>{
    const {limit,offset,artist_id,hidden} = req.query;
    if(!artist_id || !hidden){
        return res.status(400).json({
            status:400,
            data:result,
            message:"Bad request",
            error:null
        })
    }
    try{
        const filters = {};
        //let artist_name;
        filters.artist_id = artist_id;
        filters.hidden = hidden;

        // const artistsearch = await Artist.findByPk(artist_id);
        // if(!artistsearch){
        //     return res.status(404).json({
        //         status:404,
        //         data:[],
        //         message:"Artist not found, not valid artist ID.",
        //         error:null   
        //     })
        // }
        // artist_name = artistsearch.name;
        const artistAlbumDetails = await Album.findAll({
            where: filters,
            limit: parseInt(limit)||10,
            offset: parseInt(offset)||0,
        })

        if(!artistAlbumDetails){
            return res.status(404).json({
                status:404,
                data:[],
                message:"Artist not found, not valid artist ID.",
                error:null
            })
        }
        // const artistsearch = await artistAlbumDetails.getName()  
        // if(!artistsearch){
        //     return res.status(404).json({
        //             status:404,
        //             data:[],
        //             message:"Artist not found, not valid artist ID.",
        //             error:null   
        //         })
        // }
        // artist_name=artistsearch.name
        const namesearch=await Artist.findByPk(artist_id);
        const artist_name = namesearch.name
        console.log(artist_name)

        const result= artistAlbumDetails.map((items)=>({
            album_id:items.album_id,
            artist_name:artist_name?artist_name:null,
            name:items.name,
            year:items.year,
            hidden:items.hidden
        }))
        return res.status(200).json({
            status:200,
            data:result,
            message:"Albums retrieved successfully.",
            error:null
        })  
    }
    catch(error){
        return res.status(500).json({
            status:500,
            data:null,
            message:"Internal server error",
            error:error.message
        })
    }
   
}
const getAlbumById = async (req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            status:400,
            data:[],
            message:"Bad request",
            error:null
        })
    }
    try{
        const albumdetail=await Album.findOne({
            where:{ album_id:id },
        })
        if(!albumdetail){
            return res.status(404).json({
                status:400,
                data:[],
                message:"Resource Not Found",
                error:null
            })
        }
        const namesearch=await Artist.findByPk(albumdetail.artist_id);
        const artist_name = namesearch.name
        
        return res.status(200).json({
            status:200,
            data:{
                album_id:albumdetail.album_id,
                artist_name:artist_name,
                name: albumdetail.name,
                year: albumdetail.year,
                hidden: albumdetail.hidden,
            },
            message:"Album retrieved successfully.",
            error:null
        })

    }
    catch(error){
        return res.status(500).json({
            status:500,
            data:null,
            message:"Internal server error",
            error:error.message
        })
    }


}
const createAlbum = async (req,res) =>{
    const {artist_id,name,hidden=false} = req.body;
    let year=req.body.year
    if(!artist_id || !name || !year){
        return res.status(400).json({
            status:400,
            data:[],
            message:"Bad request",
            error:null
        })
    }
    year=parseInt(year)
    try{
        const newalbum=await Album.create({artist_id,name,year,hidden})
        if(!newalbum){
            return res.status(404).json({
                status:404,
                data:[],
                message:"=Resource not found",
                error:null
            })
        }
        return res.status(200).json({
            status:200,
            data:newalbum,
            message:"Album created successfully.",
            error:null
        })
    }
    catch(err){
        return res.status(500).json({
            status:500,
            data:null,
            message:"Internal server error",
            error:err.message
        })
    }
}
const UpdateAlbum = async (req,res) =>{
    const {id} = req.params
    const inalbum = req.body;
    if(!inalbum || !id){
        return res.status(400).json({
            status:400,
            data:[],
            message:"Bad request",
            error:null
        })
    }
    try{
        const albumdetail = await Album.findOne({
            where:{album_id:id}
        })
        if(!albumdetail){
            return res.status(404).json({
                status:404,
                data:[],
                message:"=Resource not found",
                error:null
            })
        }
        await albumdetail.update(inalbum)
        return res.status(200).json({
            status:200,
            data:inalbum,
            message:"Album created successfully.",
            error:null
        })
    }
    catch(err){
        return res.status(500).json({
            status:500,
            data:null,
            message:"Internal server error",
            error:err.message
        })
    }
}
const deleteAlbum = async (req,res)=>{
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({
                status:400,
                data:[],
                message:"Bad request",
                error:null
            })
        }
        const album = await Album.findByPk(id);
        if (!album) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: "Resource not found.",
                error: null,
            });
        }

        await album.destroy();

        res.status(200).json({
            status: 200,
            data: null,
            message: `Album:${album.name} deleted successfully.`,
            error: null,
        });

    } 
    catch (error) {
        console.error("Error deleting album:", error);
        res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

module.exports = {
    getAlbums,
    getAlbumById,
    createAlbum,
    UpdateAlbum,
    deleteAlbum
}