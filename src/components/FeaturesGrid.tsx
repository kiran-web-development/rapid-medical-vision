
import { Brain, ShieldCheck, Hospital, FlaskRound, FileImage, Settings, Users, Mail, Calendar, Monitor } from "lucide-react";

const FEATURES = [
  {
    icon: <FileImage className="w-6 h-6 text-primary" />,
    title: "Multi-modal Image Input",
    desc: "Accepts DICOM, PNG, JPG. Analyze X-rays, CTs & MRIs in seconds.",
  },
  {
    icon: <Brain className="w-6 h-6 text-purple-500" />,
    title: "Deep Learning Models",
    desc: "Powered by NIH ChestX-ray14, BraTS, LUNA16 & ensemble networks.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    title: "HIPAA/GDPR Compliant",
    desc: "Data privacy by design. Compliant with global health standards.",
  },
  {
    icon: <Hospital className="w-6 h-6 text-pink-500" />,
    title: "Built for All Clinics",
    desc: "Optimized for resource-limited, rural, and mobile setups.",
  },
  {
    icon: <FlaskRound className="w-6 h-6 text-blue-500" />,
    title: "Physician-Driven Learning",
    desc: "Active feedback loop ensures >95% accuracy and continuous improvement.",
  },
  {
    icon: <Settings className="w-6 h-6 text-gray-600" />,
    title: "EHR & API Ready",
    desc: "REST APIs and FHIR/HL7 compatibility for easy integration.",
  },
  {
    icon: <Monitor className="w-6 h-6 text-sky-500" />,
    title: "Real-Time Analysis",
    desc: "Diagnoses in <5 seconds with instant visual heatmaps.",
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-500" />,
    title: "Collaborative Reports",
    desc: "Export as PDF, or auto-email reports to practitioners.",
  },
  {
    icon: <Mail className="w-6 h-6 text-pink-600" />,
    title: "Export & Notify",
    desc: "Automated reporting with built-in email integration.",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="container py-14 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">MedScanAI Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {FEATURES.map((feature, i) => (
          <div key={feature.title} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start hover-scale animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="mb-3">{feature.icon}</div>
            <div className="font-semibold text-lg mb-1">{feature.title}</div>
            <div className="text-sm text-gray-500">{feature.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
