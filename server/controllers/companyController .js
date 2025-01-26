import Company from "../models/Company.js"
import bcrypt from 'bcrypt'
// Register a new company
export const registerCompany = async (req,res) => {
    const { name , email , password} = req.body

    const imageFile = req.file;
    if (!name || !email || !password || !imageFile) {
        return res.json({success:false,message: "Missing Details"})
    }

    try {
        
        const companyExist = await Company.findOne({email})

        if (companyExist) {
            return res.json({success:false,message:"Company Already Register"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        
    } catch (error) {
        
    }
    
}

// Company Login
export const loginCompany = async (req,res) => {

}


// Get Company Data
export const getCompanyData = async (req,res) => {

}


// Post a new job
export const postJob = async (req,res) => {

}


// Get Company Job applicants

export const getCompanyJobApplicants = async (req,res) => {

}

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req,res) => {

}

// change job Application status 
export const ChangeJobApplicationStatus = async(req,res) => {

}

// change job visiblity
export const ChangeVisiblity = async(req,res) => {
    
}