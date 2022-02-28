import React, { useState, useEffect } from 'react'
import md5 from 'md5'
import './styles/VideosDisplay.scss'
import styles from './styles/Profile.module.scss'
import { Spinner, Button, Input } from 'reactstrap'
import Group from '../firebase/groups'
import Tag from './Tag'
import SocialMediaEdit from './SocialMediaEdit'
import { AiTwotoneEdit, AiOutlineSave } from 'react-icons/ai'
import { DEFAULT_BIO, MAX_CATEGORIES } from '../utils/constants'
import { Redirect } from 'react-router'
import {auth} from '../base'
import { equalSets } from '../utils/math'
import {getProfile, updateProfile} from '../models/profiles'
import {emails} from '../utils/ids_temp'

// import ProfileVideos from './ProfileVideos'

const EditProfile = (props) => {

    const [profileData, setprofileData] = useState({
        id: null,
        name: null,
        email: null,
        description: null,
        fb: null,
        ig: null,
    });

    const [tags, setTags] = useState([])
    const [currentTag, setcurrentTag] = useState("")

    const [loading, setLoading] = useState(true);

    const [errorNotFound, seterrorNotFound] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState("");

    const [originalData, setOriginalData] = useState(null);
    const [originalTags, setOriginalTags] = useState([]);
    const [isOwner, setisOwner] = useState(true);

    const [showSpinner, setShowSpinner] = useState(false);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        const groupUid = props.match.params.id;
        //const email = emails[groupUid];
        async function fetchData() {
            getProfile(groupUid).then(data => {
                console.log('PG Profile:\n', data)
                setprofileData(data);
                setOriginalData(data);
                setLoading(false);

                setProfilePicURL(getGravatarURL(data.email));
    
                if (data.tags) {
                    setTags(data.tags);
                    setOriginalTags(data.tags);
                }

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

        // async function fetchData() {
            // const group = await Group.getGroupById(groupId);
        //     console.log("Profile Data:\n", group)

        //     if (group.error) {
        //         setLoading(false)
        //         seterrorNotFound(group.error);
        //         return
        //     }
        //     group.id = groupId;
        //     setprofileData(group);
        //     setOriginalData(group);

        //     setLoading(false);
        //     setProfilePicURL(getGravatarURL(groupId));
        //     const currentUser = auth.currentUser
        //     if (currentUser) {
        //         setisOwner(groupId == currentUser.email)
        //     } else {
        //         setisOwner(false);
        //     }

        //     if (group.tags) {
        //         setTags(group.tags);
        //         setOriginalTags(group.tags);
        //     } 
        // }

        fetchData();
    }, []);

    const profileImage = () => {
        return {
            backgroundImage: `url(${profilePicURL})`,
        }
    }

    const handleOnChange = (event) => {
        console.log('Updated profileData');
        console.log(profileData);
        setprofileData({
            ...profileData,
            [event.target.id]: event.target.textContent,
        });
    }

    const handleSMChange = (event) => {
        setprofileData({
            ...profileData,
            [event.target.id]: event.target.value,
        });
    }

    const handleTagInput = (event) => {
        setcurrentTag(event.target.value);
    }

    
    const validateCurrentTag = () => {
        return currentTag.length > 26;
    }

    const addTag = () => {  
        if (tags.length +1 > MAX_CATEGORIES) return;  // add sound effects?

        setTags((tags) => [...tags, currentTag]);
        setcurrentTag("");
    }

    const deleteTag = (index) => {
        console.log("deleting", tags[index]);
        setTags(tags.filter((tag, i) => i !== index));
    }

    const onSave = async () => {
        console.log("profile to submit:");
        console.dir(profileData);
        console.log(tags);
        setShowSpinner(true);

        if (dataDidChange(originalData, profileData) || tagsDidChange(originalTags, tags)) {
            if (!profileData.name) {
                console.log("El nombre no puede estar vacío.")
                setShowSpinner(false);
                return;
            }

            // remove @ for fb and ig vals
            if (profileData.fb && profileData.fb.startsWith('@')) {
                profileData.fb = profileData.fb.slice(1);
            }
            if (profileData.ig && profileData.ig.startsWith('@')) {
                profileData.ig = profileData.ig.slice(1);
            }

            // Overwrite previous tags
            profileData.tags = tags;

            updateProfile(profileData).then(result => {
                console.log(result);
                // redirect on succesful update
                setInterval(() => {
                    setShowSpinner(false);
                    setRedirect(true)
                }, 1000);

            }).catch(err => {
                console.log("Something went wrong", err);
                setShowSpinner(false);            
            })

        } else {
            console.log("No data to update");
            setShowSpinner(false);
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

    if (!isOwner) return <Redirect to='/404'/>

    if (redirect) return <Redirect to={`/p/${profileData.id}`}/>

    return (
        <div className={styles.containerEP}>
            <p class={styles.PageTitle}>Editar Información</p>
            <p>
                Puedes escribir en el texto que deseas modificar. <br/> 
                Si todo se ve bien, presiona "Guardar"
            </p>
            <div className={styles.editProfileCard}>
                <div className={styles.profilePicDummy}>
                    <div className={styles.profilePic} style={profileImage()}></div>
                </div>
                <div className={styles.nameAndDesc}>
                    <p contenteditable="True" id="name" onBlur={handleOnChange} className={styles.profileName}>{profileData.name}  <AiTwotoneEdit /></p>
                    <p contenteditable="True" id="description" onBlur={handleOnChange} className={styles.profileDesc}>
                        {profileData.description ||
                            DEFAULT_BIO(profileData.name)}  <AiTwotoneEdit />
                    </p>

                    <SocialMediaEdit ig={profileData.ig} fb={profileData.fb} handleChange={handleSMChange}/>

                    <div className={styles.tagsInputContainer}>
                        <Input 
                            value={currentTag} 
                            type="text" 
                            placeholder="Agrega hasta 5 categorías..." 
                            onChange={handleTagInput}
                            invalid={validateCurrentTag()}>
                        </Input>
                        <div style={{ paddingLeft: "12px" }}><Button md={4} onClick={addTag}>+</Button></div>
                    </div>
                    <div className={styles.categories}>
                        {tags.map((t, index) => <Tag key={index} deleteSelf={()=>deleteTag(index)} editMode>{t}</Tag>)}
                    </div>
                </div>
            </div>

            <Button style={{padding:'10px 15px', width:'120px'}} onClick={onSave}>
                {showSpinner? <Spinner color="light" children="" /> : <>Guardar <AiOutlineSave/></>}
            </Button>

        </div>
    )
}


const dataDidChange = (oldData, newData) => JSON.stringify(oldData) !== JSON.stringify(newData);
const tagsDidChange = (oldTags, newTags) => !equalSets(new Set(oldTags), new Set(newTags));

const getGravatarURL = (email) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}

export default EditProfile;