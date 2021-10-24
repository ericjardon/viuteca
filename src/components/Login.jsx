import React, { useState } from 'react'
import './styles/onboarding.scss'
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import photo from '../assets/viutecaLogoComplete.png'
import authManager from '../firebase/authManager';

export default function Login(props) {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const [showSpinner, setShowSpinner] = useState(false);

    const handleOnChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSpinner(true);
        const {email, password} = form;
        const resp = authManager.signIn(email, password);
        console.log("Resp", resp);
    }

    return (
        <div className={"Main"}>
            <div className={"leftSide"}>

                <img src={photo} alt='ViutecaLogo' />
                <p id="copyright" className={"copyRight"}>Copyright © 2021, Viuteca</p>

            </div>
            <div className={"rightSide"}>
                <div className={"formContainer"}>
                <p className={"formHeader"}>¡Inicia sesión para continuar subiendo videos!</p>
                    <Form>
                        <FormGroup className={"formGroup"}>
                            <Label for="email">Correo:</Label>
                            <Input id="email" name="email" onChange={handleOnChange} />
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="password">Contraseña:</Label>
                            <Input id="password" name="password" type="password" onChange={handleOnChange} />
                        </FormGroup>
                        <Button onClick={handleSubmit} className={"createAccount"}>
                            {showSpinner? <Spinner color="light" children="" /> : "Inicia Sesión"}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
