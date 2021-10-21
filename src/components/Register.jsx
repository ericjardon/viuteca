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
                <div>
                    
                </div>
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
            </div>
        </div>
    )
}
