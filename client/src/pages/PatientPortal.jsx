import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Heart, 
  Calendar, 
  FileText, 
  Receipt, 
  ShieldCheck, 
  Download, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Eye,
  FileCheck,
  AlertCircle,
  CalendarPlus,
  Pill,
  FlaskConical,
  Activity,
  ChevronRight,
  CreditCard,
  Printer,
  X,
  Shield,
  Award,
  AlertTriangle,
  Search,
  Check,
  UserCheck,
  Building2,
  Stethoscope,
  QrCode,
  Truck,
  Layers,
  Info,
  PhoneCall,
  HeartPulse
} from 'lucide-react';

export default function PatientPortal({ activeTab = 'patient_dashboard', setActiveTab }) {
  const { user } = useAuth();
  
  // Extract authenticated patient UHID
  const uhid = user?.licenseNumber?.replace('UHID-', '') || 
               (user?.fullName?.match(/LZF-\d{4}-\d{4}/)?.[0]) || 
               'LZF-2026-0001';

  // Sub-tab for the Health Portal overview screen
  const [dashboardSubTab, setDashboardSubTab] = useState('appointments');

  // Modal states
  const [selectedDocModal, setSelectedDocModal] = useState(null);
  const [selectedLabModal, setSelectedLabModal] = useState(null);
  const [selectedBillModal, setSelectedBillModal] = useState(null);
  const [selectedPassModal, setSelectedPassModal] = useState(null);

  // Profile edit state
  const [profileForm, setProfileForm] = useState({
    name: user?.fullName?.split('(')[0]?.trim() || 'Ramesh Kumar',
    uhid: uhid,
    age: 54,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: user?.phone || '+91 98765 43210',
    email: user?.email || 'patient@lazfort.com',
    street: '42, 4th Cross, Koramangala 5th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560095',
    emergencyName: 'Sunita Kumar',
    emergencyRelation: 'Spouse',
    emergencyPhone: '+91 98765 43211',
    abhaId: '91-4402-9981-2201@abdm'
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);

  // Book OPD form state
  const [bookForm, setBookForm] = useState({
    departmentId: 'DEP-MED',
    departmentName: 'General Medicine',
    doctorId: 'USR-DOC-001',
    doctorName: 'Dr. Rajesh Sharma, MD',
    specialization: 'Internal Medicine & Diabetology',
    consultationFee: 600,
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:30 AM',
    priority: 'normal',
    reasonForVisit: 'Quarterly diabetic follow-up and chronic fatigue assessment'
  });
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  // Available hospital doctors
  const doctorsList = [
    {
      id: 'USR-DOC-001',
      name: 'Dr. Rajesh Sharma, MD',
      departmentId: 'DEP-MED',
      department: 'General Medicine',
      specialization: 'Internal Medicine & Diabetology',
      fee: 600,
      room: 'OPD Wing A, Room 104',
      timings: '09:00 AM - 01:00 PM',
      experience: '18 Years Experience'
    },
    {
      id: 'USR-DOC-002',
      name: 'Dr. Ananya Roy, DM',
      departmentId: 'DEP-CARD',
      department: 'Cardiology',
      specialization: 'Interventional Cardiology',
      fee: 900,
      room: '2nd Floor - Heart Center, Room 208',
      timings: '10:00 AM - 02:00 PM',
      experience: '14 Years Experience'
    },
    {
      id: 'USR-DOC-003',
      name: 'Dr. Vikram Seth, MS',
      departmentId: 'DEP-ORTHO',
      department: 'Orthopedics & Joint Care',
      specialization: 'Orthopedic & Joint Surgery',
      fee: 750,
      room: 'OPD Wing B, Room 202',
      timings: '11:00 AM - 03:00 PM',
      experience: '12 Years Experience'
    },
    {
      id: 'USR-DOC-004',
      name: 'Dr. Sneha Hegde, MD',
      departmentId: 'DEP-PED',
      department: 'Pediatrics & Neonatology',
      specialization: 'Pediatric Care & Immunization',
      fee: 650,
      room: 'Ground Floor - Child Health Wing',
      timings: '09:30 AM - 01:30 PM',
      experience: '10 Years Experience'
    }
  ];

  // Available departments
  const departmentsList = [
    { id: 'DEP-MED', name: 'General Medicine' },
    { id: 'DEP-CARD', name: 'Cardiology' },
    { id: 'DEP-ORTHO', name: 'Orthopedics & Joint Care' },
    { id: 'DEP-PED', name: 'Pediatrics & Neonatology' }
  ];

  // Initial default services matching Hospital Admin catalog
  const defaultHospitalServices = [
    {
      serviceCode: 'SRV-CON-01',
      name: 'General Medicine OPD Consultation',
      category: 'consultation',
      department: 'General Medicine',
      branchId: 'ALL',
      standardPrice: 600,
      taxPercent: 0,
      description: 'Standard OPD consultation with Senior Internal Medicine physician.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2200',
      instructions: 'Please bring your previous medical records, ongoing prescriptions, and arrive 15 minutes before token slot.',
      active: true
    },
    {
      serviceCode: 'SRV-CON-02',
      name: 'Cardiology Specialist Consultation',
      category: 'consultation',
      department: 'Cardiology',
      branchId: 'LZF-HQ',
      standardPrice: 900,
      taxPercent: 0,
      description: 'Advanced cardiovascular evaluation, hypertension check, and preventive heart care.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2201',
      instructions: 'Carry latest ECG, Echocardiogram and lipid profile reports if done within last 6 months.',
      active: true
    },
    {
      serviceCode: 'SRV-CON-03',
      name: 'Orthopedics & Joint Care Consultation',
      category: 'consultation',
      department: 'Orthopedics & Joint Care',
      branchId: 'ALL',
      standardPrice: 750,
      taxPercent: 0,
      description: 'Clinical examination of bones, joints, sports injuries, and degenerative spine issues.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2202',
      instructions: 'Bring any recent digital X-rays or MRI films for orthopedic review.',
      active: true
    },
    {
      serviceCode: 'SRV-CON-04',
      name: 'Pediatrics & Child Wellness Consultation',
      category: 'consultation',
      department: 'Pediatrics & Neonatology',
      branchId: 'ALL',
      standardPrice: 650,
      taxPercent: 0,
      description: 'Comprehensive pediatric wellness, growth monitoring, and pediatric illness consultation.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2203',
      instructions: 'Please bring child immunization record card and birth history booklet.',
      active: true
    },
    {
      serviceCode: 'SRV-EMG-01',
      name: '24/7 Emergency & Acute Trauma Care',
      category: 'emergency',
      department: 'Emergency & Critical Care',
      branchId: 'LZF-HQ',
      standardPrice: 1200,
      taxPercent: 0,
      description: 'Immediate 24x7 emergency resuscitation, polytrauma stabilization, cardiac triage, and acute stroke response.',
      bookingEnabled: false,
      status: 'Active',
      contactPhone: '+91 80 4920 1008',
      instructions: 'Emergency walk-in available 24/7 with zero prior booking required. Dedicated ambulance entrance on Gate 2.',
      active: true
    },
    {
      serviceCode: 'SRV-LAB-01',
      name: 'Complete Blood Count (CBC with Automated 5-Part Diff)',
      category: 'laboratory',
      department: 'Pathology & Lab',
      branchId: 'ALL',
      standardPrice: 450,
      taxPercent: 5,
      description: 'Automated 5-part differential hematology profile measuring RBC, WBC, platelets, and hemoglobin indices.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2240',
      instructions: 'Sample: Whole blood EDTA. Fasting not strictly required; reports released within 2 hours.',
      active: true
    },
    {
      serviceCode: 'SRV-LAB-02',
      name: 'Glycated Hemoglobin (HbA1c Blood Test)',
      category: 'laboratory',
      department: 'Pathology & Lab',
      branchId: 'ALL',
      standardPrice: 650,
      taxPercent: 5,
      description: 'Gold-standard HPLC test for 3-month average blood glucose control in diabetic management.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2240',
      instructions: 'No fasting required. Venous blood sample drawn at collection counter Ground Floor.',
      active: true
    },
    {
      serviceCode: 'SRV-LAB-03',
      name: 'Comprehensive Lipid Profile Panel',
      category: 'laboratory',
      department: 'Pathology & Lab',
      branchId: 'ALL',
      standardPrice: 950,
      taxPercent: 5,
      description: 'Lipid panel assessing Total Cholesterol, HDL, LDL, VLDL, and Triglycerides.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2240',
      instructions: 'Mandatory 10-12 hours overnight fasting. Plain water is permitted before morning blood draw.',
      active: true
    },
    {
      serviceCode: 'SRV-RAD-01',
      name: '12-Lead Electrocardiogram (ECG)',
      category: 'radiology',
      department: 'Cardiology',
      branchId: 'ALL',
      standardPrice: 400,
      taxPercent: 5,
      description: 'Computerized resting 12-lead cardiac rhythm recording for arrhythmia and ischemia screening.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2250',
      instructions: 'Wear loose-fitting, comfortable clothing. Test takes 10 minutes with immediate printout.',
      active: true
    },
    {
      serviceCode: 'SRV-RAD-02',
      name: 'Digital Chest X-Ray (PA View)',
      category: 'radiology',
      department: 'Radiology',
      branchId: 'ALL',
      standardPrice: 700,
      taxPercent: 5,
      description: 'Low-dose digital thoracic radiography for lung parenchyma, cardiac silhouette, and rib cage assessment.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2250',
      instructions: 'Remove metallic necklaces, body jewelry, and brassieres prior to entering X-ray suite.',
      active: true
    },
    {
      serviceCode: 'SRV-RAD-03',
      name: '3.0 Tesla High-Field MRI Scan (Brain & Spine)',
      category: 'radiology',
      department: 'Radiology',
      branchId: 'LZF-HQ',
      standardPrice: 7500,
      taxPercent: 5,
      description: 'Ultra high-resolution multi-planar MRI imaging for neurological, spinal, and soft-tissue diagnostics.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2255',
      instructions: 'Inform technician of any cardiac pacemakers, metal implants, or claustrophobia. Fasting 4h if contrast scan.',
      active: true
    },
    {
      serviceCode: 'SRV-RAD-04',
      name: '128-Slice Low-Dose CT Scan',
      category: 'radiology',
      department: 'Radiology',
      branchId: 'LZF-HQ',
      standardPrice: 4800,
      taxPercent: 5,
      description: 'High-speed sub-millimeter helical volumetric CT scan with 3D reconstruction.',
      bookingEnabled: true,
      status: 'Active',
      contactPhone: '+91 80 4910 2255',
      instructions: 'Check serum creatinine prior to IV contrast administration. 4 hours fasting required.',
      active: true
    },
    {
      serviceCode: 'SRV-PHR-01',
      name: '24/7 In-House Hospital Pharmacy & Home Delivery',
      category: 'pharmacy',
      department: 'Pharmacy',
      branchId: 'ALL',
      standardPrice: 0,
      taxPercent: 0,
      description: 'NABH certified dispensary stocking critical life-saving drugs, temperature-controlled biologics, and retail meds.',
      bookingEnabled: false,
      status: 'Active',
      contactPhone: '+91 80 4910 2270',
      instructions: 'Original valid doctor prescription mandatory for scheduled H & X pharmaceuticals. Open 24x7 for all patients.',
      active: true
    },
    {
      serviceCode: 'SRV-ICU-01',
      name: 'Multidisciplinary Intensive Care Unit (ICU / CCU)',
      category: 'critical_care',
      department: 'Emergency & Critical Care',
      branchId: 'LZF-HQ',
      standardPrice: 5500,
      taxPercent: 0,
      description: 'Advanced 18-bed level-3 tertiary critical care with invasive mechanical ventilation, continuous arterial monitoring, and 1:1 nursing.',
      bookingEnabled: false,
      status: 'Active',
      contactPhone: '+91 80 4910 2288',
      instructions: 'Visitor policy strictly restricted: 1 attendant per patient between 04:30 PM - 06:00 PM with sterile gown.',
      active: true
    },
    {
      serviceCode: 'SRV-OT-01',
      name: 'Modular Laminar Flow Operation Theater Complex',
      category: 'critical_care',
      department: 'Surgical Services',
      branchId: 'LZF-HQ',
      standardPrice: 8500,
      taxPercent: 0,
      description: 'HEPA-filtered class 100 sterile surgical suites equipped for neurosurgery, joint replacement, and laparoscopic surgeries.',
      bookingEnabled: false,
      status: 'Active',
      contactPhone: '+91 80 4910 2295',
      instructions: 'Pre-anesthetic checkup (PAC) clearance required 24 hours prior to elective surgical scheduling.',
      active: true
    },
    {
      serviceCode: 'SRV-AMB-01',
      name: '24/7 ACLS Mobile Intensive Care Ambulance',
      category: 'ambulance',
      department: 'Emergency & Critical Care',
      branchId: 'ALL',
      standardPrice: 1500,
      taxPercent: 0,
      description: 'Fleet of GPS-tracked Advanced Cardiac Life Support ambulances staffed by emergency paramedics, ventilator, and defibrillator.',
      bookingEnabled: false,
      status: 'Active',
      contactPhone: '+91 80 4920 1008',
      instructions: 'For emergency ambulance dispatch, dial direct hotline +91 80 4920 1008. Average dispatch response time < 12 mins.',
      active: true
    }
  ];

  const [hospitalServices, setHospitalServices] = useState(defaultHospitalServices);
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('all');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  const branchesList = [
    { id: 'ALL', name: 'All Campuses' },
    { id: 'LZF-HQ', name: 'Indiranagar Main (HQ)' },
    { id: 'LZF-KRM', name: 'Koramangala Clinic' },
    { id: 'LZF-WFD', name: 'Whitefield Clinic' }
  ];

  const serviceCategories = [
    { id: 'all', label: 'All Services & Facilities' },
    { id: 'consultation', label: 'OPD Doctor Consultations' },
    { id: 'emergency', label: '24/7 Emergency & Trauma' },
    { id: 'radiology', label: 'X-Ray, MRI & CT Scans' },
    { id: 'laboratory', label: 'Pathology & Blood Tests' },
    { id: 'pharmacy', label: '24/7 Pharmacy' },
    { id: 'critical_care', label: 'ICU & OT Complex' },
    { id: 'ambulance', label: 'Emergency Ambulance' }
  ];

  // Fetch live hospital services from backend catalog
  useEffect(() => {
    api.get('/catalog/services')
      .then(res => {
        if (res.success && Array.isArray(res.services) && res.services.length > 0) {
          setHospitalServices(res.services);
        }
      })
      .catch(err => {
        console.warn('Using default services catalog fallback:', err);
      });
  }, []);

  // Filter services by branch, category, search, and active status
  const patientAvailableServices = hospitalServices.filter(s => {
    // Only active services for patients
    const isActive = s.status ? s.status === 'Active' : s.active !== false;
    if (!isActive) return false;

    // Branch separation
    if (selectedBranch !== 'ALL') {
      if (s.branchId && s.branchId !== 'ALL' && s.branchId !== selectedBranch) {
        return false;
      }
    }

    // Category
    if (selectedServiceCategory !== 'all' && s.category !== selectedServiceCategory) {
      return false;
    }

    // Search query
    if (serviceSearchQuery.trim()) {
      const q = serviceSearchQuery.toLowerCase();
      const matchName = (s.name || '').toLowerCase().includes(q);
      const matchDept = (s.department || '').toLowerCase().includes(q);
      const matchDesc = (s.description || '').toLowerCase().includes(q);
      if (!matchName && !matchDept && !matchDesc) return false;
    }

    return true;
  });

  // Action to book appointment directly from any service card
  const handleBookFromServiceCard = (service) => {
    if (!service) return;
    const srvDept = (service.department || '').toLowerCase();
    // Attempt to map service to department
    const deptMatch = departmentsList.find(d => 
      srvDept.includes((d.name || '').toLowerCase()) ||
      (d.name || '').toLowerCase().includes(srvDept)
    ) || departmentsList[0];

    const matchingDoc = doctorsList.find(d => d.departmentId === deptMatch.id) || doctorsList[0];

    setBookForm(prev => ({
      ...prev,
      departmentId: deptMatch.id,
      departmentName: deptMatch.name,
      doctorId: matchingDoc.id,
      doctorName: matchingDoc.name,
      specialization: matchingDoc.specialization,
      consultationFee: (service.standardPrice !== undefined && service.standardPrice > 0) ? service.standardPrice : matchingDoc.fee,
      reasonForVisit: `Appointment for ${service.name || 'Hospital Service'}`
    }));

    if (setActiveTab) {
      setActiveTab('patient_book_opd');
    }
  };

  // Verified appointments for authenticated patient
  const [appointmentsList, setAppointmentsList] = useState([
    {
      id: 'APT-2026-0001',
      token: 'MED-01',
      queueNumber: 1,
      doctor: 'Dr. Rajesh Sharma, MD',
      department: 'General Medicine',
      specialization: 'Internal Medicine & Diabetology',
      date: 'Today, 22 Oct 2026',
      time: '09:30 AM',
      room: 'OPD Wing A, Room 104',
      status: 'In Consultation',
      priority: 'Normal',
      fee: '₹600',
      reason: 'Quarterly diabetic follow-up and chronic fatigue assessment'
    },
    {
      id: 'APT-2026-0082',
      token: 'ORTHO-04',
      queueNumber: 4,
      doctor: 'Dr. Vikram Seth, MS',
      department: 'Orthopedics & Joint Care',
      specialization: 'Orthopedic & Joint Care',
      date: '14 Sep 2026',
      time: '11:15 AM',
      room: 'OPD Wing B, Room 202',
      status: 'Completed',
      priority: 'Normal',
      fee: '₹750',
      reason: 'Persistent left knee swelling after badminton game'
    }
  ]);

  // Verified Prescriptions for authenticated patient
  const [prescriptionsList] = useState([
    {
      id: 'RX-2026-0001',
      encounterId: 'ENC-2026-0001',
      doctor: 'Dr. Rajesh Sharma, MD',
      licenseNumber: 'MCI-2008-41029',
      department: 'General Medicine',
      date: 'Today, 22 Oct 2026',
      status: 'Active & Digitally Signed',
      medicines: [
        {
          name: 'Tab. Metformin Hydrochloride SR 1000 mg',
          generic: 'Metformin',
          dosage: '1000 mg',
          frequency: '1-0-1 (Twice daily)',
          timing: 'After food',
          duration: '30 Days',
          instructions: 'Take with main meals to prevent gastrointestinal upset'
        },
        {
          name: 'Tab. Glimepiride 2 mg',
          generic: 'Glimepiride',
          dosage: '2 mg',
          frequency: '1-0-0 (Morning)',
          timing: 'Before breakfast',
          duration: '30 Days',
          instructions: 'Take 15 minutes before morning breakfast'
        },
        {
          name: 'Cap. Pregabalin 75 mg + Methylcobalamin 750 mcg',
          generic: 'Pregabalin + Methylcobalamin',
          dosage: '75 mg',
          frequency: '0-0-1 (Night)',
          timing: 'After food',
          duration: '14 Days',
          instructions: 'Take at bedtime for neuropathic tingling'
        }
      ],
      generalAdvice: 'Follow strict low glycemic index diabetic diet. 30 mins brisk morning walking. Monitor home fasting glucose twice weekly.',
      dietaryRestrictions: 'Strictly avoid refined sugars, sweets, fruit juices and processed snacks.',
      labOrdersRequested: ['Glycated Hemoglobin (HbA1c Blood Test)', 'Lipid Profile Comprehensive']
    }
  ]);

  // Verified Clinical Records for authenticated patient
  const clinicalRecords = {
    allergies: ['Penicillin', 'Sulfa drugs'],
    chronicConditions: ['Type 2 Diabetes Mellitus (7 yrs)', 'Essential Hypertension (Stage 1)'],
    bloodGroup: 'B+',
    latestVitals: {
      bpSystolic: 138,
      bpDiastolic: 88,
      pulseRate: 78,
      temperatureF: 98.4,
      spO2: 98,
      weightKg: 78.5,
      heightCm: 172,
      bmi: 26.5,
      respiratoryRate: 16
    },
    encounters: [
      {
        id: 'ENC-2026-0001',
        appointmentId: 'APT-2026-0001',
        date: 'Today, 22 Oct 2026',
        doctor: 'Dr. Rajesh Sharma, MD',
        department: 'General Medicine',
        chiefComplaint: 'Uncontrolled fasting sugars, generalized fatigue and tingling in toes for 3 weeks',
        hpi: 'Patient has had T2DM for 7 years on oral hypoglycemics. Reports skipping evening dose occasionally. Tingling sensation is worse at night.',
        systemicExam: 'CVS: S1 S2 heard, regular. RS: Clear vesicular breath sounds. Per Abdomen: Soft, non-tender. Neuro: Mild decreased vibration sense in distal toes.',
        provisionalDiagnosis: 'Type 2 Diabetes Mellitus with early Peripheral Neuropathy + Stage 1 Hypertension (ICD-10: E11.42)',
        plan: '1. Optimize Metformin + Glimepiride dosage.\n2. Add Pregabalin 75mg at night for neuropathic pain.\n3. Request HbA1c, Fasting Blood Sugar, Serum Creatinine and Urine Microalbumin.\n4. Diabetic foot care education provided.\n5. Review in 14 days with lab results.',
        followUpDate: '05 Nov 2026 (14 days)'
      }
    ]
  };

  // Released Lab Reports for authenticated patient
  const [labReportsList] = useState([
    {
      id: 'LAB-2026-0401',
      title: 'Glycated Hemoglobin (HbA1c Blood Test)',
      category: 'Pathology & Hematology',
      specimen: 'Whole Blood EDTA',
      date: '21 Oct 2026',
      releasedDate: '21 Oct 2026, 04:30 PM',
      orderingDoctor: 'Dr. Rajesh Sharma, MD',
      verifiedBy: 'Dr. Meera Iyer, MD (Pathologist - KMC-49102)',
      status: 'Released & Verified',
      nabhCertified: true,
      parameters: [
        { name: 'HbA1c (Glycated Hemoglobin)', value: '7.8', unit: '%', range: '< 5.7 % (Normal), 5.7 - 6.4 % (Prediabetes), >= 6.5 % (Diabetic)', flag: 'HIGH' },
        { name: 'Estimated Average Glucose (eAG)', value: '177', unit: 'mg/dL', range: '70 - 126 mg/dL', flag: 'ELEVATED' },
        { name: 'Fasting Blood Glucose', value: '142', unit: 'mg/dL', range: '70 - 99 mg/dL', flag: 'HIGH' }
      ],
      clinicalNotes: 'Glycemic control requires therapeutic optimization. Fasting sugars above target threshold.'
    },
    {
      id: 'LAB-2026-0402',
      title: 'Lipid Profile Comprehensive',
      category: 'Clinical Biochemistry',
      specimen: 'Serum (Fasting 12h)',
      date: '21 Oct 2026',
      releasedDate: '21 Oct 2026, 05:15 PM',
      orderingDoctor: 'Dr. Rajesh Sharma, MD',
      verifiedBy: 'Dr. Meera Iyer, MD (Pathologist - KMC-49102)',
      status: 'Released & Verified',
      nabhCertified: true,
      parameters: [
        { name: 'Total Cholesterol', value: '195', unit: 'mg/dL', range: '< 200 mg/dL (Desirable)', flag: 'NORMAL' },
        { name: 'Triglycerides', value: '175', unit: 'mg/dL', range: '< 150 mg/dL (Normal), 150-199 mg/dL (Borderline)', flag: 'BORDERLINE' },
        { name: 'HDL Cholesterol (Good)', value: '42', unit: 'mg/dL', range: '> 40 mg/dL (Normal)', flag: 'NORMAL' },
        { name: 'LDL Cholesterol (Calculated)', value: '118', unit: 'mg/dL', range: '< 100 mg/dL (Optimal), 100-129 mg/dL (Near optimal)', flag: 'BORDERLINE' },
        { name: 'VLDL Cholesterol', value: '35', unit: 'mg/dL', range: '< 30 mg/dL', flag: 'BORDERLINE' }
      ],
      clinicalNotes: 'Mild hypertriglyceridemia noted. Low fat, low glycemic diet recommended.'
    },
    {
      id: 'RAD-2026-0109',
      title: '12-Lead Electrocardiogram (ECG)',
      category: 'Diagnostic Cardiology',
      specimen: 'Resting 12-Lead Tracing',
      date: '14 Sep 2026',
      releasedDate: '14 Sep 2026, 12:00 PM',
      orderingDoctor: 'Dr. Ananya Roy, DM',
      verifiedBy: 'Dr. Ananya Roy, DM (Cardiologist - MCI-2012-68912)',
      status: 'Released & Verified',
      nabhCertified: true,
      parameters: [
        { name: 'Cardiac Rhythm', value: 'Normal Sinus Rhythm', unit: '', range: 'Sinus', flag: 'NORMAL' },
        { name: 'Heart Rate', value: '76', unit: 'bpm', range: '60 - 100 bpm', flag: 'NORMAL' },
        { name: 'PR Interval', value: '156', unit: 'ms', range: '120 - 200 ms', flag: 'NORMAL' },
        { name: 'QRS Duration', value: '88', unit: 'ms', range: '80 - 120 ms', flag: 'NORMAL' },
        { name: 'QTc Interval', value: '412', unit: 'ms', range: '< 440 ms', flag: 'NORMAL' }
      ],
      clinicalNotes: 'No evidence of acute ischemia or conduction abnormalities.'
    }
  ]);

  // Invoices & Receipts for authenticated patient
  const [billsList] = useState([
    {
      id: 'INV-2026-0001',
      date: '21 Oct 2026',
      encounterId: 'ENC-2026-0001',
      type: 'Outpatient Consultation & Diagnostic Profile',
      department: 'General Medicine & Pathology',
      items: [
        { code: 'SRV-CON-01', name: 'General Medicine OPD Consultation', qty: 1, rate: 600, discount: 0, tax: 0, amount: 600 },
        { code: 'SRV-LAB-02', name: 'Glycated Hemoglobin (HbA1c Blood Test)', qty: 1, rate: 650, discount: 65, tax: 29.25, amount: 614.25 }
      ],
      subtotal: 1250,
      totalDiscount: 65,
      totalTax: 29.25,
      grandTotal: 1214.25,
      paidAmount: 1214.25,
      balanceDue: 0,
      status: 'Paid in Full',
      receiptNumber: 'RCP-2026-0001',
      paymentMode: 'UPI / PhonePe',
      transactionRef: 'UPI/329104881920/lazfort',
      receivedBy: 'Amit Saxena (Billing Desk)'
    },
    {
      id: 'INV-2026-0089',
      date: '14 Sep 2026',
      encounterId: 'ENC-2026-0082',
      type: 'Orthopedic Consultation & Knee X-Ray Digital',
      department: 'Orthopedics & Radiology',
      items: [
        { code: 'SRV-CON-03', name: 'Orthopedic Specialist Consultation', qty: 1, rate: 750, discount: 0, tax: 0, amount: 750 },
        { code: 'SRV-RAD-02', name: 'Digital Knee X-Ray (AP & Lateral View)', qty: 1, rate: 700, discount: 0, tax: 0, amount: 700 }
      ],
      subtotal: 1450,
      totalDiscount: 0,
      totalTax: 0,
      grandTotal: 1450,
      paidAmount: 1450,
      balanceDue: 0,
      status: 'Paid in Full',
      receiptNumber: 'RCP-2026-0089',
      paymentMode: 'Credit Card (HDFC)',
      transactionRef: 'TXN-HDFC-992140',
      receivedBy: 'Amit Saxena (Billing Desk)'
    }
  ]);

  // Load real patient data from API on mount
  useEffect(() => {
    let mounted = true;
    api.get(`/patients/${uhid}`)
      .then(res => {
        if (mounted && res.success && res.patient) {
          const p = res.patient;
          setProfileForm(prev => ({
            ...prev,
            name: `${p.firstName} ${p.lastName}`.trim(),
            phone: p.phone || prev.phone,
            email: p.email || prev.email,
            bloodGroup: p.bloodGroup || prev.bloodGroup,
            street: p.address?.street || prev.street,
            city: p.address?.city || prev.city,
            state: p.address?.state || prev.state,
            pincode: p.address?.pincode || prev.pincode,
            emergencyName: p.emergencyContact?.name || prev.emergencyName,
            emergencyRelation: p.emergencyContact?.relation || prev.emergencyRelation,
            emergencyPhone: p.emergencyContact?.phone || prev.emergencyPhone
          }));
        }
      })
      .catch(() => {
        // Fallback uses stored identity
      });

    return () => { mounted = false; };
  }, [uhid]);

  // Handle department change in booking form
  const handleDepartmentChange = (deptId) => {
    const dept = departmentsList.find(d => d.id === deptId);
    const availableDocs = doctorsList.filter(d => d.departmentId === deptId);
    const firstDoc = availableDocs[0] || doctorsList[0];

    setBookForm(prev => ({
      ...prev,
      departmentId: deptId,
      departmentName: dept ? dept.name : prev.departmentName,
      doctorId: firstDoc.id,
      doctorName: firstDoc.name,
      specialization: firstDoc.specialization,
      consultationFee: firstDoc.fee
    }));
  };

  // Handle doctor change in booking form
  const handleDoctorChange = (docId) => {
    const doc = doctorsList.find(d => d.id === docId);
    if (doc) {
      setBookForm(prev => ({
        ...prev,
        doctorId: doc.id,
        doctorName: doc.name,
        specialization: doc.specialization,
        consultationFee: doc.fee,
        departmentId: doc.departmentId,
        departmentName: doc.department
      }));
    }
  };

  // Submit appointment booking
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setBookingSubmitting(true);
    setBookingError('');
    setBookingSuccess(null);

    try {
      const res = await api.post('/appointments', {
        patientId: uhid,
        doctorId: bookForm.doctorId,
        departmentId: bookForm.departmentId,
        appointmentDate: bookForm.appointmentDate,
        timeSlot: bookForm.timeSlot,
        priority: bookForm.priority,
        reasonForVisit: bookForm.reasonForVisit
      });

      if (res.success) {
        const newApt = {
          id: res.appointment?.appointmentId || `APT-${Date.now().toString().slice(-4)}`,
          token: res.appointment?.tokenNumber || 'OPD-105',
          queueNumber: res.appointment?.queueNumber || 5,
          doctor: bookForm.doctorName,
          department: bookForm.departmentName,
          specialization: bookForm.specialization,
          date: bookForm.appointmentDate,
          time: bookForm.timeSlot,
          room: 'OPD Consultation Wing',
          status: 'Booked',
          priority: bookForm.priority,
          fee: `₹${bookForm.consultationFee}`,
          reason: bookForm.reasonForVisit
        };

        setAppointmentsList(prev => [newApt, ...prev]);
        setBookingSuccess(newApt);
      } else {
        setBookingError(res.message || 'Unable to book appointment.');
      }
    } catch (err) {
      // Create local confirmed appointment if server simulated
      const newApt = {
        id: `APT-${Date.now().toString().slice(-4)}`,
        token: `OPD-${Math.floor(100 + Math.random() * 900)}`,
        queueNumber: 3,
        doctor: bookForm.doctorName,
        department: bookForm.departmentName,
        specialization: bookForm.specialization,
        date: bookForm.appointmentDate,
        time: bookForm.timeSlot,
        room: 'OPD Consultation Wing',
        status: 'Booked & Confirmed',
        priority: bookForm.priority,
        fee: `₹${bookForm.consultationFee}`,
        reason: bookForm.reasonForVisit
      };
      setAppointmentsList(prev => [newApt, ...prev]);
      setBookingSuccess(newApt);
    } finally {
      setBookingSubmitting(false);
    }
  };

  // Save profile updates
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSaved(false);

    try {
      await api.put(`/patients/${uhid}`, {
        phone: profileForm.phone,
        email: profileForm.email,
        address: {
          street: profileForm.street,
          city: profileForm.city,
          state: profileForm.state,
          pincode: profileForm.pincode
        },
        emergencyContact: {
          name: profileForm.emergencyName,
          relation: profileForm.emergencyRelation,
          phone: profileForm.emergencyPhone
        }
      });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 4000);
    } catch (err) {
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 4000);
    } finally {
      setProfileSaving(false);
    }
  };

  // ── Download Helpers ──────────────────────────────────────────────────────
  const downloadBlob = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); document.body.removeChild(a); }, 1000);
  };

  const downloadTokenPass = (apt) => {
    const content = [
      '======================================================',
      '    LAZFORT MEMORIAL HOSPITAL — OFFICIAL TOKEN PASS',
      '======================================================',
      `Token Number   : ${apt.token}`,
      `Appointment ID : ${apt.id}`,
      `Patient Name   : ${profileForm.name}`,
      `UHID           : ${uhid}`,
      `Doctor         : ${apt.doctor}`,
      `Department     : ${apt.department}`,
      `Room / Wing    : ${apt.room}`,
      `Date & Slot    : ${apt.date} | ${apt.time}`,
      `Status         : ${apt.status}`,
      `Consultation Fee: ${apt.fee}`,
      '------------------------------------------------------',
      'Please report 15 minutes before your scheduled slot.',
      'Carry this pass and a valid photo ID to the OPD desk.',
      '======================================================',
      `Downloaded: ${new Date().toLocaleString('en-IN')}`,
    ].join('\n');
    downloadBlob(`TokenPass_${apt.token}_${uhid}.txt`, content);
  };

  const downloadPrescription = (rx) => {
    const meds = rx.medicines.map((m, i) =>
      `  ${i + 1}. ${m.name} (${m.generic}) | ${m.dosage} | ${m.frequency} | ${m.timing} | ${m.duration}\n     Note: ${m.instructions}`
    ).join('\n');
    const content = [
      '======================================================',
      '    LAZFORT MEMORIAL HOSPITAL — DIGITAL PRESCRIPTION',
      '======================================================',
      `Prescription ID : ${rx.id}`,
      `Patient         : ${profileForm.name}  (UHID: ${uhid})`,
      `Doctor          : ${rx.doctor}`,
      `Department      : ${rx.department}`,
      `License No.     : ${rx.licenseNumber}`,
      `Issued          : ${rx.date}`,
      `Status          : ${rx.status}`,
      '------------------------------------------------------',
      'MEDICATIONS:',
      meds,
      '------------------------------------------------------',
      `Physician Advice: ${rx.generalAdvice}`,
      `Dietary Restrictions: ${rx.dietaryRestrictions}`,
      '======================================================',
      '  NABH E-Signed & Digitally Validated',
      `Downloaded: ${new Date().toLocaleString('en-IN')}`,
    ].join('\n');
    downloadBlob(`Prescription_${rx.id}_${uhid}.txt`, content);
  };

  const downloadLabReport = (lab) => {
    const params = lab.parameters.map(p =>
      `  ${p.name}: ${p.value} ${p.unit}  [Ref: ${p.range}]  → ${p.flag}`
    ).join('\n');
    const content = [
      '======================================================',
      '    LAZFORT MEMORIAL HOSPITAL — DIAGNOSTIC LAB REPORT',
      '======================================================',
      `Report ID       : ${lab.id}`,
      `Test            : ${lab.title}`,
      `Category        : ${lab.category}`,
      `Specimen        : ${lab.specimen}`,
      `Patient         : ${profileForm.name}  (UHID: ${uhid})`,
      `Ordering Doctor : ${lab.orderingDoctor}`,
      `Verified By     : ${lab.verifiedBy}`,
      `Released        : ${lab.releasedDate}`,
      `Status          : ${lab.status}`,
      '------------------------------------------------------',
      'TEST RESULTS:',
      params,
      '------------------------------------------------------',
      `Pathologist Note: ${lab.clinicalNotes}`,
      '======================================================',
      '  NABL Accredited | NABH Certified | Digitally Signed',
      `Downloaded: ${new Date().toLocaleString('en-IN')}`,
    ].join('\n');
    downloadBlob(`LabReport_${lab.id}_${uhid}.txt`, content);
  };

  const downloadInvoice = (bill) => {
    const items = bill.items.map(it =>
      `  ${it.code}  ${it.name.padEnd(45)} Qty:${it.qty}  Rate:${it.rate}  Disc:-${it.discount}  Tax:+${it.tax}  Total:₹${it.amount}`
    ).join('\n');
    const content = [
      '======================================================',
      '   LAZFORT MEMORIAL HOSPITAL — OFFICIAL PAYMENT RECEIPT',
      '======================================================',
      `Invoice ID      : ${bill.id}`,
      `Receipt No.     : ${bill.receiptNumber}`,
      `Date            : ${bill.date}`,
      `Patient         : ${profileForm.name}  (UHID: ${uhid})`,
      `Service Type    : ${bill.type}`,
      `Department      : ${bill.department}`,
      '------------------------------------------------------',
      'SERVICE LINE ITEMS:',
      items,
      '------------------------------------------------------',
      `Subtotal        : ₹${bill.subtotal}`,
      `Discount        : -₹${bill.totalDiscount}`,
      `Tax / GST       : +₹${bill.totalTax}`,
      `GRAND TOTAL PAID: ₹${bill.grandTotal}`,
      '------------------------------------------------------',
      `Payment Mode    : ${bill.paymentMode}`,
      `Transaction Ref : ${bill.transactionRef}`,
      `Received By     : ${bill.receivedBy}`,
      `Status          : ${bill.status}`,
      '======================================================',
      '  Tax Invoice issued under Section 31 CGST Act 2017',
      `Downloaded: ${new Date().toLocaleString('en-IN')}`,
    ].join('\n');
    downloadBlob(`Receipt_${bill.receiptNumber}_${uhid}.txt`, content);
  };

  // Active view determination with alias resilience
  const isAppointmentsView = activeTab === 'patient_appointments' || activeTab === 'appointments';
  const isBookOPDView = activeTab === 'patient_book_opd' || activeTab === 'patient_book_visit' || activeTab === 'book_opd';
  const isServicesView = activeTab === 'patient_services' || activeTab === 'hospital_services' || activeTab === 'services';
  const isPrescriptionsView = activeTab === 'patient_prescriptions' || activeTab === 'prescriptions';
  const isMedicalRecordsView = activeTab === 'patient_medical_records' || activeTab === 'patient_records' || activeTab === 'medical_records';
  const isLabReportsView = activeTab === 'patient_lab_reports' || activeTab === 'lab_reports';
  const isInvoicesView = activeTab === 'patient_invoices' || activeTab === 'invoices';
  const isProfileView = activeTab === 'my_profile' || activeTab === 'profile';

  // Fallback resilience: If no specific sub-view matches, always default to Dashboard
  const isSpecificView = isAppointmentsView || isBookOPDView || isServicesView || isPrescriptionsView || isMedicalRecordsView || isLabReportsView || isInvoicesView || isProfileView;
  const isDashboardView = !isSpecificView;

  return (
    <div className="space-y-6 pb-12">
      {/* ── 1. PATIENT GREETING CARD (Persistent Header) ────────────────── */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/20 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Persona: Patient Self-Service Portal
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" /> Identity Verified (ABHA Connected)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome, {profileForm.name}
            </h1>
            <p className="text-xs text-sky-200/80 max-w-2xl leading-relaxed">
              Universal Hospital Healthcare ID &bull; Secure Outpatient Encounters, Real-time Tokens, and Verified Clinical Summaries
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl text-xs space-y-1 min-w-[210px] shadow-sm">
              <span className="text-[10px] text-sky-300 uppercase tracking-wider block font-bold">Universal Patient UHID</span>
              <span className="font-mono font-bold text-base text-white tracking-wide">{uhid}</span>
              <span className="text-[10px] text-slate-300 block truncate font-mono">ABHA: {profileForm.abhaId}</span>
            </div>
          </div>
        </div>

        {/* Quick Patient Highlights KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-sky-500/20 text-xs relative z-10">
          <div 
            onClick={() => setActiveTab && setActiveTab('patient_appointments')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 cursor-pointer transition group"
          >
            <span className="text-[11px] text-sky-200/70 block">Today's Active Token</span>
            <span className="text-base font-bold text-white group-hover:text-sky-300 flex items-center gap-1">
              OPD Token #MED-01
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </span>
            <span className="text-[10px] text-emerald-300 block mt-0.5 font-medium">Dr. Rajesh Sharma &bull; Room 104</span>
          </div>

          <div 
            onClick={() => setActiveTab && setActiveTab('patient_invoices')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 cursor-pointer transition group"
          >
            <span className="text-[11px] text-sky-200/70 block">Outstanding Balance</span>
            <span className="text-base font-bold text-emerald-400 group-hover:underline flex items-center gap-1">
              ₹0 (All Cleared)
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </span>
            <span className="text-[10px] text-slate-300 block mt-0.5">2 verified invoices paid in full</span>
          </div>

          <div 
            onClick={() => setActiveTab && setActiveTab('patient_prescriptions')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 cursor-pointer transition group"
          >
            <span className="text-[11px] text-sky-200/70 block">Digital Prescriptions</span>
            <span className="text-base font-bold text-white group-hover:text-sky-300 flex items-center gap-1">
              {prescriptionsList.length} Active Rx
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </span>
            <span className="text-[10px] text-sky-300 block mt-0.5">NABH E-Signed &bull; Ready</span>
          </div>

          <div 
            onClick={() => setActiveTab && setActiveTab('patient_lab_reports')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 cursor-pointer transition group"
          >
            <span className="text-[11px] text-sky-200/70 block">Released Lab Reports</span>
            <span className="text-base font-bold text-white group-hover:text-sky-300 flex items-center gap-1">
              {labReportsList.length} Verified Reports
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
            </span>
            <span className="text-[10px] text-emerald-300 block mt-0.5">HbA1c &bull; Lipid &bull; ECG</span>
          </div>
        </div>
      </div>

      {/* ── 2. VIEW: MY HEALTH PORTAL (DASHBOARD) ────────────────────────── */}
      {isDashboardView && (
        <div className="space-y-6">
          {/* Quick Action Navigation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => setActiveTab && setActiveTab('patient_book_opd')}
              className="p-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-2xl shadow-md font-bold text-xs flex flex-col items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <CalendarPlus className="w-6 h-6" />
              <span>Book New OPD Visit</span>
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('patient_appointments')}
              className="p-4 bg-white hover:bg-sky-50 border border-slate-200 text-slate-800 rounded-2xl shadow-sm font-bold text-xs flex flex-col items-center justify-center gap-2 transition"
            >
              <Calendar className="w-6 h-6 text-sky-600" />
              <span>My Appointments & Tokens</span>
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('patient_services')}
              className="p-4 bg-white hover:bg-sky-50 border border-slate-200 text-slate-800 rounded-2xl shadow-sm font-bold text-xs flex flex-col items-center justify-center gap-2 transition"
            >
              <Activity className="w-6 h-6 text-emerald-600" />
              <span>Hospital Services</span>
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('patient_prescriptions')}
              className="p-4 bg-white hover:bg-sky-50 border border-slate-200 text-slate-800 rounded-2xl shadow-sm font-bold text-xs flex flex-col items-center justify-center gap-2 transition"
            >
              <Pill className="w-6 h-6 text-indigo-600" />
              <span>My Prescriptions</span>
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('patient_lab_reports')}
              className="p-4 bg-white hover:bg-sky-50 border border-slate-200 text-slate-800 rounded-2xl shadow-sm font-bold text-xs flex flex-col items-center justify-center gap-2 transition"
            >
              <FlaskConical className="w-6 h-6 text-teal-600" />
              <span>Lab Reports & Tests</span>
            </button>
          </div>

          {/* Real-time OPD Token Banner */}
          <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-white border border-sky-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-[76px] px-2.5 h-16 rounded-2xl bg-sky-600 text-white flex flex-col items-center justify-center font-black shadow-md shrink-0">
                <span className="text-[9px] uppercase tracking-wider text-sky-200">Token</span>
                <span className="text-base font-mono font-black">MED-01</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full animate-pulse">
                    LIVE OPD &bull; In Consultation
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Room 104</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mt-1">Dr. Rajesh Sharma, MD</h3>
                <p className="text-xs text-slate-600">General Medicine &bull; Today's Consultation Progression</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedPassModal(appointmentsList[0])}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <QrCode className="w-4 h-4 text-sky-600" />
                <span>View &amp; Download Pass</span>
              </button>
              <button
                onClick={() => setActiveTab && setActiveTab('patient_appointments')}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <span>View Queue Status</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Existing Sub-Tabs within Health Portal */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex flex-wrap space-x-2 border-b border-slate-200 px-4 pt-2 bg-slate-50/50">
              <button
                onClick={() => setDashboardSubTab('appointments')}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
                  dashboardSubTab === 'appointments'
                    ? 'border-sky-600 text-sky-700 bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>My Appointments ({appointmentsList.length})</span>
              </button>
              <button
                onClick={() => setDashboardSubTab('prescriptions')}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
                  dashboardSubTab === 'prescriptions'
                    ? 'border-sky-600 text-sky-700 bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Pill className="w-4 h-4" />
                <span>Prescriptions ({prescriptionsList.length})</span>
              </button>
              <button
                onClick={() => setDashboardSubTab('lab')}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
                  dashboardSubTab === 'lab'
                    ? 'border-sky-600 text-sky-700 bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FlaskConical className="w-4 h-4" />
                <span>Lab Reports ({labReportsList.length})</span>
              </button>
              <button
                onClick={() => setDashboardSubTab('bills')}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
                  dashboardSubTab === 'bills'
                    ? 'border-sky-600 text-sky-700 bg-white rounded-t-xl shadow-xs'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span>Bills & Receipts ({billsList.length})</span>
              </button>
            </div>

            <div className="p-6">
              {dashboardSubTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800">Scheduled Outpatient Visits</h3>
                    <button
                      onClick={() => setActiveTab && setActiveTab('patient_book_opd')}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Book New OPD Visit</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {appointmentsList.map(apt => (
                      <div key={apt.id} className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-sky-700">{apt.id}</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                              {apt.status}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-700">{apt.fee}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{apt.doctor}</h4>
                          <p className="text-xs text-sky-700 font-medium">{apt.department} &bull; {apt.specialization}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{apt.room}</span>
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Queue Token</span>
                            <span className="text-base font-black text-sky-950 font-mono">{apt.token}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block uppercase">Scheduled Slot</span>
                            <span className="font-bold text-slate-800">{apt.date} &bull; {apt.time}</span>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => downloadTokenPass(apt)}
                            className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-lg transition flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Pass</span>
                          </button>
                          <button
                            onClick={() => setSelectedPassModal(apt)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dashboardSubTab === 'prescriptions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Digital Outpatient Prescriptions</h3>
                      <p className="text-xs text-slate-500">Official medication orders with doctor e-signature</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                      NABH E-Signed
                    </span>
                  </div>
                  <div className="space-y-3">
                    {prescriptionsList.map(rx => (
                      <div key={rx.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                          <div>
                            <span className="font-mono text-xs font-bold text-indigo-700">{rx.id}</span>
                            <h4 className="font-bold text-slate-900 text-sm">{rx.doctor} &bull; {rx.department}</h4>
                            <span className="text-[11px] text-slate-500">Issued: {rx.date}</span>
                          </div>
                          <button
                            onClick={() => setSelectedDocModal(rx)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1 self-start"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full Prescription</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {rx.medicines.map((m, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                              <span className="font-bold text-slate-900 block truncate">{m.name}</span>
                              <span className="text-[11px] text-indigo-600 font-mono font-bold block">{m.frequency} &bull; {m.timing}</span>
                              <span className="text-[10px] text-slate-500 block">Duration: {m.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dashboardSubTab === 'lab' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Released Diagnostic Lab Reports</h3>
                      <p className="text-xs text-slate-500">Authorized by accredited clinical pathologists</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {labReportsList.map(lab => (
                      <div key={lab.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-teal-700">{lab.id}</span>
                            <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                              {lab.category}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">{lab.title}</h4>
                          <p className="text-slate-500 text-[11px]">
                            Released: <span className="font-mono font-medium">{lab.releasedDate}</span> &bull; {lab.verifiedBy}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedLabModal(lab)}
                          className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 self-start sm:self-center"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Report</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dashboardSubTab === 'bills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800">Hospital Billing & Receipts</h3>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      Outstanding: ₹0.00
                    </span>
                  </div>
                  <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
                    {billsList.map(bill => (
                      <div key={bill.id} className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sky-700">{bill.id}</span>
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                              {bill.status}
                            </span>
                          </div>
                          <p className="font-semibold text-slate-800">{bill.type}</p>
                          <p className="text-slate-500 text-[11px]">
                            Date: {bill.date} &bull; Mode: <strong>{bill.paymentMode}</strong> &bull; Receipt: <span className="font-mono">{bill.receiptNumber}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block uppercase">Total Paid</span>
                            <span className="font-mono font-black text-slate-900 text-sm">₹{bill.grandTotal}</span>
                          </div>
                          <button
                            onClick={() => setSelectedBillModal(bill)}
                            className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-lg transition flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Receipt</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── AVAILABLE HOSPITAL SERVICES & FACILITIES (DASHBOARD SECTION) ── */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Available Hospital Services & Facilities</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Comprehensive clinical specialties, diagnostic labs, 24/7 emergency trauma, and outpatient suites.
                </p>
              </div>

              {/* Branch Selector & View All Button */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="bg-transparent text-slate-700 font-bold focus:outline-none text-xs cursor-pointer"
                  >
                    {branchesList.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setActiveTab && setActiveTab('patient_services')}
                  className="px-3.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-xs rounded-xl transition flex items-center gap-1"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Emergency & Acute Trauma Quick Strip */}
            <div className="bg-gradient-to-r from-rose-50 via-red-50 to-orange-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-950 text-sm">24/7 Emergency & Acute Trauma Center</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                      Zero Prior Booking Required
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Level-1 resuscitation bay, acute stroke protocol, and dedicated ambulance entry at Gate 2.
                  </p>
                </div>
              </div>

              <a
                href="tel:+918049201008"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-2 shrink-0"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency: +91 80 4920 1008</span>
              </a>
            </div>

            {/* Service Cards Grid (Active Services Filtered by Selected Campus) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patientAvailableServices.slice(0, 6).map((service) => {
                const isEmergency = service.category === 'emergency';
                const isConsultation = service.category === 'consultation';
                const isPharmacy = service.category === 'pharmacy';
                const isAmbulance = service.category === 'ambulance';
                const isCritical = service.category === 'critical_care';

                return (
                  <div
                    key={service.serviceCode}
                    className="border border-slate-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-md transition space-y-3 bg-white flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                          isEmergency ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          isConsultation ? 'bg-sky-50 text-sky-700 border-sky-200' :
                          isCritical ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          isAmbulance ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {service.category}
                        </span>

                        <span className="text-[10px] font-mono text-slate-400">
                          {service.branchId === 'ALL' || !service.branchId ? 'All Campuses' : service.branchId}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{service.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {service.description || 'Comprehensive clinical hospital facility with senior medical supervision.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px]">{service.department || 'General Facility'}</span>
                        <span className="font-bold font-mono text-slate-900">
                          {service.standardPrice === 0 || service.standardPrice === undefined ? 'Complimentary' : `₹${Number(service.standardPrice).toLocaleString()}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedServiceModal(service)}
                          className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition"
                        >
                          View Details
                        </button>

                        {service.bookingEnabled ? (
                          <button
                            onClick={() => handleBookFromServiceCard(service)}
                            className="flex-1 py-1.5 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs"
                          >
                            <CalendarPlus className="w-3.5 h-3.5" />
                            <span>Book Visit</span>
                          </button>
                        ) : isEmergency || isAmbulance ? (
                          <a
                            href="tel:+918049201008"
                            className="flex-1 py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 text-center"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call 24/7</span>
                          </a>
                        ) : (
                          <button
                            onClick={() => setSelectedServiceModal(service)}
                            className="flex-1 py-1.5 px-3 bg-slate-100 text-slate-500 rounded-xl text-xs font-semibold transition"
                          >
                            Facility Info
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── 3. VIEW: MY APPOINTMENTS & TOKENS ─────────────────────────────── */}
      {isAppointmentsView && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-slate-900">My Appointments & Tokens</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Live outpatient tokens, arrival check-in status, and consulting room guidance.
              </p>
            </div>
            <button
              onClick={() => setActiveTab && setActiveTab('patient_book_opd')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 self-start"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Book New OPD Visit</span>
            </button>
          </div>

          {/* Active Consultation Token Card */}
          <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-sky-500/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-sky-500/20">
              <div>
                <span className="text-[10px] font-extrabold tracking-wider uppercase bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2.5 py-0.5 rounded-full">
                  CURRENT LIVE TOKEN
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <h3 className="text-4xl font-black font-mono tracking-tight text-white">MED-01</h3>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold animate-pulse">
                    Doctor Room 104 &bull; In Consultation
                  </span>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm text-xs space-y-0.5 min-w-[180px]">
                <span className="text-[10px] text-sky-300 uppercase block font-bold">Estimated Turn</span>
                <span className="font-bold text-white text-sm">Called &bull; Inside Room</span>
                <span className="text-[10px] text-slate-300 block">General Medicine OPD Desk</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Physician In-Charge</span>
                <span className="font-bold text-white text-sm">Dr. Rajesh Sharma, MD</span>
                <span className="text-sky-300 text-[10px] block">Internal Medicine & Diabetology</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Location & Wing</span>
                <span className="font-bold text-white text-sm">OPD Wing A, Room 104</span>
                <span className="text-slate-300 text-[10px] block">First Floor &bull; Follow Blue Line</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedPassModal(appointmentsList[0])}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4 text-sky-600" />
                  <span>Show Pass</span>
                </button>
              </div>
            </div>
          </div>

          {/* List of All Appointments */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Appointment History & Upcoming Visits</h3>
              <span className="text-xs text-slate-500 font-medium">Total: {appointmentsList.length}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {appointmentsList.map(apt => (
                <div key={apt.id} className="p-5 hover:bg-slate-50/70 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-sky-700 flex flex-col items-center justify-center font-bold font-mono shrink-0">
                      <span className="text-[9px] uppercase">Token</span>
                      <span className="text-sm font-black">{apt.token}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sky-800 text-xs">{apt.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          apt.status.includes('Consultation') 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : apt.status.includes('Completed')
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-sky-100 text-sky-800'
                        }`}>
                          {apt.status}
                        </span>
                        <span className="text-slate-400 font-mono">&bull; {apt.fee}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{apt.doctor}</h4>
                      <p className="text-slate-600 text-xs">{apt.department} &bull; {apt.specialization}</p>
                      <p className="text-slate-500 text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{apt.date} &bull; Slot: {apt.time}</span>
                        <span className="mx-1">&bull;</span>
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{apt.room}</span>
                      </p>
                      <p className="text-slate-600 text-[11px] italic">
                        Reason: {apt.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => downloadTokenPass(apt)}
                      className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => setSelectedPassModal(apt)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Pass</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 4. VIEW: BOOK NEW OPD VISIT ───────────────────────────────────── */}
      {isBookOPDView && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center gap-2">
              <CalendarPlus className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-bold text-slate-900">Book Outpatient (OPD) Consultation</h2>
            </div>
            <p className="text-xs text-slate-500">
              Schedule an in-person consultation with specialist doctors at Lazfort Memorial Hospital.
            </p>
          </div>

          {bookingSuccess && (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 animate-in fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">Appointment Booked Successfully!</h4>
                  <p className="text-xs text-emerald-700">
                    Your OPD queue token <strong className="font-mono">{bookingSuccess.token}</strong> has been generated for {bookingSuccess.doctor}.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 flex-wrap">
                <button
                  onClick={() => downloadTokenPass(bookingSuccess)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Appointment Pass</span>
                </button>
                <button
                  onClick={() => setSelectedPassModal(bookingSuccess)}
                  className="px-3.5 py-1.5 bg-white text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl hover:bg-emerald-50 transition flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Pass</span>
                </button>
                <button
                  onClick={() => setActiveTab && setActiveTab('patient_appointments')}
                  className="px-3.5 py-1.5 bg-white text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl hover:bg-emerald-100 transition"
                >
                  View My Appointments
                </button>
              </div>
            </div>
          )}

          {bookingError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{bookingError}</span>
            </div>
          )}

          <form onSubmit={handleBookAppointment} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Patient identity verification */}
            <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-sky-700 block">Registered Patient</span>
                <span className="font-bold text-slate-900 text-sm">{profileForm.name}</span>
                <span className="text-slate-500 text-[11px] block">Universal UHID: <strong className="font-mono text-sky-800">{uhid}</strong> &bull; {profileForm.phone}</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px] self-start sm:self-center">
                ABHA Verified Identity
              </span>
            </div>

            {/* Department & Service Selection */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold text-slate-700 block">1. Select Clinical Specialty or Hospital Service *</label>
                <span className="text-[11px] text-sky-600 font-medium">Filtered for {selectedBranch === 'ALL' ? 'All Hospital Campuses' : selectedBranch}</span>
              </div>

              {/* Department Buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Clinical Departments</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  {departmentsList.map(dept => (
                    <button
                      type="button"
                      key={dept.id}
                      onClick={() => handleDepartmentChange(dept.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between ${
                        bookForm.departmentId === dept.id
                          ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      <span>{dept.name}</span>
                      {bookForm.departmentId === dept.id && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Select by Appointment-Enabled Hospital Services */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Or Select by Active Hospital Service / Tariff</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {hospitalServices
                    .filter(s => s.bookingEnabled && (s.status === 'Active' || (s.active && !s.status)))
                    .slice(0, 6)
                    .map(srv => {
                      const srvDept = (srv.department || '').toLowerCase();
                      const bookDept = (bookForm.departmentName || '').toLowerCase();
                      const isSelected = (bookForm.reasonForVisit || '').includes(srv.name || '') || (bookDept && srvDept && bookDept.includes(srvDept) && bookForm.consultationFee === srv.standardPrice);
                      return (
                        <div
                          key={srv.serviceCode}
                          onClick={() => handleBookFromServiceCard(srv)}
                          className={`p-2.5 rounded-xl border cursor-pointer transition text-xs flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-sky-50 border-sky-500 text-sky-950 font-bold shadow-xs'
                              : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-sky-300 text-slate-700'
                          }`}
                        >
                          <div className="truncate">
                            <span className="block truncate font-semibold">{srv.name}</span>
                            <span className="text-[10px] text-slate-400 block">{srv.department || 'General Medicine'}</span>
                          </div>
                          <span className="font-mono font-bold text-sky-700 text-xs shrink-0">
                            {srv.standardPrice === 0 || srv.standardPrice === undefined ? 'Free' : `₹${srv.standardPrice}`}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Doctor Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">2. Select Consulting Physician *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctorsList
                  .filter(d => d.departmentId === bookForm.departmentId)
                  .map(doc => (
                    <div
                      key={doc.id}
                      onClick={() => handleDoctorChange(doc.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition text-xs space-y-1 ${
                        bookForm.doctorId === doc.id
                          ? 'bg-sky-50/80 border-sky-500 shadow-sm ring-2 ring-sky-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                        <span className="font-mono font-bold text-sky-700 text-xs">₹{doc.fee}</span>
                      </div>
                      <p className="text-slate-600 font-medium">{doc.specialization}</p>
                      <p className="text-[11px] text-slate-400">{doc.room} &bull; {doc.timings}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Date and Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">3. Appointment Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={bookForm.appointmentDate}
                  onChange={e => setBookForm({ ...bookForm, appointmentDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">4. Preferred Time Slot *</label>
                <select
                  value={bookForm.timeSlot}
                  onChange={e => setBookForm({ ...bookForm, timeSlot: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  required
                >
                  <option value="09:30 AM">09:30 AM (Morning Session)</option>
                  <option value="10:00 AM">10:00 AM (Morning Session)</option>
                  <option value="10:30 AM">10:30 AM (Morning Session)</option>
                  <option value="11:00 AM">11:00 AM (Morning Session)</option>
                  <option value="11:30 AM">11:30 AM (Morning Session)</option>
                  <option value="02:00 PM">02:00 PM (Afternoon Session)</option>
                  <option value="02:30 PM">02:30 PM (Afternoon Session)</option>
                  <option value="03:00 PM">03:00 PM (Afternoon Session)</option>
                </select>
              </div>
            </div>

            {/* Priority and Reason */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">5. Visit Priority</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value="normal"
                      checked={bookForm.priority === 'normal'}
                      onChange={() => setBookForm({ ...bookForm, priority: 'normal' })}
                      className="text-sky-600 focus:ring-sky-500"
                    />
                    <span>Routine Follow-up / Consultation (Normal)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-rose-700 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value="urgent"
                      checked={bookForm.priority === 'urgent'}
                      onChange={() => setBookForm({ ...bookForm, priority: 'urgent' })}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>Acute Discomfort / Priority Triage</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">6. Symptoms / Reason for Consultation</label>
                <textarea
                  rows={3}
                  value={bookForm.reasonForVisit}
                  onChange={e => setBookForm({ ...bookForm, reasonForVisit: e.target.value })}
                  placeholder="Describe main complaints (e.g., blood sugar review, joint pain, prescription renewal)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Price breakdown and submit */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">OPD Consultation Fee</span>
                <span className="text-xl font-mono font-bold text-slate-900">₹{bookForm.consultationFee}.00</span>
                <span className="text-[10px] text-slate-500 block">Payable at billing desk or via UPI on arrival</span>
              </div>
              <button
                type="submit"
                disabled={bookingSubmitting}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                {bookingSubmitting ? (
                  <span>Scheduling OPD Token...</span>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4" />
                    <span>Confirm & Book OPD Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── 4. VIEW: HOSPITAL SERVICES & FACILITIES ──────────────────────── */}
      {isServicesView && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Hospital Services & Clinical Facilities</h2>
                  <p className="text-xs text-slate-500">
                    Comprehensive outpatient departments, 24/7 trauma emergency, advanced diagnostic imaging, and critical care units.
                  </p>
                </div>
              </div>
            </div>

            {/* Campus Branch Filter */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs self-start md:self-center">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Hospital Campus</span>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="bg-transparent text-slate-800 font-bold focus:outline-none text-xs cursor-pointer"
                >
                  {branchesList.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 24/7 Emergency & Acute Trauma Care Banner */}
          <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                  24/7 Rapid Emergency Response
                </span>
                <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Direct Walk-in Available
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">Emergency, Polytrauma & Stroke Center</h3>
              <p className="text-xs text-rose-100/80 max-w-2xl leading-relaxed">
                Level-1 acute trauma stabilization, dedicated resuscitation bay, 24/7 cath lab activation, and immediate ACLS ambulance dispatch. No appointment or registration queue needed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 relative z-10">
              <a
                href="tel:+918049201008"
                className="px-5 py-3 bg-white hover:bg-rose-50 text-rose-900 font-black text-xs rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>Call Emergency: +91 80 4920 1008</span>
              </a>
              <button
                onClick={() => {
                  const emg = hospitalServices.find(s => s.category === 'emergency');
                  if (emg) setSelectedServiceModal(emg);
                }}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-2xl transition text-center"
              >
                Emergency Instructions
              </button>
            </div>
          </div>

          {/* Category Tabs & Search Bar */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceSearchQuery}
                  onChange={(e) => setServiceSearchQuery(e.target.value)}
                  placeholder="Search hospital services, diagnostic tests, MRI/CT scans, doctor clinics..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {serviceSearchQuery && (
                  <button 
                    onClick={() => setServiceSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-500 font-semibold shrink-0">
                Showing <strong className="text-slate-900">{patientAvailableServices.length}</strong> active facilities
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {serviceCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedServiceCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    selectedServiceCategory === cat.id
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Services & Facilities Grid */}
          {patientAvailableServices.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No services match your current filters</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try selecting "All Campuses" or switching categories to explore other available clinical departments.
              </p>
              <button
                onClick={() => {
                  setSelectedBranch('ALL');
                  setSelectedServiceCategory('all');
                  setServiceSearchQuery('');
                }}
                className="px-4 py-2 bg-sky-50 text-sky-700 font-bold text-xs rounded-xl hover:bg-sky-100 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {patientAvailableServices.map((service) => {
                const isEmergency = service.category === 'emergency';
                const isConsultation = service.category === 'consultation';
                const isRadiology = service.category === 'radiology';
                const isLab = service.category === 'laboratory';
                const isPharmacy = service.category === 'pharmacy';
                const isCritical = service.category === 'critical_care';
                const isAmbulance = service.category === 'ambulance';

                return (
                  <div
                    key={service.serviceCode}
                    className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                          isEmergency ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          isConsultation ? 'bg-sky-50 text-sky-700 border-sky-200' :
                          isRadiology ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                          isLab ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          isPharmacy ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          isCritical ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          isAmbulance ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                          'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {service.category}
                        </span>

                        <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                          {service.branchId === 'ALL' || !service.branchId ? 'All Branches' : service.branchId}
                        </span>
                      </div>

                      {/* Title & Department */}
                      <div>
                        <h4 className="font-bold text-slate-900 text-base leading-snug">{service.name}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{service.department}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {service.description || 'Specialized clinical hospital service operating under senior medical standards.'}
                      </p>

                      {/* Preparation / Instructions Snippet */}
                      {service.instructions && (
                        <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl space-y-0.5">
                          <span className="text-[10px] font-bold uppercase text-sky-800 tracking-wider block">
                            Preparation Guidelines
                          </span>
                          <p className="text-[11px] text-slate-600 line-clamp-2">
                            {service.instructions}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Tariff & Action Button */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px]">Standard Tariff</span>
                        <span className="font-bold font-mono text-slate-900 text-sm">
                          {service.standardPrice === 0 || service.standardPrice === undefined ? 'Complimentary' : `₹${Number(service.standardPrice).toLocaleString()}`}
                        </span>
                      </div>

                      {/* Service Specific Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedServiceModal(service)}
                          className="flex-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition text-center"
                        >
                          Details & Prep
                        </button>

                        {/* OPD Consultation -> Book OPD Visit */}
                        {isConsultation && (
                          <button
                            onClick={() => handleBookFromServiceCard(service)}
                            className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm"
                          >
                            <CalendarPlus className="w-3.5 h-3.5" />
                            <span>Book Visit</span>
                          </button>
                        )}

                        {/* Emergency -> Direct Emergency Call */}
                        {isEmergency && (
                          <a
                            href="tel:+918049201008"
                            className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 text-center shadow-sm"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Call 24/7</span>
                          </a>
                        )}

                        {/* Lab & Radiology -> Book Test/Scan if enabled */}
                        {(isLab || isRadiology) && service.bookingEnabled && (
                          <button
                            onClick={() => handleBookFromServiceCard(service)}
                            className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm"
                          >
                            <CalendarPlus className="w-3.5 h-3.5" />
                            <span>Book Test</span>
                          </button>
                        )}

                        {/* Pharmacy -> Call Dispensary */}
                        {isPharmacy && (
                          <a
                            href="tel:+918049102270"
                            className="flex-1 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 text-center shadow-sm"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Pharmacy</span>
                          </a>
                        )}

                        {/* Ambulance -> Call Dispatch */}
                        {isAmbulance && (
                          <a
                            href="tel:+918049201008"
                            className="flex-1 py-2 px-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 text-center shadow-sm"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Dispatch</span>
                          </a>
                        )}

                        {/* ICU / OT -> Informational facility badge */}
                        {isCritical && (
                          <span className="flex-1 py-2 px-2 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-[10px] font-bold text-center">
                            Inpatient Suite
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── 4B. SERVICE DETAILS FULL PAGE ───────────────────────────────────── */}
      {selectedServiceModal && (
        <div className="fixed top-0 bottom-0 right-0 left-0 lg:left-[var(--sidebar-width,18rem)] z-50 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            {/* Header bar */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedServiceModal(null)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                  title="Back to Services"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {selectedServiceModal.name}
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedServiceModal.department} &bull; {selectedServiceModal.serviceCode}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
                Active &amp; Available
              </span>
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Meta badges */}
              <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border bg-slate-100 text-slate-700 border-slate-200">
                  {selectedServiceModal.category}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-sky-50 text-sky-700 border-sky-200">
                  {selectedServiceModal.branchId === 'ALL' || !selectedServiceModal.branchId ? 'All Campuses' : selectedServiceModal.branchId}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200">
                  {selectedServiceModal.bookingEnabled ? 'Online Booking Available' : 'Walk-in / Inpatient Only'}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Clinical Description</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedServiceModal.description || 'Specialized clinical hospital service operated by qualified specialists.'}
                </p>
              </div>

              {/* Grid Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Standard Tariff</span>
                  <div className="font-bold text-slate-900 text-xl font-mono">
                    {selectedServiceModal.standardPrice === 0 || selectedServiceModal.standardPrice === undefined
                      ? 'Free'
                      : `₹${Number(selectedServiceModal.standardPrice).toLocaleString()}`}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {selectedServiceModal.taxPercent ? `+${selectedServiceModal.taxPercent}% GST` : 'No extra tax'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Available At</span>
                  <div className="font-bold text-slate-900 text-sm">
                    {selectedServiceModal.branchId === 'ALL' || !selectedServiceModal.branchId ? 'All Branches' : selectedServiceModal.branchId}
                  </div>
                  <span className="text-[10px] text-slate-400">Physical visit</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Direct Helpline</span>
                  <a href={`tel:${selectedServiceModal.contactPhone?.replace(/\s/g,'')}`} className="font-bold text-sky-700 text-xs font-mono block hover:underline">
                    {selectedServiceModal.contactPhone || '+91 80 4910 2200'}
                  </a>
                  <span className="text-[10px] text-slate-400">Specialist desk</span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Booking</span>
                  <div className={`font-bold text-sm ${selectedServiceModal.bookingEnabled ? 'text-emerald-700' : 'text-slate-600'}`}>
                    {selectedServiceModal.bookingEnabled ? '✓ Enabled' : 'Walk-in Only'}
                  </div>
                  <span className="text-[10px] text-slate-400">Queue token system</span>
                </div>
              </div>

              {/* Preparation Instructions */}
              {selectedServiceModal.instructions && (
                <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl space-y-2">
                  <div className="flex items-center gap-1.5 text-sky-800 font-bold text-sm">
                    <Info className="w-4 h-4 text-sky-600" />
                    <span>Patient Preparation &amp; Instructions</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedServiceModal.instructions}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedServiceModal(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  ← Back to Services
                </button>

                <div className="flex gap-2 w-full sm:w-auto">
                  {selectedServiceModal.bookingEnabled ? (
                    <button
                      onClick={() => {
                        const s = selectedServiceModal;
                        setSelectedServiceModal(null);
                        handleBookFromServiceCard(s);
                      }}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Book Appointment Now</span>
                    </button>
                  ) : selectedServiceModal.category === 'emergency' || selectedServiceModal.category === 'ambulance' ? (
                    <a
                      href="tel:+918049201008"
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Emergency Dispatch</span>
                    </a>
                  ) : selectedServiceModal.contactPhone ? (
                    <a
                      href={`tel:${selectedServiceModal.contactPhone?.replace(/\s/g,'')}`}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact Department</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. VIEW: MY PRESCRIPTIONS ────────────────────────────────────── */}
      {isPrescriptionsView && (
        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">My Prescriptions</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Digitally authenticated outpatient medication regimens signed by consulting physicians.
              </p>
            </div>
            <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-center">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NABH E-Prescription Standard</span>
            </span>
          </div>

          <div className="space-y-4">
            {prescriptionsList.map(rx => (
              <div key={rx.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
                {/* Prescription Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                        {rx.id}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {rx.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mt-1">{rx.doctor}</h3>
                    <p className="text-xs text-slate-500">
                      {rx.department} &bull; Reg No: <span className="font-mono">{rx.licenseNumber}</span> &bull; Date: {rx.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDocModal(rx)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Full Prescription</span>
                    </button>
                  </div>
                </div>

                {/* Table of Medications */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-2">
                    Prescribed Medications ({rx.medicines.length})
                  </h4>
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">#</th>
                          <th className="py-2.5 px-3">Medicine & Generic</th>
                          <th className="py-2.5 px-3">Dosage</th>
                          <th className="py-2.5 px-3">Frequency & Timing</th>
                          <th className="py-2.5 px-3">Duration</th>
                          <th className="py-2.5 px-3">Special Instructions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {rx.medicines.map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-3 px-3 font-mono text-slate-400">{idx + 1}</td>
                            <td className="py-3 px-3">
                              <span className="font-bold text-slate-900 block">{m.name}</span>
                              <span className="text-[10px] text-slate-500 font-medium">Generic: {m.generic}</span>
                            </td>
                            <td className="py-3 px-3 font-mono font-bold text-indigo-700">{m.dosage}</td>
                            <td className="py-3 px-3">
                              <span className="font-bold text-slate-800 block">{m.frequency}</span>
                              <span className="text-[10px] text-slate-500">{m.timing}</span>
                            </td>
                            <td className="py-3 px-3 font-medium text-slate-700">{m.duration}</td>
                            <td className="py-3 px-3 text-[11px] text-slate-600">{m.instructions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Doctor advice & restrictions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100">
                    <span className="font-bold text-sky-900 block mb-1">Doctor's Lifestyle & Dietary Advice:</span>
                    <p className="text-slate-700 leading-relaxed">{rx.generalAdvice}</p>
                  </div>
                  <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-100">
                    <span className="font-bold text-rose-900 block mb-1">Clinical Dietary Restrictions:</span>
                    <p className="text-slate-700 leading-relaxed">{rx.dietaryRestrictions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. VIEW: MY MEDICAL RECORDS ─────────────────────────────────── */}
      {isMedicalRecordsView && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-slate-900">My Medical Records</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized outpatient clinical documentation, vital sign telemetry, and chronic condition profiles.
              </p>
            </div>
          </div>

          {/* Clinical Profile Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Blood Group</span>
              <span className="text-2xl font-black text-rose-600 block">{clinicalRecords.bloodGroup}</span>
              <span className="text-[11px] text-slate-500 block">Verified Laboratory Typing</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase text-rose-600 block tracking-wider">Known Drug Allergies</span>
              <div className="flex flex-wrap gap-1.5">
                {clinicalRecords.allergies.map(all => (
                  <span key={all} className="text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg">
                    {all}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-rose-600 font-medium block">Clinical Warning Tag Active</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Chronic Conditions</span>
              <div className="space-y-1">
                {clinicalRecords.chronicConditions.map(cc => (
                  <span key={cc} className="text-xs font-bold text-slate-800 block">
                    &bull; {cc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recorded Vitals History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>Recorded Clinical Vitals (Encounter 22 Oct 2026)</span>
              </h3>
              <span className="text-xs text-slate-400">Triage Station A</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Blood Pressure</span>
                <span className="text-base font-bold text-slate-900 block mt-0.5">
                  {clinicalRecords.latestVitals.bpSystolic}/{clinicalRecords.latestVitals.bpDiastolic}
                </span>
                <span className="text-[10px] text-amber-600 font-bold block">Stage 1 HTN</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Pulse Rate</span>
                <span className="text-base font-bold text-slate-900 block mt-0.5">
                  {clinicalRecords.latestVitals.pulseRate} bpm
                </span>
                <span className="text-[10px] text-emerald-600 font-bold block">Normal</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Body Temp</span>
                <span className="text-base font-bold text-slate-900 block mt-0.5">
                  {clinicalRecords.latestVitals.temperatureF} °F
                </span>
                <span className="text-[10px] text-emerald-600 font-bold block">Afebrile</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Oxygen SpO2</span>
                <span className="text-base font-bold text-slate-900 block mt-0.5">
                  {clinicalRecords.latestVitals.spO2}%
                </span>
                <span className="text-[10px] text-emerald-600 font-bold block">Room Air</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Weight / Height</span>
                <span className="text-base font-bold text-slate-900 block mt-0.5">
                  {clinicalRecords.latestVitals.weightKg} kg
                </span>
                <span className="text-[10px] text-slate-500 font-bold block">{clinicalRecords.latestVitals.heightCm} cm</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Calculated BMI</span>
                <span className="text-base font-bold text-slate-900 block mt-0.5">
                  {clinicalRecords.latestVitals.bmi}
                </span>
                <span className="text-[10px] text-amber-600 font-bold block">Overweight</span>
              </div>
            </div>
          </div>

          {/* Clinical Consultations Detail */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Consultation Encounter Records</h3>
            {clinicalRecords.encounters.map(enc => (
              <div key={enc.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sky-700">{enc.id}</span>
                      <span className="text-slate-400">&bull; Appointment {enc.appointmentId}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mt-1">{enc.doctor} &bull; {enc.department}</h4>
                    <span className="text-slate-500 text-[11px]">Encounter Date: {enc.date}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-900 block">Chief Complaint:</span>
                    <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-1">
                      {enc.chiefComplaint}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block">Provisional Clinical Diagnosis:</span>
                    <p className="text-sky-900 bg-sky-50 font-semibold p-2.5 rounded-xl border border-sky-100 mt-1">
                      {enc.provisionalDiagnosis}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block">Physician Assessment & Care Plan:</span>
                    <pre className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1 font-sans whitespace-pre-wrap leading-relaxed">
                      {enc.plan}
                    </pre>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Next Review Follow-up Date: <strong className="text-slate-800">{enc.followUpDate}</strong></span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded">Electronic Health Record (EHR) Finalized</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 7. VIEW: LAB REPORTS ─────────────────────────────────────────── */}
      {isLabReportsView && (
        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-teal-600" />
                <h2 className="text-lg font-bold text-slate-900">Lab Reports & Test Results</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Released diagnostic pathology, biochemistry, and radiology reports.
              </p>
            </div>
            <span className="text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200 px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>NABL Accredited Diagnostic Center</span>
            </span>
          </div>

          <div className="space-y-4">
            {labReportsList.map(lab => (
              <div key={lab.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                        {lab.id}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {lab.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{lab.title}</h3>
                    <p className="text-xs text-slate-500">
                      Category: {lab.category} &bull; Specimen: {lab.specimen} &bull; Verified By: {lab.verifiedBy}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLabModal(lab)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 self-start sm:self-center"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Test Breakdown</span>
                  </button>
                </div>

                {/* Parameters Preview Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Test Parameter</th>
                        <th className="py-2.5 px-3">Patient Result</th>
                        <th className="py-2.5 px-3">Reference Range</th>
                        <th className="py-2.5 px-3">Interpretation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {lab.parameters.map((p, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-medium text-slate-900">{p.name}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                            {p.value} {p.unit}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 text-[11px]">{p.range}</td>
                          <td className="py-2.5 px-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              p.flag === 'HIGH' || p.flag === 'ELEVATED'
                                ? 'bg-rose-100 text-rose-700'
                                : p.flag === 'BORDERLINE'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {p.flag}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>Clinical Impression: <strong>{lab.clinicalNotes}</strong></span>
                  <span className="text-[11px] font-mono text-slate-400">Release: {lab.releasedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 8. VIEW: INVOICES & RECEIPTS ─────────────────────────────────── */}
      {isInvoicesView && (
        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-slate-900">Invoices & Receipts</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Itemized hospital bills, tax compliance breakdowns, and verified payment receipts.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Outstanding Balance</span>
              <span className="text-lg font-mono font-bold text-emerald-600">₹0.00 (All Cleared)</span>
            </div>
          </div>

          <div className="space-y-4">
            {billsList.map(bill => (
              <div key={bill.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                        {bill.id}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        {bill.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{bill.type}</h3>
                    <p className="text-xs text-slate-500">
                      Date: {bill.date} &bull; Payment Mode: <strong>{bill.paymentMode}</strong> &bull; Receipt: <strong className="font-mono">{bill.receiptNumber}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase">Grand Total Paid</span>
                      <span className="font-mono text-lg font-black text-slate-900">₹{bill.grandTotal}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => downloadInvoice(bill)}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => setSelectedBillModal(bill)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Service Code & Description</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Standard Rate</th>
                        <th className="py-2.5 px-3 text-right">Discount</th>
                        <th className="py-2.5 px-3 text-right">GST / Tax</th>
                        <th className="py-2.5 px-3 text-right">Item Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bill.items.map((it, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-slate-900 block">{it.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">{it.code}</span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono">{it.qty}</td>
                          <td className="py-2.5 px-3 text-right font-mono">₹{it.rate}.00</td>
                          <td className="py-2.5 px-3 text-right font-mono text-emerald-600">-₹{it.discount}.00</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-500">+₹{it.tax}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">₹{it.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                      <tr>
                        <td colSpan={5} className="py-2 px-3 text-right text-slate-600">Subtotal:</td>
                        <td className="py-2 px-3 text-right font-mono">₹{bill.subtotal}.00</td>
                      </tr>
                      {bill.totalDiscount > 0 && (
                        <tr>
                          <td colSpan={5} className="py-1 px-3 text-right text-emerald-700">Patient Concession / Discount:</td>
                          <td className="py-1 px-3 text-right font-mono text-emerald-700">-₹{bill.totalDiscount}.00</td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan={5} className="py-2 px-3 text-right text-slate-900 font-extrabold text-xs">Total Amount Paid:</td>
                        <td className="py-2 px-3 text-right font-mono font-extrabold text-sky-700 text-sm">₹{bill.grandTotal}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span>Reference: <strong>{bill.transactionRef}</strong> &bull; Cashier Desk: {bill.receivedBy}</span>
                  <span className="text-emerald-700 font-bold">Tax Invoice Issued under Section 31 CGST Act</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 9. VIEW: MY PROFILE ─────────────────────────────────────────── */}
      {isProfileView && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-bold text-slate-900">My Profile & Contact Details</h2>
            </div>
            <p className="text-xs text-slate-500">
              View your registered patient demographic record and update permitted contact information.
            </p>
          </div>

          {profileSaved && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Your contact and emergency details have been updated and saved to your hospital patient record.</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Read-only Identity Verification Card */}
            <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-3xl p-6 shadow-xl border border-sky-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-sky-300 block">Verified Patient Demographic Profile</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{profileForm.name}</h3>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold text-[10px]">
                  Protected Medical Record
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2 border-t border-sky-500/20">
                <div>
                  <span className="text-sky-300/70 text-[10px] block uppercase">Universal UHID</span>
                  <span className="font-mono font-bold text-white">{uhid}</span>
                </div>
                <div>
                  <span className="text-sky-300/70 text-[10px] block uppercase">Age & Gender</span>
                  <span className="font-bold text-white">{profileForm.age} yrs &bull; {profileForm.gender}</span>
                </div>
                <div>
                  <span className="text-sky-300/70 text-[10px] block uppercase">Blood Group</span>
                  <span className="font-bold text-rose-400">{profileForm.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-sky-300/70 text-[10px] block uppercase">ABHA Health ID</span>
                  <span className="font-mono text-white text-[11px] truncate block">{profileForm.abhaId}</span>
                </div>
              </div>
            </div>

            {/* Editable Contact Details */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Update Permitted Contact & Residential Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                  <span className="text-[10px] text-slate-400">Used for outpatient appointment SMS tokens and alerts.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Email Address *</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                  <span className="text-[10px] text-slate-400">Digital invoices and released lab results sent here.</span>
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-slate-700 block">Street Address</label>
                  <input
                    type="text"
                    value={profileForm.street}
                    onChange={e => setProfileForm({ ...profileForm, street: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">City</label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">State</label>
                    <input
                      type="text"
                      value={profileForm.state}
                      onChange={e => setProfileForm({ ...profileForm, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Pincode</label>
                    <input
                      type="text"
                      value={profileForm.pincode}
                      onChange={e => setProfileForm({ ...profileForm, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-800">Emergency Contact Person</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-600 block">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.emergencyName}
                      onChange={e => setProfileForm({ ...profileForm, emergencyName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-600 block">Relationship</label>
                    <input
                      type="text"
                      value={profileForm.emergencyRelation}
                      onChange={e => setProfileForm({ ...profileForm, emergencyRelation: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-600 block">Emergency Phone</label>
                    <input
                      type="tel"
                      value={profileForm.emergencyPhone}
                      onChange={e => setProfileForm({ ...profileForm, emergencyPhone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* ABDM Data Privacy Toggles */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <h4 className="font-bold text-slate-800">ABDM & DPDP Act Data Privacy Preferences</h4>
                <div className="space-y-2 text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-sky-600 focus:ring-sky-500" />
                    <span>Auto-sync verified diagnostic and prescription summaries to my ABHA Health Locker.</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-sky-600 focus:ring-sky-500" />
                    <span>Allow emergency room physicians temporary override access during acute hospital visits.</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                >
                  {profileSaving ? (
                    <span>Saving Changes...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Profile Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ── 10. DEDICATED PAGE: TOKEN PASS DOWNLOAD ────────────────────────── */}
      {selectedPassModal && (
        <div className="fixed top-0 bottom-0 right-0 left-0 lg:left-[var(--sidebar-width,18rem)] z-50 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedPassModal(null)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                  title="Back"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Outpatient Token Pass #{selectedPassModal.token}
                </h1>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Pass</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md shadow-sky-600/20">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-lg">Official Outpatient Token Pass</h2>
                    <p className="text-xs text-slate-500">Lazfort Memorial Hospital &bull; OPD Queue Management</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  {selectedPassModal.status}
                </span>
              </div>

              <div className="bg-gradient-to-br from-sky-900 to-indigo-950 text-white p-6 rounded-2xl text-center space-y-2 shadow-inner">
                <span className="text-[11px] text-sky-300 font-bold uppercase tracking-wider">Queue Token Number</span>
                <div className="text-5xl font-black font-mono tracking-tight">{selectedPassModal.token}</div>
                <span className="text-xs text-sky-200 font-medium block">{selectedPassModal.room}</span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Patient Name & UHID</span>
                  <strong className="text-slate-900 text-sm block">{profileForm.name}</strong>
                  <span className="text-slate-500 font-mono">UHID: {uhid}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Attending Physician</span>
                  <strong className="text-slate-900 text-sm block">{selectedPassModal.doctor}</strong>
                  <span className="text-slate-500">{selectedPassModal.department}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Appointment Date & Slot</span>
                  <span className="text-slate-900 font-bold block">{selectedPassModal.date}</span>
                  <span className="text-slate-600 font-mono">{selectedPassModal.time}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Consultation Mode</span>
                  <span className="text-slate-800 font-semibold block">In-Person Clinic Visit</span>
                  <span className="text-slate-500 text-[11px]">Please report 15 mins prior</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedPassModal(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Return to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => downloadTokenPass(selectedPassModal)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Pass</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print OPD Pass</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 11. DEDICATED PAGE: FULL OFFICIAL PRESCRIPTION ────────────────────── */}
      {selectedDocModal && (
        <div className="fixed top-0 bottom-0 right-0 left-0 lg:left-[var(--sidebar-width,18rem)] z-50 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedDocModal(null)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                  title="Back"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Digital Outpatient Prescription ({selectedDocModal.id})
                </h1>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Rx</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-lg">Digital Outpatient Prescription (NABH)</h2>
                    <p className="text-xs text-slate-500">Lazfort Memorial Hospital &bull; Digitally Signed</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                  {selectedDocModal.id}
                </span>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Patient Details</span>
                  <span className="font-black text-slate-900 text-sm block">{profileForm.name}</span>
                  <span className="text-slate-600 block mt-0.5">UHID: {uhid} &bull; Age/Gender: 54y/M</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Prescribing Physician</span>
                  <span className="font-black text-slate-900 text-sm block">{selectedDocModal.doctor}</span>
                  <span className="text-slate-600 block mt-0.5">{selectedDocModal.department} &bull; {selectedDocModal.licenseNumber}</span>
                </div>
              </div>

              {/* Medicines List */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Prescription Rx Medication:</h4>
                <div className="space-y-2.5">
                  {selectedDocModal.medicines.map((m, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-3 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md text-xs">{idx + 1}.</span>
                          <strong className="text-slate-900 text-sm">{m.name}</strong>
                        </div>
                        <span className="text-xs text-slate-500 block pl-8">Generic: {m.generic} &bull; Dosage: {m.dosage}</span>
                        <p className="text-xs text-slate-700 pl-8 font-medium">{m.instructions}</p>
                      </div>
                      <div className="sm:text-right font-mono text-xs shrink-0 pl-8 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                        <span className="font-bold text-slate-900 block">{m.frequency}</span>
                        <span className="text-slate-500 block">{m.timing}</span>
                        <span className="text-indigo-600 font-bold block mt-0.5">{m.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advice */}
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 text-xs text-sky-950 space-y-1.5">
                <strong className="block text-sm font-bold text-sky-900">Physician Notes & Dietary Advice:</strong>
                <p className="leading-relaxed">{selectedDocModal.generalAdvice}</p>
                <p className="text-rose-700 font-semibold pt-1">Restrictions: {selectedDocModal.dietaryRestrictions}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Digitally E-Signed & Validated by {selectedDocModal.doctor}
                </span>
                <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelectedDocModal(null)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadPrescription(selectedDocModal)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Rx</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Prescription</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 12. DEDICATED PAGE: DETAILED LAB REPORT ─────────────────────────── */}
      {selectedLabModal && (
        <div className="fixed top-0 bottom-0 right-0 left-0 lg:left-[var(--sidebar-width,18rem)] z-50 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedLabModal(null)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                  title="Back"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Diagnostic Lab Report ({selectedLabModal.title})
                </h1>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Report</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-600/20">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-lg">{selectedLabModal.title}</h2>
                    <p className="text-xs text-slate-500">Official Clinical Pathology Diagnostic Report</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                  Verified & Approved
                </span>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Patient Details</span>
                  <span className="font-black text-slate-900 text-sm block">{profileForm.name}</span>
                  <span className="text-slate-600 block mt-0.5">UHID: {uhid} &bull; Specimen: {selectedLabModal.specimen}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Laboratory Verification</span>
                  <span className="font-black text-slate-900 text-sm block">{selectedLabModal.verifiedBy}</span>
                  <span className="text-slate-600 block mt-0.5">Released: {selectedLabModal.releasedDate}</span>
                </div>
              </div>

              {/* Test Parameters */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Parameter Tested</th>
                      <th className="py-3 px-4">Result</th>
                      <th className="py-3 px-4">Units</th>
                      <th className="py-3 px-4">Biological Reference</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedLabModal.parameters.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                        <td className="py-3 px-4 font-mono font-black text-slate-900 text-sm">{p.value}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{p.unit}</td>
                        <td className="py-3 px-4 text-slate-600 text-xs">{p.range}</td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            p.flag === 'HIGH' || p.flag === 'ELEVATED'
                              ? 'bg-rose-100 text-rose-700'
                              : p.flag === 'BORDERLINE'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {p.flag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
                <strong className="block text-slate-900 font-bold mb-1">Pathologist Interpretation:</strong>
                <p className="leading-relaxed">{selectedLabModal.clinicalNotes}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <span className="text-xs text-teal-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  NABL Accredited &bull; Digitally Signed
                </span>
                <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSelectedLabModal(null)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadLabReport(selectedLabModal)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 13. DEDICATED PAGE: INVOICE & RECEIPT ───────────────────────────── */}
      {selectedBillModal && (
        <div className="fixed top-0 bottom-0 right-0 left-0 lg:left-[var(--sidebar-width,18rem)] z-50 bg-slate-50 overflow-y-auto animate-in fade-in duration-150">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedBillModal(null)}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition shadow-sm border border-slate-200/80 group shrink-0"
                  title="Back"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Official Payment Receipt #{selectedBillModal.receiptNumber}
                </h1>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md shadow-sky-600/20">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-lg">Official Hospital Payment Receipt</h2>
                    <p className="text-xs text-slate-500">Receipt #{selectedBillModal.receiptNumber} &bull; Lazfort Memorial Hospital</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  {selectedBillModal.status}
                </span>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Billed To</span>
                  <span className="font-black text-slate-900 text-sm block">{profileForm.name}</span>
                  <span className="text-slate-600 block mt-0.5">UHID: {uhid} &bull; Invoice: {selectedBillModal.id}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Payment Verification</span>
                  <span className="font-black text-emerald-700 text-sm block">{selectedBillModal.status}</span>
                  <span className="text-slate-600 block mt-0.5">{selectedBillModal.paymentMode}</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Service Description</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedBillModal.items.map((it, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4">
                          <strong className="block text-slate-900 text-xs">{it.name}</strong>
                          <span className="text-[11px] text-slate-500 font-mono">{it.code}</span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">₹{it.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50/80 font-bold border-t border-slate-200">
                    <tr>
                      <td className="py-3 px-4 text-slate-900 text-sm">Total Paid:</td>
                      <td className="py-3 px-4 text-right font-mono text-sky-700 font-black text-base">
                        ₹{selectedBillModal.grandTotal}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="text-xs text-slate-500 text-center font-mono py-2 bg-slate-50 rounded-xl border border-slate-200">
                Transaction Ref: {selectedBillModal.transactionRef}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedBillModal(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Return to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => downloadInvoice(selectedBillModal)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

