import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HospitalSignin from "./pages/HospitalSignin";
import HosSignup from "./pages/HosSignup";
import HospitalDashboard from "./pages/HospitalDashboard";
import PatientSignup from "./pages/PatientSignup";
import PatientSignin from "./pages/PatientSignin";
import HospitalList from "./pages/HospitalList";
import DoctorList from "./pages/DoctorList";
import Dispensation from "./pages/Dispensation";
import PatientDashboard from "./pages/PatientDashboard";
import CancerCare from "./pages/CancerCare";
import AllDoctorPages from "./pages/AllDoctorPages";
import CardiacCare from "./DiseasePages/CardiacCare";
import Neuroscience from "./DiseasePages/Neuroscience";
import Gastrosciences from "./DiseasePages/Gastrosciences";
import SymptomChecker from "./pages/SysmptomApi";
import SpecialDoctors from "./pages/SpecialDoctors";
import Emergency from "./pages/Emergency";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hospital-signup" element={<HosSignup />} />
          <Route path="/hospital-signin" element={<HospitalSignin />} />
          <Route
            path="/hospital-dashboard/:hospitalId"
            element={<HospitalDashboard />}
          />
          <Route
            path="/patient-signin/:hospitalId"
            element={<PatientSignin />}
          />
          <Route
            path="/patient-signup/:hospitalId"
            element={<PatientSignup />}
          />
          <Route path="/hospital-list" element={<HospitalList />} />
          <Route path="/doctor-list/:hospitalId" element={<DoctorList />} />
          <Route path="/dispensation" element={<Dispensation />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/cancer-care" element={<CancerCare />} />
          <Route path="/all-doctors" element={<AllDoctorPages />} />
          <Route path="/cardiac-care" element={<CardiacCare />} />
          <Route path="/Neurosciences" element={<Neuroscience />} />
          <Route path="/gastrosciences" element={<Gastrosciences />} />
          <Route path="/sysmptoms-api" element={<SymptomChecker />} />
          <Route
            path="/special-doctors/:specialisation"
            element={<SpecialDoctors />}
          />
          <Route path="/emergency" element={<Emergency />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
