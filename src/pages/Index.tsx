
import HeroSection from "@/components/HeroSection";
import ImageUploader from "@/components/ImageUploader";
import DiagnosisResult from "@/components/DiagnosisResult";
import FeaturesGrid from "@/components/FeaturesGrid";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AnimatedImage3D from "@/components/AnimatedImage3D";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FileX } from "lucide-react";

// Step 1: Define a stricter type for the result
type DiagnosisResultType = {
  label: string;
  probability: number;
  urgency: "Low" | "Medium" | "High";
  annotationUrl: string;
};

// Step 2: Use the type for your result constant
const DEMO_RESULT: DiagnosisResultType = {
  label: "Lung Nodule",
  probability: 0.93,
  urgency: "High", // Fix: strictly "Low" | "Medium" | "High"
  annotationUrl: "/placeholder.svg", // Placeholder for Grad-CAM heatmap
};

const Index = () => {
  // Step 3: Use the correct type for the analysis result state
  const [analysisResult, setAnalysisResult] = useState<DiagnosisResultType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [notMedicalFile, setNotMedicalFile] = useState(false);

  // Simulate file analysis with hospital report detection
  const handleAnalyze = (file: File | null, previewUrl: string | null, isHospitalReport: boolean) => {
    setAnalysisResult(null);
    setSelectedImage(previewUrl);
    setNotMedicalFile(false);
    
    if (file) {
      if (!isHospitalReport) {
        setNotMedicalFile(true);
        toast.error("Please upload a hospital or medical report for analysis.");
        return;
      }
      
      toast.success("Processing medical image...");
      setTimeout(() => {
        setAnalysisResult(DEMO_RESULT);
        toast.success("Analysis complete!");
      }, 1500); // Simulate analysis delay
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-purple-50 min-h-screen flex flex-col">
      <Navbar />
      {/* Logo with 3D animation */}
      <div className="flex items-center justify-center my-4">
        <AnimatedImage3D
          src="/lovable-uploads/1a6d6eaa-847f-4923-93f4-cc899e5f4183.png"
          alt="AIHealth Logo"
          className="w-60 h-24 shadow-lg"
        />
      </div>
      <HeroSection />
      <div className="container max-w-3xl mx-auto flex flex-col gap-10 animate-fade-in">
        <ImageUploader onAnalyze={handleAnalyze} />
        
        {notMedicalFile && (
          <Alert variant="destructive" className="bg-red-50">
            <FileX className="h-5 w-5" />
            <AlertTitle>Non-Medical Document Detected</AlertTitle>
            <AlertDescription>
              Please upload a hospital or medical report for proper analysis. Our AI system is designed to analyze medical images and reports only.
            </AlertDescription>
          </Alert>
        )}
        
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
