import React, {useState, useEffect} from 'react'
import md5 from 'md5'
import styles from './styles/Profile.module.scss'
import {Spinner, Button} from 'reactstrap'
import Tag from './Tag'
import SocialMedia from './SocialMedia'
import ProfileVideos from './ProfileVideos'
import { auth } from '../base'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { DEFAULT_BIO } from '../utils/constants'
import {getProfile} from '../models/profiles'
import {emails} from '../utils/ids_temp';

const Profile = (props) => {
    const [profileData, setprofileData] = useState({
        name:'',
        description:'',
        tags: ["Grupo Estudiantil", "ITESM"],
        ig:'',
        fb:'',
    });
    const [loading, setLoading] = useState(true);

    const [errorNotFound, seterrorNotFound] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState("");

    const [isOwner, setisOwner] = useState(false);

    // FETCH THE GROUP PROFILE DATA FROM URL
    useEffect(() => {
        const groupUid = props.match.params.id;  // holds fb uid
        console.log("Group id", groupUid);
        const email = emails[groupUid];

        async function fetchData() {
            
            getProfile(groupUid).then(data => {
                console.log('PG Profile:\n', data)
                setprofileData(data);
                setLoading(false);
                setProfilePicURL(getGravatarURL(data.email));

                const currentUser = auth.currentUser
                if (currentUser) {
                    console.log("Is profile owner");
                    setisOwner(data.email == currentUser.email)
                }

                
            }).catch((err) => {
                console.log('error fetching profile');
                seterrorNotFound(JSON.stringify(err));
                setLoading(false);
            });
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
                        {profileData.description ||
                            DEFAULT_BIO(profileData.name)}
                    </p>
                    <SocialMedia ig={profileData.ig} fb={profileData.fb}/>
                    <div className={styles.categories}>
                        {profileData.tags.map((t, i) => <Tag key={i}>{t}</Tag>)}
                    </div>
                    {isOwner && (<div className={styles.editBtnContainer}>
                        <Link to={profileData.id ? `/p/edit/${profileData.id}` : ''}>
                        <Button className={styles.editBtn}>Editar <AiTwotoneEdit/></Button>
                        </Link>
                    </div>)}
                </div>
            </div>

            <div className={styles.postedVideos}>
                <ProfileVideos ownerUid={profileData.id} ownerName={profileData.name}/>
            </div>
        </div>
    )
}


const getGravatarURL = (email) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}

export default Profile;