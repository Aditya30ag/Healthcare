package org.zenith.pay.demo.service;

import org.zenith.pay.demo.model.Hospital;
import org.zenith.pay.demo.model.Patient;
import org.zenith.pay.demo.repository.HospitalRepository;
import org.zenith.pay.demo.repository.PatientRepository;
import org.zenith.pay.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private JwtUtil jwtUtil; // Inject JWT Utility

    public ResponseEntity<Map<String, Object>> registerPatient(String hospitalId, Patient patient) {
        Map<String, Object> response = new HashMap<>();

        // Check if email already exists
        Optional<Patient> existingPatient = patientRepository.findByEmail(patient.getEmail());
        if (existingPatient.isPresent()) {
            response.put("success", false);
            response.put("message", "Email already exists");
            response.put("status", HttpStatus.CONFLICT.value());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Check if hospital exists
        Optional<Hospital> hospital = hospitalRepository.findById(hospitalId);
        if (hospital.isEmpty()) {
            response.put("success", false);
            response.put("message", "Hospital not found");
            response.put("status", HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Save patient and update hospital
        Patient savedPatient = patientRepository.save(patient);
        Hospital hospitalData = hospital.get();
        hospitalData.getPatients().add(savedPatient.getId());
        hospitalRepository.save(hospitalData);

        // Generate JWT Token
        String token = jwtUtil.generateToken(savedPatient.getEmail());

        // Prepare success response
        response.put("success", true);
        response.put("message", "Patient registered successfully");
        response.put("status", HttpStatus.CREATED.value());
        response.put("token", token);
        response.put("patient", savedPatient);
        response.put("hospitalId", hospitalId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    public ResponseEntity<Map<String, Object>> loginPatient(String hospitalId, String email, String password) {
        Map<String, Object> response = new HashMap<>();

        // Check if hospital exists
        Optional<Hospital> hospital = hospitalRepository.findById(hospitalId);
        if (hospital.isEmpty()) {
            response.put("success", false);
            response.put("message", "Hospital not found");
            response.put("status", HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Find patient by email
        Optional<Patient> patientOpt = patientRepository.findByEmail(email);
        if (patientOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            response.put("status", HttpStatus.UNAUTHORIZED.value());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Patient patient = patientOpt.get();

        // Verify password (Note: In a real application, use proper password hashing)
        if (!patient.getPassword().equals(password)) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            response.put("status", HttpStatus.UNAUTHORIZED.value());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Check if patient belongs to the specified hospital
        if (!hospital.get().getPatients().contains(patient.getId())) {
            response.put("success", false);
            response.put("message", "Patient is not registered with this hospital");
            response.put("status", HttpStatus.FORBIDDEN.value());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        // Generate JWT Token
        String token = jwtUtil.generateToken(patient.getEmail());

        // Prepare success response
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("status", HttpStatus.OK.value());
        response.put("token", token);
        response.put("patient", patient);
        response.put("hospitalId", hospitalId);

        return ResponseEntity.ok(response);
    }
}