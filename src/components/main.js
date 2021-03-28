import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import styles from './style.module.css';
import axios from 'axios';
import User from './user';

const URL = "https://jsonplaceholder.typicode.com/users";
class Main extends Component {
    state = {
        userInfo: [],
        getUsers: false,
        loading: false,
    };

    getAllUsers = async () => {
        this.setState({
            loading: true,
        })
        await axios.get(URL).then(res => {
            this.setState({
                userInfo: res.data,
            })
        })
        .catch(err => {
            console.log(err);
        })
        this.userAvatars();
        setTimeout(() => {
            this.setState({
                getUsers: true,
                loading: false,
            })
        }, 700);
    }


    userAvatars = async () => {
        const { userInfo } = this.state;
        userInfo.map(user => {
            axios.get(`https://avatars.dicebear.com/v2/avataaars/{${user.username}}.svg?mood[]=happy`).then(res => {
                user.avatars = res.data;
            })
        })
    }

    handleDeleteUser = (index) => {
        const { userInfo } = this.state;
        let user = [...userInfo];
        user.splice(index, 1);
        this.setState({
            userInfo: user,
        });
    }

    render() {
        const { userInfo, loading, getUsers } = this.state;
        const users = userInfo.map((user, index) => {
            return (
                <Col key={user.id} xl={3} lg={4} md={6} xs={12} className="mb-4">
                    <User
                        arrIndex={index}
                        userName={user.name}
                        emailId={user.email}
                        phone={user.phone}
                        website={user.website}
                        avatars={user.avatars}
                        company={user.company.name}
                        zipCode={user.address.zipcode}
                        city={user.address.city}
                        handleDeleteUser={this.handleDeleteUser}
                    />
                </Col>
            )
        })
        return (
            <Container fluid className={`px-4 ${getUsers ? styles.pos : styles.pos2}`}>
                {getUsers ? (
                    <Row>
                    {users}
                   </Row>
                ) : loading ? (
                    <Loader className={styles.loader} type="Circles" color="#00BFFF" height={80} width={80}/>
                ) : <Button className={styles.Btn} onClick={this.getAllUsers} variant="outline-info">Click Here To See All Users</Button>}
            </Container>
        );
    }
}

export default Main;