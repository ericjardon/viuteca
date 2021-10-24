import React, { useState } from 'react'
import './styles/onboarding.scss'
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import photo from '../assets/viutecaLogoComplete.png'
import {Redirect, Link} from 'react-router-dom'
import AuthManager from '../firebase/authManager'
import Group from '../firebase/groups'
import useLogin from '../hooks/useLogin'

export default function Register(props) {

    const [form, setForm] = useState({
        email: "",
        studentGroup: "",
        password: "",
        confirmPassword: "",
    })

    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(null);
    const [alertText, setAlertText] = useState("");
    const [redirect, setredirect] = useState(false);

    const handleOnChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAlert(false);
        const {email, password, confirmPassword} = form;

        if (password !== confirmPassword) {
            setAlert(<Alert color="warning">Las contraseñas ingresadas no coinciden.</Alert>)
            setShowAlert(true);
            return;    
        }

        const authRes = await AuthManager.register(email, password);
        console.log(authRes);

        if (authRes.ok) {
            // Save the new group instance to firestore
            const groupData = {
                name: form.studentGroup,
            }

            const dbRes = await Group.createGroup(email, groupData)
            if (dbRes.ok) {
                setAlert(<Alert color="primary">Tu cuenta fue creada con éxito.</Alert>)
                setShowAlert(true);

                setTimeout(() => setredirect(true), 2000);

            } else {
                console.log("Firestore error:", dbRes.error);
                setAlert(<Alert color="warning">{dbRes.error}</Alert>)
                setShowAlert(true);
            }
            
        } else {
            console.log("Firebase Auth error:", authRes.error);
            setAlert(<Alert color="warning">{authRes.error}</Alert>)
            setShowAlert(true);
        }
    }

    const {loggedIn} = useLogin();

    if (loggedIn) return <Redirect to='/'/>
    if (redirect) return <Redirect to='/'/>

    return (
        <div className={"Main"}>
            <div className={"leftSide"}>
                <img src={photo} alt='ViutecaLogo' />
                <p id="copyright" className={"copyRight"}>Copyright © 2021, Viuteca</p>
            </div>

            <div className={"rightSide"}>
                <div className={"formContainer"}>
                <p className={"formHeader"}>Crea la cuenta de tu Asociación o Grupo Estudiantil.</p>
                    <Form>
                        <FormGroup className={"formGroup"}>
                            <Label for="email">Correo:</Label>
                            <Input id="email" name="email" onChange={handleOnChange} />
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="studentGroup">Nombre de Grupo/Asociación:</Label>
                            <Input id="studentGroup" name="studentGroup" onChange={handleOnChange} />
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="password">Contraseña:</Label>
                            <Input id="password" name="password" type="password" onChange={handleOnChange} />
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="confirmPassword" >Confirma tu contraseña:</Label>
                            <Input id="confirmPassword" name="confirmPassword" type="password" onChange={handleOnChange} />
                        </FormGroup>
                        <Button onClick={handleSubmit} className={"createAccount"}>Crear Cuenta</Button>
                    </Form>
                </div>
                {showAlert && alert}
            </div>
        </div>
    )
}
