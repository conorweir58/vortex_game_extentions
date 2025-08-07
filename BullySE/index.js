/*
Author: conorweir58
Date Authored: 08/08/2025
Last Updated: 08/08/2025
NOTES:
Most mods on Nexus overwrite game files so no real mod file pattern
No clue if this will work for Bully with it's lack of modding support and it's destructive mod nature,
but trying anyways.
Use of Bully's therefore can be dangerous.
No easy install/uninstall without saving original state of game files before and after install.
*/

//Import some assets from Vortex we'll need.
const path = require('path');
const { fs, log, util } = require('vortex-api');
const winapi = require('winapi-bindings');

const SteamAPP_ID = '12200';

class BullySE {
    constructor(context) {
        this.context = context;
        this.name = 'Bully Scholarship Edition';
        this.art = 'gameart.jpg';
        this.id = 'bullyscholarshipedition';
        this.steamID = SteamAPP_ID;
    }
}

// NOT SURE IF WORKING -> FIRST BUILDING FOR STEAM SUPPORT ONLY THEN TESTING THIS :)
// function findGame() {
//     try {
//         // Try read Rockstar registry entry for Bully
//         const instPath = winapi.RegGetValue(
//             'HKEY_LOCAL_MACHINE',
//             'SOFTWARE\\WOW6432Node\\Rockstar Games\\Bully Scholarship Edition',
//             'InstallFolder'
//         );
//         if (!instPath || !instPath.value) {
//             throw new Error('Rockstar registry key not found or empty.');
//         }
//         return Promise.resolve(instPath.value);
//     } catch (err) { // Default back to Steam if no Rockstar instance found
//         return util.GameStoreHelper.findByAppId([SteamAPP_ID])
//             .then(game => game.gamePath);
//     }
// }

function findGame() {
  return util.GameStoreHelper.findByAppId([SteamAPP_ID])
      .then(game => game.gamePath);
}

function prepareForModding(discovery) {
    return fs.ensureDirWritableAsync(discovery.path);
}

function main(context) {
	//This is the main function Vortex will run when detecting the game extension.

    const game = new BullySE(context);
	
    context.registerGame({
        id: game.id,
        name: game.name,
        mergeMods: true,
        queryPath: findGame,
        supportedTools: [],
        // Bully doesn't have a dedicated mod folder - mods either add or overwrite to the game files
        queryModPath: () => '',
        logo: game.art,
        executable: () => 'Bully.exe',
        requiredFiles: [
            'Bully.exe',
        ],
        setup: prepareForModding,
        environment: {
            SteamAPPId: game.steamID,
        },
        details: {
            steamAppId: game.steamID,
        },
    });

	return true;
}

module.exports = {
    default: main,
};