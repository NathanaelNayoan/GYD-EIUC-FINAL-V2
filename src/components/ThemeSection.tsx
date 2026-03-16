import logoFlame from "@/assets/logo-flame-book.png";

const ThemeSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-brown-dark text-primary-foreground relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgydjJoMzR6TTIgMzRoMnYtMkgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-condensed text-sm tracking-[0.3em] uppercase text-amber-brand mb-3">
            Tema GYD 2026
          </p>

          <img
            src={logoFlame}
            alt="Communion in Action logo"
            className="w-20 h-20 mx-auto mb-6 invert opacity-80"
          />

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-8">
            communion in action
          </h2>

          {/* Scripture quote */}
          <blockquote className="relative bg-primary-foreground/5 border-l-4 border-amber-brand rounded-r-xl p-6 sm:p-8 mb-10 text-left">
            <p className="text-lg sm:text-xl italic text-primary-foreground/90 leading-relaxed">
              "Dan ketika mereka sedang berdoa, goyanglah tempat mereka berkumpul itu. Mereka semua dipenuhi oleh Roh Kudus, lalu mereka memberitakan firman Allah dengan berani."
            </p>
            <cite className="block mt-4 text-amber-brand font-bold not-italic">
              — Kisah Para Rasul 4:31
            </cite>
          </blockquote>

          <p className="text-primary-foreground/75 leading-relaxed max-w-2xl mx-auto mb-6">
            Tema ini mengingatkan kita bahwa hubungan dengan Tuhan tidak hanya terjadi saat berdoa atau beribadah, tetapi harus terlihat dalam tindakan nyata. Persekutuan yang hidup dengan Tuhan menghasilkan keberanian, kepedulian, dan semangat untuk melayani.
          </p>

          <p className="text-primary-foreground/75 leading-relaxed max-w-2xl mx-auto">
            Kaum muda diajak membuktikan iman bukan hanya lewat kata-kata, tetapi lewat aksi nyata—menjadi pembawa harapan, menyebarkan kasih, dan membuat dampak positif bagi masyarakat. Karena <strong className="text-amber-brand">iman yang hidup ditunjukkan melalui tindakan</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ThemeSection;
