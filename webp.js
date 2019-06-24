var imagemin = require("imagemin"),
        webp = require("imagemin-webp");


const { readdirSync, statSync } = require('fs')
const { join } = require('path')

const isDirectory = source => statSync(source).isDirectory()
const getDirectories = source => readdirSync(source).map(name =>join(source,name)).filter(isDirectory)

var uploadsDirs = getDirectories('uploads')
for(udir of uploadsDirs) {
   
    // -- this looks backwards, but only lets uploads/YEAR in the conditional
    if(!udir.search(/uploads\/[0-9]/)) {	

        var monthDirs = getDirectories(udir);
	for(month of monthDirs) {

            console.log('month: ' + month);
	    var PNGsDir  = month + "/*.png";
	    var JPEGsDir = month + "/*.jpg";
            var outputDir = month + '_webp';

            // PNG
            imagemin([PNGsDir], outputDir, {
                plugins:[webp({ lossless: true })]
            });

            // JPEG
            imagemin([JPEGsDir], outputDir, {
                plugins: [webp({ quality: 65})]
            });

            console.log('converted images can be found in ' + outputDir);

        }
    }
}
