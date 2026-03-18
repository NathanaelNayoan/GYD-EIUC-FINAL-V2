import { MapPin, Calendar, Clock, Users } from "lucide-react";
import merch1 from "@/assets/merch 1.jpeg";
import merch2 from "@/assets/merch 2.jpeg";

const details = [
  { icon: Calendar, label: "Hari/Tanggal", value: "Minggu, 29 Maret 2026" },
  { icon: Clock, label: "Waktu", value: "09.00 WITA (Open Gate) – Selesai" },
  { icon: MapPin, label: "Lokasi", value: "Lapangan Boki Hotinimbang, Kota Kotamobagu" },
  { icon: Users, label: "Peserta", value: "Terbuka untuk semua pemuda" },
];

const EventSection = () => {
  return (
    <section id="event" className="py-20 sm:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-condensed text-sm tracking-[0.3em] uppercase text-teal mb-3">
            Informasi Acara
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brown-dark">
            Jadwal & Lokasi
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch">
          {/* Event card */}
          <div className="bg-background rounded-2xl shadow-xl p-8 sm:p-10 border border-border flex flex-col justify-center">
            <div className="space-y-6">
              {details.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-condensed uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-foreground font-semibold mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Lapangan+Boki+Hotinimbang+Kotamobagu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform"
              >
                <MapPin className="w-4 h-4" />
                Lihat di Google Maps
              </a>
            </div>
          </div>

          {/* Merch preview 1 */}
          <div className="bg-background rounded-2xl shadow-xl overflow-hidden border border-border flex flex-col group">
            <img
              src={merch1}
              alt="GYD 2026 merchandise 1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Merch preview 2 */}
          <div className="bg-background rounded-2xl shadow-xl overflow-hidden border border-border flex flex-col group">
            <img
              src={merch2}
              alt="GYD 2026 merchandise 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
