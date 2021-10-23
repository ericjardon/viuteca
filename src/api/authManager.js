import {auth} from '../base'

const authManager = {}

authManager.register = async (email, password) => {
    const response = {
        ok: null,
        error: null,
        data: null,
    }

    try {
        // automatically signs them in
        const credentials = await auth.createUserWithEmailAndPassword(email, password);
        response.ok = true;
        response.data = credentials.user;

        return response
    } catch (error) {
        let errorCode = error.code;
        let errorMsg = error.errorMsg
        response.error = "ERROR " + errorCode + ": " + errorMsg;
    }
}


authManager.signIn = async (email, password) => {
    const response = {
        ok: null,
        error: null,
        data: null,
    }
    
    try {
        // automatically signs them in
        const credentials = await auth.signInWithEmailAndPassword(email, password);
        response.ok = true;
        response.data = credentials.user;

        return response
    } catch (error) {
        let errorCode = error.code;
        let errorMsg = error.errorMsg
        response.error = "ERROR " + errorCode + ": " + errorMsg;
        return response;
    }
}

export default authManager;