import logoFlame from "@/assets/logo-flame-book.png";

const FooterSection = () => {
  return (
    <footer className="bg-brown-dark text-primary-foreground py-12">
      <div className="container mx-auto px-4 text-center">
        <img
          src={logoFlame}
          alt="GYD Logo"
          className="w-12 h-12 mx-auto mb-4 invert opacity-60"
        />
        <p className="font-display text-2xl mb-2">communion in action</p>
        <p className="font-condensed text-sm tracking-[0.2em] uppercase text-primary-foreground/50 mb-6">
          Global Youth Day 2026
        </p>
        <p className="text-xs text-primary-foreground/40">
          © 2026 Global Youth Day · Gereja Masehi Advent Hari Ketujuh
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
