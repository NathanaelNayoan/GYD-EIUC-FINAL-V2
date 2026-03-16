import { MapPin, Calendar, Clock, Users } from "lucide-react";
import merch from "@/assets/merch.png";

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

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Event card */}
          <div className="bg-background rounded-2xl shadow-xl p-8 sm:p-10 border border-border">
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

          {/* Merch preview */}
          <div className="text-center">
            <img
              src={merch}
              alt="GYD 2026 merchandise"
              className="rounded-2xl shadow-lg mx-auto max-w-sm w-full"
            />
            <p className="text-sm text-muted-foreground mt-4 font-condensed">
              Merchandise resmi GYD 2026 — Communion in Action
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
