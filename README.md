# Vortex Game Extensions

Vortex/Nexus allows for community made support for certain games on their mod manager.

This repo contains games which I have developed/am currently developing support for vortex.

Unfortunately not all games are capable of mod manager support due to destructive modding (modding which overwrites game files) as there is no easy enable/disable of mods,
thus some games in this repo may be abandoned if I am unable to figure out a way to make it work properly for a given game.

Any advice/suggestions is appreciated to get the games supported properly for easy plug-and-play modding!

## Game Extension Structure

Each Game follows a similar basic 3 file structure (although more can be added for further functionality):

- A gameart.jpg in a 16/9 format which is displayed on vortex for the game.
- An info.json containing basic info on the Game Extension: version, author, game name and description
- An index.js which contains all of the javascript which tells vortex how to handle the mod support
