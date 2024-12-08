import express from "express";
import { authMiddleware } from "../middleware";
import { weatherDetails } from "../zod";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.post('/details', authMiddleware, async (req:any, res:any) => {
    const { success } = weatherDetails.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Incorrect Inputs"
        })
    }
    const weather = await prisma.weather.create({   
        data: {
            user_id: req.userId,
            cityname: req.body.cityname,
            temperature: req.body.temperature,
            weather_description: req.body.weather_description
        }
    })
    console.log(weather);
    res.status(200).json({
        message: "Weather Added Successfully"
    }) 
})

router.get('/details', authMiddleware, async(req:any, res:any) => {
    const weather = await prisma.weather.findMany({
        select:{
            cityname:true,
            temperature:true,
            weather_description:true,
            id:true,
            user:{
                select:{
                    name:true
                }
            }
        }  
    })
    res.status(200).json({weather});
})


export default router















