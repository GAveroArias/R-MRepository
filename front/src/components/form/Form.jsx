import { useState } from "react";
import validation from "./validation";
import styles from "./Form.module.css";

function Form({ login }) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setErrors(
            validation({
                ...userData,
                [event.target.name]: event.target.value,
            })
        );
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email:
                    <input
                        type="text"
                        placeholder="Enter your email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className={errors.email && styles.warning}
                    />
                </label>
                {errors.email && (
                    <p className={styles.danger}>{errors.email}</p>
                )}
                <br />
                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        className={errors.password && styles.warning}
                    />
                </label>
                {errors.password && (
                    <p className={styles.danger}>{errors.password}</p>
                )}
                <br />
                <button>SHOW ME WHAT YOU GOT</button>
            </form>
        </div>
    );
}

export default Form;
