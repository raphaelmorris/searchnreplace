const fs = require('fs');
const csv = require('csvtojson');

// Chemin vers le répertoire contenant les fichiers HTML
const directoryPath = './';

// Chemin vers le fichier CSV contenant les instructions de recherche et de remplacement
const csvFilePath = 'search.csv';

// Convertir le fichier CSV en format JSON
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    // Parcourir chaque objet JSON du fichier
    jsonObj.forEach((obj) => {
      // Parcourir tous les fichiers HTML du répertoire
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          console.log('Erreur lors de la lecture du répertoire : ' + err);
          return;
        }

        // Parcourir chaque fichier HTML du répertoire
        files.forEach((file) => {
          if (file.endsWith('.html')) {
            // Lire le fichier HTML et remplacer les occurrences de la chaîne de caractères
            let filePath = directoryPath + '/' + file;
            let fileContent = fs.readFileSync(filePath, 'utf-8');
            let newContent = fileContent.replace(new RegExp(obj.search, 'g'), obj.replace);

            // Écrire le nouveau contenu dans le fichier HTML
            fs.writeFileSync(filePath, newContent, 'utf-8');
          }
        });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
