import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import cardRegistration from "@/assets/card-registration.png";
import cardPrayer from "@/assets/card-prayer.png";
import cardCompassion from "@/assets/card-compassion.png";

const cards = [
  {
    title: "Alur Pendaftaran & Pembelian Kaos",
    desc: "Informasi lengkap pendaftaran, pembayaran, dan pemesanan kaos GYD 2026.",
    image: cardRegistration,
    link: "/pendaftaran",
  },
  {
    title: "Question & Prayer Request",
    desc: "Kirimkan pertanyaan atau permohonan doamu secara langsung.",
    image: cardPrayer,
    link: "/prayer-request",
  },
  {
    title: "Things To Bring & To Share",
    desc: "Informasi tentang compassion: apa yang dibawa, lokasi, dan groupings.",
    image: cardCompassion,
    link: "/compassion",
  },
];

const InfoCardsSection = () => {
  return (
    <section id="info" className="py-20 sm:py-28 bg-parchment">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-condensed text-sm tracking-[0.3em] uppercase text-teal mb-3">
            Informasi Penting
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brown-dark">
            Yang Perlu Kamu Ketahui
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card) => (
            <Link
              key={card.link}
              to={card.link}
              className="group rounded-2xl overflow-hidden shadow-xl bg-background border border-border hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-brown-dark mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{card.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-teal font-semibold text-sm group-hover:gap-3 transition-all">
                  Lihat Detail
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCardsSection;
