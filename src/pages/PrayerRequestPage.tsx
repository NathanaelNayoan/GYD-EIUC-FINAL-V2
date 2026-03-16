import { ArrowLeft, QrCode, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PrayerRequestPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nama: "", nomor_wa: "", prayer_request: "" });

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
    setLoading(false);

    if (error) {
      toast({ title: "Gagal mengirim, coba lagi", variant: "destructive" });
      return;
    }

    setSubmitted(true);
    toast({ title: "Prayer request terkirim! 🙏" });
  };

  return (
    <div className="min-h-screen bg-parchment">
      <div className="container mx-auto px-4 py-8 max-w-xl">
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
              <QrCode className="w-6 h-6 text-teal" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brown-dark">
              Question & Prayer Request
            </h1>
          </div>

          <p className="text-sm text-muted-foreground mb-8">
            Punya pertanyaan atau permohonan doa? Kirimkan prayer request kamu di bawah ini.
          </p>

          {submitted ? (
            <div className="text-center py-12">
              <p className="text-5xl mb-4">🙏</p>
              <h2 className="text-xl font-bold text-brown-dark mb-2">Terima Kasih!</h2>
              <p className="text-muted-foreground text-sm">
                Prayer request kamu sudah terkirim. Tuhan memberkati!
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
            <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full inline-flex items-center justify-center gap-2 bg-teal text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="w-4 h-4" />
                {loading ? "Mengirim..." : "Kirim Prayer Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerRequestPage;
