import User from "../models/User.js"
//  Get user Data 
export const getUserData = async(req,res) => {

    const userId = req.auth.userId 
    try {
        
        const user = await User.findById(userId)
        if (!user) {
            return res.json({success:false,message:'User Not Found'})
        }
        res.json({success:true,user})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// Apply For a Job

export const applyForJob = async(req,res) => {
    

}

// Get user applied applications 
export const getUserJobApplications = async(req,res) => {

}

// Update user profile (resume)
export const updateUserResume = async(req,res) => {

}