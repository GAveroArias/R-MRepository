import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    // const URL = "https://rickandmortyapi.com/api/character/";
    // const API_KEY = "pi-gaveroarias";
    const URL = "http://localhost:3001/rickandmorty/character/";

    useEffect(() => {
        // axios.get(`${URL}${id}?key=${API_KEY}`).then(({ data }) => {
        axios.get(`${URL}${id}`).then(({ data }) => {
            if (data.name) {
                setCharacter(data);
            } else {
                window.alert("No hay personajes con ese ID");
            }
        });

        return setCharacter({});
    }, [id]);

    return (
        <div className="DetailContainer">
            <div className="DetailContent">
                <img className="DetailImage" src={character.image} />
                <div className="DetailText">
                    <h2>{character.name}</h2>
                    <h4>Status: {character.status}</h4>
                    <h4>Specie: {character.species}</h4>
                    <h4>Gender: {character.gender}</h4>
                    <h4>Origin: {character.origin?.name}</h4>
                </div>
            </div>
        </div>
    );
}

export default Detail;
