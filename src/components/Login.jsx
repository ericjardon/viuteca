import React, { useState, useEffect } from 'react'
import './styles/onboarding.scss'
import { Button, Form, FormGroup, Label, Input, Spinner, Alert } from 'reactstrap';
import VButton from './VButton'
import photo from '../assets/viutecaLogoComplete.png'
import authManager, { validateLogin } from '../firebase/authManager';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin'

export default function Login(props) {

    const loggedIn = useLogin();

    const [redirect, setRedirect] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(null);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showSpinner, setShowSpinner] = useState(false);

    const handleOnChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await tryLogin();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await tryLogin();
    }

    const tryLogin = async () => {
        setShowAlert(false);

        let { valid } = validateLogin(form);
        if (!valid) {
            return;
        }

        setShowSpinner(true);

        const { email, password } = form;
        const { ok, error, data } = await authManager.signIn(email, password);

        // Successful login
        if (ok) {
            console.log("Successful login");
            setTimeout(() => setRedirect(true), 1000);
        }
        // Wrong credentials
        else {
            setShowSpinner(false);
            console.log("Could not log in", error);
            setAlert(<Alert color="warning">El correo o contraseña son incorrectos.</Alert>)
            setShowAlert(true);
        }
    }


    return (
        <>
            {(loggedIn && <Redirect to="/videos" />)} {/* show pulsing loading button until loggedIn returns */}
            <div className={"Main"}>
                <div className={"leftSide"}>
                    <Link to='/videos'>
                        <img src={photo} alt='ViutecaLogo' />
                    </Link>
                    <p id="copyright" className={"copyRight"}>Copyright © 2021, Viuteca</p>

                </div>
                <div className={"rightSide"}>
                    {(showAlert && alert)}
                    <div className={"formContainer"}>
                        <p className={"formHeader"}>¡Inicia sesión para publicar videos!</p>
                        <Form>
                            <FormGroup className={"formGroup"}>
                                <Label for="email">Correo:</Label>
                                <Input id="email" name="email" onChange={handleOnChange} onKeyDown={handleKeyDown} />
                            </FormGroup>
                            <FormGroup className={"formGroup"}>
                                <Label for="password">Contraseña:</Label>
                                <Input id="password" name="password" type="password" onChange={handleOnChange} onKeyDown={handleKeyDown} />
                            </FormGroup>
                            <VButton onClick={handleSubmit} className={"createAccount"} color="black">
                                {showSpinner ? <Spinner color="light" children="" /> : "Inicia Sesión"}
                            </VButton>
                        </Form>
                    </div>
                    <p>¿Aún no tienes cuenta? {" "}
                        <Link to='/register' className="onboardingLink">Crea una aquí.</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
