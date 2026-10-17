import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const defaultTenant = {
  tenantId: 'TEN-LAZFORT-001',
  name: 'Lazfort Memorial Hospital & Research Centre',
  code: 'LZF-HQ',
  phone: '+91 80 4920 1000',
  email: 'info@lazfort.hospital',
  website: 'https://lazfort.hospital',
  address: {
    street: '14/B, 100 Feet Road, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    country: 'India'
  },
  currency: 'INR',
  currencySymbol: '₹',
  timezone: 'Asia/Kolkata',
  branches: [
    { branchId: 'BR-BLR-01', name: 'Main Campus - Indiranagar', code: 'BLR-MAIN', isMain: true },
    { branchId: 'BR-BLR-02', name: 'South City Clinic - Jayanagar', code: 'BLR-SOUTH', isMain: false }
  ],
  settings: {
    opdTokenPrefix: 'OPD',
    defaultTaxRate: 5,
    enableSmsAlerts: true
  },
  active: true
};

export const initialUsers = [
  {
    tenantId: 'TEN-LAZFORT-001',
    userId: 'USR-ADM-001',
    username: 'admin',
    email: 'admin@lazfort.com',
    passwordHash: hashPassword('Admin@123'),
    fullName: 'Dr. Alok Verma',
    role: 'hospital_admin',
    department: 'Hospital Administration',
    specialization: 'Healthcare Administration',
    phone: '+91 98450 11001',
    licenseNumber: 'KMC-ADMIN-4401',
    consultationFee: 0,
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    userId: 'USR-DOC-001',
    username: 'dr.rajesh',
    email: 'dr.rajesh@lazfort.com',
    passwordHash: hashPassword('Doctor@123'),
    fullName: 'Dr. Rajesh Sharma, MD',
    role: 'doctor',
    department: 'General Medicine',
    specialization: 'Internal Medicine & Diabetology',
    phone: '+91 98450 22002',
    licenseNumber: 'MCI-2008-41029',
    consultationFee: 600,
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    userId: 'USR-DOC-002',
    username: 'dr.ananya',
    email: 'dr.ananya@lazfort.com',
    passwordHash: hashPassword('Doctor@123'),
    fullName: 'Dr. Ananya Roy, DM',
    role: 'doctor',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    phone: '+91 98450 33003',
    licenseNumber: 'MCI-2012-68912',
    consultationFee: 900,
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    userId: 'USR-DOC-003',
    username: 'dr.vikram',
    email: 'dr.vikram@lazfort.com',
    passwordHash: hashPassword('Doctor@123'),
    fullName: 'Dr. Vikram Seth, MS',
    role: 'doctor',
    department: 'Orthopedics',
    specialization: 'Orthopedic & Joint Surgery',
    phone: '+91 98450 44004',
    licenseNumber: 'MCI-2015-99214',
    consultationFee: 750,
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    userId: 'USR-REC-001',
    username: 'reception',
    email: 'reception@lazfort.com',
    passwordHash: hashPassword('Staff@123'),
    fullName: 'Pooja Verma',
    role: 'receptionist',
    department: 'Front Desk & Patient Services',
    specialization: 'OPD Scheduling & Registration',
    phone: '+91 98450 55005',
    licenseNumber: 'N/A',
    consultationFee: 0,
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    userId: 'USR-BIL-001',
    username: 'billing',
    email: 'billing@lazfort.com',
    passwordHash: hashPassword('Staff@123'),
    fullName: 'Amit Saxena',
    role: 'billing_executive',
    department: 'Patient Accounts & Billing',
    specialization: 'Invoicing & TPA Reconciliation',
    phone: '+91 98450 66006',
    licenseNumber: 'N/A',
    consultationFee: 0,
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    userId: 'USR-NRS-001',
    username: 'nurse',
    email: 'nurse@lazfort.com',
    passwordHash: hashPassword('Staff@123'),
    fullName: 'Sister Marykutty Joseph',
    role: 'nurse',
    department: 'OPD Nursing Triage',
    specialization: 'Vitals & Clinical Triage',
    phone: '+91 98450 77007',
    licenseNumber: 'INC-2010-87612',
    consultationFee: 0,
    active: true
  }
];

export const initialDepartments = [
  {
    tenantId: 'TEN-LAZFORT-001',
    deptId: 'DEP-MED',
    name: 'General Medicine',
    code: 'MED',
    headOfDepartment: 'Dr. Rajesh Sharma, MD',
    description: 'Diagnosis and non-surgical treatment of adult diseases, diabetes and chronic illness',
    floorNumber: '1st Floor - OPD Wing A',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    deptId: 'DEP-CARD',
    name: 'Cardiology',
    code: 'CARD',
    headOfDepartment: 'Dr. Ananya Roy, DM',
    description: 'Comprehensive cardiovascular consultation, ECG, Echo and preventive heart care',
    floorNumber: '2nd Floor - Heart Center',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    deptId: 'DEP-ORTHO',
    name: 'Orthopedics & Joint Care',
    code: 'ORTHO',
    headOfDepartment: 'Dr. Vikram Seth, MS',
    description: 'Musculoskeletal trauma, arthritis, sports injuries and joint reconstruction',
    floorNumber: '1st Floor - OPD Wing B',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    deptId: 'DEP-PED',
    name: 'Pediatrics & Neonatology',
    code: 'PED',
    headOfDepartment: 'Dr. Sneha Hegde, MD',
    description: 'Child wellness, pediatric infectious disease management and immunization',
    floorNumber: 'Ground Floor - Child Health Wing',
    active: true
  }
];

export const initialServiceCatalog = [
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-CON-01',
    name: 'General Medicine OPD Consultation',
    category: 'consultation',
    department: 'General Medicine',
    standardPrice: 600,
    taxPercent: 0,
    description: 'Standard OPD consultation with Internal Medicine specialist',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-CON-02',
    name: 'Cardiology Specialist Consultation',
    category: 'consultation',
    department: 'Cardiology',
    standardPrice: 900,
    taxPercent: 0,
    description: 'Advanced cardiovascular evaluation and consultation',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-CON-03',
    name: 'Orthopedic Consultation',
    category: 'consultation',
    department: 'Orthopedics & Joint Care',
    standardPrice: 750,
    taxPercent: 0,
    description: 'Clinical examination of bones, joints, and spine',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-LAB-01',
    name: 'Complete Blood Count (CBC with Automated Differential)',
    category: 'laboratory',
    department: 'Pathology & Lab',
    standardPrice: 450,
    taxPercent: 5,
    description: 'Automated 5-part differential hematology profile',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-LAB-02',
    name: 'Glycated Hemoglobin (HbA1c Blood Test)',
    category: 'laboratory',
    department: 'Pathology & Lab',
    standardPrice: 650,
    taxPercent: 5,
    description: 'Standard 3-month blood glucose control assessment',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-LAB-03',
    name: 'Lipid Profile Comprehensive',
    category: 'laboratory',
    department: 'Pathology & Lab',
    standardPrice: 950,
    taxPercent: 5,
    description: 'Total cholesterol, HDL, LDL, VLDL and triglycerides',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-RAD-01',
    name: '12-Lead Electrocardiogram (ECG)',
    category: 'radiology',
    department: 'Cardiology',
    standardPrice: 400,
    taxPercent: 5,
    description: 'Resting 12-lead cardiac rhythm tracing',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-RAD-02',
    name: 'Digital Chest X-Ray (PA View)',
    category: 'radiology',
    department: 'Radiology',
    standardPrice: 700,
    taxPercent: 5,
    description: 'High-definition digital thoracic radiography',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-RAD-03',
    name: 'Transthoracic 2D Echocardiography',
    category: 'radiology',
    department: 'Cardiology',
    standardPrice: 2400,
    taxPercent: 5,
    description: 'Complete doppler assessment of heart valves and chamber motility',
    active: true
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    serviceCode: 'SRV-PRC-01',
    name: 'Nebulization Session',
    category: 'procedure',
    department: 'Nursing & Procedures',
    standardPrice: 250,
    taxPercent: 0,
    description: 'Bronchodilator aerosol inhalation delivery',
    active: true
  }
];

export const initialPatients = [
  {
    tenantId: 'TEN-LAZFORT-001',
    uhid: 'LZF-2026-0001',
    firstName: 'Ramesh',
    lastName: 'Gupta',
    gender: 'male',
    dob: '1972-04-12',
    age: 54,
    phone: '9876543210',
    email: 'ramesh.gupta@example.com',
    bloodGroup: 'B+',
    address: {
      street: '42, 4th Cross, Koramangala 5th Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560095'
    },
    emergencyContact: {
      name: 'Sunita Gupta',
      relation: 'Spouse',
      phone: '9876543219'
    },
    allergies: ['Penicillin', 'Sulfa drugs'],
    chronicConditions: ['Type 2 Diabetes Mellitus', 'Essential Hypertension'],
    duplicateFlag: false,
    status: 'active'
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    uhid: 'LZF-2026-0002',
    firstName: 'Sunita Devi',
    lastName: 'Sharma',
    gender: 'female',
    dob: '1978-08-25',
    age: 48,
    phone: '9876501234',
    email: 'sunita.sharma@example.com',
    bloodGroup: 'O+',
    address: {
      street: 'Flat 302, Green Meadows, HSR Layout Sector 2',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102'
    },
    emergencyContact: {
      name: 'Manoj Sharma',
      relation: 'Son',
      phone: '9876501239'
    },
    allergies: [],
    chronicConditions: ['Dyslipidemia', 'Mild Asthmatic Bronchitis'],
    duplicateFlag: false,
    status: 'active'
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    uhid: 'LZF-2026-0003',
    firstName: 'Arvind',
    lastName: 'Narayanan',
    gender: 'male',
    dob: '1990-11-14',
    age: 36,
    phone: '9811223344',
    email: 'arvind.n@example.com',
    bloodGroup: 'A+',
    address: {
      street: '88, Defense Colony, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    emergencyContact: {
      name: 'Lakshmi Narayanan',
      relation: 'Mother',
      phone: '9811223399'
    },
    allergies: ['Ciprofloxacin'],
    chronicConditions: ['Left Knee Ligament Strain'],
    duplicateFlag: false,
    status: 'active'
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    uhid: 'LZF-2026-0004',
    firstName: 'Meera',
    lastName: 'Krishnan',
    gender: 'female',
    dob: '1997-02-18',
    age: 29,
    phone: '9765432109',
    email: 'meera.k@example.com',
    bloodGroup: 'AB+',
    address: {
      street: '15, Lake View Road, Ulsoor',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560008'
    },
    emergencyContact: {
      name: 'Rohan Krishnan',
      relation: 'Brother',
      phone: '9765432110'
    },
    allergies: [],
    chronicConditions: [],
    duplicateFlag: false,
    status: 'active'
  }
];

export const initialAppointments = [
  {
    tenantId: 'TEN-LAZFORT-001',
    appointmentId: 'APT-2026-0001',
    patientId: 'LZF-2026-0001',
    patientName: 'Ramesh Gupta',
    patientPhone: '9876543210',
    patientGender: 'male',
    patientAge: 54,
    doctorId: 'USR-DOC-001',
    doctorName: 'Dr. Rajesh Sharma, MD',
    departmentId: 'DEP-MED',
    departmentName: 'General Medicine',
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '09:30 AM',
    queueNumber: 1,
    tokenNumber: 'MED-01',
    priority: 'normal',
    status: 'in_consultation',
    reasonForVisit: 'Quarterly diabetic follow-up and chronic fatigue assessment',
    checkInTime: new Date(Date.now() - 45 * 60000).toISOString(),
    consultationStartTime: new Date(Date.now() - 10 * 60000).toISOString(),
    bookedBy: 'Pooja Verma (Reception)'
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    appointmentId: 'APT-2026-0002',
    patientId: 'LZF-2026-0002',
    patientName: 'Sunita Devi Sharma',
    patientPhone: '9876501234',
    patientGender: 'female',
    patientAge: 48,
    doctorId: 'USR-DOC-002',
    doctorName: 'Dr. Ananya Roy, DM',
    departmentId: 'DEP-CARD',
    departmentName: 'Cardiology',
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    queueNumber: 2,
    tokenNumber: 'CARD-02',
    priority: 'urgent',
    status: 'checked_in',
    reasonForVisit: 'Exertional palpitation and mild retrosternal discomfort',
    checkInTime: new Date(Date.now() - 25 * 60000).toISOString(),
    bookedBy: 'Pooja Verma (Reception)'
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    appointmentId: 'APT-2026-0003',
    patientId: 'LZF-2026-0003',
    patientName: 'Arvind Narayanan',
    patientPhone: '9811223344',
    patientGender: 'male',
    patientAge: 36,
    doctorId: 'USR-DOC-003',
    doctorName: 'Dr. Vikram Seth, MS',
    departmentId: 'DEP-ORTHO',
    departmentName: 'Orthopedics & Joint Care',
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:30 AM',
    queueNumber: 3,
    tokenNumber: 'ORTHO-03',
    priority: 'normal',
    status: 'booked',
    reasonForVisit: 'Persistent left knee swelling after badminton game',
    bookedBy: 'Pooja Verma (Reception)'
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    appointmentId: 'APT-2026-0004',
    patientId: 'LZF-2026-0004',
    patientName: 'Meera Krishnan',
    patientPhone: '9765432109',
    patientGender: 'female',
    patientAge: 29,
    doctorId: 'USR-DOC-001',
    doctorName: 'Dr. Rajesh Sharma, MD',
    departmentId: 'DEP-MED',
    departmentName: 'General Medicine',
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '11:00 AM',
    queueNumber: 4,
    tokenNumber: 'MED-04',
    priority: 'normal',
    status: 'checked_in',
    reasonForVisit: 'High fever, severe chills and body ache for 3 days',
    checkInTime: new Date(Date.now() - 15 * 60000).toISOString(),
    bookedBy: 'Pooja Verma (Reception)'
  }
];

export const initialEncounters = [
  {
    tenantId: 'TEN-LAZFORT-001',
    encounterId: 'ENC-2026-0001',
    appointmentId: 'APT-2026-0001',
    patientId: 'LZF-2026-0001',
    patientName: 'Ramesh Gupta',
    doctorId: 'USR-DOC-001',
    doctorName: 'Dr. Rajesh Sharma, MD',
    departmentName: 'General Medicine',
    encounterDate: new Date().toISOString(),
    vitals: {
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
    chiefComplaint: 'Uncontrolled fasting sugars, generalized fatigue and tingling in toes for 3 weeks',
    historyOfPresentIllness: 'Patient has had T2DM for 7 years on oral hypoglycemics. Reports skipping evening dose occasionally. Tingling sensation is worse at night.',
    pastMedicalHistory: 'Hypertension controlled on Amlodipine 5mg. No past surgeries.',
    systemicExamination: 'CVS: S1 S2 heard, regular. RS: Clear vesicular breath sounds. Per Abdomen: Soft, non-tender. Neuro: Mild decreased vibration sense in distal toes.',
    provisionalDiagnosis: 'Type 2 Diabetes Mellitus with early Peripheral Neuropathy + Stage 1 Hypertension',
    icd10Code: 'E11.42',
    assessmentPlan: '1. Optimize Metformin + Glimepiride dosage.\n2. Add Pregabalin 75mg at night for neuropathic pain.\n3. Request HbA1c, Fasting Blood Sugar, Serum Creatinine and Urine Microalbumin.\n4. Diabetic foot care education provided.\n5. Review in 14 days with lab results.',
    disposition: 'follow_up_scheduled',
    followUpDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    status: 'draft',
    finalizedAt: null,
    finalizedBy: null
  }
];

export const initialPrescriptions = [
  {
    tenantId: 'TEN-LAZFORT-001',
    prescriptionId: 'RX-2026-0001',
    encounterId: 'ENC-2026-0001',
    patientId: 'LZF-2026-0001',
    patientName: 'Ramesh Gupta',
    doctorId: 'USR-DOC-001',
    doctorName: 'Dr. Rajesh Sharma, MD',
    medicines: [
      {
        medicineName: 'Tab. Metformin Hydrochloride SR 1000 mg',
        genericName: 'Metformin',
        dosage: '1000 mg',
        route: 'Oral',
        frequency: '1-0-1 (Twice daily)',
        timing: 'After food',
        durationDays: 30,
        instructions: 'Take with main meals to prevent gastrointestinal upset'
      },
      {
        medicineName: 'Tab. Glimepiride 2 mg',
        genericName: 'Glimepiride',
        dosage: '2 mg',
        route: 'Oral',
        frequency: '1-0-0 (Morning)',
        timing: 'Before breakfast',
        durationDays: 30,
        instructions: 'Take 15 minutes before morning breakfast'
      },
      {
        medicineName: 'Cap. Pregabalin 75 mg + Methylcobalamin 750 mcg',
        genericName: 'Pregabalin + Methylcobalamin',
        dosage: '75 mg',
        route: 'Oral',
        frequency: '0-0-1 (Night)',
        timing: 'After food',
        durationDays: 14,
        instructions: 'Take at bedtime for neuropathic tingling'
      }
    ],
    labOrders: [
      { testName: 'Glycated Hemoglobin (HbA1c Blood Test)', clinicalNotes: 'Quarterly glycemic assessment', urgent: false },
      { testName: 'Lipid Profile Comprehensive', clinicalNotes: 'Cardiovascular risk stratification', urgent: false }
    ],
    generalAdvice: 'Follow strict low glycemic index diabetic diet. 30 mins brisk morning walking. Monitor home fasting glucose twice weekly.',
    dietaryRestrictions: 'Strictly avoid refined sugars, sweets, fruit juices and processed snacks.',
    status: 'active'
  }
];

export const initialInvoices = [
  {
    tenantId: 'TEN-LAZFORT-001',
    invoiceId: 'INV-2026-0001',
    patientId: 'LZF-2026-0001',
    patientName: 'Ramesh Gupta',
    patientPhone: '9876543210',
    encounterId: 'ENC-2026-0001',
    date: new Date().toISOString(),
    items: [
      {
        serviceCode: 'SRV-CON-01',
        serviceName: 'General Medicine OPD Consultation',
        quantity: 1,
        unitPrice: 600,
        discountPercent: 0,
        taxPercent: 0,
        itemTotal: 600
      },
      {
        serviceCode: 'SRV-LAB-02',
        serviceName: 'Glycated Hemoglobin (HbA1c Blood Test)',
        quantity: 1,
        unitPrice: 650,
        discountPercent: 10,
        taxPercent: 5,
        itemTotal: 614.25
      }
    ],
    subtotal: 1250,
    totalDiscount: 65,
    totalTax: 29.25,
    grandTotal: 1214.25,
    paidAmount: 1214.25,
    balanceDue: 0,
    status: 'paid',
    notes: 'Outpatient consultation and ordered diagnostic lab panel',
    createdBy: 'Amit Saxena (Billing)'
  }
];

export const initialPayments = [
  {
    tenantId: 'TEN-LAZFORT-001',
    paymentId: 'PAY-2026-0001',
    receiptNumber: 'RCP-2026-0001',
    invoiceId: 'INV-2026-0001',
    patientId: 'LZF-2026-0001',
    patientName: 'Ramesh Gupta',
    amount: 1214.25,
    paymentMethod: 'upi',
    transactionReference: 'UPI/329104881920/lazfort',
    receivedBy: 'Amit Saxena',
    receivedAt: new Date().toISOString(),
    notes: 'Instant GooglePay UPI payment received and verified',
    isRefund: false
  }
];

export const initialAuditLogs = [
  {
    tenantId: 'TEN-LAZFORT-001',
    logId: 'AUD-001',
    actorId: 'USR-ADM-001',
    actorName: 'Dr. Alok Verma',
    actorRole: 'hospital_admin',
    action: 'TARIFF_MODIFIED',
    entityType: 'ServiceCatalog',
    entityId: 'SRV-CON-01',
    details: 'Initial tariff schedule established for Lazfort Outpatient Services',
    metadata: { effectiveDate: '2026-10-13', version: '1.0' },
    ipAddress: '192.168.1.10',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    logId: 'AUD-002',
    actorId: 'USR-REC-001',
    actorName: 'Pooja Verma',
    actorRole: 'receptionist',
    action: 'PATIENT_REGISTERED',
    entityType: 'Patient',
    entityId: 'LZF-2026-0001',
    details: 'New Outpatient UHID generated: LZF-2026-0001 (Ramesh Gupta)',
    metadata: { uhid: 'LZF-2026-0001', phone: '9876543210' },
    ipAddress: '192.168.1.42',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    logId: 'AUD-003',
    actorId: 'USR-REC-001',
    actorName: 'Pooja Verma',
    actorRole: 'receptionist',
    action: 'APPOINTMENT_CHECKED_IN',
    entityType: 'Appointment',
    entityId: 'APT-2026-0001',
    details: 'Patient checked in for Dr. Rajesh Sharma. Assigned Queue Token: MED-01',
    metadata: { token: 'MED-01', queueNumber: 1 },
    ipAddress: '192.168.1.42',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
  },
  {
    tenantId: 'TEN-LAZFORT-001',
    logId: 'AUD-004',
    actorId: 'USR-BIL-001',
    actorName: 'Amit Saxena',
    actorRole: 'billing_executive',
    action: 'PAYMENT_RECORDED',
    entityType: 'Payment',
    entityId: 'PAY-2026-0001',
    details: 'Receipt RCP-2026-0001 issued for amount ₹1214.25 via UPI',
    metadata: { invoiceId: 'INV-2026-0001', amount: 1214.25, method: 'upi' },
    ipAddress: '192.168.1.55',
    timestamp: new Date(Date.now() - 1800000).toISOString()
  }
];
