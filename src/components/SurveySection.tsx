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

interface QuestionOption {
  emoji: string;
  label: string;
}

interface Question {
  text: string;
  options?: QuestionOption[];
}

const followUpQuestions: Record<string, Question[]> = {
  mental: [
    { 
      text: "Seberapa sering kamu merasa stres atau terbebani dalam hidup akhir-akhir ini?",
      options: [
        { emoji: "🌊", label: "Setiap hari (sangat sering)" },
        { emoji: "⚡", label: "Beberapa kali seminggu" },
        { emoji: "☁️", label: "Hanya sesekali" },
        { emoji: "🌈", label: "Jarang / Hampir tidak pernah" },
      ]
    },
    { 
      text: "Hal apa yang paling sering membuat pikiranmu terasa berat?",
      options: [
        { emoji: "📚", label: "banyak tugas / pekerjaan" },
        { emoji: "⏳", label: "deadline" },
        { emoji: "🤯", label: "overthinking" },
        { emoji: "😓", label: "tekanan/tanggung jawab besar" },
        { emoji: "😔", label: "sedih / kelelahan" },
      ]
    },
    { 
      text: "Ketika kamu merasa tertekan, apakah kamu memiliki seseorang untuk berbicara?",
      options: [
        { emoji: "✅", label: "Ada, teman dekat" },
        { emoji: "👨‍👩‍👧‍👦", label: "Ada, keluarga" },
        { emoji: "🐈", label: "Ada, tapi lebih suka diam" },
        { emoji: "❌", label: "Tidak ada / Sendirian" },
      ]
    },
    { 
      text: "Setelah berbicara dengan orang itu bagaimana perasaanmu?",
      options: [
        { emoji: "🎈", label: "Jauh lebih lega" },
        { emoji: "🙂", label: "Sedikit lebih baik" },
        { emoji: "😐", label: "Biasa saja" },
        { emoji: "😕", label: "Masih sama saja" },
      ]
    },
    { 
      text: "Apakah kamu ingin memiliki hidup yang lebih tenang secara mental?",
      options: [
        { emoji: "✨", label: "Sangat mau" },
        { emoji: "🕊️", label: "Rindu kedamaian" },
        { emoji: "🌱", label: "Ingin belajar tenang" },
        { emoji: "🧘🏻", label: "Sedang berusaha" },
      ]
    },
    { 
      text: "Hal kecil apa yang ingin kamu mulai lakukan untuk menjaga kesehatan mentalmu?",
      options: [
        { emoji: "🚶🏻", label: "jalan santai/ jalan kaki" },
        { emoji: "🧘🏻", label: "meditasi/membri wktu sndri" },
        { emoji: "📖", label: "menulis jurnal/refleksi" },
        { emoji: "🏖️", label: "kepantai" },
        { emoji: "🙏🏻", label: "berdoa" },
      ]
    },
  ],
  fisik: [
    { 
      text: "Bagaimana kamu menilai kesehatan fisikmu atau kondisimu saat ini?",
      options: [
        { emoji: "💎", label: "Sangat Sehat & Bugar" },
        { emoji: "👍", label: "Cukup Baik" },
        { emoji: "📉", label: "Sering Sakit/Lemas" },
        { emoji: "🏥", label: "Sedang dalam pemulihan" },
      ]
    },
    { 
      text: "Apakah kamu merasa tubuhmu sering kelelahan?",
      options: [
        { emoji: "😫", label: "Iya, setiap bangun tidur" },
        { emoji: "🥱", label: "Sering di sore hari" },
        { emoji: "🔋", label: "Kadang-kadang saja" },
        { emoji: "⚡", label: "Jarang/Tetap berenergi" },
      ]
    },
    { 
      text: "Kebiasaan buruk apa yang paling sering mengganggu kesehatanmu?",
      options: [
        { emoji: " Fries", label: "makanan tidak sehat" },
        { emoji: "🛌🏻", label: "kurang olahraga (rebahan)" },
        { emoji: "😪", label: "tidur tidak teratur" },
        { emoji: "🚬", label: "rokok / vape" },
        { emoji: "🍺", label: "alkohol / miras" },
        { emoji: "💊", label: "narkoba" },
      ]
    },
    { 
      text: "Sudahkah kamu mencoba untuk menjadi lebih baik dan meninggalkan kebiasaan burukmu itu?",
      options: [
        { emoji: "🏁", label: "Sudah mulai mencoba" },
        { emoji: "🏆", label: "Berhasil beberapa kali" },
        { emoji: "🔁", label: "Sering gagal & mulai lagi" },
        { emoji: "⏳", label: "Baru ada niat hari ini" },
      ]
    },
    { 
      text: "Jika sudah tapi gagal, apa yang membuatmu terus gagal?",
      options: [
        { emoji: "⏰", label: "sering menunda" },
        { emoji: "😴", label: "kurang motivasi" },
        { emoji: "📱", label: "hp/media sosial" },
        { emoji: "🤯", label: "stress / tekanan" },
        { emoji: "📉", label: "kurang perencanaan" },
      ]
    },
    { 
      text: "Mulai sekarang, apakah kamu ingin memiliki gaya hidup yang lebih sehat?",
      options: [
        { emoji: "🌟", label: "Sangat mau berubah" },
        { emoji: "💪", label: "Siap berkomitmen" },
        { emoji: "🥗", label: "Ingin perlahan-lahan" },
        { emoji: "🙌", label: "Butuh dukungan untuk mulai" },
      ]
    },
    { 
      text: "Kebiasaan sehat apa yang ingin kamu mulai minggu ini?",
      options: [
        { emoji: "🚶🏻", label: "Jalan kaki / olahraga" },
        { emoji: "🥗", label: "makan lebih sehat" },
        { emoji: "🛌🏻", label: "tidur teratur" },
        { emoji: "🥛", label: "minum air teratur" },
        { emoji: "🙏🏻", label: "banyak berdoa" },
      ]
    },
  ],
  keuangan: [
    { 
      text: "Seberapa besar tekanan keuangan yang kamu rasakan saat ini?",
      options: [
        { emoji: "🌋", label: "Sangat berat / kewalahan" },
        { emoji: "🌩️", label: "Cukup menantang" },
        { emoji: "☁️", label: "Ada, tapi masih terkendali" },
        { emoji: "☀️", label: "Sedang stabil & aman" },
      ]
    },
    { 
      text: "Hal apa yang paling membuatmu khawatir tentang keuangan?",
      options: [
        { emoji: "💸", label: "pengeluaran lebih besar" },
        { emoji: "🏧", label: "tidak punya tabungan" },
        { emoji: "📃", label: "banyak tagihan/kewajiban" },
        { emoji: "🏠", label: "biaya hidup terus naik" },
        { emoji: "🤷🏻", label: "ketidak pastian masa depan" },
      ]
    },
    { 
      text: "Apakah masalah keuangan pernah membuatmu stres atau kehilangan harapan?",
      options: [
        { emoji: "😟", label: "kwatir terus-menerus" },
        { emoji: "😣", label: "stres memikirkan keuangan" },
        { emoji: "😔", label: "merasa putus asa" },
        { emoji: "🥲", label: "sedih" },
        { emoji: "🧠", label: "banyak pikiran" },
      ]
    },
    { 
      text: "Sudahkah kamu mencoba untuk menjadi lebih baik dalam mengatur keuangan?",
      options: [
        { emoji: "📒", label: "Sudah mencatat keuangan" },
        { emoji: "🧱", label: "Sedang mencoba menabung" },
        { emoji: "📉", label: "Sering gagal menahan diri" },
        { emoji: "💡", label: "Mulai belajar mengelola" },
      ]
    },
    { 
      text: "Jika sudah tapi gagal, apa sajakah yang membuatmu gagal?",
      options: [
        { emoji: "⏳", label: "kurang disiplin" },
        { emoji: "📱", label: "distraksi hp/media sosial" },
        { emoji: "😩", label: "kehilangan semangat tengah jalan" },
        { emoji: "📋", label: "rencana kurang jelas" },
        { emoji: "🔁", label: "mengulangi kebiasaan yg lama" },
      ]
    },
    { 
      text: "Sekarang, apakah kamu ingin memiliki pengelolaan keuangan yang lebih baik?",
      options: [
        { emoji: "💰", label: "Sangat mau berubah" },
        { emoji: "🎯", label: "Ingin punya target menabung" },
        { emoji: "📈", label: "Ingin keuangan lebih sehat" },
        { emoji: "🙏", label: "Butuh bimbingan" },
      ]
    },
    { 
      text: "Langkah kecil apa yang ingin kamu lakukan untuk memperbaiki kondisi keuanganmu?",
      options: [
        { emoji: "📉", label: "Kurangi jajan/kopi" },
        { emoji: "📝", label: "Catat pengeluaran harian" },
        { emoji: "🐷", label: "Langsung tabung sisa uang" },
        { emoji: "🛒", label: "Beli yang butuh saja" },
      ]
    },
  ],
  sosial: [
    { 
      text: "Pernahkah kamu merasa disakiti oleh kata-kata atau perlakuan orang lain?",
      options: [
        { emoji: "🗣️", label: "kata-kata kasar / kritik" },
        { emoji: "🚪", label: "diabaikan / dikucilkan" },
        { emoji: "🤝", label: "dikhianati teman" },
        { emoji: "😔", label: "dipandang rendah" },
      ]
    },
    { 
      text: "Menurutmu, apakah bullying masih sering terjadi di lingkungan kita?",
      options: [
        { emoji: "📈", label: "sering sekali" },
        { emoji: "📉", label: "jarang terjadi" },
        { emoji: "👥", label: "sering di sekolah/kantor" },
        { emoji: "📱", label: "cyberbullying (sosmed)" },
      ]
    },
    { 
      text: "Jika kamu melihat seseorang diperlakukan tidak baik, bagaimana biasanya kamu merespon?",
      options: [
        { emoji: "🛡️", label: "membela / menolong" },
        { emoji: "🗣️", label: "menegur pelaku" },
        { emoji: "👥", label: "lapor ke atasan/guru" },
        { emoji: "😶", label: "diam karena takut" },
      ]
    },
    { 
      text: "Apakah kamu ingin menjadi seseorang yang membawa lebih banyak kebaikan bagi orang lain?",
      options: [
        { emoji: "🌟", label: "Sangat ingin" },
        { emoji: "🤝", label: "ingin membantu sesama" },
        { emoji: "🌱", label: "sedang berusaha" },
        { emoji: "✨", label: "ingin jadi berkat" },
      ]
    },
    { 
      text: "Hal sederhana apa yang bisa kamu lakukan untuk membuat lingkunganmu lebih ramah?",
      options: [
        { emoji: "😊", label: "senyum & sapa" },
        { emoji: "👂", label: "jadi pendengar baik" },
        { emoji: "🍭", label: "berbagi kebaikan kecil" },
        { emoji: "🙌", label: "saling menghargai" },
      ]
    },
  ],
  kerohanian: [
    { 
      text: "Seberapa sering kamu merasa gelisah atau kecewa dengan hubungan pribadimu dengan Tuhan?",
      options: [
        { emoji: "😟", label: "sering merasa jauh" },
        { emoji: "❓", label: "ragu / bingung" },
        { emoji: "📉", label: "hubungan sedang dingin" },
        { emoji: "😔", label: "merasa bersalah" },
      ]
    },
    { 
      text: "Ketika hidup terasa berat, apakah kamu pernah mencari Tuhan melalui doa?",
      options: [
        { emoji: "🙏", label: "selalu berdoa" },
        { emoji: "⏳", label: "sesekali jika ingat" },
        { emoji: "😶", label: "sulit berdoa saat stres" },
        { emoji: "✨", label: "ingin mulai rutin berdoa" },
      ]
    },
    { 
      text: "Sudah berapa kali kamu gagal mencoba untuk menjadi seperti yang Tuhan inginkan?",
      options: [
        { emoji: "🔄", label: "berulang kali gagal" },
        { emoji: "🧗🏻", label: "sedang berjuang bangkit" },
        { emoji: "😔", label: "merasa tidak layak" },
        { emoji: "🌱", label: "belajar dari kegagalan" },
      ]
    },
    { 
      text: "Apakah kamu merasa hidupmu memiliki tujuan yang lebih besar?",
      options: [
        { emoji: "🎯", label: "percaya sepenuhnya" },
        { emoji: "🔍", label: "sedang mencari tahu" },
        { emoji: "🤔", label: "masih ragu / belum tahu" },
        { emoji: "💡", label: "mulai menyadari" },
      ]
    },
    { 
      text: "Apakah kamu ingin memiliki hubungan yang lebih dekat dengan Tuhan?",
      options: [
        { emoji: "🔥", label: "Rindu sekali" },
        { emoji: "🙌", label: "ingin lebih sungguh-sungguh" },
        { emoji: "📖", label: "mulai baca firman" },
        { emoji: "🙏", label: "melalui doa harian" },
      ]
    },
    { 
      text: "Apakah ada topik khusus yang ingin anda pelajari dari Firman?",
      options: [
        { emoji: "📖", label: "Janji Tuhan (harapan)" },
        { emoji: "🕊️", label: "Damai sejahtera" },
        { emoji: "🛡️", label: "Menghadapi masalah" },
        { emoji: "✝️", label: "Kasih & pengampunan" },
      ]
    },
    { 
      text: "Langkah kecil apa yang ingin kamu mulai untuk memperkuat kehidupan rohanimu?",
      options: [
        { emoji: "🙏", label: "doa pagi / malam" },
        { emoji: "📖", label: "baca 1 pasal sehari" },
        { emoji: "🎵", label: "dengar lagu rohani" },
        { emoji: "⛪", label: "ikut persekutuan" },
      ]
    },
  ],
  keluarga: [
    { 
      text: "Bagaimana kamu menilai hubunganmu dengan keluargamu saat ini?",
      options: [
        { emoji: "❤️", label: "sangat harmonis" },
        { emoji: "🏠", label: "biasa saja / rukun" },
        { emoji: "📏", label: "ada jarak / dingin" },
        { emoji: "⚡", label: "sering konflik" },
      ]
    },
    { 
      text: "Apakah kamu merasa dipahami and didukung oleh keluargamu?",
      options: [
        { emoji: "✅", label: "sepenuhnya didukung" },
        { emoji: "🤝", label: "cukup dipahami" },
        { emoji: "❌", label: "sulit dipahami" },
        { emoji: "😔", label: "merasa sendirian" },
      ]
    },
    { 
      text: "Hal apa yang paling sering menjadi sumber konflik atau jarak dalam keluargamu?",
      options: [
        { emoji: "🗣️", label: "komunikasi buruk" },
        { emoji: "💰", label: "masalah keuangan" },
        { emoji: "📉", label: "beda pendapat / prinsip" },
        { emoji: "⏳", label: "kurang waktu bersama" },
      ]
    },
    { 
      text: "Ketika ada masalah keluarga, apakah kamu biasanya membicarakannya atau memilih diam?",
      options: [
        { emoji: "🗣️", label: "bicara terbuka" },
        { emoji: "😶", label: "pilih diam / menghindar" },
        { emoji: "😡", label: "bicarakan dengan marah" },
        { emoji: "👥", label: "butuh penengah" },
      ]
    },
    { 
      text: "Apakah hubungan keluarga yang kurang baik pernah mempengaruhi perasaan atau hidupmu?",
      options: [
        { emoji: "🧠", label: "sangat membebani pikiran" },
        { emoji: "😔", label: "sering sedih / stres" },
        { emoji: "📉", label: "ganggu fokus/kerjaan" },
        { emoji: "😟", label: "tidak tenang di rumah" },
      ]
    },
    { 
      text: "Apakah kamu ingin memiliki hubungan yang lebih baik dan lebih dekat dengan keluargamu?",
      options: [
        { emoji: "👨‍👩‍👧‍👦", label: "Sangat rindu damai" },
        { emoji: "❤️", label: "ingin lebih harmonis" },
        { emoji: "🤝", label: "ingin perbaiki komunikasi" },
        { emoji: "🙏", label: "mendoakan keluarga" },
      ]
    },
    { 
      text: "Langkah kecil apa yang ingin kamu lakukan untuk memperbaiki hubungan dengan keluargamu?",
      options: [
        { emoji: "🗣️", label: "mulai ajak bicara" },
        { emoji: "⏳", label: "luangkan waktu bersama" },
        { emoji: "🎁", label: "beri perhatian kecil" },
        { emoji: "🙏", label: "minta maaf lebih dulu" },
      ]
    },
  ],
  kebiasaan: [
    { 
      text: "Apakah ada kebiasaan dalam hidupmu yang sebenarnya kamu tahu tidak baik tetapi sulit dihentikan?",
      options: [
        { emoji: "✅", label: "Iya, banyak" },
        { emoji: "🤏", label: "ada beberapa saja" },
        { emoji: "🔄", label: "sulit berhenti (adiksi)" },
        { emoji: "🤔", label: "sedang menyadari" },
      ]
    },
    { 
      text: "Kebiasaan buruk apa yang paling sering mengganggu hidupmu? (Malas? Menunda pekerjaan? Terlalu lama di media sosial? Merokok? Miras? Game? Judi Online? Pornografi)",
      options: [
        { emoji: "📱", label: "Media Sosial" },
        { emoji: "🚬", label: "Rokok / Vape" },
        { emoji: "🎮", label: "Game berlebihan" },
        { emoji: "🥱", label: "Malas / Rebahan" },
      ]
    },
    { 
      text: "Menurutmu, apa yang biasanya memicu kebiasaan buruk tersebut?",
      options: [
        { emoji: "🤯", label: "stres / tertekan" },
        { emoji: "🥱", label: "bosan / gabut" },
        { emoji: "👥", label: "pengaruh lingkungan" },
        { emoji: "😔", label: "perasaan kesepian" },
      ]
    },
    { 
      text: "Sudahkah kamu mencoba untuk berhenti atau mengubah kebiasaan buruk itu?",
      options: [
        { emoji: "🧗🏻", label: "sedang mencoba keras" },
        { emoji: "🔄", label: "pernah coba tapi gagal" },
        { emoji: "⏳", label: "baru ingin mulai" },
        { emoji: "✅", label: "sudah ada kemajuan" },
      ]
    },
    { 
      text: "Jika sudah tapi gagal, apa yang membuatmu terus kembali melakukannya?",
      options: [
        { emoji: "🔄", label: "terbiasa dari kecil" },
        { emoji: "🧠", label: "pikiran tidak tenang" },
        { emoji: "📉", label: "kurang dukungan" },
        { emoji: "🤝", label: "ajakan teman" },
      ]
    },
    { 
      text: "Apakah kamu ingin benar-benar meninggalkan kebiasaan buruk tersebut?",
      options: [
        { emoji: "🔥", label: "Sangat ingin berubah" },
        { emoji: "🙏", label: "mohon kekuatan Tuhan" },
        { emoji: "🌱", label: "pelan-pelan berubah" },
        { emoji: "✅", label: "sudah tekad bulat" },
      ]
    },
    { 
      text: "Kebiasaan baik apa yang ingin kamu mulai untuk menggantikan kebiasaan buruk itu?",
      options: [
        { emoji: "📖", label: "baca buku / belajar" },
        { emoji: "🧘🏻", label: "olahraga / meditasi" },
        { emoji: "🛌🏻", label: "tidur lebih awal" },
        { emoji: "🥛", label: "banyak minum air" },
      ]
    },
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

  const handleOptionSelect = (questionId: string, option: QuestionOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: `${option.emoji} ${option.label}`
    }));
  };

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
          question: q.text,
          answer: answer.slice(0, 2000),
          session_id: sessionId,
        };
      })
      .filter(Boolean);

    const { error } = await supabase.from("survey_responses").insert(inserts);
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
              Pilih opsi yang sesuai atau tulis jawabanmu sendiri. Kamu tidak harus menjawab semuanya.
            </p>

            <div className="space-y-8">
              {followUpQuestions[selectedArea].map((q, i) => {
                const questionId = `${selectedArea}-${i}`;
                const currentAnswer = answers[questionId] || "";
                
                return (
                  <div key={i} className="space-y-4">
                    <label className="block text-sm font-semibold text-foreground leading-relaxed transition-colors">
                      {q.text}
                    </label>
                    
                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isSelected = currentAnswer === `${opt.emoji} ${opt.label}`;
                          return (
                            <button
                              key={opt.label}
                              onClick={() => handleOptionSelect(questionId, opt)}
                              className={`flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all duration-200 group ${
                                isSelected
                                  ? "bg-teal/10 border-teal ring-1 ring-teal"
                                  : "bg-muted/30 border-border hover:border-teal/50 hover:bg-muted"
                              }`}
                            >
                              <span className={`text-xl transition-transform duration-200 ${isSelected ? "scale-110" : "group-hover:scale-110"}`}>
                                {opt.emoji}
                              </span>
                              <span className={`flex-1 ${isSelected ? "font-bold text-teal" : "text-muted-foreground"}`}>
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <textarea
                      value={currentAnswer}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [questionId]: e.target.value,
                        }))
                      }
                      placeholder="Atau tulis jawabanmu di sini jika tidak ada di pilihan..."
                      className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 transition-shadow resize-none min-h-[80px]"
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground italic mb-6 text-center">
                "Setiap langkah kecil adalah kemenangan besar bagi dirimu."
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleSubmitAnswers}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-teal text-primary-foreground px-8 py-4 rounded-full font-bold text-sm shadow-lg shadow-teal/20 hover:scale-105 hover:bg-teal/90 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Tunggu sebentar..." : "Kirim Jawaban Refleksi"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SurveySection;
