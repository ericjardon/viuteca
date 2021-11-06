import React, {useState, useEffect} from 'react'
import md5 from 'md5'
import styles from './styles/GroupProfile.module.scss'
import {Spinner} from 'reactstrap'
import Group from '../firebase/groups'
import Tag from './Tag'
import ProfileVideos from './ProfileVideos'

const GroupProfile = (props) => {
    /* Implements the profile page for any given group.
        - Uses Gravatar avatar image, size 128px, as profile picture.
        - Like emaus, every text area etc is editable.
        - We add a save button that sends the request to firebase, and fecthes data again.
        - FIXME: implement tags and edit profile
    */

    const [profileData, setprofileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState(["Women in Stem", "Tecnologías Computacionales", "Ingeniería"])

    const [errorNotFound, seterrorNotFound] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState("");

    // FETCH THE GROUP PROFILE DATA FROM URL
    useEffect(() => {
        const groupId = props.match.params.id;
        console.log("Group id", groupId);
        async function fetchData() {
            const group = await Group.getGroupById(groupId);
            if (group.error) {
                setLoading(false)
                seterrorNotFound(group.error);
                return
            }
            group.id = groupId;
            setprofileData(group);
            setLoading(false);
            console.log("Profile Data:\n", group)
            setProfilePicURL(getGravatarURL(groupId));
        }

        fetchData();
    }, []);

    const profileImage = () => {
        
        return {
            backgroundImage: `url(${profilePicURL})`,
        }
    }

    if (loading) return (
        <div className={styles.containerLoading}>
            <Spinner children="" style={{ width: '15rem', height: '15rem' }} />
        </div>
    )

    if (errorNotFound !== null) return (
        <div className={styles.containerLoading}>
            {errorNotFound}
        </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.profilePicDummy}>
                <div className={styles.profilePic} style={profileImage()}></div>
                </div>
                <div className={styles.nameAndDesc}>
                    <p className={styles.profileName}>{profileData.name}</p>
                    <p className={styles.profileDesc}>
                        {profileData.desc || 
                        `
                        ¡Hola! Esta es la página de videos de ${profileData.name}. 
                        Para añadir una foto de perfil, entra a gravatar.com y crea una
                        cuenta con el mismo correo electrónico de Viuteca. 
                        `}</p>
                    <div className={styles.categories}>
                        {tags.map(t => <Tag>{t}</Tag>)}
                    </div>
                </div>
            </div>
            <div className={styles.postedVideos}>
                <ProfileVideos ownerEmail={profileData.id} ownerName={profileData.name}/>
            </div>
        </div>
    )
}


const getGravatarURL = (email) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}

export default GroupProfile;