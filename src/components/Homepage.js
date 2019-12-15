import React from 'react';
import Header from './Header';
import CarouselComponent from './CarouselComponent';
import { Container } from 'react-bootstrap';

class Homepage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Header/>
                <Container>
                    <CarouselComponent/>
                </Container>
            </div>            
        );
    }

} 
export default Homepage;