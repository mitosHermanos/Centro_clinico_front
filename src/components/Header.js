import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {

    nextPath(path) {
        this.props.history.push(path);
    }

    render(){
        return(
            <Navbar> 
                <Navbar.Brand>
                    Centro clinico
                </Navbar.Brand>
                <Nav.Link>Clinics list</Nav.Link>
                <Nav.Link>Examinations/Surgeries</Nav.Link>
                <Nav.Link>Medical record</Nav.Link>
                <Nav.Link onClick={() => this.nextPath('/patientProfile')}>Profile</Nav.Link>
            </Navbar>
        );
    }
}

export default Header;