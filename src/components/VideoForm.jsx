import React, { useState } from 'react'
import { Label, Input,  Form,  Button, Alert } from 'reactstrap';
import { getAuth } from "firebase/auth";
import Video from '../firebase/videos'
import styles from './styles/NewVideo.module.scss';
import { useHistory } from 'react-router-dom';
/* Component for the main screen with listed videos */
export default function VideoForm() {
    const [video, setVideo] = useState({
        title : '',
        durationMins: '',
        durationSecs: 15,
        description : 15,
        owner: '',
        img: '',
        url: '',
        likes: 0,
        dateAdded: ''
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
        setVideo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setShowAlert(false);
    }

    const tryCreate = async () => {
        //CHECK USER
        const auth = getAuth();
        const user = auth.currentUser.email;
        if (user) {
            //CHECK DATE
            var currentdate = new Date(); 
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"
            ];
            var actualDate = await Date(currentdate.getDate() + " de "
            + monthNames[currentdate.getMonth()]  + " de " 
            + currentdate.getFullYear() + ", "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds() + " UTC-5")

            await setVideo(prev => ({
                ...prev,
                dateAdded: actualDate,
                durationMins: Number(video.durationMins),
                durationSecs: Number(video.durationSecs),
                owner: user
            }))
        } else {
            console.log("Problemas con el auth")
            return false;
        }
        if(video.title === '' || video.description === '' || video.img === '' || video.url ===''){
            setAlert(<Alert color="warning">Debes llenar todos los campos</Alert>)
            setShowAlert(true);
            return
        }
        //SEND TO FIREBASE
        const dbRes = await Video.createVideo(video)
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
