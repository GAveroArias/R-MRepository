const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/";
const API_KEY = "gaveroarias";

const getCharById = async (req, res) => {
    try {
        const characterId = req.params.id;
        const { data } = await axios.get(`${URL}${characterId}?key=${API_KEY}`);
        const { id, name, status, species, origin, image, gender } = data;
        const character = { id, name, status, species, origin, image, gender };
        return character.name
            ? res.json(character)
            : res.status(404).send("Not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = getCharById;
