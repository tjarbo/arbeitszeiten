#!/bin/bash
cd docs/js/

echo "Alte Datei löschen"
rm ics.file.js
echo ""

echo "Git Repo Downloaden ..."
git clone https://github.com/nwcell/ics.js.git
echo ""

echo "ics.js isolieren"
mv ics.js/ics.deps.min.js ics.file.js
rm -rf ics.js/