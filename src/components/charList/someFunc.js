export function logger () {
    console.log('hit');
}

export function secondLog () {
    console.log('2nd hit');
}

export default function logger3 () {
    console.log('hit3');
}

// const onCharListLoaded = async (newCharList) => {
//     const {logger, secondLog} = await import('./someFunc');
//     logger();
//     secondLog();
// }

// if(loading) {
//     import('./someFunc') // dynamic import
//     .then(obj => obj.default())
//     .catch();
// }