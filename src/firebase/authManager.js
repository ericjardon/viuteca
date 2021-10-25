import {auth} from '../base'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    sendEmailVerification
} from "firebase/auth";


const authManager = {}

authManager.register = async (email, password) => {
    console.log("Register new:", email, password);
    const result = {
        ok: null,
        error: null,
        data: null,
    }

    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        result.ok = true;
        result.data = credentials.user;
        /* const emailSent = await authManager.sendVerifyEmail()
        if (emailSent == false) {
            console.log("User is not logged in")
        } else if(emailSent != true) {
            console.log("ERROR SENDING EMAIL", emailSent);
        } */
        return result

    } catch (error) {
        console.log("ERROR " + error);
        result.error = error.message;

        return result;
    }
}


authManager.sendVerifyEmail = async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            await sendEmailVerification(user);
            return true
        } catch (err) {
            console.log("EMAIL VERIFICATION EMAIL FAILED", err);
            return err;
        }
    }
    return false
}


authManager.signIn = async (email, password) => {

    console.log("Signing in...")
    const result = {
        ok: null,
        error: null,
        data: null,
    }
    
    try {
        // automatically signs them in
        const credentials = await signInWithEmailAndPassword(auth, email.trim(), password);
        result.ok = true;
        result.data = credentials.user;

        return result

    } catch (error) {
        console.log("ERROR SIGN IN");
        console.dir(error);
        result.ok = false;
        result.error = error;
        return result;
    }
}

authManager.logOut = async () => {
    console.log("Logging out...")
    const result = {
        ok: null,
        error: null,
    }
    try {
        await signOut(auth)
        result.ok = true;
        console.log("Logged out.")
        return result;
    }
    catch (err) {
        console.log("ERROR LOG OUT", err);
        result.ok = false;
        result.error = err;
        return result;
    }
}

export const validateLogin = ({email, password}) => {
    let errors = {};
    if (isEmpty(email)) errors.email = 'Campo requerido.';
    if (isEmpty(password)) errors.password = 'Proporciona una contraseña.';
    return {
        errors,
        valid: Object.keys(errors).length === 0
     };
}

export const validateRegister = ({email, password, studentGroup, confirmPassword}) => {
    const errors = {
        studentGroup:'',
        email: '',
        password: '',
        confirmPassword: ''
    }

    let valid = true;

    if (isEmpty(studentGroup)) {
        errors.studentGroup = 'Campo requerido'
        valid = false;
    }
    if (isEmpty(email) || !validEmail(email)) {
        errors.email = 'Proporciona un correo válido';
        valid = false;
    }
    if (isEmpty(password) || password.length < 6) {
        errors.password = 'Elige una contraseña mayor a 6 caracteres';
        valid = false;
    }
    if (confirmPassword !== password) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
        valid = false;
    }
    
    return {
        errors,
        valid,
     };
}

export const isEmpty = (string) => {
    return (string.trim() === '');
}

export const validEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    console.log("validateEmail result: " + re.test(email));
    return re.test(email);
};

export default authManager;