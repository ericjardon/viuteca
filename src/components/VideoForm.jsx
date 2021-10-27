import React from 'react'
import { Container, Row, Col, Label, Input, FormGroup, Form, CustomInput, Button } from 'reactstrap';
import controller from '../firebase/groups';

/* Component for the main screen with listed videos */
export default function VideoForm() {
    return (
        <Container>
            <Row>
                <Col xs='6'>
                    <Form style={{marginTop:"30px"}}>
                        <Row>
                            <Label md={2} style={{textAlign:"left"}}>Titulo</Label>
                            <Col md={10}><Input placeholder="Introduce el título del video."></Input></Col>
                        </Row>
                        <Row style={{marginTop:"35px"}}>
                            <Label md={2} style={{textAlign:"left"}}>Duración</Label>
                            <Col md={3}><Input type="number" defaultValue="15"></Input></Col>
                            <Label md={2} style={{textAlign:"left"}}>Fecha</Label>
                            <Col md={5}><Input type="date"></Input></Col>
                        </Row>
                        <Row style={{marginTop:"25px"}}>
                            <Label md={2} style={{textAlign:"left"}}>Descripción</Label>
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
                        <Row style={{marginTop:"25px"}} >
                            <Col md={10}><Input type="url" placeholder="Introduce el link."></Input></Col>
                            <Col style={{marginLeft:"0px"}}><Button md={4} style={{backgroundColor:"#D9CAB3", color:"black"}}>Subir</Button></Col>
                        </Row>
                        <Row style={{marginTop:"20%"}}>
                            <Label >El video fue cargado exitosamente</Label>
                        </Row>
                        <Row style={{marginTop:"5%"}}>
                            <Col>
                                <Button style={{backgroundColor:"#D9CAB3", color:"black", width:"22%"}}>Publicar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
