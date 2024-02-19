import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const restricted = asyncHandler(async (req,res,next)=>{
    let token
    token= req.cookies.fire
   
    if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
          req.user = await User.findById(decoded.userId).select('-password');
    
          next();
        } catch (error) {
          res.status(401);
          throw new Error('Not authorized, token failed');
        }
      } else {
        res.status(401);
        throw new Error('Not authorized, no token');
      }
})

const mutualAcess = (req,res,next)=>{
  if (req.user || req.user.isMod){
    next()
  }else{
    res.status(401)
    throw new Error('Not authorized as Moderator')
  }
}
const strictlyMod = (req,res,next)=>{
  if (req.user && req.user.isMod){
    next()
  }else{
    res.status(401)
    throw new Error('Not authorized as Moderator')
  }
}

export {restricted,mutualAcess,strictlyMod}