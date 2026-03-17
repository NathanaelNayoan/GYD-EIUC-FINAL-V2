import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SurveySection from "@/components/SurveySection";

const PrayerRequestPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [form, setForm] = useState({ 
    nama: "", 
    nomor_wa: "", 
    prayer_request: "" 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedNama = form.nama.trim();
    const trimmedWa = form.nomor_wa.trim();
    const trimmedPrayer = form.prayer_request.trim();

    if (!trimmedNama || !trimmedWa || !trimmedPrayer) {
      toast({ title: "Mohon isi semua field", variant: "destructive" });
      return;
    }

    if (trimmedNama.length > 100 || trimmedWa.length > 20 || trimmedPrayer.length > 2000) {
      toast({ title: "Input terlalu panjang", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("prayer_requests").insert({
      nama: trimmedNama,
      nomor_wa: trimmedWa,
      prayer_request: trimmedPrayer,
    });
    setLoading(true); // Small delay feel or sync state
    setLoading(false);

    if (error) {
      toast({ title: "Gagal mengirim, coba lagi", variant: "destructive" });
      return;
    }

    setSubmitted(true);
    toast({ title: "Prayer request terkirim! 🙏" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-parchment pb-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-teal font-semibold mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        {submitted ? (
          <div className="bg-background rounded-2xl shadow-xl p-10 border border-border text-center">
            <p className="text-5xl mb-4">🙏</p>
            <h2 className="text-xl font-bold text-brown-dark mb-2">Terima Kasih!</h2>
            <p className="text-muted-foreground text-sm">
              Prayer request dan refleksi kamu sudah kami terima. Tuhan memberkati!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ nama: "", nomor_wa: "", prayer_request: "" });
              }}
              className="mt-6 text-teal underline text-sm font-semibold"
            >
              Kirim lagi
            </button>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-700">
            {/* Survey Section Integration */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
              <SurveySection />
            </div>

            {/* Prayer Request Form Section */}
            <div id="prayer-form" className="bg-background rounded-2xl shadow-xl p-6 sm:p-10 border border-border">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-brown-dark mb-2">
                  Prayer Request & Pertanyaan
                </h2>
                <p className="text-sm text-muted-foreground">
                  Lengkapi data dirimu untuk mengirimkan permohonan doa atau pertanyaan kepada tim kami.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={form.nama}
                      onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
                      placeholder="Masukkan nama kamu"
                      maxLength={100}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={form.nomor_wa}
                      onChange={(e) => setForm((f) => ({ ...f, nomor_wa: e.target.value }))}
                      placeholder="08xxxxxxxxxx"
                      maxLength={20}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Prayer Request / Pertanyaan
                  </label>
                  <textarea
                    value={form.prayer_request}
                    onChange={(e) => setForm((f) => ({ ...f, prayer_request: e.target.value }))}
                    placeholder="Tuliskan permohonan doa atau pertanyaanmu di sini..."
                    maxLength={2000}
                    rows={5}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-teal text-primary-foreground px-6 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Mengirim..." : "Kirim Prayer Request"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerRequestPage;
