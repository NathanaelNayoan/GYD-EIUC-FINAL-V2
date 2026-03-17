import heroImage from "@/assets/foto-gyd.jpg";
import topLogo from "@/assets/logo-putih.png";
import logoFlame from "@/assets/logo-flame-book.png";
import CountdownTimer from "./CountdownTimer";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Pemuda melayani masyarakat"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src={topLogo}
            alt="New Logo"
            className="h-16 sm:h-20 object-contain opacity-90"
          />
          <img
            src={logoFlame}
            alt="GYD Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain invert opacity-90"
          />
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-primary-foreground leading-tight mb-2">
          communion
          <br />
          in action
        </h1>

        <p className="font-condensed text-lg sm:text-xl tracking-[0.3em] uppercase text-primary-foreground/80 mb-8">
          Global Youth Day 2026
        </p>

        <div className="flex justify-center mb-10">
          <CountdownTimer />
        </div>

        <p className="font-condensed text-base sm:text-lg text-primary-foreground/70 max-w-lg mx-auto">
          29 Maret 2026 · Lapangan Boki Hotinimbang, Kotamobagu
        </p>

        <a
          href="#about"
          className="inline-block mt-8 px-8 py-3 bg-amber-brand text-brown-dark font-bold rounded-full text-sm uppercase tracking-wider hover:scale-105 transition-transform"
        >
          Pelajari Lebih Lanjut
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
