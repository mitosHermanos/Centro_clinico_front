import React from 'react';
import {Carousel, Button, Image} from 'react-bootstrap';

class CarouselComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Carousel style={{width:"90%"}}>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={require("../resources/homepage.jpg")}
                    alt="First slide"
                    rounded
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={require("../resources/homepage.jpg")}
                    alt="Second slide"
                    rounded
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src={require("../resources/homepage.jpg")}
                    alt="Third slide"
                    rounded
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }


}
export default CarouselComponent;