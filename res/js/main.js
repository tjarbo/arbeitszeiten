
//Speicher
var einträge = {};
var name_generator = 1;

var eintrag_titel;

//Referenzen erstellen 
var inp_tag = $("#daten_tag");
var inp_zeit = $("#daten_zeit");
var inp_abruf = $("#daten_abruf");


// Einstellungen 
function einstellungen_laden() {
    console.log("Lade Einstelltungen");
    eintrag_titel = (Cookies.get('eintrag_titel') || "Arbeiten");
    $("#eintrag_titel_inp").val(eintrag_titel);
}

function einstellungen_speichern() {
    console.log("Einstellungen speichern");
    console.log($("#eintrag_titel_inp").val());
    Cookies.set('eintrag_titel', $("#eintrag_titel_inp").val());
}

// Kalender
function kalender_überprüfen() {
    console.log("Angaben prüfen ...");

    //Alle Felder zurücksetzen
    inp_tag.attr("class", "w3-input w3-border w3-light-grey");
    inp_zeit.attr("class", "w3-input w3-border w3-light-grey");

    var allesOkay = true;

    //Tag-Feld überprüfen
    if (inp_tag.val() == "") {
        console.log("Es ist kein Tag angeben! :/");
        allesOkay = false;
        inp_tag.attr("class", "w3-input w3-border w3-border-red w3-light-grey");
    }

    //Zeit-Feld überprüfen
    if (inp_zeit.val() == "") {
        console.log("Es ist keine Zeit angeben! :/");
        allesOkay = false;
        $("#daten_zeit").attr("class", "w3-input w3-border w3-border-red w3-light-grey");
    }

    console.log("Überprüfen fertig!");
    return allesOkay;    
}

function kalender_eintrag_neu() {
    console.log("Neuen Eintrag erstellen ...");
    
    //Alle Felder überprüfen
    if (!(kalender_überprüfen())) {
        //Da fehlen noch Angaben ...
        console.log("Es fehlen noch Angaben -> Abbruch!");
        return;
    }

    //Eintrag erstellen
    var eintrag = {
        start: new Date(inp_tag.val().substring(0,4), Number(inp_tag.val().substring(5,7)) - 1, inp_tag.val().substring(8,10), inp_zeit.val().substring(0,2), inp_zeit.val().substring(3,5)),
        ende: new Date(inp_tag.val().substring(0,4), Number(inp_tag.val().substring(5,7)) - 1, inp_tag.val().substring(8,10), 23, 00),
        abruf: inp_abruf.is(":checked")
    };

    //Counter hochzählen lassen
    name_generator += 1;

    //Tabellen-Details vorbereiten
    var tag_text = eintrag.start.getDate() + "." + (eintrag.start.getMonth() + 1) + " ab " + eintrag.start.getHours() + ":" + eintrag.start.getMinutes();
    var abruf_element = document.createElement("span");
      $(abruf_element).attr("class", "w3-text-red");

        if (eintrag.abruf) {
        abruf_element.appendChild(document.createTextNode("Ja"))
    }

    //Element zum Löschen eines Eintrages erstellen
    var löschen_element = $("<span>").attr("onclick", "return kalender_eintrag_löschen(" + name_generator + ")").html("&times;");

    //Neue Zeile erstellen
    var tabellen_eintrag = document.createElement("tr");
      $(tabellen_eintrag).attr("id", name_generator);
      $(tabellen_eintrag).append($("<td>").append(document.createTextNode(tag_text)));
      $(tabellen_eintrag).append($("<td>").append(abruf_element));
      $(tabellen_eintrag).append($("<td>").append(löschen_element));

    //Zum Array hinzufügen
    einträge[name_generator] = eintrag;

    //Zeile zur Tabelle hinzufügen
    $("#zeitentabelle").append(tabellen_eintrag);

    console.log("Erstellen fertig !");
}

function kalender_eintrag_löschen(id) {
    //Eintrag aus dem Array löschen 
    delete einträge[id];

    //Aus der Tabelle löschen
    $("#" + id).empty();
}

function kalender_exportieren() {
    console.log("Starte Export Funktion");

    $("#export_btn").html("Wird exportiert... ");
    
    var ics_file = ics();

    //Erstelle Events
    for (var id in einträge) {
        var title = eintrag_titel;

        //Abruf-Label optional hinzufügen
        if (einträge[id].abruf) {
            title += " ABRUF";
        }

        //Event zum .ics-File hinzufügen
        ics_file.addEvent(title, "", "", einträge[id].start, einträge[id].ende);
    }

    //Datei zum Download bereitstellen
    ics_file.download("deine_arbeitszeiten");
    $("#export_btn").html("Kalender Datei erstellen <i class='fas fa-cloud-download-alt'></i>");
}

//Setup
$('#hinzufügen_btn').on("click", kalender_eintrag_neu);
einstellungen_laden();