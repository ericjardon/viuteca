import {useState, useEffect} from 'react'
import {auth} from '../base'

const useCurrentUser = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged( (user) => {
            if (user) {
              //console.log("Current user ", user.email);
              setUser(user);
            } else {
              setUser({
                  uid: null,
                  email: null,
              });
            }
        });
    }, []);

    return user;
};

export default useCurrentUser;