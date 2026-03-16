import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronUp, Send } from "lucide-react";

const areas = [
  { emoji: "🧠", label: "Kesehatan Mental", key: "mental" },
  { emoji: "💪", label: "Kesehatan Fisik", key: "fisik" },
  { emoji: "💰", label: "Keuangan/Finansial", key: "keuangan" },
  { emoji: "🤝", label: "Sosial", key: "sosial" },
  { emoji: "✝️", label: "Kerohanian Pribadi", key: "kerohanian" },
  { emoji: "🚫", label: "Kebiasaan Buruk", key: "kebiasaan" },
  { emoji: "👨‍👩‍👧‍👦", label: "Keluarga", key: "keluarga" },
];

const followUpQuestions: Record<string, string[]> = {
  mental: [
    "Seberapa sering kamu merasa stres atau terbebani dalam hidup akhir-akhir ini?",
    "Hal apa yang paling sering membuat pikiranmu terasa berat?",
    "Ketika kamu merasa tertekan, apakah kamu memiliki seseorang untuk berbicara?",
    "Setelah berbicara dengan orang itu bagaimana perasaanmu?",
    "Apakah kamu ingin memiliki hidup yang lebih tenang secara mental?",
    "Hal kecil apa yang ingin kamu mulai lakukan untuk menjaga kesehatan mentalmu?",
  ],
  fisik: [
    "Bagaimana kamu menilai kesehatan fisikmu atau kondisimu saat ini?",
    "Apakah kamu merasa tubuhmu sering kelelahan?",
    "Kebiasaan buruk apa yang paling sering mengganggu kesehatanmu? (Makanan? Kurang Olahraga? Tidur Tidak Teratur? Merokok? Miras? Narkoba?)",
    "Sudahkah kamu mencoba untuk menjadi lebih baik dan meninggalkan kebiasaan burukmu itu?",
    "Jika sudah tapi gagal, apa yang membuatmu terus gagal?",
    "Mulai sekarang, apakah kamu ingin memiliki gaya hidup yang lebih sehat?",
    "Kebiasaan sehat apa yang ingin kamu mulai minggu ini?",
  ],
  keuangan: [
    "Seberapa besar tekanan keuangan yang kamu rasakan saat ini?",
    "Hal apa yang paling membuatmu khawatir tentang keuangan?",
    "Apakah masalah keuangan pernah membuatmu stres atau kehilangan harapan?",
    "Sudahkah kamu mencoba untuk menjadi lebih baik dalam mengatur keuangan?",
    "Jika sudah tapi gagal, apa sajakah yang membuatmu gagal?",
    "Sekarang, apakah kamu ingin memiliki pengelolaan keuangan yang lebih baik?",
    "Langkah kecil apa yang ingin kamu lakukan untuk memperbaiki kondisi keuanganmu?",
  ],
  sosial: [
    "Pernahkah kamu merasa disakiti oleh kata-kata atau perlakuan orang lain?",
    "Menurutmu, apakah bullying masih sering terjadi di lingkungan kita?",
    "Jika kamu melihat seseorang diperlakukan tidak baik, bagaimana biasanya kamu merespon?",
    "Apakah kamu ingin menjadi seseorang yang membawa lebih banyak kebaikan bagi orang lain?",
    "Hal sederhana apa yang bisa kamu lakukan untuk membuat lingkunganmu lebih ramah?",
  ],
  kerohanian: [
    "Seberapa sering kamu merasa gelisah atau kecewa dengan hubungan pribadimu dengan Tuhan?",
    "Ketika hidup terasa berat, apakah kamu pernah mencari Tuhan melalui doa?",
    "Sudah berapa kali kamu gagal mencoba untuk menjadi seperti yang Tuhan inginkan?",
    "Apakah kamu merasa hidupmu memiliki tujuan yang lebih besar?",
    "Apakah kamu ingin memiliki hubungan yang lebih dekat dengan Tuhan?",
    "Apakah ada topik khusus yang ingin anda pelajari dari Firman?",
    "Langkah kecil apa yang ingin kamu mulai untuk memperkuat kehidupan rohanimu?",
  ],
  keluarga: [
    "Bagaimana kamu menilai hubunganmu dengan keluargamu saat ini?",
    "Apakah kamu merasa dipahami dan didukung oleh keluargamu?",
    "Hal apa yang paling sering menjadi sumber konflik atau jarak dalam keluargamu?",
    "Ketika ada masalah keluarga, apakah kamu biasanya membicarakannya atau memilih diam?",
    "Apakah hubungan keluarga yang kurang baik pernah mempengaruhi perasaan atau hidupmu?",
    "Apakah kamu ingin memiliki hubungan yang lebih baik dan lebih dekat dengan keluargamu?",
    "Langkah kecil apa yang ingin kamu lakukan untuk memperbaiki hubungan dengan keluargamu?",
  ],
  kebiasaan: [
    "Apakah ada kebiasaan dalam hidupmu yang sebenarnya kamu tahu tidak baik tetapi sulit dihentikan?",
    "Kebiasaan buruk apa yang paling sering mengganggu hidupmu? (Malas? Menunda pekerjaan? Terlalu lama di media sosial? Merokok? Miras? Game? Judi Online? Pornografi)",
    "Menurutmu, apa yang biasanya memicu kebiasaan buruk tersebut?",
    "Sudahkah kamu mencoba untuk berhenti atau mengubah kebiasaan buruk itu?",
    "Jika sudah tapi gagal, apa yang membuatmu terus kembali melakukannya?",
    "Apakah kamu ingin benar-benar meninggalkan kebiasaan buruk tersebut?",
    "Kebiasaan baik apa yang ingin kamu mulai untuk menggantikan kebiasaan buruk itu?",
  ],
};

const emojiReactions = ["😊", "😢", "🔥", "🙏", "💪", "❤️"];

const SurveySection = () => {
  const { toast } = useToast();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [votedAreas, setVotedAreas] = useState<Record<string, string>>({});
  const [sessionId] = useState(() => crypto.randomUUID());

  const handleEmojiVote = useCallback(
    async (areaKey: string, emoji: string) => {
      if (votedAreas[areaKey]) return;

      setVotedAreas((prev) => ({ ...prev, [areaKey]: emoji }));

      await supabase.from("survey_responses").insert({
        area: areaKey,
        question: "Area pilihan utama",
        answer: emoji,
        session_id: sessionId,
      });
    },
    [votedAreas, sessionId]
  );

  const handleSubmitAnswers = async () => {
    if (!selectedArea) return;

    const questions = followUpQuestions[selectedArea];
    const filledAnswers = questions.filter((_, i) => answers[`${selectedArea}-${i}`]?.trim());

    if (filledAnswers.length === 0) {
      toast({ title: "Mohon jawab minimal satu pertanyaan", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    const inserts = questions
      .map((q, i) => {
        const answer = answers[`${selectedArea}-${i}`]?.trim();
        if (!answer) return null;
        return {
          area: selectedArea,
          question: q,
          answer: answer.slice(0, 2000),
          session_id: sessionId,
        };
      })
      .filter(Boolean);

    const { error } = await supabase.from("survey_responses").insert(inserts as any);
    setSubmitting(false);

    if (error) {
      toast({ title: "Gagal mengirim, coba lagi", variant: "destructive" });
      return;
    }

    toast({ title: "Jawaban terkirim! Terima kasih 🙏" });
    setAnswers({});
    setSelectedArea(null);
  };

  return (
    <section id="survey" className="py-20 sm:py-28 bg-cream">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <p className="font-condensed text-sm tracking-[0.3em] uppercase text-teal mb-3">
            Refleksi Diri
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brown-dark mb-4">
            "Dari semua area ini, area mana yang paling ingin kamu perbaiki dalam hidupmu?"
          </h2>
          <p className="text-muted-foreground text-sm">
            Pilih emoji untuk memberikan reaksimu, lalu klik area untuk menjawab pertanyaan refleksi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {areas.map((area) => (
            <div
              key={area.key}
              className="bg-background rounded-xl border border-border p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{area.emoji}</span>
                <h3 className="font-semibold text-brown-dark text-sm">{area.label}</h3>
              </div>

              {/* Emoji reactions */}
              <div className="flex gap-1.5 mb-3">
                {emojiReactions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiVote(area.key, emoji)}
                    disabled={!!votedAreas[area.key]}
                    className={`text-lg w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      votedAreas[area.key] === emoji
                        ? "bg-teal/20 scale-125 ring-2 ring-teal"
                        : votedAreas[area.key]
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-muted hover:scale-110 cursor-pointer"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Expand button */}
              <button
                onClick={() => setSelectedArea(selectedArea === area.key ? null : area.key)}
                className="text-xs text-teal font-semibold inline-flex items-center gap-1 hover:underline"
              >
                {selectedArea === area.key ? (
                  <>
                    Tutup <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Jawab Pertanyaan <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Follow-up questions */}
        {selectedArea && (
          <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg font-bold text-brown-dark mb-1">
              {areas.find((a) => a.key === selectedArea)?.emoji}{" "}
              {areas.find((a) => a.key === selectedArea)?.label}
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Jawab pertanyaan di bawah ini. Kamu tidak harus menjawab semuanya.
            </p>

            <div className="space-y-5">
              {followUpQuestions[selectedArea].map((q, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {q}
                  </label>
                  <textarea
                    value={answers[`${selectedArea}-${i}`] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [`${selectedArea}-${i}`]: e.target.value,
                      }))
                    }
                    maxLength={2000}
                    rows={2}
                    placeholder="Tulis jawabanmu di sini..."
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 resize-none"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground italic mb-4">
                "Tuliskan satu langkah kecil yang ingin kamu mulai minggu ini."
              </p>
              <button
                onClick={handleSubmitAnswers}
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-teal text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Mengirim..." : "Kirim Jawaban"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SurveySection;
