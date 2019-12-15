import React from 'react';
import { Container, Alert } from 'react-bootstrap';


class AccountActivated extends React.Component {
    render(){
        return(
            <Container>
                <Alert variant="success" style={{marginTop:"20px"}}>
                    <Alert.Heading>You have successfully activated your patient account!</Alert.Heading>
                        <p>
                            Hello patient, we wish to inform you that you have activated your account successfully!
                            Now you are able to use all of functionalities on our website.
                        </p>
                        <hr/>
                        <p>Feel free to login to your new account by clicking <a href="/">here</a>.</p>
                </Alert>
            </Container>
        );  
    }
} 
export default AccountActivated;