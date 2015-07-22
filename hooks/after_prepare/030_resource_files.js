#!/usr/bin/env node

//
// This hook copies various resource files from our version control system directories into the appropriate platform specific location
//

// From: http://docs.phonegap.com/en/3.5.0/config_ref_images.md.html#Icons%20and%20Splash%20Screens (sizes wrong, corrected below)
// - Default-568h@2x~iphone.png (640x1136 pixels)
// - Default-Landscape@2x~ipad.png (2048x1536 pixels)
// - Default-Landscape~ipad.png (1024x748 pixels)
// - Default-Portrait@2x~ipad.png (1536x2048 pixels)
// - Default-Portrait~ipad.png (768x1024 pixels)
// - Default@2x~iphone.png (640x960 pixels)
// - Default~iphone.png (320x480 pixels)

// configure all the files to copy.  Key of object is the source file, value is the destination location.  It's fine to put all platforms' icons and splash screen files here, even if we don't build for all platforms on each developer's box.
var filestocopy = [{
    "config/icon.png": "platforms/android/res/drawable/icon.png"
}, {
    "config/android/icons/72.png": "platforms/android/res/drawable-hdpi/icon.png"
}, {
    "config/android/icons/36.png": "platforms/android/res/drawable-ldpi/icon.png"
}, {
    "config/android/icons/48.png": "platforms/android/res/drawable-mdpi/icon.png"
}, {
    "config/android/icons/96.png": "platforms/android/res/drawable-xhdpi/icon.png"
},


    {
        "config/android/res/drawable/splash.png": "platforms/android/res/drawable/splash.png"
    },


    {
        "config/android/splashscreens/hdpi_640x480_splashscreens.png": "platforms/android/res/drawable-hdpi/splash.png"
    }, {
        "config/android/splashscreens/ldpi_426x320_splashscreens.png": "platforms/android/res/drawable-ldpi/splash.png"
    }, {
        "config/android/splashscreens/mdpi_470x320_splashscreens.png": "platforms/android/res/drawable-mdpi/splash.png"
    }, {
        "config/android/splashscreens/xhdpi_960x720_splashscreens.png": "platforms/android/res/drawable-xhdpi/splash.png"
    },


    {
        "config/android/splashscreens/land_hdpi_800x480_splashscreens.png": "platforms/android/res/drawable-land-hdpi/screen.png"
    }, {
        "config/android/splashscreens/land_ldpi_320x200_splashscreens.png": "platforms/android/res/drawable-land-ldpi/screen.png"
    }, {
        "config/android/splashscreens/land_mdpi_480x320_splashscreens.png": "platforms/android/res/drawable-land-mdpi/screen.png"
    }, {
        "config/android/splashscreens/land_xhdpi_1280x720_splashscreens.png": "platforms/android/res/drawable-land-xhdpi/screen.png"
    },


    {
        "config/android/splashscreens/port_hdpi_480x800_splashscreens.png": "platforms/android/res/drawable-port-hdpi/screen.png"
    }, {
        "config/android/splashscreens/port_ldpi_200x320_splashscreens.png": "platforms/android/res/drawable-port-ldpi/screen.png"
    }, {
        "config/android/splashscreens/port_mdpi_320x480_splashscreens.png": "platforms/android/res/drawable-port-mdpi/screen.png"
    }, {
        "config/android/splashscreens/port_xhdpi_720x1280_splashscreens.png": "platforms/android/res/drawable-port-xhdpi/screen.png"
    },


    {
        "config/ios/splashscreens/Default-568h@2x~iphone.png": "platforms/ios/MyApp/Resources/splash/Default-568h@2x~iphone.png"
    }, {
        "config/ios/splashscreens/Default-Landscape@2x~ipad.png": "platforms/ios/MyApp/Resources/splash/Default-Landscape@2x~ipad.png"
    }, {
        "config/ios/splashscreens/Default-Landscape~ipad.png": "platforms/ios/MyApp/Resources/splash/Default-Landscape~ipad.png"
    }, {
        "config/ios/splashscreens/Default-Portrait@2x~ipad.png": "platforms/ios/MyApp/Resources/splash/Default-Portrait@2x~ipad.png"
    }, {
        "config/ios/splashscreens/Default-Portrait~ipad.png": "platforms/ios/MyApp/Resources/splash/Default-Portrait~ipad.png"
    }, {
        "config/ios/splashscreens/Default@2x~iphone.png": "platforms/ios/MyApp/Resources/splash/Default@2x~iphone.png"
    }, {
        "config/ios/splashscreens/Default~iphone.png": "platforms/ios/MyApp/Resources/splash/Default~iphone.png"
    }];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        var srcfile = path.join(rootdir, key);
        var destfile = path.join(rootdir, val);
        console.log("copying " + srcfile + " to " + destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
        }
    });
});

