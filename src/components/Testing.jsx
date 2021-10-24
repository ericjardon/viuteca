import React, {useState} from 'react'
import Group from '../firebase/groups'
import authManager from '../firebase/authManager'

export default function Testing() {

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

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height:'300px', width:'100vw', backgroundColor:'green'}}>
            <button onClick={getGroup}>Check existing Group</button>
            <button onClick={logOut}>Log out</button>
        </div>
    )
}
