const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const expresionRegular = /^(?=.{1,35}$).+/;

const regexPassword = /^(?=.*\d)[0-9a-zA-Z]{6,10}$/;

function validation(data) {
    const errors = {};

    if (!regexEmail.test(data.email))
        errors.email = "CAN'T SHOW YO WHAT I GOT: Invalid email";
    if (!data.email) errors.email = "Email is required";
    if (data.email.length > 35)
        errors.email = "Password must be less than 35 characters";

    if (!regexPassword.test(data.password))
        errors.password =
            "Password must be between 6 and 10 alphanumeric characters";

    return errors;
}

export default validation;
