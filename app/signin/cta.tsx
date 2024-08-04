'use client';

import Link from 'next/link';

const CallToActionGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="text-xl font-semibold mb-4">Bestandsmitglieder vor August 2024 - Einmalige Anmeldung</h2>
            <p className="mb-4">Melde dich hier einmalig an, wenn du noch keinen digitalen Account hast und bereits bestehendes NK12 Mitglied bist. Nutze deine E-Mail Adresse, mit der du bisher bei uns angemeldet bist und erstelle ein Passwort, mit dem du dich dann ab sofort immer einloggst.</p>
          </div>
          <Link legacyBehavior href="/signin/up">
            <a className="self-start mt-4 px-4 py-2 bg-red-800 text-white font-semibold rounded-lg shadow-md hover:bg-red-700">
              Einmalig anmelden
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="text-xl font-semibold mb-4">Mitglied werden</h2>
            <p className="mb-4">Du möchtest in den Dachverband eintreten? Dann hier entlang!</p>
          </div>
          <Link legacyBehavior href="/signin/new">
            <a className="self-start mt-4 px-4 py-2 bg-red-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
              Mitglied Werden
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="text-xl font-semibold mb-4">Mitglieder login</h2>
            <p className="mb-4">Wenn du die einmalige Anmeldung abgeschlossen hast oder Mitglied geworden bist, logge dich hier mit deinen Daten in den Mitgliederbereich ein.</p>
          </div>
          <Link legacyBehavior href="/signin">
            <a className="self-start mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
              Login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToActionGrid;