import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Error404() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => navigate("/home"), 4000);
    }, []);

    return (
        <img
            src="https://media.tenor.com/IHdlTRsmcS4AAAAC/404.gif"
            alt="error"
        />
    );
}

export default Error404;
