import { useState } from "react";

export default function SearchBar(props) {
    const [id, setId] = useState("");

    function handleChange(event) {
        setId(event.target.value);
    }

    const search = () => {
        props.onSearch(id);
        setId("");
    };

    return (
        <div className="SearchBar">
            <input
                type="search"
                onChange={handleChange}
                placeholder="Insert the ID number"
                value={id}
            />
            <button onClick={search}>Add</button>
        </div>
    );
}
