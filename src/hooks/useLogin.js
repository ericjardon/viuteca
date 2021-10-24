import {useState, useEffect} from 'react'
import {auth} from '../base'

/* Use this hook in every component whose behavior might change depending on user login status */
const useLogin = () => {
    const [loggedIn, setloggedIn] = useState(false);

    useEffect(() => {
        // Set up an auth observer
        auth.onAuthStateChanged(function(user) {
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
    return { loggedIn };
};

export default useLogin;