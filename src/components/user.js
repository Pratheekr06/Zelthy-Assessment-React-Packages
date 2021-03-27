import React, { Component } from 'react';
import {Card, Row, Col, Modal, Button, Form, Nav} from 'react-bootstrap';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe, faHeart, faPen, faTrash, faFlag, faMapMarkedAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';

class User extends Component {
    constructor(props){
        super(props);
        const { userName, emailId, phone, website, company, city, zipCode,} = this.props;
        this.state = { 
            like: false,
            detailShow: false,
            username: userName,
            email: emailId,
            phoneNo: phone,
            web: website,
            companyname: company,
            cityname: city,
            pincode: zipCode,
            moreInfo: false,
         }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleLike = () => {
        const { like } = this.state;
         this.setState({
             like: !like,
         })
    };

    handleDetailShow = () => {
         this.setState({
             detailShow: true,
         })
    }

    handleDetailClose = () => {
         this.setState({
             detailShow: false,
         })
    }

    handleMoreInfo = () => {
         const { moreInfo } = this.state;
         this.setState({
             moreInfo: !moreInfo
         })
    }

    render() { 
        const { like, username, email, phoneNo, web, companyname, cityname, pincode, moreInfo, detailShow } = this.state;
        const { userName, emailId, phone, website, avatars, company, city, zipCode, handleDeleteUser, arrIndex} = this.props;
        return ( 
            <React.Fragment>
                <Card>
                <Card.Body className={styles.userInfo}>
                    <div dangerouslySetInnerHTML={{ __html: avatars }} />
                    <Card.Title>{userName}</Card.Title>
                    <Card.Text><FontAwesomeIcon className={styles.cardIcons} icon={faEnvelope}/>{emailId}</Card.Text>
                    <Card.Text><FontAwesomeIcon className={styles.cardIcons} icon={faPhone}/>{phone}</Card.Text>
                    <Card.Text><FontAwesomeIcon className={styles.cardIcons} icon={faGlobe}/>{website}</Card.Text>
                    {moreInfo ? (
                        <div>
                          <Card.Text><FontAwesomeIcon className={styles.cardIcons} icon={faAddressCard}/>{company}</Card.Text>
                          <Card.Text><FontAwesomeIcon className={styles.cardIcons} icon={faFlag}/>{city}</Card.Text>
                          <Card.Text className="pb-0 mb-0"><FontAwesomeIcon className={styles.cardIcons} icon={faMapMarkedAlt}/>{zipCode}</Card.Text>
                        </div>
                    ) : ''}
                    <Nav.Link onClick={this.handleMoreInfo} className={styles.moreInfo}>
                        {!moreInfo ? (
                            <span>More Info</span>
                        ) : (
                            <span>Less Info</span>
                        )}
                    </Nav.Link>
                </Card.Body>
                <Card.Footer className="pt-2">
                    <Row>
                        <Col className={styles.footerIcons}>
                            <FontAwesomeIcon onClick={this.handleLike} className={like ? styles.like :styles.noLike} icon={faHeart}/>
                        </Col>
                        <Col className={styles.footerIcons}>
                            <FontAwesomeIcon onClick={this.handleDetailShow} className={`text-secondary ${styles.edit}`} icon={faPen}/>
                        </Col>
                        <Col>
                        <FontAwesomeIcon onClick={() => handleDeleteUser(arrIndex)} className={`text-secondary ${styles.delete}`} icon={faTrash}/>
                        </Col>
                    </Row>
                </Card.Footer>
                </Card>

                <Modal centered show={detailShow} onHide={this.handleDetailClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column xs="12" md="3" lg="2">
                                    Name:
                                </Form.Label>
                                <Col xs="12" md="9" lg="10">
                                <Form.Control readOnly name="username" type="text" value={username || ''} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column xs="12" md="3" lg="2">
                                    Email:
                                </Form.Label>
                                <Col xs="12" md="9" lg="10">
                                <Form.Control name="email" onChange={e => this.handleChange(e)} type="text" value={email || ''} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column xs="12" md="3" lg="2">
                                    Phone:
                                </Form.Label>
                                <Col xs="12" md="9" lg="10">
                                <Form.Control name="phoneNo" onChange={e => this.handleChange(e)} type="text" value={phoneNo || ''} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column xs="12" md="3" lg="2">
                                    Website:
                                </Form.Label>
                                <Col xs="12" md="9" lg="10">
                                <Form.Control name="web" onChange={e => this.handleChange(e)} type="text" value={web || ''} />
                                </Col>
                            </Form.Group>

                            {moreInfo ? (
                                <>
                                <Form.Group as={Row}>
                                    <Form.Label column xs="12" md="3" lg="2">
                                        Company:
                                    </Form.Label>
                                    <Col xs="12" md="9" lg="10">
                                    <Form.Control name="companyname" onChange={e => this.handleChange(e)} type="text" value={companyname || ''} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column xs="12" md="3" lg="2">
                                        City:
                                    </Form.Label>
                                    <Col xs="12" md="9" lg="10">
                                    <Form.Control name="cityname" onChange={e => this.handleChange(e)} type="text" value={cityname || ''} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column xs="12" md="3" lg="2">
                                        ZipCode:
                                    </Form.Label>
                                    <Col xs="12" md="9" lg="10">
                                    <Form.Control name="pincode" onChange={e => this.handleChange(e)} type="text" value={pincode || ''} />
                                    </Col>
                                </Form.Group>
                                </>
                            ) : ''}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="light" onClick={this.handleDetailClose}>
                        Cancel
                    </Button>
                    <Button variant="info" onClick={this.handleDetailClose}>
                        Ok
                    </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
         );
    }
}
 
export default User;