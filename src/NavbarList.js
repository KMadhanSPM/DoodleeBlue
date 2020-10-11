import React, { Component } from "react";
import {
    Button,
    FormControl,
    Nav,
    InputGroup, Overlay, Navbar, ButtonToolbar, Form
} from "react-bootstrap";

class NavbarList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='top-navbar'>
                <Navbar bg="light" expand="lg" className='w-100 p-3 d-flex'>
                    <Nav >
                        <Nav.Link href="#filter"><i class="fa fa-filter" aria-hidden="true"></i></Nav.Link>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
                        <Form inline className='col-md-4 col-sm-12 m-auto input-search'>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2 w-100" />
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </Form>
                        <Nav className='right-items'>
                            <Nav.Link href="#account" className='text-center'>
                                <i class="fa fa-user" aria-hidden="true"></i>
                                <p>Account</p>
                            </Nav.Link>
                            <Nav.Link href="#orders" className='text-center'>
                                <i class="fa fa-file" aria-hidden="true"></i>
                                <p>Orders</p>
                            </Nav.Link>
                            <Nav.Link href="#cart" className='text-center'>
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                <p>Cart</p>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavbarList;