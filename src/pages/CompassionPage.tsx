import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const CompassionPage = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-teal font-semibold mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        <div className="bg-background rounded-2xl shadow-xl p-6 sm:p-10 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-teal" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brown-dark">
              Things To Bring & To Share
            </h1>
          </div>

          <div className="space-y-8 text-foreground leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-amber-brand mb-4">
                Yang disediakan jemaat:
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">🍎</span>
                  <div>
                    <p className="font-semibold">Makanan</p>
                    <p className="text-muted-foreground">Buah/kue basah/kue kering — prioritas kepada pekerja toko atau jalanan</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">✏️</span>
                  <div>
                    <p className="font-semibold">Stationeries</p>
                    <p className="text-muted-foreground">Prioritas anak kecil/remaja yang membutuhkan buku, pen, atau pencil</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">👕</span>
                  <div>
                    <p className="font-semibold">Pakaian</p>
                    <p className="text-muted-foreground">Prioritas jika ada homeless man/pemulung</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">💰</span>
                  <div>
                    <p className="font-semibold">Money</p>
                    <p className="text-muted-foreground">Prioritas kepada orang yang dengan bisikan roh kudus terlihat membutuhkan</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">🛒</span>
                  <div>
                    <p className="font-semibold">Sembako</p>
                    <p className="text-muted-foreground">Prioritas kepada ibu-ibu di jalanan yang terlihat membutuhkan</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">📖</span>
                  <div>
                    <p className="font-semibold">Buku/Traktat</p>
                    <p className="text-muted-foreground">Kepada semua orang yang dijumpai</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">🧴</span>
                  <div>
                    <p className="font-semibold">Perlengkapan mandi</p>
                    <p className="text-muted-foreground">(misal: sabun, sikat gigi, pasta gigi, shampoo, handuk, dan lain-lain) – prioritas orang dewasa yang membutuhkan</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-amber-brand mb-4">
                Yang disediakan panitia:
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">🗑️</span>
                  <div>
                    <p className="font-semibold">Plastik sampah</p>
                    <p className="text-muted-foreground">Untuk tiap group (pungut sampah di perjalanan)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">📩</span>
                  <div>
                    <p className="font-semibold">Amplop compassion</p>
                    <p className="text-muted-foreground">Berisi barcode</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-muted rounded-lg p-3">
                  <span className="text-xl">📌</span>
                  <div>
                    <p className="font-semibold">Pin daerah</p>
                    <p className="text-muted-foreground">Untuk saling menukar dengan daerah lain — Rp12.000/pcs</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-amber-brand mb-4">
                📍 Lokasi Compassion & Groupings
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Di tempat kegiatan akan dilakukan kegiatan Compassion, juga di beberapa titik di bawah ini:
              </p>
              <div className="space-y-2">
                {[
                  { titik: "1", desc: "SMA N Kotamobagu → Sampana & Toko Tita" },
                  { titik: "2", desc: "Alfa Midi Kotobangon → Polres Kotamobagu & Hotel Sutan Raja Tumobui" },
                  { titik: "3", desc: "Raja Es Sinindian → Pertamina Matali & Alfa Maret Motoboi Kecil" },
                  { titik: "4", desc: "Bank BNI Gogagoman → Kompi AD Gengulang" },
                  { titik: "5", desc: "Abdi Karya pertokoan Jl. Kartini" },
                  { titik: "6", desc: "Supermarket Paris → Stasiun 23 Maret & Lapangan Mogolaing" },
                  { titik: "7", desc: "Mi Gacoan Molinow → Lapangan Molinow" },
                ].map((loc) => (
                  <div
                    key={loc.titik}
                    className="flex items-start gap-3 bg-olive/10 rounded-lg p-3 border border-olive/20"
                  >
                    <span className="bg-olive text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {loc.titik}
                    </span>
                    <p className="text-sm">{loc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompassionPage;
