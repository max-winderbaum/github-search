const { DateTime } = require('luxon');
const { execSync } = require('child_process');

const peopleOnTheTeam = {
    max: 'max-winderbaum',
    daviddav: 'david-davidson',
    jono: 'jondionowens',
    adams: 'adamsanderson',
    nathanp: 'nathandpeterson',
    trung: 'trungvngo',
    dawn: 'DawnWright',
    meghan: 'urbackmk',
    ariel: 'ArielTam',
    chris: 'chriszamierowski',
    shannon: 'ShannonLCapper',
    alexs: 'aschokking',
}
const usernamesOnTheTeam = Object.keys(peopleOnTheTeam).map((key) => peopleOnTheTeam[key]);
const personToFocus = process.argv[2];

console.log(personToFocus);

const authorString = personToFocus && peopleOnTheTeam[personToFocus] ?
    `+author:${peopleOnTheTeam[personToFocus]}` :
    usernamesOnTheTeam.reduce((string, person) => `${string}+author:${person}`, ``);

const lastMonday = DateTime.now().minus({weeks:1}).startOf('week').toISODate();
const timelineString = `+created:>=${lastMonday}`;

const templateURL = `https://www.github.com/search?q=is:pr${authorString}${timelineString}&ref=simplesearch`;

execSync(`open -a "Google Chrome" "${encodeURI(templateURL)}"`);

