const fs = require('fs');
const path = require('path');

// Path to the assets folder and catalog.json file
const assetsDir = path.join(__dirname, "../../public/assets");
const catalogFile = path.join(__dirname, "../../public/catalog.json");


// Recursive function to generate the catalog
const generateCatalog = (dir) => {
  const files = fs.readdirSync(dir);  // Read the directory content
  return files.map((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);  // Get file stats (for checking if it's a directory)

    if (stat.isDirectory()) {
      return {
        folder: file,
        assets: generateCatalog(filePath),  // Recursively get assets in subfolders
      };
    }

    return file;  // Return file if it's not a directory
  });
};

// Generate the catalog by reading assets
const catalog = generateCatalog(assetsDir);

// Save the catalog to the JSON file
fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, 2));

console.log('Catalog generated at:', catalogFile);  // Log the success message