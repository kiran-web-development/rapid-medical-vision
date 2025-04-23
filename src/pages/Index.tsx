
import HeroSection from "@/components/HeroSection";
import ImageUploader from "@/components/ImageUploader";
import DiagnosisResult from "@/components/DiagnosisResult";
import FeaturesGrid from "@/components/FeaturesGrid";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { useState } from "react";

// Demo: Simulate an AI-powered diagnosis result
const DEMO_RESULT = {
  label: "Lung Nodule",
  probability: 0.93,
  urgency: "High", // Low, Medium, High
  annotationUrl: "/placeholder.svg", // Placeholder for Grad-CAM heatmap
};

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<null | typeof DEMO_RESULT>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Simulate file analysis (mocked delay, then set dummy result)
  const handleAnalyze = (file: File | null, previewUrl: string | null) => {
    setAnalysisResult(null);
    setSelectedImage(previewUrl);
    if (file) {
      setTimeout(() => {
        setAnalysisResult(DEMO_RESULT);
      }, 1500); // Simulate analysis delay
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-purple-50 min-h-screen flex flex-col">
      <HeroSection />
      <div className="container max-w-3xl mx-auto flex flex-col gap-10 animate-fade-in">
        <ImageUploader onAnalyze={handleAnalyze} />
        {analysisResult && selectedImage && (
          <DiagnosisResult
            label={analysisResult.label}
            probability={analysisResult.probability}
            urgency={analysisResult.urgency}
            annotationUrl={analysisResult.annotationUrl}
            imageUrl={selectedImage}
          />
        )}
      </div>
      <FeaturesGrid />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
