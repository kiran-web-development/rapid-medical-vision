
import { Shield, Heart, Brain, Thermometer, ZoomIn } from "lucide-react";

type Props = {
  label: string;
  probability: number;
  urgency: "Low" | "Medium" | "High";
  annotationUrl: string;
  imageUrl: string;
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
}: Props) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-8 animate-fade-in">
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
          <img src={imageUrl} alt="Scan" className="object-contain w-full h-full bg-gray-50" />
          <img src={annotationUrl} alt="AI Annotation" className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />
        </div>
        <span className="text-xs text-gray-400 mt-1">Grad-CAM / saliency heatmap (simulated)</span>
      </div>
    </div>
  );
};

export default DiagnosisResult;
