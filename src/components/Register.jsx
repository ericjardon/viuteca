import React, { useState } from 'react'
import './styles/onboarding.scss'
import { Button, Form, FormGroup, Label, Input, Alert, Spinner } from 'reactstrap';
import photo from '../assets/viutecaLogoComplete.png'
import {Redirect, Link} from 'react-router-dom'
import authManager, {validateRegister} from '../firebase/authManager'
import Group from '../firebase/groups'
import {auth} from '../base'

export default function Register(props) {

    const [form, setForm] = useState({
        email: "",
        studentGroup: "",
        password: "",
        confirmPassword: "",
    })

    const [formErrors, setformErrors] = useState({
        email: "",
        studentGroup: "",
        password: "",
        confirmPassword: "",
    })

    
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(null);
    const [redirect, setredirect] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const handleOnChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await tryRegister();
        }
    }

    const tryRegister = async () => {
        setShowAlert(false);


        let {errors, valid} = validateRegister(form);
        if (!valid) {
            setformErrors(errors);
            console.log("Invalid inputs");
            console.log("Errors:", errors);
            return;
        }

        setShowSpinner(true);

        const {email, password, confirmPassword} = form;
        
        if (password !== confirmPassword) {
            setAlert(<Alert color="warning">Las contraseñas ingresadas no coinciden.</Alert>)
            setShowAlert(true);
            return;    
        }

        // 1. Create new Auth account
        const authRes = await authManager.register(email, password);
        console.log("authRes:", authRes);

        if (authRes.ok) {
            // 2. If auth ok, insert new group record to firestore
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
            setShowSpinner(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await tryRegister();
    }

    if (redirect) return <Redirect to='/'/>

    return (
        <div className={"Main"}>
            <div className={"leftSide"}>
                <img src={photo} alt='ViutecaLogo' />
                <p id="copyright" className={"copyRight"}>Copyright © 2021, Viuteca</p>
            </div>

            <div className={"rightSide"}>
                <div className={"formContainer"}>
                <p className={"formHeader-Register"}>Crea la cuenta de tu Asociación o Grupo Estudiantil.</p>
                    <Form>
                        <FormGroup className={"formGroup"}>
                            <Label for="email">Correo:</Label>
                            <Input id="email" name="email" onChange={handleOnChange}/>
                            <p className="registerErrorMsg">{formErrors.email}</p>
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="studentGroup">Nombre de Grupo/Asociación:</Label>
                            <Input id="studentGroup" name="studentGroup" onChange={handleOnChange}/>
                            <p className="registerErrorMsg">{formErrors.studentGroup}</p>
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="password">Contraseña:</Label>
                            <Input id="password" name="password" type="password" onChange={handleOnChange}/>
                            <p className="registerErrorMsg">{formErrors.password}</p>
                        </FormGroup>
                        <FormGroup className={"formGroup"}>
                            <Label for="confirmPassword" >Confirma tu contraseña:</Label>
                            <Input id="confirmPassword" name="confirmPassword" type="password" onChange={handleOnChange} onKeyDown={handleKeyDown}/>
                            <p className="registerErrorMsg">{formErrors.confirmPassword}</p>
                        </FormGroup>
                        <Button onClick={handleSubmit} className={"createAccount"}>
                            {showSpinner? <Spinner color="light" children="" /> : "Crear Cuenta"}
                        </Button>
                    </Form>
                </div>
                {showAlert && alert}
                <p>¿Ya tienes cuenta? {" "} 
                    <Link to='/login' className="onboardingLink">Inicia sesión aquí.</Link>
                </p>
            </div>
        </div>
    )
}
