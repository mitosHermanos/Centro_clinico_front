import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalAlert extends React.Component{
    constructor(props){
        super(props);

        this.state={
            show: false
        }
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount(){
        this.setState({show:this.props.show})
    }

    showModal(){
        this.setState({show:true}); 
    }


    render(){
        const {show} = this.state;

        return(
            <Modal show={show} onHide = {() => this.setState({show:false}) }>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={() => this.setState({show:false}) }>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default ModalAlert;