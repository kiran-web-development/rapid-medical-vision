
import { FileImage, Search, Brain, Check, Settings } from "lucide-react";

const steps = [
  {
    icon: <FileImage className="w-7 h-7 text-primary" />,
    title: "Upload Image",
    desc: "Choose a chest X-ray, CT scan, or MRI (DICOM, PNG, JPG).",
  },
  {
    icon: <Search className="w-7 h-7 text-blue-500" />,
    title: "Rapid AI Analysis",
    desc: "MedScanAI processes your image in under 5 seconds.",
  },
  {
    icon: <Brain className="w-7 h-7 text-purple-500" />,
    title: "View Diagnosis",
    desc: "Get disease probability, visual heatmaps, and urgency rating.",
  },
  {
    icon: <Check className="w-7 h-7 text-green-500" />,
    title: "Take Next Steps",
    desc: "Export results, notify clinicians, or integrate via API.",
  },
];

const HowItWorks = () => (
  <section className="w-full bg-gradient-to-l from-blue-50 to-purple-50 py-14 px-4">
    <div className="container max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">How MedScanAI Works</h2>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.title} className="flex flex-col items-center text-center flex-1">
            <div className="p-4 bg-white rounded-full border shadow-sm mb-2">{s.icon}</div>
            <div className="font-semibold text-lg mb-1">{s.title}</div>
            <div className="text-sm text-gray-500">{s.desc}</div>
            {i < steps.length - 1 && (
              <div className="hidden md:block h-6 border-l-2 border-dotted border-primary mx-auto my-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
