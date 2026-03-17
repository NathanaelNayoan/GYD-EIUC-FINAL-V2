import { ArrowLeft, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import bajuGyd from "@/assets/baju-gyd.jpeg";

const PendaftaranPage = () => {
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
              <ClipboardList className="w-6 h-6 text-teal" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brown-dark">
              Alur Pendaftaran & Pembelian Kaos
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 text-foreground leading-relaxed">
              <div className="bg-teal/5 rounded-xl p-5 border border-teal/20">
                <p className="text-lg font-semibold text-teal mb-2">
                  ✨ GLOBAL YOUTH DAY 2026
                </p>
                <p className="text-lg font-semibold text-brown-dark">
                  🌍 Communion In Action
                </p>
                <p className="mt-3 text-sm">
                  Hai Pemuda! Mari ambil bagian dalam kegiatan Global Youth Day 2026
                  dan tunjukkan bahwa pemuda Advent siap melayani! 🙌
                </p>
              </div>

            <div>
              <p className="font-semibold text-amber-brand mb-2">
                📌 Teknis Pendaftaran & Pembayaran
              </p>
              <p className="text-sm">
                Harap mengisi Google Form pendaftaran terlebih dahulu.
              </p>
              <a
                href="https://forms.gle/MTmqmogPhamWm8RY7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 bg-teal text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform"
              >
                Isi Google Form
              </a>
            </div>

            <div>
              <p className="font-semibold mb-3">1️⃣ Hubungi Kesekretariatan (HP/WA):</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Seydi Najoan – <a href="https://wa.me/6208992330193" target="_blank" rel="noopener noreferrer" className="text-teal underline">08992330193</a> (DKMMU)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Clarisa Rantung – <a href="https://wa.me/62085945717346" target="_blank" rel="noopener noreferrer" className="text-teal underline">085945717346</a> (DKM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Sabathika Pangalila – <a href="https://wa.me/62082191552574" target="_blank" rel="noopener noreferrer" className="text-teal underline">082191552574</a> (DMMUB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Reity Sengkey – <a href="https://wa.me/62085256767412" target="_blank" rel="noopener noreferrer" className="text-teal underline">085256767412</a> (DMBMG)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Nichy Maramis – <a href="https://wa.me/62082196915997" target="_blank" rel="noopener noreferrer" className="text-teal underline">082196915997</a> (DMNU)</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                ❓ Apabila ada pertanyaan atau kesulitan mengakses link dan mengisi Google Form.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-3">2️⃣ Pembayaran Transfer:</p>
              <div className="bg-brown-dark text-primary-foreground rounded-xl p-5 text-center">
                <p className="text-lg font-mono">🏦 BNI – 2211020003</p>
                <p className="text-sm mt-1">a/n Fellery Onibala (Bendahara GYD)</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                📌 Mohon perhatikan nama dan nomor rekening, lalu kirimkan bukti transfer ke bagian sekretariat.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-amber-brand/10 rounded-xl p-5 border border-amber-brand/20">
                <p className="font-semibold text-brown-dark">👕 Batas Pemesanan Kaos</p>
                <p className="text-lg font-bold text-amber-brand mt-1">Rabu, 18 Maret 2026</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Cotton Combed 24s — Rp65.000 😍
                </p>
              </div>
              <div className="bg-teal/5 rounded-xl p-5 border border-teal/20">
                <p className="font-semibold text-brown-dark">📝 Batas Pendaftaran Peserta</p>
                <p className="text-lg font-bold text-teal mt-1">Rabu, 25 Maret 2026</p>
              </div>
            </div>

            <div className="bg-destructive/5 rounded-xl p-5 border border-destructive/20">
              <p className="font-semibold text-destructive mb-2">⚠️ Catatan:</p>
              <p className="text-sm">
                Peserta wajib mengisi link pendaftaran. Pengisian bisa dilakukan 1 perwakilan
                dari setiap jemaat (Ketua PA / Ketua Jemaat / Pendeta) sebagai akses masuk lokasi kegiatan.
              </p>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                👉 Follow IG{" "}
                <a
                  href="https://instagram.com/globalyouthday.eiucay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal underline"
                >
                  @globalyouthday.eiucay
                </a>{" "}
                untuk informasi selanjutnya
              </p>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className="bg-muted px-2 py-1 rounded">#GlobalYouthDay2026</span>
                <span className="bg-muted px-2 py-1 rounded">#CommunionInAction</span>
                <span className="bg-muted px-2 py-1 rounded">#AdventistYouth</span>
                <span className="bg-muted px-2 py-1 rounded">#GYD2026</span>
                <span className="bg-muted px-2 py-1 rounded">#pemudaadvent</span>
              </div>
              </div>
            </div>

            <div className="flex justify-center items-start">
              <img
                src={bajuGyd}
                alt="Desain Kaos GYD 2026"
                className="w-full max-w-sm rounded-xl shadow-lg object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendaftaranPage;
