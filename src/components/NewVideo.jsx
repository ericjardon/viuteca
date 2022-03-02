import React, { useState, useEffect } from 'react'
import { Label, Input, Form, Button, Alert, Spinner } from 'reactstrap';
import { getAuth } from "firebase/auth";
import Video from '../firebase/videos'
import styles from './styles/NewVideo.module.scss';
import { useHistory } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore'
import { auth } from '../base'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { refLink } from './styles/Home.module.scss';
import { MAX_TITLE_LENGTH } from '../utils/constants';

/* Component for the main screen with listed videos */
export default function NewVideo() {
    const [video, setVideo] = useState({
        title: '',
        duration_mins: 0,
        duration_secs: 0,
        duration_hrs: 0,
        description: '',
        video_url: '',
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
        if (e.target.name === 'durationMins' || e.target.name === 'durationSecs' || e.target.name === 'durationHrs') {
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
        let dateStr = (new Date()).toISOString().split('T')[0]

        setShowSpinner(true);
        let videoFinal = {
            ...video,
            title_lower: video.title.toLowerCase(),
            owner: auth.currentUser.email,
            likes: 0,
            dateAdded: Timestamp.fromDate(new Date(dateStr)),
        }

        if (videoFinal.title === '' || videoFinal.description === '' || videoFinal.url === '') {
            setAlert(<Alert color="warning">Debes llenar todos los campos</Alert>)
            setShowAlert(true);
            setShowSpinner(false);
            return
        }

        if (videoFinal.title.length > 50) {
            setAlert(<Alert color="warning">El título no debe exceder 50 caracteres</Alert>)
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
            } else {
                redirect()
            }
        }
        setShowSpinner(false);

    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.colClass}>
                    <p className={styles.PageTitle}>Nuevo Video</p>
                    <Form>
                        <p className={styles.formSubtitle}>Título</p>
                        <div className={styles.rowClass}>
                            <Input placeholder="Título del video" name="title" onChange={handleOnChange}></Input >
                        </div>
                        <p className={styles.formSubtitle}>Duración</p>
                        <div className={styles.rowClass}>
                            <Label className={styles.labelClass}>Horas:</Label>
                            <div className={styles.smallInput}><Input type="number" defaultValue="0" min="0" max="5" onChange={handleOnChange} name="durationHrs"></Input></div>
                            <Label className={styles.labelClass}>Minutos:</Label>
                            <div className={styles.smallInput}><Input type="number" defaultValue="0" min="0" max="59" onChange={handleOnChange} name="durationMins"></Input></div>
                            <Label className={styles.labelClass}>Segundos:</Label>
                            <div className={styles.smallInput}><Input type="number" defaultValue="0" min="0" max="59" onChange={handleOnChange} name="durationSecs"></Input></div>
                        </div>
                        <div >
                            <p className={styles.formSubtitle}>Descripción</p>
                            <Input placeholder="Cuéntanos de qué trata..." type="textarea" onChange={handleOnChange} name="description"></Input>
                        </div>
                    </Form>
                </div>
                <div className={styles.colClass}>
                    <Form>
                        <div>
                            <p className={styles.formSubtitle}>Ingresa el{' '}
                                <a className={refLink}
                                    href="https://interesting-ground-e69.notion.site/Subir-un-video-a-Viuteca-5831b4fce9e4407ab730491c3f0c6241"
                                    target="_blank" rel="noreferrer">URL de embed</a>
                                {' '}de tu video en este espacio</p>
                        </div>
                        <div className={styles.rowClass}>
                            <Label className={styles.labelClass}>Video</Label>
                            <Input type="url" placeholder="Introduce el link." name="url" onChange={handleOnChange}></Input>
                            <div style={{ marginLeft: "0px" }}><Button md={4} onClick={handleOnClick}>Subir</Button></div>
                        </div>
                        {uploadVideo &&
                                <div className={styles.videoPlayer}>
                                <iframe src={video.url} className={styles.videoPlayer} allow="autoplay"></iframe>
                            </div>
                        }
                        <div>
                            <p className={styles.formCaption}>Opcionalmente, sube una imagen de vista previa.</p>
                        </div>
                        <div className={styles.rowClass}>
                            <Label className={styles.labelClass} >Imagen {file ? <AiOutlineCheckCircle /> : ""}</Label>
                            <Input type="file" placeholder="Introduce el link." onChange={handleFileInput} name="img"></Input>
                        </div>
                        <div >
                            <div>
                                <Button color="primary" onClick={tryCreate}>
                                    {showSpinner ? <Spinner color="light" children="" /> : "Publicar"}
                                </Button>
                            </div>
                        </div>
                    </Form>
                    {(showAlert && alert)}
                </div>
            </div>
        </div>

    )
}
