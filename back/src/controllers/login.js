// Dentro de este archivo deberás importar tu modelo User.

// Crea una función llamada login la cual reciba por parámetro los objetos req y res. No olvides exportarla.

// Recibiras por Query los datos email y password.

// En el caso de no recibir alguno de los datos, responde con un status 400 y el mensaje "Faltan datos".

// Si ambos datos llegan correctamente tendrás que buscar aquel usuario que tenga el mismo email que recibiste anteriormente. En el caso de no encontrarlo responde con un status 404 y el mensaje "Usuario no encontrado".

// En el caso de encontrar a un usuario con ese mismo email solo tendrás ahora que comparar si su password es igual a la password que recibiste anteriormente. En el caso de no serlo responde con un status 403 y un mensaje que diga "Contraseña incorrecta".

// En el caso de que las contraseñas si coincidan, responde con el objeto:

// {
//    access: true;
// }
// [NOTA]: en el caso de haber un error responde con status 500 y el mensaje del error.

// Tu código:

const { User } = require("../DB_connection.js");

const login = async (req, res) => {
    try {
        const { email, password } = req.query;

        if (!email || !password)
            return res.status(400).json({ msg: "Missing data" });
        const logUser = await User.findOne({
            where: {
                email,
            },
        });
        if (!logUser)
            return res.status(404).json({ message: "User not found" });

        return logUser.password === password
            ? res.status(200).json({ access: true })
            : res.status(403).json({ message: "Wrong password" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = login;
