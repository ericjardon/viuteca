import {useState, useEffect} from 'react'
import {auth} from '../base'

const useLogin = () => {
    const [loggedIn, setloggedIn] = useState(false);

    useEffect(() => {
        // Set up an auth observer
        auth.onAuthStateChanged( (user) => {
            if (user) {
              // User is signed in.
              console.log("Current user ", user.email);
              setloggedIn(true);
            } else {
              // No user is signed in.
              console.log("No user");
              setloggedIn(false);
            }
        });
    }, []);

    return loggedIn;
};

export default useLogin;