import React from 'react';

const ReinesGewissenPage: React.FC = () => {
  return (
    <div
    className="absolute inset-0 bg-cover bg-center opacity-20"
    style={{ backgroundImage: "url('https://github.com/talon-group/uberuns/blob/3d6f3d6a3f731bb1308cf5fa1977480e0b3a1c71/public/bg.jpeg?raw=true')" }}
  >
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md p-6 mb-8">
        <img
          src="/NK.png"
          alt="Reines Gewissen Cover"
          className="w-full h-[500px] object-cover mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">REINES GEWISSEN</h1>
        <p className="text-lg leading-relaxed mb-4">
          Mit dem Infozine “Reines Gewissen” gibt es zu jedem Heimspiel ein unabhängiges Fanzine, welches neben Spielberichten und nützlichen Infos, auch immer das Gespräch mit interessanten Interviewpartnern sucht. Desweiteren bieten wir hier zunehmend tiefgründige Reportagen aus der Welt des Fußballs und rund um Bayer 04 und seine Fans. In der ständigen Rubrik “Tellerrand” gucken wir über eben diesen hinaus und gewähren euch Einblicke in andere Fanszenen.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Die Druckausgabe mit einer Auflage von 300 Exemplaren liegt an Spieltagen kostenlos am Stadioneck12 aus, zudem sind einzelne Exemplare an der Fankiste erhältlich. Ausgewählte Beträge werden in unregelmäßiger Reihenfolge aber auch hier auf nk12.de veröffentlicht.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Ihr findet das Reine Gewissen auf Facebook: <a href="https://www.facebook.com/ReinesGewissenFanzine/" className="text-blue-500 hover:underline">Facebook - Reines Gewissen</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default ReinesGewissenPage;
