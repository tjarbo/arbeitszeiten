
//Speicher
var einträge = {};
var name_generator = 1;


//Referenzen erstellen 
var inp_tag = $("#daten_tag");
var inp_zeit = $("#daten_zeit");
var inp_abruf = $("#daten_abruf");


function überprüfen() {
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

function neuerEintrag() {
    console.log("Neuen Eintrag erstellen ...");
    
    //Alle Felder überprüfen
    if (!(überprüfen())) {
        //Da fehlen noch Angaben ...
        console.log("Erstellen abgebrochen!");
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
    var löschen_element = document.createElement("span");
      $(löschen_element).attr("onclick", "return eintragLöschen(" + name_generator + ")");
        löschen_element.innerHTML = "&times;";

    //Neue Zeile erstellen
    var tabellen_eintrag = document.createElement("tr");
      $(tabellen_eintrag).attr("id", name_generator);
        tabellen_eintrag.appendChild(td(document.createTextNode(tag_text)));
        tabellen_eintrag.appendChild(td(abruf_element));
        tabellen_eintrag.appendChild(td(löschen_element));

    //Zum Array hinzufügen
    einträge[name_generator] = eintrag;

    //Zeile zur Tabelle hinzufügen
    $("#zeitentabelle").append(tabellen_eintrag);

    console.log("Erstellen fertig !");
}

function td(element) {
    //Erstelle eine neue Zelle
    var td = document.createElement("td");
        td.appendChild(element);
    return td;
}

function eintragLöschen(id) {
    //Eintrag aus dem Array löschen 
    delete einträge[id];

    //Aus der Tabelle löschen
    $("#" + id).empty();
}

function exportieren() {
    var ics_file = ics();

    //Erstelle Events
    for (var id in einträge) {
        var title = "Arbeiten";

        //Abruf-Label optional hinzufügen
        if (einträge[id].abruf) {
            title += " ABRUF";
        }

        //Event zum .ics-File hinzufügen
        ics_file.addEvent(title, "", "", einträge[id].start, einträge[id].ende);
    }

    //Datei zum Download bereitstellen
    ics_file.download("deine_arbeitszeiten");
}

$('#button_hinzufügen').on("click", neuerEintrag);