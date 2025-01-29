import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js"

// Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExist = await Company.findOne({ email });

    if (companyExist) {
      return res.json({
        success: false,
        message: "Company Already Registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Company Login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find company by email
    const company = await Company.findOne({ email });

    if (!company) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, company.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // If authentication succeeds, return success response with token
    return res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    // Handle unexpected errors
    return res.json({ success: false, message: error.message });
  }
};

// Get Company Data
export const getCompanyData = async (req, res) => {

  

  try {
    const company = req.company
    res.json({success:true,company})
  } catch (error) {
    res.json({success:false,message:error.message})
  }

};

// Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary ,level, category} = req.body;

  const companyId = req.company._id;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category
    });
    await newJob.save();
    res.json({ success: true, newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Company Job applicants
export const getCompanyJobApplicants = async (req, res) => {

};

// Get Company Posted Jobs
// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;

    // Fetch all jobs posted by the company
    const jobs = await Job.find({ companyId });

    if (!jobs.length) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    // Map through jobs to attach the number of applicants
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await JobApplication.countDocuments({ jobId: job._id });
        return { ...job.toObject(), applicants: applicantCount };
      })
    );

    return res.status(200).json({ success: true, jobsData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Change job application status
export const ChangeJobApplicationStatus = async (req, res) => {

};

// Change job visibility
export const ChangeVisiblity = async (req, res) => {
  try {
    const {id} = req.body

    const companyId = req.company._id

    const job = await Job.findById(id)

    if (companyId.toString() === job.companyId.toString() ) {
      job.visible = !job.visible
    }

    await job.save()
    res.json({success:true,job})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
};
