import { Webhook } from "svix";
import User from "../models/User.js";
// API Controller Function to Manage Clerk User with Database
export const clerkWebhooks = async(req,res) => {
    try {
        // Create a Svix instance with clerk webhook secret
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRECT)
        // Verifying Headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id" : req.heeader["svix-id"],
            "svix-timestamp" : req.heeader["svix-timestamp"],
            "svix-signature" : req.heeader["svix-signature"]
        })
        // Getting Data from request body
        const { data, type } = req.body
        // Switch case for diffrent event
        switch (type) {
            case 'user.created':{
                const userData = {
                    _id:data.id, 
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,
                    resume:'' 
                }
                await User.create(userData)
                res.json({})
                break;
            }c
            case 'user.updated':{
                const userData = {
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image:data.image_url,
                }
                await User.findByIdAndUpdate(data.id,userData) 
                res.json({})
                break;
            }
            case 'user.delected':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }   
            default:
                break;
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:'Webhooks Error'})
    }
}