import React, { Component } from "react";
import { Container, Row, Form, FormControl, Button, Modal, Col, Tab, Tabs } from "react-bootstrap";
import userData from './details.json'
import Select from 'react-select';


const acronym = text => {
    const str = text ? text : "Not Available";
    let matches = str.match(/\b(\w)/g);
    let acronym = matches !== null ? matches.join("") : "N/A";
    return acronym;
};
const generateRandomDarkColors = () => {
    // const bgcolor = `#${Math.random().toString(16).substr(-6)}`
    const lum = -0.25;
    let hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let bgcolor = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        bgcolor += ("00" + c).substr(c.length);
    }
    return bgcolor
}

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            emailId: '',
            mobileNo: '',
            companyName: '',
            showPrompt: false, //Confirmation Prompt
            contactData: [],
            firstData: {},
            handleEditIndex: 0,
            loggedUser: '',
            userLists: [],
            selectedUser: null,
            newMessagePrompt: false,
            newMessageValue: '',
            messagesPrompt: false,
            realData: []
        };
    }
    componentDidMount() {
        this.setState({
            realData: userData.data
        }, () => {
            const dataList = this.state.realData.filter(i => i.name != this.state.realData[0].name);
            var result = dataList.map(function (el) {
                var o = Object.assign({}, el);
                o.bgColor = generateRandomDarkColors();
                return o;
            })
            this.setState({
                contactData: result,
                userLists: this.state.realData.map((item) => {
                    return {
                        label: item.name,
                        value: item.name,
                    }
                })
            }, () => {
                this.setState({
                    selectedUser: this.state.userLists[0]
                })
            })
        })

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.contactData.length != this.state.contactData.length) {
            this.setState({
                firstData: this.state.contactData[0],
            })
        }
        if (prevState.firstData != this.state.firstData) {
            this.setState({
                contactData: this.state.contactData.filter(item => item != this.state.loggedUser)
            })
        }
    }
    handleUser = selectedUser => {
        this.setState({ selectedUser }, () => {
            const dataList = this.state.realData.filter(i => i.name != selectedUser.value);
            var result = dataList.map(function (el) {
                var o = Object.assign({}, el);
                o.bgColor = generateRandomDarkColors();
                return o;
            })
            this.setState({
                contactData: result
            })
        })
    }

    handleContact = (e) => {
        if (this.state.handleEditIndex) {
            const editedValue = {
                "name": this.state.fullName != '' ? this.state.fullName : 'No Name',
                "email": this.state.emailId != '' ? this.state.emailId : 'xyz@gmail.com',
                "mobile": this.state.mobileNo != '' ? this.state.mobileNo : '98399298282',
                "company": this.state.companyName != '' ? this.state.companyName : 'Kekran Mekran Company',
                "bgColor": generateRandomDarkColors(),
                "messageList": {
                    "received": [],
                    "sent": []
                }
            }
            const currentData = this.state.contactData;
            const realDataList = this.state.realData;
            currentData[this.state.handleEditIndex] = editedValue;
            realDataList[this.state.handleEditIndex + 1] = editedValue;
            this.setState({
                contactData: currentData,
                showPrompt: false,
                realData: realDataList
            })
            alert("Updated Successfully!!!!!!!!!!")
        }
        else {
            const currentData = this.state.contactData;
            const realDataList = this.state.realData;
            const newContact = {
                "name": this.state.fullName != '' ? this.state.fullName : 'No Name',
                "email": this.state.emailId != '' ? this.state.emailId : 'xyz@gmail.com',
                "mobile": this.state.mobileNo != '' ? this.state.mobileNo : '98399298282',
                "company": this.state.companyName != '' ? this.state.companyName : 'Kekran Mekran Company',
                "bgColor": generateRandomDarkColors(),
                "messageList": {
                    "received": [],
                    "sent": []
                }
            }
            currentData.push(newContact)
            realDataList.push(newContact)
            this.setState({
                contactData: currentData,
                showPrompt: false,
                realData: realDataList
            }, () => {
                this.setState({
                    userLists: this.state.realData.map((item) => {
                        return {
                            label: item.name,
                            value: item.name,
                        }
                    })
                })
            })
            alert("Updated Successfully!!!!!!!!!!")
        }
    }
    handleView = (e, item) => {
        this.setState({
            firstData: item
        })
    }
    handleModal = (e, item, index) => {
        this.setState({ showPrompt: true })
        if (item) {
            this.setState({
                fullName: item.name,
                emailId: item.email,
                mobileNo: item.mobile,
                companyName: item.company,
                handleEditIndex: index
            })
        }
        else {
            this.setState({
                fullName: '',
                emailId: '',
                mobileNo: '',
                companyName: '',
                handleEditIndex: ''
            })
        }
    }
    handleMessage = (e) => {
        const existingData = this.state.realData
        const indexValue = existingData.findIndex(img => img.name === this.state.selectedUser.value);
        existingData[indexValue].messageList.sent.push({
            "user": this.state.firstData.name,
            "message": this.state.newMessageValue
        })

        existingData[this.state.handleEditIndex + 1].messageList.received.push({
            "user": this.state.selectedUser.value,
            "message": this.state.newMessageValue
        })
        this.setState({
            realData: existingData,
            newMessagePrompt: false
        }, () => {
            this.setState({
                newMessageValue: ''
            })
        })
        alert("Message Sent !!")
    }

    render() {
        const sentMessage = this.state.realData && this.state.selectedUser != null ? this.state.realData.filter(i => i.name == this.state.selectedUser.value)[0].messageList.sent : []
        const receivedMessage = this.state.realData && this.state.selectedUser != null ? this.state.realData.filter(i => i.name == this.state.selectedUser.value)[0].messageList.received : []
        return (
            <div className='product-list p-3'>
                <Container>
                    <div className='float-right' style={{ display: 'flex' }}>
                        <Select
                            placeholder="Select Input Type"
                            styles={{
                                indicatorSeparator: () => null,
                                control: (provided, state) => ({
                                    ...provided,
                                    minHeight: "10px",
                                    border: "1px solid #d6d6d6",
                                    cursor: "pointer",
                                    paddingLeft: 0,
                                    color: '#333',
                                    width: '100%'
                                })
                            }}
                            options={this.state.userLists}
                            onChange={this.handleUser}
                            value={this.state.selectedUser}
                        />
                        <Button variant='light' className='p-0 pl-3' onClick={(e) => { this.setState({ messagesPrompt: true }) }}>
                            <p className='pl-1'><i className="fa fa-comment" aria-hidden="true"></i></p>
                        </Button>
                    </div>
                    <div className='contact-section'>
                        <Row>
                            <i className="fa fa-address-book" aria-hidden="true"></i>
                            <h3 className='pl-2'>Contacts
                            <p>Welcome to Package List</p>
                            </h3>
                        </Row>
                    </div>
                    <Row className='pb-3'>
                        <Form inline className='col-md-4 col-sm-12 ml-3 input-search'>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2 w-100" />
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </Form>
                        <Button variant="danger" onClick={(e) => { this.handleModal(e, '', '') }}>+ Add Contact</Button>
                        {
                            this.state.showPrompt === true ?
                                <Modal
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    className="modal-vs confirm-modal add-contact" show={this.state.showPrompt} onHide={() => { this.setState({ showPrompt: false }) }}>
                                    <Modal.Body>
                                        <form onSubmit={(e) => this.handleContact(e)}>
                                            <Row>
                                                <Col md={6}>
                                                    <label>Full Name</label>
                                                    <input type='text' value={this.state.fullName} onChange={(e) => { this.setState({ fullName: e.target.value }) }} />
                                                </Col>
                                                <Col md={6}>
                                                    <label>Email Address</label>
                                                    <input type='text' value={this.state.emailId} onChange={(e) => { this.setState({ emailId: e.target.value }) }} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <label>Mobile Number</label>
                                                    <input type='text' value={this.state.mobileNo} onChange={(e) => { this.setState({ mobileNo: e.target.value }) }} />
                                                </Col>
                                                <Col md={6}>
                                                    <label>Company Name</label>
                                                    <input type='text' value={this.state.companyName} onChange={(e) => { this.setState({ companyName: e.target.value }) }} />
                                                </Col>
                                            </Row>
                                            <div className='submit-btn text-center'>
                                                <input type="submit" value="Submit" />
                                            </div>
                                        </form>
                                    </Modal.Body>
                                </Modal>
                                : ''
                        }
                    </Row>

                    <div className='manage-list pt-3'>
                        <Row>
                            <Col md={8}>
                                <div className='top-bar'>
                                    <Row>
                                        <Col md={5}>
                                            <p><b>Basic Info</b></p>
                                        </Col>
                                        <Col md={5}>
                                            <p><b>Company Name</b></p>
                                        </Col>
                                        <Col md={1}>
                                            <p className='pl-1'><i className="fa fa-edit" aria-hidden="true"></i></p>
                                        </Col>
                                        <Col md={1} className='p-0'>
                                            <p className='pl-2'><i className="fa fa-comment" aria-hidden="true"></i></p>
                                        </Col>
                                    </Row>
                                </div>
                                {
                                    this.state.contactData.length != 0 ?
                                        this.state.contactData.map((item, index) => {
                                            return (
                                                <Row key={index} className='selected-contact m-0' onClick={(e) => { this.handleView(e, item) }} style={{ background: item == this.state.firstData ? '#e8e8e8' : 'transparent' }}>
                                                    <Col md={5}>
                                                        <Row>
                                                            <div className="pl-3 pt-1" style={{ display: 'inherit' }}>
                                                                <div className="user-logo mb-3" title={item.name} style={{ backgroundColor: item.bgColor, color: '#fff' }}>
                                                                    {item.name !== undefined ? acronym(item.name) : ""}
                                                                </div>
                                                                <p className='text-left'>{item.name}<br />
                                                                    <span>{item.email}</span>
                                                                </p>
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                    <Col md={5}>
                                                        <p className='pt-1 pl-3'>{item.company}</p>
                                                    </Col>
                                                    <Col md={1}>
                                                        <p className='pl-3'>
                                                            <button className='handle-button' onClick={(e) => { this.handleModal(e, item, index) }}>
                                                                <i className="fa fa-edit" aria-hidden="true"></i>
                                                            </button>
                                                        </p>
                                                    </Col>
                                                    <Col md={1}>
                                                        <Button variant='light' className='p-0' style={{ background: 'transparent', border: 'none' }} onClick={(e) => { this.setState({ newMessagePrompt: true }, () => this.setState({ handleEditIndex: index })) }}>
                                                            <p className='pl-1'><i className="fa fa-comment" aria-hidden="true"></i></p>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            )
                                        }) : ''
                                }
                                {
                                    this.state.newMessagePrompt === true ?
                                        <Modal
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                            className="modal-vs confirm-modal add-contact" show={this.state.newMessagePrompt} onHide={() => { this.setState({ newMessagePrompt: false }) }}>
                                            <Modal.Body>
                                                <form onSubmit={(e) => this.handleMessage(e)}>
                                                    <Row>
                                                        <Col md={12}>
                                                            <p>New Message</p>
                                                            <textarea value={this.state.newMessageValue} style={{ width: '100%', border: '1px solid #d6d6d6' }} onChange={(e) => { this.setState({ newMessageValue: e.target.value }) }} />
                                                        </Col>
                                                    </Row>
                                                    <div className='submit-btn text-center'>
                                                        <input type="submit" value="Send" />
                                                    </div>
                                                </form>
                                            </Modal.Body>
                                        </Modal>
                                        : ''
                                }
                                {
                                    this.state.messagesPrompt === true ?
                                        <Modal
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered
                                            className="modal-vs confirm-modal add-contact" show={this.state.messagesPrompt} onHide={() => { this.setState({ messagesPrompt: false }) }}>
                                            <Modal.Body>

                                                <Tabs defaultActiveKey="sent" id="uncontrolled-tab-example">
                                                    <Tab eventKey="sent" title="Sent">
                                                        {
                                                            sentMessage.length != 0 ?
                                                                sentMessage.map((k, index) => {
                                                                    return (
                                                                        < div className='message-list' key={index}>
                                                                            <h5>{k.user}</h5>
                                                                            <p>{k.message}</p>
                                                                        </div>
                                                                    )
                                                                })
                                                                : <p className='p-4 text-center' style={{ fontSize: '20px' }}><b>No Messages</b></p>
                                                        }
                                                    </Tab>
                                                    <Tab eventKey="received" title="Received">
                                                        {
                                                            receivedMessage.length != 0 ?
                                                                receivedMessage.map((k, index) => {
                                                                    return (
                                                                        < div className='message-list' key={index}>
                                                                            <h5>{k.user}</h5>
                                                                            <p>{k.message}</p>
                                                                        </div>
                                                                    )
                                                                })
                                                                : <p className='p-4 text-center' style={{ fontSize: '20px' }}><b>No Messages</b></p>
                                                        }
                                                    </Tab>
                                                </Tabs>
                                            </Modal.Body>
                                        </Modal>
                                        : ''
                                }
                            </Col>
                            <Col md={4}>
                                {
                                    this.state.firstData ?
                                        <div className='contact-detail'>
                                            <div className="pl-3 pt-1 pb-3 text-center">
                                                <div className="user-logo mb-3" title={this.state.firstData.name} style={{ backgroundColor: this.state.firstData.bgColor, color: '#fff' }}>
                                                    {this.state.firstData.name !== undefined ? acronym(this.state.firstData.name) : ""}
                                                </div>
                                                <p>{this.state.firstData.name}<br />
                                                    <span>{this.state.firstData.company}</span>
                                                </p>
                                            </div>
                                            <div className='contact-view'>
                                                <label>Full Name :</label>
                                                <p className='pl-4'> {this.state.firstData.name}</p>
                                            </div>
                                            <div className='contact-view'>
                                                <label>Email Address :</label><p className='pl-4'> {this.state.firstData.email}</p>
                                            </div>
                                            <div className='contact-view'>
                                                <label>Mobile Number :</label><p className='pl-4'> {this.state.firstData.mobile}</p>
                                            </div>
                                            <div className='contact-view'>
                                                <label>Company Name :</label><p className='pl-4'>{this.state.firstData.company}</p>
                                            </div>
                                        </div> : ''
                                }
                            </Col>
                        </Row>
                    </div>


                </Container>
            </div >
        );
    }
}

export default ProductList;