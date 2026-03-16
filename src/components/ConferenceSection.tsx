import conferenceStamps from "@/assets/conference-stamps.png";

const conferences = ["DMBMG", "DMMUB", "DKM", "DKMMU", "DMNU"];

const ConferenceSection = () => {
  return (
    <section id="conferences" className="py-20 sm:py-28 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-condensed text-sm tracking-[0.3em] uppercase text-teal mb-3">
            Konferens Yang Berpartisipasi
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brown-dark">
            Bersatu dalam Pelayanan
          </h2>
          <p className="text-foreground/70 mt-4 max-w-xl mx-auto">
            Lima daerah konferens bersama-sama hadir untuk merayakan Global Youth Day 2026
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={conferenceStamps}
            alt="Stamp konferens"
            className="max-w-3xl w-full"
          />
          <div className="grid grid-cols-5 gap-2 w-full max-w-3xl mt-4">
            {conferences.map((name) => (
              <p key={name} className="text-center font-bold text-sm sm:text-base text-brown-dark">
                {name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceSection;
