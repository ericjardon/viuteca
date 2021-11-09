import React, { useState, useEffect } from 'react'
import { Label, Input, Form, Button, Alert, Spinner } from 'reactstrap';
import { getAuth } from "firebase/auth";
import Video from '../firebase/videos'
import styles from './styles/NewVideo.module.scss';
import { useHistory } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore'
import { auth } from '../base'
import { AiOutlineCheckCircle } from 'react-icons/ai'

/* Component for the main screen with listed videos */
export default function VideoForm() {
    const [video, setVideo] = useState({
        title: '',
        durationMins: 15,
        durationSecs: 15,
        description: '',
        url: ''
    });
    const [showSpinner, setShowSpinner] = useState(false)
    let history = useHistory();
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(null);
    const redirect = () => {
        history.push('/videos')
    }

    /* FILE INPUT*/
    const [preview, setPreview] = useState() // optional
    const [file, setFile] = useState(null)
    const [uploadMsg, setUploadMsg] = useState("")

    const exceedsFileSize = (size) => size > 2000000

    const handleFileInput = (e) => {
        let f = e.target.files[0];
        if (!f) return;
        setFile(f);
    }


    const [uploadVideo, setUploadVideo] = useState(false);
    const handleOnClick = (e) => {
        setUploadVideo(true);
    }
    const handleOnChange = (e) => {
        if (e.target.name === 'durationMins' || e.target.name === 'durationSecs') {
            setVideo(prev => ({
                ...prev,
                [e.target.name]: Number(e.target.value)
            }))
        } else {
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
        setShowSpinner(true);
        let videoFinal = {
            ...video,
            title_lower: video.title.toLowerCase(),
            owner: auth.currentUser.email,
            likes: 0,
            dateAdded: Timestamp.fromDate(new Date()),
        }

        if (videoFinal.title === '' || videoFinal.description === '' || videoFinal.url === '') {
            setAlert(<Alert color="warning">Debes llenar todos los campos</Alert>)
            setShowAlert(true);
            setShowSpinner(false);
            return
        }
        if (videoFinal.owner === '' || videoFinal.dateAdded === '') {
            setAlert(<Alert color="warning">Algo salió mal, intenta de nuevo</Alert>)
            setShowAlert(true);
            setShowSpinner(false);

            console.log(video)
            return
        }

        const f = file;
        if (f && exceedsFileSize(f.size)) {
            setAlert(<Alert color="warning">El tamaño de la imagen debe ser menor a 2MB</Alert>)
            setShowSpinner(false);

            return
        }

        //SEND TO FIREBASE
        const dbRes = await Video.createVideo(videoFinal)
        if (dbRes.error) {
            console.log("Firestore error:", dbRes.error);

        } else {
            if (file) {
                const imgUpload = await Video.addImageToVideo(dbRes.id, file);
                if (imgUpload.error) {
                    console.error("imgUpload ERROR", imgUpload.error);
                } else {
                    console.log("Succesful image upload", imgUpload);
                    redirect()
                }
            }
        }
        setShowSpinner(false);

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.colClass}>
                <Form>
                    <div className={styles.rowClass}>
                        <Label className={styles.labelClass}>Titulo</Label>
                        <Input placeholder="Introduce el título del video." name="title" onChange={handleOnChange}></Input >
                    </div>
                    <div className={styles.rowClass}>
                        <Label className={styles.labelClass}>Minutos duración</Label>
                        <div className={styles.smallInput}><Input type="number" defaultValue="15" onChange={handleOnChange} name="durationMins"></Input></div>
                        <Label className={styles.labelClass}>Segundos Duración</Label>
                        <div className={styles.smallInput}><Input type="number" defaultValue="15" onChange={handleOnChange} name="durationSecs"></Input></div>
                    </div>
                    <div >
                        <Label className={styles.titleClass}>Descripción</Label>
                        <Input type="textarea" onChange={handleOnChange} name="description"></Input>
                    </div>
                </Form>
            </div>
            <div className={styles.colClass}>
                <Form>
                    <div>
                        <Label style={{ textAlign: "left" }}>Sube tu video a drive e ingresa su embed URL en este espacio</Label>
                    </div>
                    <div className={styles.rowClass}>
                        <Label className={styles.labelClass}>Video</Label>
                        <Input type="url" placeholder="Introduce el link." name="url" onChange={handleOnChange}></Input>
                        <div style={{ marginLeft: "0px" }}><Button md={4} style={{ backgrounddivor: "#D9CAB3", color: "black" }} onClick={handleOnClick}>Subir</Button></div>
                    </div>
                    {uploadVideo &&
                        <div >
                            <div className={styles.videoPlayer}>
                                <iframe src={video.url} className={styles.videoPlayer} allow="autoplay"></iframe>
                            </div>
                        </div>
                    }
                    <div>
                        <Label style={{ textAlign: "left" }}>Sube tu foto a drive e ingresa la liga en el siguiente espacio</Label>
                    </div>
                    <div className={styles.rowClass}>
                        <Label className={styles.labelClass} >Imagen {file ? <AiOutlineCheckCircle /> : ""}</Label>
                        <Input type="file" placeholder="Introduce el link." onChange={handleFileInput} name="img"></Input>
                    </div>
                    <div >
                        <div>
                            <Button style={{ backgrounddivor: "#D9CAB3", color: "black" }} onClick={tryCreate}>
                            {showSpinner? <Spinner color="light" children="" /> : "Publicar"}
                            </Button>
                        </div>
                    </div>
                </Form>
                {(showAlert && alert)}
            </div>
        </div>
    )
}
