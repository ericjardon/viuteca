import React, {useState, useEffect} from 'react'
import md5 from 'md5'
import styles from './styles/GroupProfile.module.scss'
import {Spinner, Button} from 'reactstrap'
import Group from '../firebase/groups'
import Tag from './Tag'
import ProfileVideos from './ProfileVideos'
import { auth } from '../base'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { DEFAULT_BIO, EXAMPLE_TAGS } from '../utils/defaultCopies'


const GroupProfile = (props) => {

    const [profileData, setprofileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState(["Grupo Estudiantil", "ITESM"])

    const [errorNotFound, seterrorNotFound] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState("");

    const [isOwner, setisOwner] = useState(false);

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

            if (group.tags) {
                setTags(group.tags);
            }

            const currentUser = auth.currentUser
            if (currentUser) {
                console.log("Is profile owner");
                setisOwner(groupId == currentUser.email)
            }
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
                            DEFAULT_BIO(profileData.name)}
                        </p>
                    <div className={styles.categories}>
                        {tags.map(t => <Tag>{t}</Tag>)}
                    </div>
                    {isOwner && (<div className={styles.editBtnContainer}>
                        <Link to={profileData.id ? `/p/edit/${profileData.id}` : ''}>
                        <Button className={styles.editBtn}>Editar <AiTwotoneEdit/></Button>
                        </Link>
                    </div>)}
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