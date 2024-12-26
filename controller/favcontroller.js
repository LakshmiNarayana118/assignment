 const { isError } = require('joi');
const Album = require('../entities/album');
const Artist = require('../entities/artist');
const Favorite=require('../entities/favorites');
const Track = require('../entities/track');
const User = require('../entities/user');
 

const getfavs=async (req,res)=>{
    const {category,limit=5,offset=0} = req.params;
    const userId = req.user.userId
    if(!category){
        return res.status(400).json({
            status:400,
            data:null,
            message:"Bad request",
            error:null
        });
    }
    try{
        const favdetails= await Favorite.findAll({
            where:{
                user_id:userId,
                category
            },
            limit:Number(limit),
            offset:Number(offset),
        })
        console.log(favdetails)
        if(!favdetails){
            return res.status(404).json({
                status:404,
                data:null,
                message:"Resource not found",
                error:null
            })
        }
        
        const result=await Promise.all(favdetails.map(async (items)=>{
            let name = null;
            let catdetails='';
            if(category === 'artist') {
                catdetails=await Artist.findByPk(items.item_id);
                name=catdetails.name
            } else if (items.category === 'album') {
                catdetails=await Album.findByPk(items.item_id);
                name=catdetails.name
            } else if (items.category === 'track'){
                catdetails=await Track.findByPk(items.item_id);
                name=catdetails.name
            }
            
            return {
                favorite_id:items.favorite_id,
                category:items.category,
                item_id:items.item_id,
                name,
                createdAt:items.createdAt       
            }
            
        }))
        return res.status(200).json({
            status:200,
            data:result,
            message:'Favorites retrieved successfully.',
            error:null
        })
    }
    catch(err){
        return res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: err.message,
        });
    }


}
const createfavs=async(req,res)=>{
    const user_id=req.user.userId;
    const {category,item_id}=req.body
    if(!category || !item_id || !category in ['track','album','artist']){
        return res.status(400).json({
            status:400,
            data:null,
            message:"Bad request",
            error:null
        });
    }
    try{
        const newfav=await Favorite.create({
            category,
            item_id,
            user_id
        })
        if(!newfav){
            return res.status(500).json({
                status:500,
                data:null,
                message:"Internal server error",
                error:null
            });
        }
        return res.status(200).json({
            status:200,
            data:null,
            message:'Favorite added successfully',
            error:null
        })
    }
    catch(err){
        return res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: err.message,
        });

    }

}
const deletefavs=async (req,res)=>{
    const id=req.params.id;
    // const user_id=req.user.userId
    if(!id){
        return res.status(400).json({
            status:400,
            data:null,
            message:"Bad request",
            error:null
        });
    }
    try{
        const favdetails=await Favorite.findByPk(id)
        if(!favdetails){
            return res.status(404).json({
                status:404,
                data:null,
                message:"Resource not found",
                error:null
            })
        }
        await favdetails.destroy();
        return res.status(200).json({
            status: 200,
            data: null,
            message: "Favorite removed successfully.",
            error: null
        })

    }
    catch(err){
        return res.status(500).json({
            status: 500,
            data: null,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}
module.exports={
    getfavs,
    createfavs,
    deletefavs
}