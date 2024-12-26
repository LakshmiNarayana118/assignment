const Album = require('../entities/album');
const Artist = require('../entities/artist');
const Track=require('../entities/track');
const albumRouter = require('../routes/albumroute');

const getTracks = async (req,res)=>{
    const {limit=5,offset=0,artist_id,album_id,hidden=false}=req.query;
    if(!artist_id || !album_id ){
        return res.status(400).json({
            status:400,
            data:[],
            message:"Bad request",
            error:null
        })
    }
    try{
        const filters={
            artist_id,
            album_id,
            hidden
        };  
        const trackdetails=await Track.findAll({
            where:filters,
            limit:Number(limit),
            offset:Number(offset),
        });

        const albumdetails = await Album.findByPk(album_id)
        const album_name = albumdetails.name
        const artistdetails = await Artist.findByPk(artist_id)
        const artist_name = artistdetails.name
        if(!trackdetails){
            return res.status(404).json({
                status:404,
                data:[],
                message:'Resource not found',
                error:null
            })
        }
        const result= trackdetails.map((items)=>({
            track_id:items.track_id,
            artist_name,
            album_name,
            name:items.name,
            duration:items.duration,
            hidden:items.hidden
        }))
        return res.status(200).json({
            status:200,
            data:result,
            message:"Tracks retrieved successfully.",
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

const getTracksById = async (req,res)=>{
    const {id} =req.params;
    if(!id){
        return res.status(400).json({
            status:400,
            data:[],
            message:"Bad request",
            error:null
        })
    }
    try{
        const trackDetailById = await Track.findByPk(id)
        if(!trackDetailById){
            return res.status(404).json({
                status:404,
                data:[],
                message:"Resource not Found",
                error:null
            })
        }
        const albumdetails = await Album.findByPk(trackDetailById.album_id)
        const album_name = albumdetails.name
        const artistdetails = await Artist.findByPk(trackDetailById.artist_id)
        const artist_name = artistdetails.name
        return res.status(200).json({
            status:200,
            data:{
                track_id:id,
                artist_name,
                album_name,
                name:trackDetailById.name,
                duration:trackDetailById.duration,
                hidden:trackDetailById.hidden
            },
            message:"Track retrieved successfully.",
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

const createTrack =async (req,res)=>{
    const {artist_id,album_id,name,duration,hidden=false} = req.body;
    if(!artist_id || !album_id || !name || !duration){
        return res.status(400).json({
            status:400,
            data:[],
            message:"Bad request",
            error:null
        })
    }
    try{
        const newtrack = await Track.create({
            artist_id,
            album_id,
            name,
            duration,
            hidden
        })
        if(!newtrack){
            return res.status(404).json({
                status:404,
                data:[],
                message:"Resource not found",
                error:null
            })
        }
        return res.status(200).json({
            status: 201,
            data: null,
            message: "Track created successfully.",
            error: null
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

const UpdateTrack=async (req,res)=>{
    const {id}=req.params;
    const fields = req.body;
    if(!fields){
        return res.status(400).json({
            status:400,
            data:[],
            message:"Bad request",
            error:null
        })
    }
    try{
        const trackdetails = await Track.findByPk(id)
        if(!trackdetails){
            return res.status(404).json({
                status:404,
                data:null,
                message:"Resource not found",
                error:null
            })
        }
        await trackdetails.update(fields)
        return res.status(200).json({
            status:200,
            data:null,
            message:"Track updated successfully.",
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

const deleteTrack=async (req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            status:400,
            data:[],
            message:"Bad request",
            error:null
        })
    }
    try{
        const trackdetails=await Track.findByPk(id);
        if(!trackdetails){
            return res.status(404).json({
                status:404,
                data:null,
                message:"Resource not found",
                error:null
            })
        }
        const track_name=trackdetails.name
        await trackdetails.destroy();
        return res.status(200).json({
            status:200,
            data:null,
            message:`track:${track_name} deleted successfully.`,
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

module.exports={
    getTracks,
    getTracksById,
    createTrack,
    UpdateTrack,
    deleteTrack
}