/**
 * MITRA — HACKATHON DEMO FIXTURES (STRICTLY ISOLATED)
 *
 * IMPORTANT RESTRICTION:
 * This data is used ONLY for evaluator presentation showcases and visual verification.
 * It is NEVER inserted into Supabase, NEVER sent to the backend, and NEVER mutates
 * live user state. All objects are marked with isDemo: true and DEMO_TAG.
 */

export const DEMO_BANNER_LABEL = "DEMO DATA — HACKATHON PRESENTATION FIXTURES (ISOLATED)";

export interface DemoStudent {
  id: string;
  name: string;
  institution: string;
  degree: string;
  graduationYear: number;
  readinessScore: number;
  verifiedSkills: string[];
  avatarInitial: string;
  badge: string;
}

export interface DemoRecruiter {
  id: string;
  companyName: string;
  industry: string;
  headquarters: string;
  activeOpenings: number;
  partnerTier: "Premier Academic Partner" | "Strategic Industry Partner" | "Innovation Hub";
  logoInitial: string;
}

export interface DemoInstitution {
  id: string;
  name: string;
  type: string;
  nirfRank: number;
  studentsEnrolled: number;
  activeMoUs: number;
  placementRate: string;
}

export interface DemoOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Internship" | "Project" | "Research" | "Full-Time";
  mode: "Remote" | "Hybrid" | "On-Site";
  stipend: string;
  duration: string;
  skills: string[];
  matchScore: number;
}

export interface DemoApplication {
  id: string;
  applicant: string;
  role: string;
  company: string;
  appliedDate: string;
  status: "Shortlisted" | "Under Review" | "Verified Match" | "Interview Scheduled" | "Offer Extended" | "Applied";
  stipend: string;
}

export interface DemoResearchProject {
  id: string;
  title: string;
  principalInvestigator: string;
  institution: string;
  industrySponsor: string;
  grantValue: string;
  stage: "Milestone 3" | "Active Prototyping" | "Data Synthesis" | "Clinical Review" | "Peer Review";
}

export interface DemoIndustryProblemStatement {
  id: string;
  sponsor: string;
  title: string;
  domain: "Artificial Intelligence" | "Autonomous Systems" | "FinTech Security" | "Green Energy" | "Healthcare Telemetry";
  stipendOrPrize: string;
  difficulty: "Advanced Capstone" | "Intermediate" | "Hackathon Grand Challenge";
  deadline: string;
}

export interface DemoNotification {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  category: "Placement" | "Skill Verification" | "Mentorship" | "Hackathon";
  unread: boolean;
}

// 1. 6 Students
export const DEMO_STUDENTS: DemoStudent[] = [
  {
    id: "demo-st-1",
    name: "Harsh Gour",
    institution: "National Institute of Technology Karnataka",
    degree: "B.Tech Computer Science & Engineering",
    graduationYear: 2026,
    readinessScore: 92.4,
    verifiedSkills: ["Next.js 15", "TypeScript", "FastAPI", "Vector Search", "System Design"],
    avatarInitial: "H",
    badge: "Top 2% Talent",
  },
  {
    id: "demo-st-2",
    name: "Ananya Sharma",
    institution: "Indian Institute of Technology Bombay",
    degree: "Dual Degree Electrical & Computer Systems",
    graduationYear: 2026,
    readinessScore: 94.8,
    verifiedSkills: ["PyTorch", "Distributed Systems", "CUDA C++", "Edge AI", "Docker"],
    avatarInitial: "A",
    badge: "Research Fellow",
  },
  {
    id: "demo-st-3",
    name: "Vikram Malhotra",
    institution: "BITS Pilani, Pilani Campus",
    degree: "B.E. Information Systems",
    graduationYear: 2027,
    readinessScore: 89.0,
    verifiedSkills: ["React 19", "PostgreSQL", "Tailwind CSS", "Go Microservices"],
    avatarInitial: "V",
    badge: "Hackathon Winner",
  },
  {
    id: "demo-st-4",
    name: "Priya Iyer",
    institution: "International Institute of Information Technology Hyderabad",
    degree: "M.Tech Computer Science",
    graduationYear: 2026,
    readinessScore: 96.2,
    verifiedSkills: ["Large Language Models", "LangChain", "FastAPI", "Cloud Infra"],
    avatarInitial: "P",
    badge: "AI Scholar",
  },
  {
    id: "demo-st-5",
    name: "Rohan Verma",
    institution: "Delhi Technological University (DTU)",
    degree: "B.Tech Software Engineering",
    graduationYear: 2027,
    readinessScore: 87.5,
    verifiedSkills: ["Rust", "Kubernetes", "Redis", "TypeScript", "gRPC"],
    avatarInitial: "R",
    badge: "Core Systems",
  },
  {
    id: "demo-st-6",
    name: "Sneha Kulkarni",
    institution: "College of Engineering Pune (COEP)",
    degree: "B.Tech Electronics & Telecommunication",
    graduationYear: 2026,
    readinessScore: 90.6,
    verifiedSkills: ["Embedded C++", "IoT Protocols", "RTOS", "Python", "MQTT"],
    avatarInitial: "S",
    badge: "Hardware-AI",
  },
];

// 2. 6 Recruiters / Industry Partners
export const DEMO_RECRUITERS: DemoRecruiter[] = [
  {
    id: "demo-rec-1",
    companyName: "Zerodha Tech",
    industry: "Financial Technology & Ultra-Low Latency Systems",
    headquarters: "Bengaluru, Karnataka",
    activeOpenings: 8,
    partnerTier: "Premier Academic Partner",
    logoInitial: "Z",
  },
  {
    id: "demo-rec-2",
    companyName: "Microsoft Research India",
    industry: "Applied AI, Machine Systems & Algorithms",
    headquarters: "Bengaluru, Karnataka",
    activeOpenings: 5,
    partnerTier: "Strategic Industry Partner",
    logoInitial: "M",
  },
  {
    id: "demo-rec-3",
    companyName: "Tata Consultancy Services (TCS Research Labs)",
    industry: "Enterprise AI & Autonomous Software Engineering",
    headquarters: "Mumbai / Pune",
    activeOpenings: 14,
    partnerTier: "Premier Academic Partner",
    logoInitial: "T",
  },
  {
    id: "demo-rec-4",
    companyName: "Razorpay Core Platform Engineering",
    industry: "Payment Gateways & Distributed Transactions",
    headquarters: "Bengaluru, Karnataka",
    activeOpenings: 6,
    partnerTier: "Strategic Industry Partner",
    logoInitial: "R",
  },
  {
    id: "demo-rec-5",
    companyName: "Cred Engineering Labs",
    industry: "High-Throughput Mobile & Backend Architecture",
    headquarters: "Bengaluru, Karnataka",
    activeOpenings: 4,
    partnerTier: "Innovation Hub",
    logoInitial: "C",
  },
  {
    id: "demo-rec-6",
    companyName: "Infosys Center for Emerging Technologies",
    industry: "Cloud Transformation & GenAI Frameworks",
    headquarters: "Bengaluru / Mysuru",
    activeOpenings: 11,
    partnerTier: "Premier Academic Partner",
    logoInitial: "I",
  },
];

// 3. 6 Institutions
export const DEMO_INSTITUTIONS: DemoInstitution[] = [
  {
    id: "demo-inst-1",
    name: "National Institute of Technology Karnataka, Surathkal",
    type: "National Institute of National Importance",
    nirfRank: 12,
    studentsEnrolled: 4850,
    activeMoUs: 42,
    placementRate: "94.2%",
  },
  {
    id: "demo-inst-2",
    name: "Indian Institute of Technology Bombay",
    type: "Institute of Eminence",
    nirfRank: 3,
    studentsEnrolled: 11200,
    activeMoUs: 68,
    placementRate: "97.8%",
  },
  {
    id: "demo-inst-3",
    name: "Birla Institute of Technology and Science (BITS Pilani)",
    type: "Deemed University",
    nirfRank: 20,
    studentsEnrolled: 7400,
    activeMoUs: 51,
    placementRate: "95.6%",
  },
  {
    id: "demo-inst-4",
    name: "International Institute of Information Technology Hyderabad",
    type: "Autonomous Research University",
    nirfRank: 15,
    studentsEnrolled: 2300,
    activeMoUs: 39,
    placementRate: "98.4%",
  },
  {
    id: "demo-inst-5",
    name: "Delhi Technological University (DTU)",
    type: "State Technical University",
    nirfRank: 29,
    studentsEnrolled: 6200,
    activeMoUs: 34,
    placementRate: "91.3%",
  },
  {
    id: "demo-inst-6",
    name: "College of Engineering Pune (COEP Tech)",
    type: "Unitary Public University",
    nirfRank: 42,
    studentsEnrolled: 3900,
    activeMoUs: 28,
    placementRate: "89.7%",
  },
];

// 4. 6 Opportunities
export const DEMO_OPPORTUNITIES: DemoOpportunity[] = [
  {
    id: "demo-opp-1",
    title: "Next.js Systems Architect Intern",
    company: "Zerodha Tech",
    location: "Bengaluru (Hybrid)",
    type: "Internship",
    mode: "Hybrid",
    stipend: "₹50,000 / mo",
    duration: "6 Months",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets"],
    matchScore: 96,
  },
  {
    id: "demo-opp-2",
    title: "Multimodal AI Research Fellow",
    company: "Microsoft Research India",
    location: "Bengaluru (On-Site)",
    type: "Research",
    mode: "On-Site",
    stipend: "₹65,000 / mo",
    duration: "1 Year",
    skills: ["PyTorch", "Python", "Transformers", "Distributed Training"],
    matchScore: 92,
  },
  {
    id: "demo-opp-3",
    title: "Distributed Microservices Engineer Intern",
    company: "Razorpay",
    location: "Bengaluru (Remote)",
    type: "Internship",
    mode: "Remote",
    stipend: "₹45,000 / mo",
    duration: "6 Months",
    skills: ["Go", "Kafka", "PostgreSQL", "gRPC"],
    matchScore: 89,
  },
  {
    id: "demo-opp-4",
    title: "Autonomous Campus Edge Mesh Project",
    company: "TCS Research Labs",
    location: "Pune / Remote",
    type: "Project",
    mode: "Hybrid",
    stipend: "₹40,000 / mo",
    duration: "4 Months",
    skills: ["IoT Protocols", "C++", "Edge AI", "MQTT"],
    matchScore: 86,
  },
  {
    id: "demo-opp-5",
    title: "High-Throughput Backend Resident",
    company: "Cred Engineering Labs",
    location: "Bengaluru (On-Site)",
    type: "Full-Time",
    mode: "On-Site",
    stipend: "₹1,20,000 / mo",
    duration: "Direct Offer",
    skills: ["Kotlin", "Postgres", "Redis", "Distributed Cache"],
    matchScore: 91,
  },
  {
    id: "demo-opp-6",
    title: "GenAI Enterprise Integrations Fellow",
    company: "Infosys Emerging Tech",
    location: "Mysuru / Hybrid",
    type: "Internship",
    mode: "Hybrid",
    stipend: "₹38,000 / mo",
    duration: "6 Months",
    skills: ["FastAPI", "Python", "Vector DBs", "LangChain"],
    matchScore: 88,
  },
];

// 5. 6 Applications
export const DEMO_APPLICATIONS: DemoApplication[] = [
  {
    id: "demo-app-1",
    applicant: "Harsh Gour",
    role: "Next.js Systems Architect Intern",
    company: "Zerodha Tech",
    appliedDate: "Nov 02, 2026",
    status: "Shortlisted",
    stipend: "₹50,000/mo",
  },
  {
    id: "demo-app-2",
    applicant: "Harsh Gour",
    role: "Multimodal AI Research Fellow",
    company: "Microsoft Research India",
    appliedDate: "Oct 28, 2026",
    status: "Interview Scheduled",
    stipend: "₹65,000/mo",
  },
  {
    id: "demo-app-3",
    applicant: "Ananya Sharma",
    role: "Distributed Microservices Engineer",
    company: "Razorpay",
    appliedDate: "Nov 04, 2026",
    status: "Offer Extended",
    stipend: "₹45,000/mo",
  },
  {
    id: "demo-app-4",
    applicant: "Vikram Malhotra",
    role: "Autonomous Campus Edge Mesh Project",
    company: "TCS Research Labs",
    appliedDate: "Oct 30, 2026",
    status: "Under Review",
    stipend: "₹40,000/mo",
  },
  {
    id: "demo-app-5",
    applicant: "Priya Iyer",
    role: "GenAI Enterprise Integrations Fellow",
    company: "Infosys Emerging Tech",
    appliedDate: "Nov 05, 2026",
    status: "Verified Match",
    stipend: "₹38,000/mo",
  },
  {
    id: "demo-app-6",
    applicant: "Rohan Verma",
    role: "High-Throughput Backend Resident",
    company: "Cred Engineering Labs",
    appliedDate: "Nov 06, 2026",
    status: "Applied",
    stipend: "₹1,20,000/mo",
  },
];

// 6. 6 Research Projects
export const DEMO_RESEARCH_PROJECTS: DemoResearchProject[] = [
  {
    id: "demo-res-1",
    title: "Low-Precision Quantization for Multimodal On-Device Agents",
    principalInvestigator: "Dr. Ananya Sen",
    institution: "IIT Bombay",
    industrySponsor: "Microsoft Research India",
    grantValue: "₹28,50,000 (DST + Industry MoU)",
    stage: "Milestone 3",
  },
  {
    id: "demo-res-2",
    title: "Zero-Knowledge Proofs for Verifiable Academic Credentials",
    principalInvestigator: "Dr. Arvind Menon",
    institution: "NIT Karnataka",
    industrySponsor: "National Informatics Centre (NIC)",
    grantValue: "₹18,00,000",
    stage: "Active Prototyping",
  },
  {
    id: "demo-res-3",
    title: "Self-Healing Campus Microgrid with Edge Telemetry",
    principalInvestigator: "Dr. K. R. Ramanathan",
    institution: "BITS Pilani",
    industrySponsor: "Tata Power Renewables",
    grantValue: "₹32,00,000",
    stage: "Data Synthesis",
  },
  {
    id: "demo-res-4",
    title: "High-Throughput Consensus Protocols for Indian Interbank Settlement",
    principalInvestigator: "Dr. Sarita Vaidya",
    institution: "IIIT Hyderabad",
    industrySponsor: "National Payments Corporation of India (NPCI)",
    grantValue: "₹45,00,000",
    stage: "Peer Review",
  },
  {
    id: "demo-res-5",
    title: "Low-Latency Autonomous Drone Swarm Routing in Dense Urban Settings",
    principalInvestigator: "Dr. Mihir Kothari",
    institution: "COEP Tech",
    industrySponsor: "IdeaForge Technology",
    grantValue: "₹22,00,000",
    stage: "Clinical Review",
  },
  {
    id: "demo-res-6",
    title: "Federated Learning for Cross-Hospital Cancer Prognosis",
    principalInvestigator: "Dr. Shreya Deshmukh",
    institution: "DTU Delhi",
    industrySponsor: "Apollo Hospitals & HealthTech Consortium",
    grantValue: "₹36,00,000",
    stage: "Milestone 3",
  },
];

// 7. 6 Industry Problem Statements
export const DEMO_PROBLEM_STATEMENTS: DemoIndustryProblemStatement[] = [
  {
    id: "demo-prob-1",
    sponsor: "Zerodha Tech",
    title: "Sub-Millisecond Order Book Snapshot Synchronization over QUIC",
    domain: "FinTech Security",
    stipendOrPrize: "₹1,50,000 Hackathon Fellowship",
    difficulty: "Advanced Capstone",
    deadline: "Nov 30, 2026",
  },
  {
    id: "demo-prob-2",
    sponsor: "Microsoft Research India",
    title: "Synthetic Hindi & Indic Dialect Text-to-Speech Alignment with 4-bit Weights",
    domain: "Artificial Intelligence",
    stipendOrPrize: "₹2,00,000 Research Grant",
    difficulty: "Hackathon Grand Challenge",
    deadline: "Dec 15, 2026",
  },
  {
    id: "demo-prob-3",
    sponsor: "Razorpay",
    title: "Anomaly Detection in High-Velocity UPI Outbox Streams Using Graph Neural Networks",
    domain: "FinTech Security",
    stipendOrPrize: "₹1,25,000 Placement Direct Track",
    difficulty: "Advanced Capstone",
    deadline: "Dec 05, 2026",
  },
  {
    id: "demo-prob-4",
    sponsor: "TCS Labs",
    title: "Carbon Footprint Auditing in Hyper-Distributed Multi-Cloud Kubernetes Clusters",
    domain: "Green Energy",
    stipendOrPrize: "₹1,00,000 Innovation Award",
    difficulty: "Intermediate",
    deadline: "Dec 20, 2026",
  },
  {
    id: "demo-prob-5",
    sponsor: "IdeaForge",
    title: "Visual Odometry in GPS-Denied Agricultural Canopies via Monocular Vision",
    domain: "Autonomous Systems",
    stipendOrPrize: "₹1,75,000 Lab Fellowship",
    difficulty: "Advanced Capstone",
    deadline: "Jan 10, 2027",
  },
  {
    id: "demo-prob-6",
    sponsor: "Apollo HealthTech",
    title: "Continuous ECG Waveform Anomaly Detection on Ultra-Low-Power Wearables",
    domain: "Healthcare Telemetry",
    stipendOrPrize: "₹1,40,000 Incubation Track",
    difficulty: "Intermediate",
    deadline: "Dec 28, 2026",
  },
];

// 8. 6 Mentors
export interface DemoMentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  avatarInitial: string;
  sessionsCompleted: number;
  rating: number;
}

export const DEMO_MENTORS: DemoMentor[] = [
  {
    id: "demo-ment-1",
    name: "Vikram Aditya",
    title: "Staff Engineer",
    company: "Zerodha Tech",
    expertise: ["Next.js", "TypeScript", "System Design", "WebSockets"],
    avatarInitial: "V",
    sessionsCompleted: 48,
    rating: 4.9,
  },
  {
    id: "demo-ment-2",
    name: "Dr. Nandini Kapoor",
    title: "Principal Researcher",
    company: "Microsoft Research India",
    expertise: ["PyTorch", "Distributed Training", "Multimodal AI", "CUDA"],
    avatarInitial: "N",
    sessionsCompleted: 31,
    rating: 4.8,
  },
  {
    id: "demo-ment-3",
    name: "Arjun Nair",
    title: "Principal Engineer",
    company: "Razorpay",
    expertise: ["Go", "Kafka", "gRPC", "Distributed Systems"],
    avatarInitial: "A",
    sessionsCompleted: 22,
    rating: 4.7,
  },
];

// 9. 3 Researchers
export interface DemoResearcher {
  id: string;
  name: string;
  designation: string;
  institution: string;
  researchArea: string;
  publications: number;
  avatarInitial: string;
}

export const DEMO_RESEARCHERS: DemoResearcher[] = [
  {
    id: "demo-rsch-1",
    name: "Dr. Ananya Sen",
    designation: "Associate Professor",
    institution: "IIT Bombay",
    researchArea: "On-Device Multimodal AI & Quantization",
    publications: 34,
    avatarInitial: "A",
  },
  {
    id: "demo-rsch-2",
    name: "Dr. Arvind Menon",
    designation: "Assistant Professor",
    institution: "NIT Karnataka",
    researchArea: "Zero-Knowledge Proofs & Verifiable Credentials",
    publications: 19,
    avatarInitial: "M",
  },
  {
    id: "demo-rsch-3",
    name: "Dr. Shreya Deshmukh",
    designation: "Research Scientist",
    institution: "DTU Delhi",
    researchArea: "Federated Learning for Healthcare AI",
    publications: 27,
    avatarInitial: "S",
  },
];

// 10. 6 Notifications
export const DEMO_NOTIFICATIONS: DemoNotification[] = [
  {
    id: "demo-notif-1",
    title: "Application Shortlisted by Zerodha Tech",
    detail: "Engineering review team flagged your Next.js & WebSockets Skill Passport for Stage 2 technical evaluation.",
    timestamp: "12m ago",
    category: "Placement",
    unread: true,
  },
  {
    id: "demo-notif-2",
    title: "MITRA Skill Passport Verified: FastAPI & Python",
    detail: "Academic Proctor Dr. Arvind Menon signed off your proficiency assessment (Level 5 / 5).",
    timestamp: "1h ago",
    category: "Skill Verification",
    unread: true,
  },
  {
    id: "demo-notif-3",
    title: "New Matching Research Grant Posted",
    detail: "Microsoft Research India posted 'Multimodal AI Research Fellow' matching 92% of your profile.",
    timestamp: "3h ago",
    category: "Placement",
    unread: false,
  },
  {
    id: "demo-notif-4",
    title: "Mentorship Session Confirmed with Vikram Aditya",
    detail: "Calendar invite for 'Next.js 16 Production Systems Architecture' on Nov 12, 5:00 PM IST is active.",
    timestamp: "1d ago",
    category: "Mentorship",
    unread: false,
  },
  {
    id: "demo-notif-5",
    title: "University MoU Executed with Razorpay",
    detail: "NIT Karnataka signed a bilateral training & direct internship corridor for Batch 2026.",
    timestamp: "2d ago",
    category: "Placement",
    unread: false,
  },
  {
    id: "demo-notif-6",
    title: "SIH Grand Challenge Problem Statements Released",
    detail: "6 new corporate industry problem statements open for collaborative student-faculty submissions.",
    timestamp: "3d ago",
    category: "Hackathon",
    unread: false,
  },
];
