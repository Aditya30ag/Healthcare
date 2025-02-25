// backend/db.js

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://adityaagrwal3005:TXoroKCpCUETRcR4@cluster0.rj6y1.mongodb.net/healthcare"
)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("Connection error", err));

const patientSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    phoneNumber: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "Other"] },
    medicalHistory: { type: String },
    dateAdded: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    appointmentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    hospitalType: {
      type: String,
      enum: ["Public", "Private", "Clinic"],
      default: "Public",
    },
    numberOfBeds: { type: Number },
    emergencyServices: { type: Boolean, default: false },
    beds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Availability" }],
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
    facilities: [String],
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  },
  { timestamps: true }
);
const neuroSchema = new mongoose.Schema({
  doctorName: { type: String },
  doctorSpecialization: { type: String },
  doctorExperience: { type: String },
  doctorQualification: { type: String },
  doctorContactNumber: { type: String },
  doctorStatus: {
    type: String,
    enum: ["available", "on-duty", "off-duty"],
    default: "available",
  },
});
const doctorSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    bedStatus: {
      type: String,
      enum: ["available", "occupied", "reserved"],
      default: "available",
    },
    doctorName: { type: String },
    doctorSpecialization: { type: String },
    doctorExperience: { type: String },
    doctorQualification: { type: String },
    doctorContactNumber: { type: String },
    doctorStatus: {
      type: String,
      enum: ["available", "on-duty", "off-duty"],
      default: "available",
    },
    availability: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Availability" },
    ],
  },
  { timestamps: true }
);

const availabilitySchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    isAvailable: { type: Boolean, required: true, default: true },
    arrivalTime: { type: Date },
    departureTime: { type: Date },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
const Doctor = mongoose.model("Doctor", doctorSchema);
const Availability = mongoose.model("Availability", availabilitySchema);
const Patient = mongoose.model("Patient", patientSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);
const NeuroSchema = mongoose.model("Neuro", neuroSchema);

module.exports = {
  Hospital,
  Doctor,
  Availability,
  Patient,
  Appointment,
  NeuroSchema,
};
