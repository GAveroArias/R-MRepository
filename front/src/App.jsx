import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import About from "./components/about/About.jsx";
import Detail from "./components/detail/Detail.jsx";
import Error404 from "./components/error/Error404.jsx";
import "./App.css";
import Cards from "./components/cards/Cards.jsx";
import Nav from "./components/nav/Nav.jsx";
import Form from "./components/form/Form.jsx";
import Favorites from "./components/favorites/Favorites.jsx";
import ContactForm from "./components/contactForm/ContactForm.jsx";

function App() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [characters, setCharacters] = useState([]);
    const [access, setAccess] = useState(false);

    // const URL = "https://rickandmortyapi.com/api/character/";
    // const API_KEY = "pi-gaveroarias";
    const URL = "http://localhost:3001/rickandmorty/character/";
    const EMAIL = " ";
    const PASSWORD = " ";
    const onSearch = async (id) => {
        try {
            if (!id) return alert("Please enter an ID");
            if (characters.find((char) => char.id === parseInt(id)))
                return alert(`Character ${id} already added`);
            const { data } = await axios.get(`${URL}${id}`);
            if (data.name) {
                setCharacters([data, ...characters]);
            } else {
                window.alert(`There is no character with this ID: ${id}`);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const onClose = (id) => {
        setCharacters(characters.filter((char) => char.id !== id));
    };

    async function login(userData) {
        try {
            const { email, password } = userData;
            const URL = "http://localhost:3001/rickandmorty/login/";
            const { data } = await axios(
                URL + `?email=${email}&password=${password}`
            );
            setAccess(data.access);
            access && navigate("/home");
            if (!access) return alert("Wrong user or password");
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    useEffect(() => {
        !access && navigate("/");
    }, [access]);

    return (
        <div className="App">
            {pathname !== "/" && <Nav onSearch={onSearch} />}
            <Routes>
                <Route path="/" element={<Form login={login} />} />
                <Route
                    path="/home"
                    element={
                        <Cards characters={characters} onClose={onClose} />
                    }
                />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/form" element={<ContactForm />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </div>
    );
}

export default App;
