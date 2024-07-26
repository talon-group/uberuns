import Button from "@/components/ui/Button";
import NewSection from "./otherContent";

export default function HomeContent() {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto py-16 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <img
              src="NK.png"
              width={800}
              height={500}
              alt="Club Cover"
              className="rounded-lg w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-bold">Werde Mitglied bei der NORDKURVE12 e.V.</h2>
            <p className="text-lg text-gray-700">
              Du unterstützt das Ziel, den Zusammenhalt der Fanszene zu stärken und profitierst gleichermaßen von den Aktivitäten. Die Möglichkeit zur Anmeldung hast du bei jedem Heimspiel in der Fankiste links neben dem Eingang des C-Blocks ab Öffnung der Stadiontore oder aber direkt hier.
            </p>
            {/* <p className="text-lg text-gray-700">
              <a href="/membership-form.pdf" download className="text-red-600 underline">Download the membership application</a>, fill it out, and send it to us either via email at <a href="mailto:mitglieder@nk12.de" className="text-red-600">mitglieder@nk12.de</a> or by mail to:
              <address className="not-italic">
                Nordkurve12 e.V.<br />
                Sebastian Pöschke<br />
                Humboldtstr. 41<br />
                51379 Leverkusen
              </address>
            </p>
            <p className="text-lg text-gray-700">
              Die Mitgliedschaft kostet pro Saison symbolträchtige 19,04 €. Du musst dazu NICHT in einem Fanclub organisiert sein. Den Beitrag kannst du bequem per Lastschrift abbuchen lassen.
            </p> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-red-100 rounded-lg p-4">
            <img
              src="https://web.archive.org/web/20231001121841im_/https://www.nk12.de/wp-content/uploads/2020/12/Alle_Beide_LAHS-1-1024x1024.jpg"
              width={400}
              height={300}
              alt="Stadioneck"
              className="rounded-lg w-full h-[200px] object-cover"
            />
            <h3 className="text-xl font-bold mt-4">Stadioneck</h3>
            <p className="text-gray-700 mt-2">Das Stadioneck bietet nicht nur an Spieltagen ein Zuhause für alle Fans der Werkself. Veranstaltungen wie Stammtische, Erzählabende oder verschiedene Partys sorgen für ein abwechslungsreiches Programm.</p>
          </div>
          <div className="bg-red-100 rounded-lg p-4">
            <img
              src="https://web.archive.org/web/20231206035407im_/https://www.nk12.de/wp-content/uploads/2021/03/Logo_UNSERE-AHNEN_Zeichenflaeche-1-622x440.jpg"
              width={400}
              height={300}
              alt="Shop"
              className="rounded-lg w-full h-[200px] object-cover"
            />
            <h3 className="text-xl font-bold mt-4">Shop</h3>
            <p className="text-gray-700 mt-2">Der Shop ist aktuell nur für Mitglieder zugänglich. Melde dich an, um Zugriff auf exklusive Produkte zu erhalten.</p>
            <Button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded mt-4">Jetzt Mitglied werden</Button>
          </div>
          <div className="bg-red-100 rounded-lg p-4">
            <img
              src="https://web.archive.org/web/20240415132308im_/https://www.nk12.de/wp-content/uploads/2013/07/Fototapete-final-12.jpg"
              width={400}
              height={300}
              alt="Podcast"
              className="rounded-lg w-full h-[200px] object-cover"
            />
            <h3 className="text-xl font-bold mt-4">Podcast: Alle Beide</h3>
            <p className="text-gray-700 mt-2">Unser Podcast aus der Leverkusener Fanszene für die Leverkusener Fanszene. Hört gerne mal rein und lasst uns euer Feedback da!</p>
          </div>
        </div>
        {/* <div className="flex justify-center mt-12">
          <Button className="bg-red-600 hover:bg-red-800 text-white px-8 py-3 rounded-lg text-lg font-medium">
            Become a Member
          </Button>
        </div> */}
      </div>
      <NewSection
        title="Football without Politics"
        imageSrc="https://web.archive.org/web/20240415132308im_/https://www.nk12.de/wp-content/uploads/2013/07/Fototapete-final-12.jpg"
        content={
          <div>
            <p>
              Football without politics! Ja, definitiv, sofern man dies mit parlamentarischer Politik oder ähnlichem gleichsetzt, aber FANpolitik ist ein Thema, dem wir uns verschworen haben. So machen wir immer dann den Mund auf, wenn wir der Meinung sind, dass Fans ungerecht behandelt werden oder ungerechtfertigte Einschränkungen für unsere Fankultur zu befürchten sind. Und dies nicht durch puren blinden Aktionismus, sondern als ernstzunehmender und seriöser Gesprächspartner für Vereine, Verbände und Sicherheitsorgane. Unsere Fanarbeit der letzten Jahre hat somit dazu geführt, dass wir für die genannten Gremien Gesprächspartner auf Augenhöhe sind und Euch, Logo Heimvorteil neu kleinsowie die gesamte Fankultur bestmöglich vertreten können. Nachdruck verleiht hier neben unserer Gesprächskultur vor allem auch unsere mittlerweile deutlich vierstellige Mitgliederzahl. Somit trägt jeder Einzelne von Euch mit seiner Mitgliedschaft zum Erhalt der Fankultur und zur Durchsetzung unserer gemeinsamer Interessen bei.
            </p>
            <p>
              Die grandiose Umsetzung aller Aktionen rund um die Initiative „12:12 – Keine Stimmung ohne Stimme“ und nicht zuletzt der unglaubliche Erfolg der Kampagne „Vergrößert den Heimvorteil“ zeigen sehr deutlich, zu was wir Fans fähig sind, wenn wir konstruktiv und vor allem gemeinschaftlich für unsere Sache kämpfen.
            </p>
            <p>
              Auch in Sachen “Kein Zwanni für’n Steher” werden wir nicht müde, hier beim Verein immer wieder darauf aufmerksam zu machen, dass Fußball – nicht nur, aber vor allem in den Kurven – bezahlbar für jedermann bleiben muss.
            </p>
          </div>
        }
      />
      <NewSection
        title="Mit der NORDKURVE12 on Tour"
        imageSrc="https://web.archive.org/web/20240415132308im_/https://www.nk12.de/wp-content/uploads/2013/07/Fototapete-final-12.jpg"
        content={
          <div>
            <p>
              Mit der NORDKURVE12 on Tour – zu sämtlichen Spielen unserer Werkself, zu denen es keinen Sonder- oder Entlastungszug gibt, organisieren wir für Euch eine fanfreundliche Anreise, in der Regel per Bus-Tour. So konnten wir in den vergangenen Jahren seit Bestehen der NK12 tatsächlich zu jedem Pflichtspiel, egal ob Bundesliga oder Pokal, sowie auch zu einigen internationalen Spielen, mindestens einen, oftmals aber auch gleich mehrere Busse auf die Reise schicken. Unsere Philosophie dabei ist, die Touren kostengünstig anzubieten, um möglichst vielen Fans die Gelegenheit zu geben, Bayer 04 auswärts zu begleiten. NK12-Mitglieder kommen hier sogar noch günstiger weg und bezahlen stets einen subventionierten Sonderpreis! 27_Spieltag D`dorf vs_ Bayer 04 30_03_2013  1 - 4_04Hin und wieder bieten wir Euch auch absolute Specials an, wie die beiden bisherigen Schiffstouren nach Düsseldorf oder jene nach Mainz. Aber auch Reisen inklusive Übernachtungen hat es schon gegeben und sind auch in Zukunft fest eingeplant. Anmeldungen für all unsere Touren nehmen wir persönlich an der Fankiste unterhalb des C-Blocks oder aber auch per Mail via bus@nk12.de entgegen. Wir sind immer dabei, ob nah oder weit, bis in die Ewigkeit!
            </p>
            <p>
              Allgemeine Geschäftsbedingungen für Auswärtsfahrten
            </p>
            <p>
              Der Veranstalter der Fahrten ist die Nordkurve12. Den Anweisungen der Begleitperson und des Busfahrers ist Folge zu leisten.
            </p>
            <p>
              Die Abfahrtszeiten sind ohne Gewähr, jeder Mitfahrer ist angehalten sich vor der jeweiligen Fahrt über eventuelle Änderungen des Reiseablaufes zu erkundigen. Für eventuelle Zusatzkosten durch verspätete Ankunft bei der Rückreise kommt der Veranstalter nicht auf. Bei nicht Zustandekommen der Fahrt wird der bereits bezahlte Reisepreis zurück erstattet. Dies wird den angemeldeten Personen rechtzeitig mitgeteilt. Bei schuldhafter Verzögerung der Rückfahrt behält sich der Veranstalter vor, von der/den dafür Verantwortlichen Person/en die eventuell entstehenden Mehrkosten einzufordern. Jeder Teilnehmer ist selber für das pünktliche erscheinen zur Rückfahrt am Bus verantwortlich, bei Verspätung und bereits abgefahrenen Bus, besteht kein Anspruch auf Schadensersatz, durch Zusätzliche Kosten für die Rückreise.
            </p>
            <p>
              Die Anmeldung gilt erst als perfekt nach der Bezahlung des gesamten Fahrpreises und Bestätigung der Nordkurve12. Sollte es auf dem Anreiseweg zu Verspätungen dahin gehend kommen, dass das Spiel zu spät oder gar nicht besucht werden kann, werden Reisepreis nur durch Schuldhafte Verantwortung der Nordkurve12 erstattet. Die Fahrten werden in Reisebussen, bei geringer Nachfrage eventuell auch in Kleinbussen durchgeführt, jeder Mitreisende reist auf eigenes Risiko, jede Haftung ist seitens der Nordkurve12 und Busunternehmen/Flug- Fährgesellschaft ausgeschlossen. Minderjährige benötigen eine Einverständniserklärung / Haftungsausschluss des Erziehungsberechtigten und müssen bei Alleinreise mindestens 16 Jahre alt sein. Die Einverständniserklärung / Haftungsausschluss ist unter bus@nk12.de anzufordern und bei Antritt der Reise dem Fahrverantwortlichen unaufgefordert zu übergeben.
            </p>
            <p>
              Das Mitbringen von Getränken ist grundsätzlich erlaubt, jedoch ist der Besitzer eigener Getränke dafür verantwortlich, dass Voll/Leergut Ordnungsgemäß zu entsorgen, ebenso ist er dafür verantwortlich, dass durch ihn mitgebrachte Getränke keine Gefahren- und/oder Unfallquellen darstellen.
            </p>
            <p>
              Mitreisende Personen die aufgrund von Behinderungen und/oder Medikamenteneinnahme keine alkoholischen Getränke zu sich nehmen dürfen, sind angehalten dies auch einzuhalten, es gibt keine Aufsichtspflicht seitens des Veranstalters.
            </p>
            <p>
              Bei Spielen im Ausland ist immer der Personalausweis/Reisepass, eventuell Visum mitzuführen. Das jeweilige Landesrecht bleibt davon unberührt, den Anweisungen örtlichen Polizei/Sicherheitskräften ist unbedingt folge zu leisten.
            </p>
          </div>
        }
      />
    </div>
  );
}