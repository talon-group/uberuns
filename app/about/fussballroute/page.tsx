import React from 'react';

const FussballrouteLeverkusenPage: React.FC = () => {
  return (
    <div
    className="absolute inset-0 bg-cover bg-center opacity-20"
    style={{ backgroundImage: "url('https://github.com/talon-group/uberuns/blob/3d6f3d6a3f731bb1308cf5fa1977480e0b3a1c71/public/bg.jpeg?raw=true')" }}
  >
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md p-6 mb-8">
        <img
          src="/NK.png"
          alt="Fussballroute Leverkusen Cover"
          className="w-full h-[500px] object-cover mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">FUSSBALLROUTE LEVERKUSEN</h1>
        <p className="text-lg leading-relaxed mb-4">
          “Uns’re Ahnen sah’n Legenden” – Fußballroute Leverkusen
        </p>
        <p className="text-lg leading-relaxed mb-4">
          „Uns’re Ahnen sah’n Legenden – Schon vor über 100 Jahr’n – Seitdem schreiben wir Geschichte – Schwarz und Rot ein Leben lang!“
        </p>
        <p className="text-lg leading-relaxed mb-4">
          So lautet der Text eines Liedes, dass die Bayer 04 Fans gerne im Stadion singen. Wir haben uns gefragt, wie wir diese Geschichte der Fußballer von Bayer 04 darstellen können. Herausgekommen ist die „Fußballroute Leverkusen“.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          An 11 Stationen im Stadtgebiet erklären wir an Originalschauplätzen mit Schautafeln und optischen Hinguckern, was sich dort einmal abgespielt hat.
        </p>
      </div>
    </div>
    </div>
  );
};

export default FussballrouteLeverkusenPage;