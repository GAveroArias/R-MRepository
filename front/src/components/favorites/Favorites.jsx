import React from "react";
import { connect, useDispatch } from "react-redux";
import Card from "../card/Card";
import { filterCards, orderCards } from "../../redux/action";
import "./Favorites.css";

function Favorites({ myFavorites }) {
    const dispatch = useDispatch();
    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value));
    };

    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value));
    };
    return (
        <div className="favorites-container">
            <div className="selectors-container">
                <select
                    name="order"
                    defaultValue="orderCharacters"
                    onChange={handleOrder}
                >
                    <option value="orderCharacters" disabled="disabled">
                        order...
                    </option>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>

                <select
                    name="filter"
                    defaultValue="filterCharacters"
                    onChange={handleFilter}
                >
                    <option value="All">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">unknown</option>
                </select>
            </div>
            {myFavorites.map((char) => (
                <Card
                    key={char.id}
                    id={char.id}
                    name={char.name}
                    status={char.status}
                    species={char.species}
                    gender={char.gender}
                    origin={char.origin}
                    image={char.image}
                />
            ))}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        myFavorites: state.myFavorites,
    };
}

export default connect(mapStateToProps)(Favorites);
