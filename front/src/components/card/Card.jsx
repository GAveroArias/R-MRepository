import { Link, useLocation } from "react-router-dom";
import { addFav, removeFav } from "../../redux/action";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function Card({
    id,
    name,
    status,
    species,
    gender,
    origin,
    image,
    onClose,
    addFav,
    removeFav,
    myFavorites,
}) {
    const [isFav, setIsFav] = useState(false);

    const { pathname } = useLocation();
    function handleFavorite() {
        if (isFav) {
            setIsFav(false);
            removeFav(id);
        } else {
            setIsFav(true);
            addFav({
                id,
                name,
                status,
                species,
                gender,
                origin,
                image,
            });
        }
    }

    useEffect(() => {
        myFavorites.forEach((charFav) => {
            charFav.id === id && setIsFav(true);
        });
    }, [myFavorites, id]);

    const cardClassName = isFav ? "favoritesCard" : "";
    const isHomePage = window.location.pathname === "/home";

    return (
        <div className={`card ${cardClassName}`}>
            <img src={image} alt={name} />
            <div className="card-buttons-container">
                <button onClick={handleFavorite}>{isFav ? "❤️" : "🤍"}</button>
                {isHomePage && <button onClick={() => onClose(id)}>X</button>}
            </div>
            <h2>ID: {id}</h2>
            <Link to={`/detail/${id}`}>
                <h3>{name}</h3>
            </Link>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        addFav: function (character) {
            dispatch(addFav(character));
        },
        removeFav: function (id) {
            dispatch(removeFav(id));
        },
    };
}

function mapStateToProps(state) {
    return {
        myFavorites: state.myFavorites,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
