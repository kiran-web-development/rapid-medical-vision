
import { useRef, useState } from "react";
import { FileImage, Camera } from "lucide-react";

type Props = {
  onAnalyze: (file: File | null, previewUrl: string | null) => void;
};

const SUPPORTED_FORMATS = [".dcm", ".jpg", ".jpeg", ".png"];

const ImageUploader = ({ onAnalyze }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files?.[0];
    if (!f) return;

    const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
    if (!SUPPORTED_FORMATS.includes(ext)) {
      setError("Unsupported file type.");
      return;
    }

    setFile(f);
    setFileName(f.name);

    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      const reader = new FileReader();
      reader.onload = ev => {
        setPreviewUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(f);
    } else {
      // DICOM: use placeholder
      setPreviewUrl("/placeholder.svg");
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setLoading(true);
    onAnalyze(file, previewUrl);
    setTimeout(() => setLoading(false), 1500); // keep in sync with parent demo
  };

  const handleClear = () => {
    setFile(null);
    setFileName("");
    setPreviewUrl(null);
    setError(null);
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
              <button className="text-xs text-blue-600 underline mt-1" onClick={handleClear}>
                Remove
              </button>
            </div>
          </div>
          <button
            className="bg-primary hover:bg-purple-700 text-white font-bold px-4 py-2 mt-4 rounded shadow-md transition-all focus:outline-none"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ?
              <span className="animate-pulse flex items-center gap-1"><Camera className="w-4 h-4" />Analyzing...</span>
              : <span className="flex items-center gap-1"><Camera className="w-4 h-4" />Analyze</span>}
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
