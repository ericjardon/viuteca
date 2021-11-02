import React, {useState, useEffect} from 'react'
import md5 from 'md5'
import styles from './styles/Group.module.scss'
import {Spinner} from 'reactstrap'
import Group from '../firebase/groups'

const GroupProfile = (props) => {
    /* Implements the profile page for any given group.
        - Uses Gravatar avatar image, size 128px, as profile picture.
        - Like emaus, every text area etc is editable.
        - We add a save button that sends the request to firebase, and fecthes data again.
    */

    const [profileData, setprofileData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [errorNotFound, seterrorNotFound] = useState(null)

    // FETCH THE GROUP PROFILE DATA FROM URL
    useEffect(() => {
        const groupId = props.match.params.id;
        console.log("Group id", groupId);
        async function fetchData() {
            const group = await Group.getGroupById(groupId);
            if (group.error) {
                // does not exist
                setLoading(false)
                seterrorNotFound(group.error);
                return
            }
            setprofileData(group);
            setLoading(false);
            console.log("Profile Data:\n", group)
        }

        fetchData();
    }, []);

    if (loading) return (
        <div className={styles.container}>
            <Spinner children="" style={{ width: '15rem', height: '15rem' }} />
        </div>
    )

    if (errorNotFound !== null) return (
        <div className={styles.container}>
            {errorNotFound}
        </div>
    )

    return (
        <div className={styles.container}>
            Hello Group
        </div>
    )
}


const getGravatarURL = (email) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}

export default GroupProfile;