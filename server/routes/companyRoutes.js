import express from 'express'
import { ChangeJobApplicationStatus, ChangeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController '
import upload from '../config/multer.js'

const router = express.Router()

// Register a company
router.post('/register',upload.single('image'), registerCompany)

// Company login
router.post('/login',loginCompany)

// Get company data
router.get('/company',getCompanyData)

// Post a job
router.post('/post-job',postJob)

// Get Applicants Data of Company
router.get('/applicants',getCompanyJobApplicants)

// Get Company Job List
router.get('/list-job',getCompanyPostedJobs)

// Change Applications Status
router.post('/change-status',ChangeJobApplicationStatus)

// Change Applications Visiblity
router.post('/change-visiblity',ChangeVisiblity)

export default router

