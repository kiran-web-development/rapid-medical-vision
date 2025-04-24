
import { useRef, useState } from "react";
import { FileImage, Hospital, FileX } from "lucide-react";
import { toast } from "sonner";

type Props = {
  onAnalyze: (file: File | null, previewUrl: string | null, isHospitalReport: boolean, extractedText?: string) => void;
};

const SUPPORTED_FORMATS = [".dcm", ".jpg", ".jpeg", ".png"];

// Keywords that might indicate a medical/hospital report
const MEDICAL_KEYWORDS = [
  "report", "medical", "hospital", "clinic", "patient", "diagnosis", 
  "doctor", "radiology", "xray", "x-ray", "ct scan", "mri", "blood", 
  "test", "results", "pathology", "ultrasound", "ecg", "ekg"
];

// Simulate OCR extraction from image
const extractTextFromImage = async (file: File): Promise<string> => {
  // In a real app, we would use a proper OCR library
  // This is a simulation for demonstration purposes
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulated extracted text based on filename
      const filename = file.name.toLowerCase();
      let simulatedText = "";
      
      if (filename.includes("lung")) {
        simulatedText = "Lung scan shows possible nodules in right lower lobe. Recommend follow-up in 3 months. Patient exhibits mild symptoms including occasional cough.";
      } else if (filename.includes("heart") || filename.includes("cardiac")) {
        simulatedText = "Cardiac evaluation shows normal rhythm, slight elevation in markers. Blood pressure: 140/85. Cholesterol levels slightly elevated at 210mg/dL.";
      } else if (filename.includes("brain")) {
        simulatedText = "Brain MRI shows no acute abnormalities. Minor signal changes in white matter may indicate early vascular changes. Patient reports occasional headaches.";
      } else if (filename.includes("blood") || filename.includes("lab")) {
        simulatedText = "Blood panel results: WBC: 7.2, RBC: 4.5, Hemoglobin: 13.8, Platelets: 250. Glucose levels elevated at 110mg/dL.";
      } else {
        simulatedText = "Medical report shows all parameters within normal ranges. Follow-up recommended in 12 months. Patient reports feeling generally well.";
      }
      resolve(simulatedText);
    }, 500);
  });
};

const ImageUploader = ({ onAnalyze }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHospitalReport, setIsHospitalReport] = useState(true); // Default to true until we analyze
  const [extractedText, setExtractedText] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState(false);

  // Simple detection if the file might be hospital-related based on filename
  const detectHospitalReport = (fileName: string): boolean => {
    const lowerFileName = fileName.toLowerCase();
    // Check if any medical keywords are in the filename
    return MEDICAL_KEYWORDS.some(keyword => lowerFileName.includes(keyword.toLowerCase()));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setExtractedText("");
    const f = e.target.files?.[0];
    if (!f) return;

    const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
    if (!SUPPORTED_FORMATS.includes(ext)) {
      setError("Unsupported file type.");
      return;
    }

    // Detect if it might be a hospital report
    const potentiallyMedical = detectHospitalReport(f.name);
    setIsHospitalReport(potentiallyMedical);
    setFile(f);
    setFileName(f.name);

    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      const reader = new FileReader();
      reader.onload = ev => {
        setPreviewUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(f);
      
      // Extract text from the image
      if (potentiallyMedical) {
        setIsExtracting(true);
        try {
          const text = await extractTextFromImage(f);
          setExtractedText(text);
        } catch (err) {
          console.error("Error extracting text:", err);
          setError("Failed to extract text from image.");
        } finally {
          setIsExtracting(false);
        }
      }
    } else {
      // DICOM: use placeholder
      setPreviewUrl("/placeholder.svg");
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    if (!isHospitalReport) {
      toast.error("Please upload a medical or hospital-related image for analysis.");
      return;
    }
    
    setLoading(true);
    onAnalyze(file, previewUrl, isHospitalReport, extractedText);
    setTimeout(() => setLoading(false), 1500); // keep in sync with parent demo
  };

  const handleClear = () => {
    setFile(null);
    setFileName("");
    setPreviewUrl(null);
    setError(null);
    setIsHospitalReport(true);
    setExtractedText("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-xl shadow-md py-8 px-5 flex flex-col items-center gap-5 transition hover:shadow-lg">
      <label htmlFor="image-upload" className="cursor-pointer w-full flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-50 border border-blue-200 mb-2">
          <FileImage className="w-10 h-10 text-primary" />
        </div>
        <span className="text-md text-primary font-medium">Upload Medical Image</span>
        <input
          ref={inputRef}
          id="image-upload"
          type="file"
          accept=".dcm,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          hidden
        />
      </label>
      {file && (
        <div className="w-full flex flex-col gap-2 items-center">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 object-contain rounded border border-gray-200"
              />
            )}
            <div>
              <div className="font-semibold text-sm">{fileName}</div>
              <div className="flex items-center gap-1 text-sm mt-1">
                {isHospitalReport ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <Hospital className="w-4 h-4" /> Medical document detected
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center gap-1">
                    <FileX className="w-4 h-4" /> Not a medical document
                  </span>
                )}
              </div>
              {isExtracting && (
                <div className="text-sm text-blue-500 mt-1">
                  <span className="animate-pulse">Extracting text from image...</span>
                </div>
              )}
              <button className="text-xs text-blue-600 underline mt-1" onClick={handleClear}>
                Remove
              </button>
            </div>
          </div>
          {extractedText && (
            <div className="w-full mt-2 border border-gray-200 rounded p-2 bg-gray-50">
              <div className="text-xs text-gray-500 mb-1">Extracted text:</div>
              <div className="text-sm text-gray-700">{extractedText}</div>
            </div>
          )}
          <button
            className={`${
              isHospitalReport ? "bg-primary hover:bg-purple-700" : "bg-gray-400"
            } text-white font-bold px-4 py-2 mt-4 rounded shadow-md transition-all focus:outline-none`}
            onClick={handleAnalyze}
            disabled={loading || !isHospitalReport}
          >
            {loading ? (
              <span className="animate-pulse flex items-center gap-1"><Hospital className="w-4 h-4" />Analyzing...</span>
            ) : (
              <span className="flex items-center gap-1">
                <Hospital className="w-4 h-4" />
                {isHospitalReport ? "Analyze" : "Please upload a medical image"}
              </span>
            )}
          </button>
        </div>
      )}
      {error && (
        <div className="text-sm text-red-500 font-medium">{error}</div>
      )}
      {!file && (
        <div className="text-xs text-gray-400">Supported: DICOM (.dcm), JPG, PNG</div>
      )}
    </div>
  );
};

export default ImageUploader;
