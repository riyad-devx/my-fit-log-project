import Image from "next/image";
import image from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0b0c10]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">

        
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            <Image
              src={image}
              alt="FitLog Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          </div>

          <span className="text-lg font-black tracking-tight text-white">
            FITLOG
          </span>
        </div>

        
        <p className="text-center text-xs text-gray-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;