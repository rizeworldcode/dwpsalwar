const Tc_model = require("../models/TC");
const jwt = require("jsonwebtoken");

exports.student_login = async (req, res) => {
    try {
        const { student_ID, TC_number } = req.body;

        // Check if we have TC number (required)
        if (!TC_number) {
            return {
                message: "TC number is required",
                success: false
            };
        }

        // Find student by TC number
        const validStudent = await Tc_model.findOne({ TC_number });
        if (!validStudent) {
            return {
                message: "TC not found",
                success: false
            };
        }

        // If student ID is provided, verify it matches the record
        if (student_ID && validStudent.student_ID !== student_ID) {
            return {
                message: "Student ID and TC number do not match",
                success: false
            };
        }

        const token = jwt.sign({ id: validStudent._id }, process.env.SECRET_KEY);
        if (!token) {
            return res.json({ message: "Token generation failed" });
        }

        // Set the token to cookies
        res.cookie("token", token);
        const authKeyInsertion = await Tc_model.findOneAndUpdate(
            { _id: validStudent._id },
            { auth_key: token },
            { new: true }
        );

        if (!authKeyInsertion) {
            return res.json({ message: "Token updation failed" });
        }

        return {
            message: "Student logged in successfully",
            success: true,
            token: token,
            studentId: validStudent.student_ID,
            studentObjectId: validStudent._id
        };
    } catch (error) {
        console.log(error);
        return {
            message: error.message || "Internal server error",
            success: false,
        };
    }
}

exports.student_logout = async (req, res) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                // Remove auth_key from the admin record so the token can't be reused
                await Tc_model.findByIdAndUpdate(decoded.id, { $unset: { auth_key: "" } });
            } catch (err) {
                console.log("Token verification failed during logout:", err.message);
                // Continue with clearing cookie even if token verification fails
            }
        }

        // Invalidate the token cookie
        res.clearCookie("token");
        
        return {
            success: true,
            message: "Logged out successfully",
        };
    } catch (error) {
        console.log("Logout Error:", error);
        return {
            success: false,
            message: "Internal server error",
        };
    }
};
