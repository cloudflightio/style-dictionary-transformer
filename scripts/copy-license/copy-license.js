const fs = require('fs');
const path = require('path');

const licenseFileName = 'LICENSE';
const rootDir = path.normalize(`${__dirname}/../../`);
const packagesDir = path.join(rootDir, 'packages');
const rootLicenseFile = path.join(rootDir, licenseFileName);

function isNpmPackage(path) {
    const files = fs.readdirSync(path);
    return files.some((fileName) => fileName === 'package.json');
}

module.exports = {
    copyLicenses() {
        const packages = fs.readdirSync(packagesDir);
        for (const packageDirName of packages) {
            const packagePath = path.join(packagesDir, packageDirName);
            const packageStat = fs.statSync(packagePath);
            if (packageStat.isDirectory() && isNpmPackage(packagePath)) {
                const packageLicenseFile = path.join(packagePath, licenseFileName);
                fs.copyFileSync(rootLicenseFile, packageLicenseFile);
            }
        }
    },
};
