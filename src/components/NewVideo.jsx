import React, { useState, useEffect } from 'react'
import { Label, Input, Form, Button, Alert, Spinner } from 'reactstrap'
import { getAuth } from "firebase/auth"
import Video from '../firebase/videos'
import styles from './styles/NewVideo.module.scss'
import { useHistory } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'
import { auth } from '../base'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { refLink } from './styles/Home.module.scss'
import { MAX_LENGTH_TITLE, MONTH_NAMES_ES } from '../utils/constants'
import {getMonthName_ES, getMonthValue} from '../utils/dates'
import axios from 'axios';

/* Component for the main screen with listed videos */
export default function NewVideo() {
    const [video, setVideo] = useState({
        title: '',
        durationMins: 0,
        durationSecs: 0,
        durationHrs: 0,
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

    const [videoDate, setVideoDate] = useState({
        day:'',
        month:'',
        year:'',
    })

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

        setShowAlert(false);
    }

    const dateInputHandler = (e) => {
        setVideoDate({
            ...videoDate,
            [e.target.name]: e.target.value
        })
    } 

    const autoFillToday = (e) => {
        let today = new Date();
        setVideoDate({
            day: today.getDate(),
            month: MONTH_NAMES_ES[today.getMonth() + 1],
            year: today.getFullYear(),
        })  
    }

    const buildDate = () => {
        // month is a special case

        let parsedMonth = getMonthValue(videoDate.month);  // parse integer or name

        return (videoDate.year || '0000') + '-' + (parsedMonth || '00') + '-' + (videoDate.day || '00');
    }

    const tryCreate = async () => {
        //CHECK USER
        //let dateStr = (new Date()).toISOString().split('T')[0]
        setShowSpinner(true);
        setAlert(null);

        let dateStr = buildDate();

        let dt;
        try {
            let d = new Date(dateStr);
            if (d=='Invalid Date') throw d;

            dt = Timestamp.fromDate(d);

        } catch (e) {
            console.log(e);
            console.log(dateStr);
            setAlert(<Alert color="warning">Por favor ingresa una fecha v??lida.</Alert>)
            setShowAlert(true);
            setShowSpinner(false);
            return
        }

        let videoFinal = {
            ...video,
            title_lower: video.title.toLowerCase(),
            owner: auth.currentUser.email,
            likes: 0,
            dateAdded: dt,
        }

        if (videoFinal.title === '' || videoFinal.description === '' || videoFinal.url === '') {
            setAlert(<Alert color="warning">Debes llenar todos los campos</Alert>)
            setShowAlert(true);
            setShowSpinner(false);
            return
        }

        if (videoFinal.title.length > MAX_LENGTH_TITLE) {
            setAlert(<Alert color="warning">El t??tulo no debe exceder 50 caracteres</Alert>)
            setShowAlert(true);
            setShowSpinner(false);
            return
        }

        if (videoFinal.owner === '' || videoFinal.dateAdded === '') {
            setAlert(<Alert color="warning">Algo sali?? mal, intenta de nuevo</Alert>)
            setShowAlert(true);
            setShowSpinner(false);


            return
        }

        const f = file;
        if (f && exceedsFileSize(f.size)) {
            setAlert(<Alert color="warning">El tama??o de la imagen debe ser menor a 2MB</Alert>)
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
                    setAlert(<Alert color="warning">??Ups! Hubo un error al cargar la imagen. Intenta de nuevo.</Alert>)
                    setShowSpinner(false);
                } else {
                    console.log("Succesful image upload", imgUpload);
                    await createToSQL(videoFinal, dateStr, imgUpload.url);
                    redirect()
                }
            } else {
                // Upload to SQL
                await createToSQL(videoFinal, dateStr);
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
                        <p className={styles.formSubtitle}>T??tulo</p>
                        <div className={styles.rowClass}>
                            <Input placeholder="T??tulo del video" name="title" onChange={handleOnChange}></Input >
                        </div>
                        <p className={styles.formSubtitle}>Fecha del Video</p>
                        <div className={styles.VideoDate}>
                            <div className={styles.rowClassDate}>
                                <Label className={styles.dateLabelClass}>D??a:</Label>
                                <div className={styles.smallInput}><Input type="number" placeholder='02' value={videoDate.day} defaultValue="" min="1" max="31" onChange={dateInputHandler} name="day"></Input></div>
                                <Label className={styles.dateLabelClass}>Mes:</Label>
                                <div className={styles.dateInput}><Input type="string" placeholder='marzo' value={videoDate.month} defaultValue="" min="1" max="12" onChange={dateInputHandler} name="month"></Input></div>
                                <Label className={styles.dateLabelClass}>A??o:</Label>
                                <div className={styles.dateInput}><Input type="number" placeholder='2022' value={videoDate.year} defaultValue="" min="1999" max="2025" onChange={dateInputHandler} name="year"></Input></div>
                            </div>
                                <p onClick={autoFillToday}
                                    className={styles.autoFillToday}>
                                    Hoy
                                </p>
                        </div>
                        <p className={styles.formSubtitle}>Duraci??n</p>
                        <div className={styles.rowClass}>
                            <Label className={styles.labelClass}>Horas:</Label>
                            <div className={styles.smallInput}><Input type="number" defaultValue="0" min="0" max="5" onChange={handleOnChange} name="durationHrs"></Input></div>
                            <Label className={styles.labelClass}>Minutos:</Label>
                            <div className={styles.smallInput}><Input type="number" defaultValue="0" min="0" max="59" onChange={handleOnChange} name="durationMins"></Input></div>
                            <Label className={styles.labelClass}>Segundos:</Label>
                            <div className={styles.smallInput}><Input type="number" defaultValue="0" min="0" max="59" onChange={handleOnChange} name="durationSecs"></Input></div>
                        </div>
                        <div >
                            <p className={styles.formSubtitle}>Descripci??n</p>
                            <Input placeholder="Cu??ntanos de qu?? trata..." type="textarea" onChange={handleOnChange} name="description"></Input>
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

const createToSQL = async (videoData, dt, img_url = null) => {
    console.log("Video object");
    console.log(videoData);
    console.log('current uid', auth.currentUser?.uid);
    console.log('dt string', dt);
    let video = {
        dt,
        img_url,
        duration_hrs: videoData.durationHrs ?? null,
        duration_mins: videoData.durationMins ?? null,
        duration_secs: videoData.durationSecs ?? null,
        likes: videoData.likes ?? 0,
        profile_id: auth.currentUser?.uid,
        title: videoData.title,
        description: videoData.description,
        video_url: videoData.url
    }

    return axios.post('https://viuteca-api.herokuapp.com/videos/', video)
    .then(res => {
        console.log("Saved to PG Database")
        console.log(res);
    })
    .catch(err => {
        console.error("Error saving to database")
        console.log(err);
    })
}