package org.zenith.pay.demo.controller;

import org.zenith.pay.demo.model.Patient;
import org.zenith.pay.demo.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
}
