import React from 'react';

const PodcastAlleBeidePage: React.FC = () => {
  return (
    <div
    className="absolute inset-0 bg-cover bg-center opacity-20"
    style={{ backgroundImage: "url('https://github.com/talon-group/uberuns/blob/3d6f3d6a3f731bb1308cf5fa1977480e0b3a1c71/public/bg.jpeg?raw=true')" }}
  >
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md p-6 mb-8">
        <img
          src="/NK.png"
          alt="Podcast Alle Beide Cover"
          className="w-full h-[500px] object-cover mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">PODCAST „ALLE BEIDE“</h1>
        <p className="text-lg leading-relaxed mb-4">
          Alle Beide – Der Podcast der Nordkurve Leverkusen
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Alle Beide – Der Podcast aus der Leverkusener Fanszene, für die Leverkusener Fanszene
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Mit “Alle Beide” rufen wir im Dezember 2020 ein neues Format ins Leben. Podcasts gewinnen immer weiter an Popularität und von nun an mischt auch die Nordkurve Leverkusen mit!
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Unser Moderationsteam, bestehend aus Mitgliedern der Nordkurve12, bespricht in regelmäßigen Abständen Themen aus der Fanwelt unseres Bayers. Hört gerne mal rein und lasst uns euer Feedback da: <a href="mailto:allebeide@nk12.de" className="text-blue-500 hover:underline">allebeide@nk12.de</a>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Die aktuellen Episoden findet ihr hier: <a href="https://open.spotify.com/show/0ctV8hyXegxFtscfydUhkr" className="text-blue-500 hover:underline">Spotify - Alle Beide Podcast</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default PodcastAlleBeidePage;
