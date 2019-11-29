import React from 'react';
import { Navbar } from 'react-bootstrap';

class Header extends React.Component {
    render(){
        return(
            <Navbar> 
                <Navbar.Brand>
                    Centro clinico
                </Navbar.Brand>
            </Navbar>
        );
    }
}

export default Header;