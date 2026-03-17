import youthServing from "@/assets/foto-program.jpeg";
import stamps from "@/assets/stamps.png";
import { BookOpen, Heart, Users, Globe } from "lucide-react";

const highlights = [
  { icon: Globe, text: "Gerakan global sejak 13 Maret 2013" },
  { icon: Users, text: "Jutaan pemuda di seluruh dunia" },
  { icon: Heart, text: "Menjadi tangan dan kaki Yesus" },
  { icon: BookOpen, text: "Iman diwujudkan lewat tindakan" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-condensed text-sm tracking-[0.3em] uppercase text-teal mb-3">
            Tentang Gerakan Ini
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brown-dark">
            Apa itu Global Youth Day?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Image side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={youthServing}
                alt="Pemuda melayani"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
            <img
              src={stamps}
              alt="Stamp decorations"
              className="absolute -bottom-6 -right-6 w-40 opacity-60 hidden sm:block"
            />
          </div>

          {/* Text side */}
          <div className="space-y-5">
            <p className="text-foreground/80 leading-relaxed">
              Global Youth Day (GYD) adalah gerakan pelayanan global yang diprakarsai oleh Gereja Masehi Advent Hari Ketujuh. Gerakan ini mengajak kaum muda untuk melayani masyarakat melalui tindakan nyata kasih dan kepedulian.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Pertama kali diluncurkan pada <strong>13 Maret 2013</strong> oleh General Conference Youth Ministries Department, GYD telah menjadi gerakan tahunan di mana jutaan pemuda Advent di berbagai negara turun langsung ke lingkungan mereka—menunjukkan bahwa iman bukan hanya untuk diberitakan, tetapi juga untuk diwujudkan.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-3 p-3 rounded-xl bg-background/70"
                >
                  <item.icon className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
