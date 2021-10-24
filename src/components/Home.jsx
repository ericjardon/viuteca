import React from 'react'
import { Redirect } from 'react-router';
import useLogin from '../hooks/useLogin'

/* Component for the main screen with listed videos */
export default function Home() {

    const {loggedIn} = useLogin();

    if(!loggedIn) return <Redirect to="/login"/>

    return (
        <div style={{textAlign:'center'}}>
            Nothing yet to see here.
        </div>
    )
}
