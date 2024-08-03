"use client";

import React from 'react';

const ImpressumPage = () => {
  return (
    <div
    className="absolute inset-0 bg-cover bg-center opacity-20"
    style={{ backgroundImage: "url('https://github.com/talon-group/uberuns/blob/3d6f3d6a3f731bb1308cf5fa1977480e0b3a1c71/public/bg.jpeg?raw=true')" }}
  >
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Impressum</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Postanschrift:</h2>
        <p>
          Nordkurve12 e.V.<br />
          c/o Stadioneck<br />
          Karl-Marx-Str. 36<br />
          51373 Leverkusen
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Vertretungsberechtigter Vorstand:</h2>
        <p>
          Oliver Willutzki (1. Vorsitzender), Markus Jordan (2. Vorsitzender), Simon Reis (3. Vorsitzender)
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Rechtliche Hinweise:</h2>

        <h3 className="text-xl font-semibold mb-2">1. Inhalt des Onlineangebotes</h3>
        <p className="mb-4">
          Nordkurve12 e.V. (im Folgenden “NK12” genannt) übernimmt keinerlei Gewähr für die Aktualität,
          Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche
          gegen NK12, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung
          oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger
          Informationen verursacht wurden sind grundsätzlich ausgeschlossen, sofern seitens NK12 kein nachweislich
          vorsätzliches oder grob fahrlässiges Verschulden vorliegt. Alle Angebote sind freibleibend und unverbindlich.
          NK12 behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung
          zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
        </p>

        <h3 className="text-xl font-semibold mb-2">2. Verweise und Links</h3>
        <p className="mb-4">
          Bei direkten oder indirekten Verweisen auf fremde Internetseiten (“Links”), die außerhalb des
          Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem
          Fall in Kraft treten, in dem NK12 von den Inhalten Kenntnis hat und NK12 technisch möglich und
          zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. NK12 erklärt daher
          ausdrücklich, dass zum Zeitpunkt der Linksetzung die entsprechenden verlinkten Seiten frei von
          illegalen Inhalten waren. NK12 hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung
          und auf die Inhalte der gelinkten/verknüpften Seiten. Deshalb distanziert sie sich hiermit
          ausdrücklich von allen Inhalten aller gelinkten/verknüpften Seiten, die nach der Linksetzung
          verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes
          gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern,
          Diskussionsforen und Mailinglisten. Für illegale, fehlerhafte oder unvollständige Inhalte und
          insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen
          entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der
          über Links auf die jeweilige Veröffentlichung lediglich verweist.
        </p>

        <h3 className="text-xl font-semibold mb-2">3. Urheber- und Kennzeichenrecht</h3>
        <p>
          NK12 ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente,
          Videosequenzen und Texte zu beachten, von NK12 selbst erstellte Grafiken, Tondokumente, Videosequenzen
          und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte
          zurückzugreifen. Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten
          Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen
          Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund
          der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter
          geschützt sind. Das Copyright für veröffentlichte, von NK12 selbst erstellte Objekte bleibt allein
          beim Autor (= NK12) der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente,
          Videosequenzen, Texte und Textteile in anderen elektronischen oder gedruckten Publikationen ist
          ohne ausdrückliche Zustimmung von NK12 nicht gestattet.
        </p>
      </section>
    </div>
    </div>
  );
};

export default ImpressumPage;