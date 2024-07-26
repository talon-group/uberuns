import React from 'react';

const StadioneckPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md p-6 mb-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZUA_h9EUxwBqc_dkmB2ad9OJ0yPsfHMOTw&s"
          alt="Stadioneck Cover"
          className="w-full h-[500px] object-cover mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">STADIONECK</h1>
        <p className="text-lg leading-relaxed mb-4">
          Das Stadioneck wird ehrenamtlich vom unabhängigen Dachverband der Bayer 04-Fans Nordkurve12 e.V. betrieben und bietet nicht nur an Spieltagen ein Zuhause für alle Fans der Werkself.
          So bieten wir immer wieder Veranstaltungen wie Stammtische, Erzählabende oder auch verschiedene Partys an.
          Neben einem ständigen Sortiment mit verschiedenen Bieren, Softdrinks, und Spirituosen, bieten wir regelmäßig Specials aller Art an – und das natürlich zu fanfreundlichen Preisen.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          So hat sich vor jedem Heimspiel das “Spieltagsbier” in kürzester Zeit zum absoluten Renner entwickelt. Im extra beleuchteten Kühlschrank bekommt ihr jedes Mal ein anderes, außergewöhnliches Bier aus der Flasche. Frühes Erscheinen wird hier belohnt, denn das Spieltagsbier ist jedes Mal streng limitiert.
          Auch die Pfandchips im Wert von einem Euro für Glasflaschen erfreuen sich eines gewissen Sammlertums oder werden gerne für verschiedene Dinge gespendet.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Zahlreiche Veranstaltungen wie Lesungen, Partys, Vorträge, Mottoabende und Stammtische sorgen für ein abwechslungsreiches Programm. Schaut doch einfach mal vorbei, wir freuen uns auf Euch.
        </p>
        <h2 className="text-3xl font-bold mt-8 mb-4">Adresse</h2>
        <p className="text-lg leading-relaxed mb-4">
          Stadioneck<br />
          Karl-Marx-Str. 36<br />
          51373 Leverkusen<br />
          e-Mail: <a href="mailto:mail@nk12.de" className="text-blue-500 underline">mail@nk12.de</a>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Öffnungszeiten zu jedem Heimspiel flexibel – Infos auf <a href="http://www.nk12.de" className="text-blue-500 underline">www.nk12.de</a> und auf Social Media.
        </p>
      </div>
    </div>
  );
};

export default StadioneckPage;