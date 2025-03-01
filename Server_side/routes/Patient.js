// // backend/routes/user.js
const express = require("express");
const { signinBody } = require("../validators/authValidators"); // Ensure this is properly imported
const router = express.Router();
const zod = require("zod");
const { Patient, Hospital } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration");
const bcrypt = require("bcrypt");
// const { authMiddleware } = require("../middleware");

// const signupBody = zod.object({
//   email: zod.string().email(),
//   name: zod.string(),
//   phoneNumber: zod.number(),
//   password: zod.string(),
//   age: zod.number(),
//   medicalHistory: zod.string(),
// });

// router.post("/signup", async (req, res) => {
//   const { hospitalId } = req.params;
//   const { email, name, phoneNumber, password, age, medicalHistory } = req.body;

//   const existingPatient = await Patient.findOne({
//     email: req.body.email,
//   });

//   if (existingPatient) {
//     return res.status(411).json({
//       message: "Email already exists",
//     });
//   }

//   const patient = await Patient.create({
//     email,
//     name,
//     phoneNumber,
//     password,
//     age,
//     medicalHistory,
//   });
//   const patientId = patient._id;

//   const token = jwt.sign(
//     {
//       patientId,
//     },
//     JWT_SECRET
//   );
//   const hospital = await Hospital.findById(hospitalId);
//   if (!hospital) {
//     return res.status(404).json({ message: "Hospital not found" });
//   }

//   hospital.patients.push(patient._id);
//   await hospital.save();
//   res.json({
//     message: "Patient created successfully",
//     token: token,
//   });
// });

router.post("/signup/:hospitalId", async (req, res) => {
  const { hospitalId } = req.params;
  const { email, name, phoneNumber, password, age, medicalHistory } = req.body;

  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const patient = await Patient.create({
      email,
      name,
      phoneNumber,
      password,
      age,
      medicalHistory,
    });

    const token = jwt.sign({ patientId: patient._id, hospitalId }, JWT_SECRET);

    res.status(201).json({
      message: "Patient created successfully",
      token: token,
    });

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    hospital.patients.push(patient._id);
    await hospital.save();
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Error signing up patient",
      error: error.message,
    });
  }
});

router.post("/signin/:hospitalId", async (req, res) => {
  try {
    const { hospitalId } = req.params; // Correct extraction of hospitalId
    const { email, password } = req.body;

    // Validate request body
    const validationResult = signinBody.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ message: "Incorrect inputs" });
    }

    // Find patient by email
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

   

    // Generate JWT token
    const token = jwt.sign({ patientId: patient._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Find hospital
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Add patient to hospital's list if not already added
    if (!hospital.patients.includes(patient._id)) {
      hospital.patients.push(patient._id);
      await hospital.save();
    }

    res.json({
      message: "Patient signed in successfully",
      token: token,
      patientid: patient._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while logging in! Please retry.",
      error: error.message,
    });
  }
});

router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find patient by ID
    const patient = await Patient.findById(patientId).select("-password"); // Exclude password for security

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient details retrieved successfully", patient });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching patient details",
      error: error.message,
    });
  }
});

// const updateBody = zod.object({
//   password: zod.string().optional(),
//   firstName: zod.string().optional(),
//   lastName: zod.string().optional(),
// });

// router.put("/", authMiddleware, async (req, res) => {
//   const { success } = updateBody.safeParse(req.body);
//   if (!success) {
//     res.status(411).json({
//       message: "Error while updating information",
//     });
//   }

//   await User.updateOne(req.body, {
//     id: req.userId,
//   });

//   res.json({
//     message: "Updated successfully",
//   });
// });

// router.get("/bulk", async (req, res) => {
//   const filter = req.query.filter || "";

//   const users = await User.find({
//     $or: [
//       {
//         firstName: {
//           $regex: filter,
//         },
//       },
//       {
//         lastName: {
//           $regex: filter,
//         },
//       },
//     ],
//   });

//   res.json({
//     user: users.map((user) => ({
//       username: user.username,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       _id: user._id,
//     })),
//   });
// });

module.exports = router;
