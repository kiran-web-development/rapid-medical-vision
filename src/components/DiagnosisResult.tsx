
import { Shield, Heart, Brain, Thermometer, ZoomIn, FileText } from "lucide-react";
import AnimatedImage3D from "./AnimatedImage3D";

type Props = {
  label: string;
  probability: number;
  urgency: "Low" | "Medium" | "High";
  annotationUrl: string;
  imageUrl: string;
  relatedConditions?: string[];
  recommendedTests?: string[];
  similarCasesInfo?: string;
  extractedText?: string | null;
};

const urgencyColor = {
  Low: "bg-green-100 text-green-600 border-green-300",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
  High: "bg-red-100 text-red-700 border-red-400",
};

const diagnosisIcon = (label: string) => {
  if (/lung/i.test(label)) return <Shield className="w-6 h-6 text-blue-500" />;
  if (/brain/i.test(label)) return <Brain className="w-6 h-6 text-purple-500" />;
  if (/cardiac|heart/i.test(label)) return <Heart className="w-6 h-6 text-pink-500" />;
  if (/fever|therm|temp/i.test(label)) return <Thermometer className="w-6 h-6 text-orange-400" />;
  return <ZoomIn className="w-6 h-6 text-blue-400" />;
};

const DiagnosisResult = ({
  label,
  probability,
  urgency,
  annotationUrl,
  imageUrl,
  relatedConditions,
  recommendedTests,
  similarCasesInfo,
  extractedText,
}: Props) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-1/2">
          <span className="flex items-center gap-3">
            {diagnosisIcon(label)}
            <span className="text-lg font-semibold">{label}</span>
            <span className={`${urgencyColor[urgency]} text-xs font-bold uppercase px-2 py-1 rounded border`}>
              {urgency} Risk
            </span>
          </span>
          <div className="text-2xl font-bold mt-2">
            {Math.round(probability * 100)}%
            <span className="ml-2 text-base text-gray-500 font-normal">probability</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center md:w-1/2">
          <div className="w-40 h-40 relative rounded-xl overflow-hidden border border-gray-200 shadow pulse">
            <AnimatedImage3D src={imageUrl} alt="Scan" className="absolute inset-0 w-full h-full" />
            <img src={annotationUrl} alt="AI Annotation" className="absolute inset-0 w-full h-full opacity-60 pointer-events-none rounded" />
          </div>
          <span className="text-xs text-gray-400 mt-1">Grad-CAM / saliency heatmap (simulated)</span>
        </div>
      </div>
      
      {/* Enhanced analysis section with Internet data comparison */}
      <div className="border-t pt-4 mt-2">
        <h3 className="text-md font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Enhanced Analysis with Internet Data Comparison
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedConditions && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-700 mb-2">Related Conditions</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {relatedConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
          )}
          
          {recommendedTests && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-700 mb-2">Recommended Tests</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {recommendedTests.map((test, index) => (
                  <li key={index}>{test}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {similarCasesInfo && (
          <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h4 className="font-medium text-amber-700 mb-2">Similar Cases in Medical Literature</h4>
            <p className="text-sm text-gray-700">{similarCasesInfo}</p>
          </div>
        )}
        
        {extractedText && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Extracted Report Text</h4>
            <p className="text-sm text-gray-600 italic">"{extractedText}"</p>
          </div>
        )}
        
        <div className="mt-4 text-xs text-gray-500">
          <p className="italic">Note: This analysis is provided for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.</p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResult;
