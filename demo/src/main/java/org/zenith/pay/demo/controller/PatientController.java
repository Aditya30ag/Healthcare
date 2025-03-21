package org.zenith.pay.demo.controller;

import org.zenith.pay.demo.model.Patient;
import org.zenith.pay.demo.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")  // Allows requests from any origin
@RequestMapping("/api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/signup/{hospitalId}")
    public ResponseEntity<Map<String, Object>> registerPatient(@PathVariable String hospitalId, @RequestBody Patient patient) {
        return patientService.registerPatient(hospitalId, patient);
    }

    @PostMapping("/signin/{hospitalId}")
    public ResponseEntity<Map<String, Object>> loginPatient(
            @PathVariable String hospitalId,
            @RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        
        if (email == null || password == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Email and password are required");
            return ResponseEntity.badRequest().body(response);
        }
        
        return patientService.loginPatient(hospitalId, email, password);
    }
}
