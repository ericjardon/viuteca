import React, { useState } from 'react'
import './styles/onboarding.scss'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import photo from '../assets/viutecaLogoComplete.png'
export default function Register(props) {

    const [form, setForm] = useState({
        email: "",
        studentGroup: "",
        password: "",
        confirmPassword: "",
    })

    const handleOnChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        console.dir(form);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className={"Main"}>
            <div className={"leftSide"}>

                <img src={photo} alt='ViutecaLogo' />
                <p id="copyright" className={"copyRight"}>Copyright © 2021, Viuteca</p>

            </div>
            <div className={"rightSide"}>
                <div className={"formContainer"}>
                    <Form>
                        <FormGroup className={"formGroup"}>
                            <Label for="email">Correo:</Label>
                            <Input id="email" onChange={handleOnChange} />
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="studentGroup">Asociación:</Label>
                            <Input id="studentGroup" onChange={handleOnChange} />
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="password">Contraseña:</Label>
                            <Input id="password" type="password" onChange={handleOnChange} />
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="confirmPassword" >Confirma tu contraseña:</Label>
                            <Input id="confirmPassword" type="password" onChange={handleOnChange} />
                        </FormGroup>
                        <Button onClick={handleSubmit} className={"createAccount"}>Crear Cuenta</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
