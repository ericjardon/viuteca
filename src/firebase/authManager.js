import {auth} from '../base'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


const authManager = {}

authManager.register = async (email, password) => {
    console.log("Register new:", email, password);
    const response = {
        ok: null,
        error: null,
        data: null,
    }

    try {
        // automatically signs them in
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        response.ok = true;
        response.data = credentials.user;

        return response

    } catch (error) {
        console.log("ERROR " + error);
        response.error = "ERROR " + error;
        return response;
    }
}


authManager.signIn = async (email, password) => {
    console.log("Signing in...")
    const response = {
        ok: null,
        error: null,
        data: null,
    }
    
    try {
        // automatically signs them in
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        response.ok = true;
        response.data = credentials.user;

        return response

    } catch (error) {
        console.log("ERROR", error);
        response.error = "ERROR " + error;
        return response;
    }
}

authManager.logOut = async () => {
    console.log("Logging out...")
    const response = {
        ok: null,
        error: null,
    }

    try {
        await signOut(auth)
        response.ok = true;
        return response;
    }
    catch (err) {
        console.log("ERROR SIGN OUT", err);
        response.error = err;
        return response;
    }
}

export default authManager;