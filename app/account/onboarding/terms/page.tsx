'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function TermsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAcceptTerms = async () => {
    setLoading(true);
    try {
      // Fetch the current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        throw authError;
      }

      if (!user || !user.id) {
        throw new Error('User is not signed in or user ID is undefined');
      }

      // Update the terms acceptance status
      const { error: updateError } = await supabase
        .from('users')
        .update({ terms: true })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Redirect to /account
      router.push('/account');
    } catch (error: any) {
      console.error('Error updating terms status:', error.message);
      setErrorMessage('Error updating terms status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-6">Please read and approve the terms and conditions below:</p>
        <div className="overflow-y-auto h-96 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <p className="mb-4">
            Im ersten Halbjahr jeden Geschäftsjahres findet eine ordentliche Mitgliederversammlung statt. Über die Mitgliederversammlung ist ein Protokoll zu führen.
          </p>
          <p className="mb-4">
            Der Vorstand ist zur Einberufung einer außerordentlichen Mitgliederversammlung verpflichtet, wenn mindestens ein Drittel der Mitglieder dies schriftlich unter Angabe von Gründen verlangt.
          </p>
          <p className="mb-4">
            Die Mitgliederversammlung wird vom Vorstand unter Einhaltung einer Frist von 4 Wochen (per Post oder per E-Mail) unter Angabe der Tagesordnung einberufen.
          </p>
          <p className="mb-4">
            Die Frist beginnt mit dem auf die Absendung des Einladungsschreibens folgenden Tag. Das Einladungsschreiben gilt als den Mitgliedern zugegangen, wenn es an die letzte dem Verein bekannt gegebene Anschrift gerichtet war.
          </p>
          <p className="mb-4">
            Die Tagesordnung ist zu ergänzen, wenn dies ein Mitglied bis spätestens eine Woche vor dem angesetzten Termin schriftlich (per Post oder per E-Mail) beantragt. Die Ergänzung ist zu Beginn der Versammlung bekannt zu machen.
          </p>
          <p className="mb-4">
            Anträge über die Abwahl des Vorstandes, über die Änderung der Satzung und über die Auflösung des Vereins, die den Mitgliedern nicht bereits mit der Einladung zur Mitgliederversammlung zugegangen sind, können erst auf der nächsten Mitgliederversammlung beschlossen werden.
          </p>
          <p className="mb-4">
            Die Mitgliederversammlung ist ohne Rücksicht auf die Zahl der erschienenen Mitglieder beschlussfähig. Die Mitgliederversammlung wird von einem Vorstandsmitglied geleitet. Ersatzweise kann ein Versammlungsleiter vom Vorstand bestimmt werden. Zu Beginn der Mitgliederversammlung ist ein Protokollführer zu benennen.
          </p>
          <p className="mb-4">
            Jedes Mitglied hat eine Stimme. Das Stimmrecht kann nur persönlich ausgeübt werden. Bei Abstimmungen entscheidet die einfache Mehrheit der abgegebenen Stimmen.
          </p>
          <p className="mb-4">
            Satzungsänderungen und die Auflösung des Vereins sowie eine Verlängerung oder Verkürzung der Amtszeit können nur mit einer Mehrheit von mindestens zwei Dritteln der anwesenden Mitglieder beschlossen werden.
          </p>
          <p className="mb-4">
            Stimmenthaltungen und ungültige Stimmen bleiben außer Betracht.
          </p>
          <p className="mb-4">
            Über die Beschlüsse der Mitgliederversammlung ist ein Protokoll anzufertigen, das vom Versammlungsleiter und dem Protokollführer zu unterzeichnen ist.
          </p>
          <p className="mb-4 font-semibold">§ 10 (Vorstand)</p>
          <p className="mb-4">
            Der Vorstand besteht aus drei Vorsitzenden. Sie vertreten den Verein gemeinsam, gerichtlich und außergerichtlich.
          </p>
          <p className="mb-4">
            Der Vorstand wird von der Mitgliederversammlung auf Dauer von zwei Jahren gewählt.
          </p>
          <p className="mb-4">
            Vorstandsmitglieder können nur Mitglieder des Vereins werden.
          </p>
          <p className="mb-4">
            Wiederwahl ist zulässig.
          </p>
          <p className="mb-4">
            Der Vorstand bleibt solange im Amt, bis ein neuer Vorstand gewählt ist.
          </p>
          <p className="mb-4">
            Bei Beendigung der Mitgliedschaft im Verein endet auch das Amt als Vorstand.
          </p>
          <p className="mb-4">
            Der Vorstand kann für gewisse Geschäfte besondere Vertreter im Sinne von § 30 BGB (z.B. für Organisation und Leitung der Vereinsarbeit einen Geschäftsführer) bestellen.
          </p>
          <p className="mb-4">
            Ein solcher besonderer Vertreter ist weisungsberechtigt gegenüber allen Mitgliedern, soweit deren Rechte aus der Satzung nicht berührt werden. Weisungsberechtigt gegenüber dem besonderen Vertreter sind die Mitglieder des Vorstands.
          </p>
          <p className="mb-4">
            Vorstandsbeschlüsse sind nur gültig, wenn sie aus einfacher Mehrheit des Gesamtvorstandes bestehen. Der Vorstand ist beschlussfähig, wenn zwei von drei Vorsitzenden anwesend sind.
          </p>
          <p className="mb-4 font-semibold">§ 11 (Kassenprüfung)</p>
          <p className="mb-4">
            Die Mitgliederversammlung wählt für die Dauer von einem Jahr zwei Kassenprüfer und einen Stellvertreter. Sie haben die Aufgabe, nach Abschluss des Geschäftsjahres und vor der Mitgliederversammlung die Ordnungsmäßigkeit der Bücher zu prüfen.
          </p>
          <p className="mb-4">
            Die Kassenprüfer dürfen nicht Mitglied des Vorstandes sein.
          </p>
          <p className="mb-4">
            Die Wiederwahl ist zulässig.
          </p>
          <p className="mb-4 font-semibold">§ 12 (Haftung des Vereins)</p>
          <p className="mb-4">
            Der Verein haftet seinen Mitgliedern und Dritten gegenüber für Schäden nur insoweit, als dies durch gesetzliche Bestimmungen unabdingbar vorgeschrieben ist. Die Amtsinhaber haften dem Verein für jeden vorsätzlich verursachten Schaden. Die Mitglieder haften für jeden vorsätzlichen und grob fahrlässig verursachten Schaden.
          </p>
          <p className="mb-4 font-semibold">§ 13 (Auflösung des Vereins)</p>
          <p className="mb-4">
            Bei Auflösung des Vereins oder Wegfall seines bisherigen Zweckes wird in einer Mitgliederversammlung über das Vermögen des Vereins entschieden.
          </p>
          <p className="mb-4 font-semibold">§ 14 (Inkrafttreten)</p>
          <p className='mb-4'>
            Vorstehend genannte Satzung tritt mit der Eintragung des Vereins in das Vereinsregister in Kraft.
          </p>
          <br />
          <p className='mb-4'>
          Datenschutzerklärung</p>
 
 
 Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten (nachfolgend kurz „Daten“) innerhalb unseres Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und Inhalte sowie externen Onlinepräsenzen, wie z.B. unser Social Media Profile auf (nachfolgend gemeinsam bezeichnet als „Onlineangebot“). Im Hinblick auf die verwendeten Begrifflichkeiten, wie z.B. „Verarbeitung“ oder „Verantwortlicher“ verweisen wir auf die Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).
 Verantwortlicher
 <p className='mb-4'>
 Nordkurve12 e. V.
 c/o Stadioneck
 51373 Leverkusen
 E-Mail: mail@nk12.de
 Website: www.nk12.de
 Arten der verarbeiteten Daten:
  </p>
  <p className='mb-4'>– Bestandsdaten (z.B., Namen, Adressen).
 – Kontaktdaten (z.B., E-Mail, Telefonnummern).
 – Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos).
 – Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).
 – Meta-/Kommunikationsdaten (z.B., Geräte-Informationen, IP-Adressen).
 Kategorien betroffener Personen
  </p>
  <p className='mb-4'>Besucher und Nutzer des Onlineangebotes (Nachfolgend bezeichnen wir die betroffenen Personen zusammenfassend auch als „Nutzer“).
 Zweck der Verarbeitung
  </p>
  <p className='mb-4'>– Zurverfügungstellung des Onlineangebotes, seiner Funktionen und Inhalte.
 – Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern.
 – Sicherheitsmaßnahmen.
 – Reichweitenmessung/Marketing
 Verwendete Begrifflichkeiten
  </p>
  <p className='mb-4'>„Personenbezogene Daten“ sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene Person“) beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind.</p>
  
  <p className='mb-4'> „Verarbeitung“ ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden Umgang mit Daten.</p>
  
  <p className='mb-4'>„Pseudonymisierung“ die Verarbeitung personenbezogener Daten in einer Weise, dass die personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden können, sofern diese zusätzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren natürlichen Person zugewiesen werden.</p>
  
  <p className='mb-4'>„Profiling“ jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten, insbesondere um Aspekte bezüglich Arbeitsleistung, wirtschaftliche Lage, Gesundheit, persönliche Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.</p>
  
 <p className='mb-4'>Als „Verantwortlicher“ wird die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet.</p>
  
 <p className='mb-4'>„Auftragsverarbeiter“ eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.
 Maßgebliche Rechtsgrundlagen</p>
  
 <p className='mb-4'>Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer Datenverarbeitungen mit. Sofern die Rechtsgrundlage in der Datenschutzerklärung nicht genannt wird, gilt Folgendes: Die Rechtsgrundlage für die Einholung von Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO, die Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer Leistungen und Durchführung vertraglicher Maßnahmen sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO, die Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer rechtlichen Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO, und die Rechtsgrundlage für die Verarbeitung zur Wahrung unserer berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO. Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.
 Sicherheitsmaßnahmen</p>
  
 <p className='mb-4'>Wir treffen nach Maßgabe des Art. 32 DSGVO unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos für die Rechte und Freiheiten natürlicher Personen, geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.</p>
  
 <p className='mb-4'>Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen Zugangs zu den Daten, als auch des sie betreffenden Zugriffs, der Eingabe, Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, Löschung von Daten und Reaktion auf Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung, bzw. Auswahl von Hardware, Software sowie Verfahren, entsprechend dem Prinzip des Datenschutzes durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen (Art. 25 DSGVO).
 Zusammenarbeit mit Auftragsverarbeitern und Dritten</p>
  
 <p className='mb-4'>Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber anderen Personen und Unternehmen (Auftragsverarbeitern oder Dritten) offenbaren, sie an diese übermitteln oder ihnen sonst Zugriff auf die Daten gewähren, erfolgt dies nur auf Grundlage einer gesetzlichen Erlaubnis (z.B. wenn eine Übermittlung der Daten an Dritte, wie an Zahlungsdienstleister, gem. Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung erforderlich ist), Sie eingewilligt haben, eine rechtliche Verpflichtung dies vorsieht oder auf Grundlage unserer berechtigten Interessen (z.B. beim Einsatz von Beauftragten, Webhostern, etc.).</p>
  
 <p className='mb-4'>Sofern wir Dritte mit der Verarbeitung von Daten auf Grundlage eines sog. „Auftragsverarbeitungsvertrages“ beauftragen, geschieht dies auf Grundlage des Art. 28 DSGVO.
 Übermittlungen in Drittländer</p>
  
 <p className='mb-4'>Sofern wir Daten in einem Drittland (d.h. außerhalb der Europäischen Union (EU) oder des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder dies im Rahmen der Inanspruchnahme von Diensten Dritter oder Offenlegung, bzw. Übermittlung von Daten an Dritte geschieht, erfolgt dies nur, wenn es zur Erfüllung unserer (vor)vertraglichen Pflichten, auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen Verpflichtung oder auf Grundlage unserer berechtigten Interessen geschieht. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse, verarbeiten oder lassen wir die Daten in einem Drittland nur beim Vorliegen der besonderen Voraussetzungen der Art. 44 ff. DSGVO verarbeiten. D.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer Garantien, wie der offiziell anerkannten Feststellung eines der EU entsprechenden Datenschutzniveaus (z.B. für die USA durch das „Privacy Shield“) oder Beachtung offiziell anerkannter spezieller vertraglicher Verpflichtungen (so genannte „Standardvertragsklauseln“).
 Rechte der betroffenen Personen</p>
  
 <p className='mb-4'>Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend Art. 15 DSGVO.</p>
  
 <p className='mb-4'>Sie haben entsprechend. Art. 16 DSGVO das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.</p>
  
 <p className='mb-4'>Sie haben nach Maßgabe des Art. 17 DSGVO das Recht zu verlangen, dass betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe des Art. 18 DSGVO eine Einschränkung der Verarbeitung der Daten zu verlangen.</p>
  
 <p className='mb-4'>Sie haben das Recht zu verlangen, dass die Sie betreffenden Daten, die Sie uns bereitgestellt haben nach Maßgabe des Art. 20 DSGVO zu erhalten und deren Übermittlung an andere Verantwortliche zu fordern.</p>
  
 <p className='mb-4'>Sie haben ferner gem. Art. 77 DSGVO das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen.
 Widerrufsrecht</p>
  
 <p className='mb-4'>Sie haben das Recht, erteilte Einwilligungen gem. Art. 7 Abs. 3 DSGVO mit Wirkung für die Zukunft zu widerrufen
 Widerspruchsrecht</p>
  
 <p className='mb-4'>Sie können der künftigen Verarbeitung der Sie betreffenden Daten nach Maßgabe des Art. 21 DSGVO jederzeit widersprechen. Der Widerspruch kann insbesondere gegen die Verarbeitung für Zwecke der Direktwerbung erfolgen.
 Cookies und Widerspruchsrecht bei Direktwerbung</p>
  
 <p className='mb-4'>Als „Cookies“ werden kleine Dateien bezeichnet, die auf Rechnern der Nutzer gespeichert werden. Innerhalb der Cookies können unterschiedliche Angaben gespeichert werden. Ein Cookie dient primär dazu, die Angaben zu einem Nutzer (bzw. dem Gerät auf dem das Cookie gespeichert ist) während oder auch nach seinem Besuch innerhalb eines Onlineangebotes zu speichern. Als temporäre Cookies, bzw. „Session-Cookies“ oder „transiente Cookies“, werden Cookies bezeichnet, die gelöscht werden, nachdem ein Nutzer ein Onlineangebot verlässt und seinen Browser schließt. In einem solchen Cookie kann z.B. der Inhalt eines Warenkorbs in einem Onlineshop oder ein Login-Status gespeichert werden. Als „permanent“ oder „persistent“ werden Cookies bezeichnet, die auch nach dem Schließen des Browsers gespeichert bleiben. So kann z.B. der Login-Status gespeichert werden, wenn die Nutzer diese nach mehreren Tagen aufsuchen. Ebenso können in einem solchen Cookie die Interessen der Nutzer gespeichert werden, die für Reichweitenmessung oder Marketingzwecke verwendet werden. Als „Third-Party-Cookie“ werden Cookies bezeichnet, die von anderen Anbietern als dem Verantwortlichen, der das Onlineangebot betreibt, angeboten werden (andernfalls, wenn es nur dessen Cookies sind spricht man von „First-Party Cookies“).</p>
  
 <p className='mb-4'>Wir können temporäre und permanente Cookies einsetzen und klären hierüber im Rahmen unserer Datenschutzerklärung auf.</p>
  
 <p className='mb-4'>Falls die Nutzer nicht möchten, dass Cookies auf ihrem Rechner gespeichert werden, werden sie gebeten die entsprechende Option in den Systemeinstellungen ihres Browsers zu deaktivieren. Gespeicherte Cookies können in den Systemeinstellungen des Browsers gelöscht werden. Der Ausschluss von Cookies kann zu Funktionseinschränkungen dieses Onlineangebotes führen.</p>
  
 <p className='mb-4'>Ein genereller Widerspruch gegen den Einsatz der zu Zwecken des Onlinemarketing eingesetzten Cookies kann bei einer Vielzahl der Dienste, vor allem im Fall des Trackings, über die US-amerikanische Seite http://www.aboutads.info/choices/ oder die EU-Seite http://www.youronlinechoices.com/ erklärt werden. Des Weiteren kann die Speicherung von Cookies mittels deren Abschaltung in den Einstellungen des Browsers erreicht werden. Bitte beachten Sie, dass dann gegebenenfalls nicht alle Funktionen dieses Onlineangebotes genutzt werden können.
 Löschung von Daten</p>
  
 <p className='mb-4'>Die von uns verarbeiteten Daten werden nach Maßgabe der Art. 17 und 18 DSGVO gelöscht oder in ihrer Verarbeitung eingeschränkt. Sofern nicht im Rahmen dieser Datenschutzerklärung ausdrücklich angegeben, werden die bei uns gespeicherten Daten gelöscht, sobald sie für ihre Zweckbestimmung nicht mehr erforderlich sind und der Löschung keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke erforderlich sind, wird deren Verarbeitung eingeschränkt. D.h. die Daten werden gesperrt und nicht für andere Zwecke verarbeitet. Das gilt z.B. für Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen.</p>
  
 <p className='mb-4'>Nach gesetzlichen Vorgaben in Deutschland, erfolgt die Aufbewahrung insbesondere für 10 Jahre gemäß §§ 147 Abs. 1 AO, 257 Abs. 1 Nr. 1 und 4, Abs. 4 HGB (Bücher, Aufzeichnungen, Lageberichte, Buchungsbelege, Handelsbücher, für Besteuerung relevanter Unterlagen, etc.) und 6 Jahre gemäß § 257 Abs. 1 Nr. 2 und 3, Abs. 4 HGB (Handelsbriefe).</p>
  
 <p className='mb-4'>Nach gesetzlichen Vorgaben in Österreich erfolgt die Aufbewahrung insbesondere für 7 J gemäß § 132 Abs. 1 BAO (Buchhaltungsunterlagen, Belege/Rechnungen, Konten, Belege, Geschäftspapiere, Aufstellung der Einnahmen und Ausgaben, etc.), für 22 Jahre im Zusammenhang mit Grundstücken und für 10 Jahre bei Unterlagen im Zusammenhang mit elektronisch erbrachten Leistungen, Telekommunikations-, Rundfunk- und Fernsehleistungen, die an Nichtunternehmer in EU-Mitgliedstaaten erbracht werden und für die der Mini-One-Stop-Shop (MOSS) in Anspruch genommen wird.</p>
  
  
 <p className='mb-4 text-red-800'>Administration, Finanzbuchhaltung, Büroorganisation, Kontaktverwaltung</p>
  
  
  
 <p className='mb-4'>Wir verarbeiten Daten im Rahmen von Verwaltungsaufgaben sowie Organisation unseres Betriebs, Finanzbuchhaltung und Befolgung der gesetzlichen Pflichten, wie z.B. der Archivierung. Hierbei verarbeiten wir dieselben Daten, die wir im Rahmen der Erbringung unserer vertraglichen Leistungen verarbeiten. Die Verarbeitungsgrundlagen sind Art. 6 Abs. 1 lit. c. DSGVO, Art. 6 Abs. 1 lit. f. DSGVO. Von der Verarbeitung sind Kunden, Interessenten, Geschäftspartner und Websitebesucher betroffen. Der Zweck und unser Interesse an der Verarbeitung liegt in der Administration, Finanzbuchhaltung, Büroorganisation, Archivierung von Daten, also Aufgaben die der Aufrechterhaltung unserer Geschäftstätigkeiten, Wahrnehmung unserer Aufgaben und Erbringung unserer Leistungen dienen. Die Löschung der Daten im Hinblick auf vertragliche Leistungen und die vertragliche Kommunikation entspricht den, bei diesen Verarbeitungstätigkeiten genannten Angaben.</p>
  
 <p className='mb-4'>Wir offenbaren oder übermitteln hierbei Daten an die Finanzverwaltung, Berater, wie z.B., Steuerberater oder Wirtschaftsprüfer sowie weitere Gebührenstellen und Zahlungsdienstleister.</p>
  
 <p className='mb-4'>Ferner speichern wir auf Grundlage unserer betriebswirtschaftlichen Interessen Angaben zu Lieferanten, Veranstaltern und sonstigen Geschäftspartnern, z.B. zwecks späterer Kontaktaufnahme. Diese mehrheitlich unternehmensbezogenen Daten, speichern wir grundsätzlich dauerhaft.</p>
  
  
 <p className='mb-4'>Erbringung unserer satzungs- und geschäftsgemäßen Leistungen</p>
  
 <p className='mb-4'>Wir verarbeiten die Daten unserer Mitglieder, Unterstützer, Interessenten, Kunden oder sonstiger Personen entsprechend Art. 6 Abs. 1 lit. b. DSGVO, sofern wir ihnen gegenüber vertragliche Leistungen anbieten oder im Rahmen bestehender geschäftlicher Beziehung, z.B. gegenüber Mitgliedern, tätig werden oder selbst Empfänger von Leistungen und Zuwendungen sind. Im Übrigen verarbeiten wir die Daten betroffener Personen gem. Art. 6 Abs. 1 lit. f. DSGVO auf Grundlage unserer berechtigten Interessen, z.B. wenn es sich um administrative Aufgaben oder Öffentlichkeitsarbeit handelt.</p>
  
 <p className='mb-4'>Die hierbei verarbeiteten Daten, die Art, der Umfang und der Zweck und die Erforderlichkeit ihrer Verarbeitung bestimmen sich nach dem zugrundeliegenden Vertragsverhältnis. Dazu gehören grundsätzlich Bestands- und Stammdaten der Personen (z.B., Name, Adresse, etc.), als auch die Kontaktdaten (z.B., E-Mailadresse, Telefon, etc.), die Vertragsdaten (z.B., in Anspruch genommene Leistungen, mitgeteilte Inhalte und Informationen, Namen von Kontaktpersonen) und sofern wir zahlungspflichtige Leistungen oder Produkte anbieten, Zahlungsdaten (z.B., Bankverbindung, Zahlungshistorie, etc.).</p>
  
 <p className='mb-4'>Wir löschen Daten, die zur Erbringung unserer satzungs- und geschäftsmäßigen Zwecke nicht mehr erforderlich sind. Dies bestimmt sich entsprechend der jeweiligen Aufgaben und vertraglichen Beziehungen. Im Fall geschäftlicher Verarbeitung bewahren wir die Daten so lange auf, wie sie zur Geschäftsabwicklung, als auch im Hinblick auf etwaige Gewährleistungs- oder Haftungspflichten relevant sein können. Die Erforderlichkeit der Aufbewahrung der Daten wird alle drei Jahre überprüft; im Übrigen gelten die gesetzlichen Aufbewahrungspflichten.</p>
  
  
 <p className='mb-4'>Kommentare und Beiträge</p>
  
 <p className='mb-4'>Wenn Nutzer Kommentare oder sonstige Beiträge hinterlassen, können ihre IP-Adressen auf Grundlage unserer berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO für 7 Tage gespeichert werden. Das erfolgt zu unserer Sicherheit, falls jemand in Kommentaren und Beiträgen widerrechtliche Inhalte hinterlässt (Beleidigungen, verbotene politische Propaganda, etc.). In diesem Fall können wir selbst für den Kommentar oder Beitrag belangt werden und sind daher an der Identität des Verfassers interessiert.</p>
  
 <p className='mb-4'>Des Weiteren behalten wir uns vor, auf Grundlage unserer berechtigten Interessen gem. Art. 6 Abs. 1 lit. f. DSGVO, die Angaben der Nutzer zwecks Spamerkennung zu verarbeiten.</p>
  
 <p className='mb-4'>Auf derselben Rechtsgrundlage behalten wir uns vor, im Fall von Umfragen die IP-Adressen der Nutzer für deren Dauer zu speichern und Cookis zu verwenden, um Mehrfachabstimmungen zu vermeiden.</p>
  
 <p className='mb-4'>Die im Rahmen der Kommentare und Beiträge angegebenen Daten, werden von uns bis zum Widerspruch der Nutzer dauerhaft gespeichert.</p>
  
  
 <p className='mb-4 text-red-800'>Kommentarabonnements</p>
  
  
  
 <p className='mb-4'>Die Nachfolgekommentare können durch Nutzer mit deren Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO abonniert werden. Die Nutzer erhalten eine Bestätigungsemail, um zu überprüfen, ob sie der Inhaber der eingegebenen Emailadresse sind. Nutzer können laufende Kommentarabonnements jederzeit abbestellen. Die Bestätigungsemail wird Hinweise zu den Widerrufsmöglichkeiten enthalten. Für die Zwecke des Nachweises der Einwilligung der Nutzer, speichern wir den Anmeldezeitpunkt nebst der IP-Adresse der Nutzer und löschen diese Informationen, wenn Nutzer sich von dem Abonnement abmelden.</p>
  
 <p className='mb-4'>Sie können den Empfang unseres Abonnemenets jederzeit kündigen, d.h. Ihre Einwilligungen widerrufen. Wir können die ausgetragenen E-Mailadressen bis zu drei Jahren auf Grundlage unserer berechtigten Interessen speichern bevor wir sie löschen, um eine ehemals gegebene Einwilligung nachweisen zu können. Die Verarbeitung dieser Daten wird auf den Zweck einer möglichen Abwehr von Ansprüchen beschränkt. Ein individueller Löschungsantrag ist jederzeit möglich, sofern zugleich das ehemalige Bestehen einer Einwilligung bestätigt wird.</p>
  
 <p className='mb-4'>Akismet Anti-Spam-Prüfung</p>
  
 <p className='mb-4'>Unser Onlineangebot nutzt den Dienst „Akismet“, der von der Automattic Inc., 60 29th Street #343, San Francisco, CA 94110, USA, angeboten wird. Die Nutzung erfolgt auf Grundlage unserer berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f) DSGVO. Mit Hilfe dieses Dienstes werden Kommentare echter Menschen von Spam-Kommentaren unterschieden. Dazu werden alle Kommentarangaben an einen Server in den USA verschickt, wo sie analysiert und für Vergleichszwecke vier Tage lang gespeichert werden. Ist ein Kommentar als Spam eingestuft worden, werden die Daten über diese Zeit hinaus gespeichert. Zu diesen Angaben gehören der eingegebene Name, die Emailadresse, die IP-Adresse, der Kommentarinhalt, der Referrer, Angaben zum verwendeten Browser sowie dem Computersystem und die Zeit des Eintrags.</p>
  
 <p className='mb-4'>Nähere Informationen zur Erhebung und Nutzung der Daten durch Akismet finden sich in den Datenschutzhinweisen von Automattic: https://automattic.com/privacy/.</p>
  
 <p className='mb-4'>Nutzer können gerne Pseudonyme nutzen, oder auf die Eingabe des Namens oder der Emailadresse verzichten. Sie können die Übertragung der Daten komplett verhindern, indem Sie unser Kommentarsystem nicht nutzen. Das wäre schade, aber leider sehen wir sonst keine Alternativen, die ebenso effektiv arbeiten.</p>
  
 <p className='mb-4'>Abruf von Emojis und Smilies</p>
  
 <p className='mb-4'>Innerhalb unseres WordPress-Blogs werden grafische Emojis (bzw. Smilies), d.h. kleine grafische Dateien, die Gefühle ausdrücken, eingesetzt, die von externen Se</p>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        <Button
          variant="slim"
          onClick={handleAcceptTerms}
          disabled={loading}
          className="mt-6 w-full"
        >
          {loading ? 'Loading ...' : 'Accept and Proceed'}
        </Button>
      </div>
    </div>
  );
};