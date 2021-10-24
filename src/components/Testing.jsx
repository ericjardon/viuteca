import React, { useState } from 'react'
import Group from '../firebase/groups'
//import {auth} from '../base'
import authManager from '../firebase/authManager'
import useLogin from '../hooks/useLogin'

export default function Testing() {

    const loggedIn = useLogin();

    const getGroup = async () => {
        console.log("Get group...")
        const groupId = 'geebproject@gmail.com'
        const group = {
            name: 'Hello Group'
        }
        const resp = await Group.createGroup(groupId, group);
        console.log("Response:")
        console.log(resp)
    }

    const logOut = async () => {
        const res = await authManager.logOut();
        console.log("Response", res);
    }

    const logIn = async () => {
        await authManager.signIn("geebproject@gmail.com", "123456")
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', width: '100vw', backgroundColor: 'green' }}>
            <button onClick={getGroup}>Check existing Group</button>
            {loggedIn ? <button onClick={logOut}>Log out</button>
                : <button onClick={logIn}>Log In GEEB</button>}
            <p>User is signed in? {loggedIn.toString()}</p>
        </div>
    )
}
