import { z } from "zod";

export const signupBody = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4)
})

export const signinBody = z.object({
    email: z.string().email(),
    password: z.string().min(4)
})

export const weatherDetails = z.object({
  cityname:z.string(),            
  temperature:z.string(),         
  weather_description:z.string()
})