import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const protectCompany = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, Login Again' });
    }

    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure that the decoded token contains the company ID (assume 'id' is companyId)
        if (!decoded.id) {
            return res.status(400).json({ success: false, message: 'Invalid token, no companyId found' });
        }

        // Fetch the company from the database using the decoded companyId
        req.company = await Company.findById(decoded.id).select('-password');

        if (!req.company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);  // Logging for debugging
        return res.status(401).json({ success: false, message: error.message || 'Invalid or expired token' });
    }
};
