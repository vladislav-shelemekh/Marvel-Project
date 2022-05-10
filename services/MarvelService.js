

class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url)

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return res.json();
    }

    getAllCharacters = () => {
        return this.getResource('https://gateway.marvel.com:443/v1/public/characters?apikey=75e3f223fe6cea928cb370dfd4cbcdc8');
    }

}

export default MarvelService;