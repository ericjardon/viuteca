import React, { useState, useEffect } from 'react'
import md5 from 'md5'
import './styles/VideosDisplay.scss'
import styles from './styles/GroupProfile.module.scss'
import { Spinner, Button, Input } from 'reactstrap'
import Group from '../firebase/groups'
import Tag from './Tag'
import { AiTwotoneEdit, AiFillSave } from 'react-icons/ai'
import { DEFAULT_BIO, EXAMPLE_TAGS } from '../utils/defaultCopies'
import { Redirect } from 'react-router'
import {auth} from '../base'
import { equalSets } from '../utils/math'

// import ProfileVideos from './ProfileVideos'

const EditProfile = (props) => {

    const [profileData, setprofileData] = useState({
        id: null,
        name: null,
        desc: null,
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
        const groupId = props.match.params.id;
        console.log("Group id", groupId);
        async function fetchData() {
            const group = await Group.getGroupById(groupId);
            console.log("Profile Data:\n", group)

            if (group.error) {
                setLoading(false)
                seterrorNotFound(group.error);
                return
            }
            group.id = groupId;
            setprofileData(group);
            setOriginalData(group);

            setLoading(false);
            setProfilePicURL(getGravatarURL(groupId));
            const currentUser = auth.currentUser
            if (currentUser) {
                setisOwner(groupId == currentUser.email)
            } else {
                setisOwner(false);
            }

            if (group.tags) {
                setTags(group.tags);
                setOriginalTags(group.tags);
            } 
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
    }

    const handleTagInput = (event) => {
        setcurrentTag(event.target.value);
    }

    const onSave = async () => {
        setShowSpinner(true);
        if (dataDidChange(originalData, profileData) || tagsDidChange(originalTags, tags)) {

            const data = {
                ...profileData,
                tags
            }

            const res = await Group.updateGroup(data);
            if (res.ok) {
                console.log("Updated Succesfully!");
                // redirect
                setInterval(() => {
                    setShowSpinner(false);
                    setRedirect(true)
                }, 1000);

            } else {
                console.log("Something went wrong", res.error);
                setShowSpinner(false);
            }
        } else {
            console.log("No data to update");
            setShowSpinner(false);
        }
    }

    
    const validateCurrentTag = () => {
        return currentTag.length > 26;
    }

    const addTag = () => {        
        setTags((tags) => [...tags, currentTag]);
    }

    const deleteTag = (index) => {
        console.log("deleting", tags[index]);
        setTags(tags.filter((tag, i) => i !== index));
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
                    <p contenteditable="True" id="desc" onBlur={handleOnChange} className={styles.profileDesc}>
                        {profileData.desc ||
                            DEFAULT_BIO(profileData.name)}  <AiTwotoneEdit />
                    </p>
                    <div className={styles.tagsInputContainer}>
                        <Input 
                            value={currentTag} 
                            type="text" 
                            placeholder="Categorías..." 
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

            <Button style={{padding:'10px 15px', width:'92px'}} onClick={onSave}>{showSpinner? <Spinner color="light" children="" /> : "Guardar"}</Button>

        </div>
    )
}

const dataDidChange = (oldData, newData) => JSON.stringify(oldData) !== JSON.stringify(newData);
const tagsDidChange = (oldTags, newTags) => !equalSets(new Set(oldTags), new Set(newTags));

const getGravatarURL = (email) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}

export default EditProfile;