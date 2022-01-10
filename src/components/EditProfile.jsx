import React, { useState, useEffect } from 'react'
import md5 from 'md5'
import './styles/VideosDisplay.scss'
import styles from './styles/GroupProfile.module.scss'
import { Spinner } from 'reactstrap'
import Group from '../firebase/groups'
import Tag from './Tag'
import { Button } from 'reactstrap'
import { AiTwotoneEdit } from 'react-icons/ai'
import { DEFAULT_BIO } from '../utils/defaultCopies'

// import ProfileVideos from './ProfileVideos'

const EditProfile = (props) => {

    const [profileData, setprofileData] = useState({
        id: null,
        name: null,
        desc: null,
    });
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState(["Women in Stem", "Tecnologías Computacionales", "Ingeniería"])

    const [errorNotFound, seterrorNotFound] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState("");

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

    const handleOnChange = (event) => {
        setprofileData({
            ...profileData,
            [event.target.id]: event.target.textContent,
        });
        console.log("Update->\n", profileData);
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
        <div className={styles.containerEP}>
            <p class={styles.PageTitle}>Editar Información</p>
            <div className={styles.editProfileCard}>
                <div className={styles.profilePicDummy}>
                    <div className={styles.profilePic} style={profileImage()}></div>
                </div>
                <div className={styles.nameAndDesc}>
                    <p contenteditable="True" id="name" onBlur={handleOnChange} className={styles.profileName}>{profileData.name}  <AiTwotoneEdit /></p>
                    <p contenteditable="True" id="desc" onBlur={handleOnChange} className={styles.profileDesc}>
                        {profileData.desc ||
                            DEFAULT_BIO(profileData.name)}  <AiTwotoneEdit />
                    </p>
                    <div className={styles.categories}>
                        {tags.map(t => <Tag>{t}</Tag>)}
                    </div>
                </div>
            </div>
            <p>
                Si todo se ve bien, presiona "Guardar"
            </p>
            <Button>Guardar</Button>
            {/* <div className={styles.postedVideos}>
                <ProfileVideos ownerEmail={profileData.id} ownerName={profileData.name}/>
            </div> */}
        </div>
    )
}


const getGravatarURL = (email) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}

export default EditProfile;