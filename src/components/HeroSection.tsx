
const HeroSection = () => {
  return (
    <header className="w-full pt-10 pb-6 bg-gradient-to-r from-primary to-blue-200 shadow">
      <div className="container mx-auto text-center max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 drop-shadow-lg">
          MedScanAI
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-6 font-medium">
          AI-powered diagnostics for X-rays, CTs & MRIs. <span className="text-purple-200 bg-primary px-2 py-1 rounded">Fast. Accurate. Secure.</span>
        </p>
        <p className="text-md text-primary-foreground mb-6">
          Upload a medical image to see instant analysis and AI-driven clinical suggestions.
        </p>
      </div>
    </header>
  );
};

export default HeroSection;
