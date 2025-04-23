
const Footer = () => (
  <footer className="w-full bg-white border-t py-7 mt-16">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-2 text-sm">
      <div>
        <span className="font-bold text-primary">MedScanAI</span>{" "}
        <span className="text-gray-400">| &copy; {new Date().getFullYear()} Built for healthcare innovation.</span>
      </div>
      <a
        href="mailto:info@medscanai.com"
        className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-purple-700 font-medium mt-3 md:mt-0 transition-all"
      >
        Request Demo
      </a>
    </div>
  </footer>
);

export default Footer;
