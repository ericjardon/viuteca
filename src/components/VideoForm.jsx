import React from 'react'
import { Redirect } from 'react-router';
import {auth} from '../base'
import { Container, Row, Col, Label, Input, FormGroup, Form, CustomInput } from 'reactstrap';
import controller from '../firebase/groups';

/* Component for the main screen with listed videos */
export default function VideoForm() {
    return (
        <Container>
            <Row>
                <Col xs='6'>
                    <Form style={{marginTop:"30px"}}>
                        <Row>
                            <Label md={2}>Titulo</Label>
                            <Col md={10}><Input placeholder="Introduce el título del video."></Input></Col>
                        </Row>
                        <Row style={{marginTop:"35px"}}>
                            <Label md={2}>Duración</Label>
                            <Col md={3}><Input type="number" defaultValue="15"></Input></Col>
                            <Label md={2}>Fecha</Label>
                            <Col md={5}><Input type="date"></Input></Col>
                        </Row>
                        <Row style={{marginTop:"25px"}}>
                            <Label md={2}>Descripción</Label>
                            <Input type="textarea" ></Input>
                        </Row>
                    </Form>
                </Col>
                <Col xs='6'>
                    <Form style={{marginTop:"30px"}}>
                        <Row>
                            <Label style={{textAlign:"left"}}>Video</Label>
                        </Row>
                        <Row>
                            <Label style={{textAlign:"left"}}>Sube tu video a drive e ingresa la liga en el siguiente espacio</Label>
                        </Row>
                        <Row style={{marginTop:"25px"}}>
                            <FormGroup>
                                <CustomInput
                                type="file"
                                id="exampleCustomFileBrowser"
                                name="customFile"
                                label={'choose an image file'}/>
                            </FormGroup>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
