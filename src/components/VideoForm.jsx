import React, { useState, useEffect  } from 'react'
import { Label, Input,  Form,  Button, Alert } from 'reactstrap';
import { getAuth } from "firebase/auth";
import Video from '../firebase/videos'
import styles from './styles/NewVideo.module.scss';
import { useHistory } from 'react-router-dom';
import {  Timestamp } from 'firebase/firestore'
import { auth} from '../base'
/* Component for the main screen with listed videos */
export default function VideoForm() {
    const [video, setVideo] = useState({
        title : '',
        durationMins: 15,
        durationSecs: 15,
        description : '',
        img: '',
        url: ''
    });
    let history = useHistory();
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(null);
    const redirect = () => {
        history.push('/videos')
    }

    const [uploadVideo, setUploadVideo] = useState(false);
    const handleOnClick = (e) => {
        setUploadVideo(true);
    }
    const handleOnChange = (e) => {
        if(e.target.name === 'durationMins' || e.target.name === 'durationSecs'){
            setVideo(prev => ({
                ...prev,
                [e.target.name]: Number(e.target.value)
            }))
        }else{
            setVideo(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
        console.log(video)
        setShowAlert(false);
    }

    const tryCreate = async () => {
        //CHECK USER
        let videoFinal = {
            ...video,
            owner: auth.currentUser.email,
            likes: 0,
            dateAdded: Timestamp.fromDate(new Date()),
        } 

            
        if(videoFinal.title === '' || videoFinal.description === '' || videoFinal.img === '' || videoFinal.url ===''){
            setAlert(<Alert color="warning">Debes llenar todos los campos</Alert>)
            setShowAlert(true);
            return
        }
        if(videoFinal.owner === '' || videoFinal.dateAdded === ''){
            setAlert(<Alert color="warning">Algo salió mal, intenta de nuevo</Alert>)
            setShowAlert(true);
            console.log(video)
            return
        }
        //SEND TO FIREBASE
        const dbRes = await Video.createVideo(videoFinal)
        if (dbRes.error === undefined) {
            redirect()
        } else {
            console.log("Firestore error:", dbRes.error);
        }

    }

    return (
            <div className={styles.wrapper}>
                <div  className={styles.colClass}>
                    <Form>
                        <div className={styles.rowClass}>
                            <Label className={styles.labelClass}>Titulo</Label>
                            <Input placeholder="Introduce el título del video." name="title" onChange={handleOnChange}></Input >
                        </div>
                        <div className={styles.rowClass}>
                            <Label className={styles.labelClass}>Minutos duración</Label>
                            <div className={styles.smallInput}><Input type="number"  defaultValue="15" onChange={handleOnChange} name="durationMins"></Input></div>
                            <Label  className={styles.labelClass}>Segundos Duración</Label>
                            <div className={styles.smallInput}><Input type="number" defaultValue="15" onChange={handleOnChange} name="durationSecs"></Input></div>
                        </div>
                        <div >
                            <Label className={styles.titleClass}>Descripción</Label>
                            <Input type="textarea" onChange={handleOnChange} name="description"></Input>
                        </div>
                    </Form>
                </div>
                <div  className={styles.colClass}>
                    <Form>
                        <div>
                            <Label style={{textAlign:"left"}}>Sube tu video a drive e ingresa la liga en el siguiente espacio</Label>
                        </div>
                        <div className={styles.rowClass}>
                            <Label className={styles.labelClass}>Video</Label>
                            <Input type="url" placeholder="Introduce el link." name="url" onChange={handleOnChange}></Input>
                        <div style={{marginLeft:"0px"}}><Button md={4} style={{backgrounddivor:"#D9CAB3", color:"black"}} onClick={handleOnClick}>Subir</Button></div>
                        </div>
                        {uploadVideo &&
                            <div >
                                <div className={styles.videoPlayer}>
                                    <iframe src={video.url} className={styles.videoPlayer} allow="autoplay"></iframe>
                                </div>
                            </div>
                        }
                        <div>
                            <Label style={{textAlign:"left"}}>Sube tu foto a drive e ingresa la liga en el siguiente espacio</Label>
                        </div>
                        <div className={styles.rowClass}>
                            <Label className={styles.labelClass} >Imagen</Label>
                            <Input type="url" placeholder="Introduce el link." onChange={handleOnChange} name="img"></Input>
                        </div>
                        <div >
                            <div>
                                <Button style={{backgrounddivor:"#D9CAB3", color:"black", width:"22%"}} onClick={tryCreate}>Publicar</Button>
                            </div>
                        </div>
                    </Form>
                    {(showAlert && alert)}
                </div>
            </div>
    )
}
