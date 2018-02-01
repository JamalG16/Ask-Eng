import React, { Component } from 'react'
import { Modal, Button, FormGroup, FormControl, HelpBlock, ControlLabel, Alert, Image } from 'react-bootstrap'
import Select from 'react-select'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //form inputs
            lname: '',
            fname: '',
            email: '',
            pw: '',
            role: '',

            //validators
            validEmail: null,
            button: false,

            //alert state
            answer: null,
            alert: '',

            page: 1
        }
        this.validateEmail = this.validateEmail.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
        this.cleanState = this.cleanState.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
    }

    componentDidUpdate() {
        this.validateButton()
    }
    /*
     * validateEmail check if the string in the email field is 
     * in the form *@*.*
     * Input: mail
     * Output: a string either "success" or "error"
     * @author Kerry Gougeon
     */
    validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            this.setState({
                validEmail: "success"
            })
        } else {
            this.setState({
                validEmail: "error"
            })
        }
    }
    /*
     * validateButton check if all the field are ok 
     * Output: change the state of button to either T/F
     * @author Kerry Gougeon
     */
    validateButton() {
        let result;
        if (this.state.lname !== ''
            && this.state.pw !== ''
            && this.state.role !== ''
            && this.state.fname !== ''
            && this.state.validEmail == 'success') {
            result = false;
        } else {
            result = true;
        }
        if (this.state.button === result) { } else {
            this.setState({
                button: result
            })
        }
    }
    handleClick() {
        this.saveUser();
        this.handleAlert();
        this.cleanState(true);
    }
    async saveUser() {
        try {
            let data = {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.pw,
                engineer: this.state.role,
                display_image: "/public/images/avatar/1.png"
            }
            console.log(data)
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            let myInit = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: myHeaders
            };

            let req = new Request("/api/users/", myInit)
            fetch(req).then(res => res.json())
                .catch(e => console.error('Error:', e))
                .then(response => {
                    if (response.success) {
                        this.setState({ answer: response.message })
                    }
                })
        } catch (e) { console.error("Error:", e) }
    }
    handleAlert() {
        if (this.state.alert) {
            if (this.state.answer.success) {
                this.setState({
                    alert: "success"
                })
            } else {
                this.setState({
                    alert: "danger"
                })
            }
        } else {
            this.setState({
                alert: "warning",
                answer: { message: 'The query failed' }
            })
        }
    }
    handleClose() {
        this.props.handleClose();
        this.cleanState(false);
    }
    /*
     * cleanState reset the state of the component
     * Input: a Boolean bool
     * Output: if T, reset but keep the alert. If F, reset everything
     * @author Kerry Gougeon
     */
    cleanState(bool) {
        if (bool) {
            this.setState({
                lname: '',
                fname: '',
                email: '',
                validEmail: null,
                pw: '',
                role: '',
                button: false,
            })
        } else {
            this.setState({
                lname: '',
                fname: '',
                email: '',
                validEmail: null,
                pw: '',
                role: '',
                button: false,
                answer: null,
                alert: '',
            })
        }
    }

    handleNextPage() {
        let currentPage = this.state.page;
        currentPage++;
        this.setState({
            page: currentPage
        })
    }

    handlePreviousPage() {
        let currentPage = this.state.page;
        currentPage--;
        this.setState({
            page: currentPage
        })

    }

    render() {
        let options = [
            { value: 'software', label: 'Software Engineering' },
            { value: 'mechanical', label: 'Mechanical Engineering' },
            { value: 'computer', label: 'Computer Engineering' },
            { value: 'electrical', label: 'Electrical Engineering' },
            { value: 'civil', label: 'Civil Engineering' }
        ];
        let alert
        if (this.state.answer != null) {
            alert = <Alert bsStyle={this.state.alert}>{this.state.answer.message}</Alert>
        }
        let body
        if (this.state.page == 1) {
            body = <div >
                <div class = "menu">
                {alert}
                <FieldGroup
                    type="text"
                    label="E-mail"
                    placeholder="email"
                    valid={this.state.validEmail}
                    onChange={(e) => {
                        this.validateEmail(e.target.value)
                        this.setState({ email: e.target.value })
                    }}
                />
              <FieldGroup
                    label="Password"
                    type="password"
                    onChange={(e) => this.setState({ pw: e.target.value })}
                />
               </div> 
            <div class = "picture">
            <Image src = "https://i.imgur.com/cmPoLVn.jpg" responsive rounded />   
            </div>    

            </div>


        }
        else if (this.state.page == 2) {
            body = <div>
                <div class="menu">
                <FieldGroup
                    type="text"
                    label="First Name"
                    placeholder="John"
                    onChange={(e) => {
                        this.setState({ fname: e.target.value })
                    }}
                />
                <FieldGroup
                    type="text"
                    label="Last Name"
                    placeholder="McQueen"
                    onChange={(e) => {
                        this.setState({ lname: e.target.value })
                    }}
                />
            </div> 
            <div class = "picture">
            <Image src = "https://i.imgur.com/aZpgMrl.jpg" responsive rounded />   
            </div>          
               </div> 
        }
        else if(this.state.page == 3){    
            body = <div>
                <div class ="menu">
                <FieldGroup
                 type="file"
                 id="formControlsFile"
                 label="File"
                  />
                 
                <ControlLabel>Engineering Field</ControlLabel>
                <Select
                    name="form-field-name"
                    value={this.state.role}
                    options={options}
                    onChange={(e) => {
                        if (e !== null) {
                            this.setState({ role: e.value })
                        } else {
                            this.setState({ role: '' })
                        }
                    }}
                />
            </div>
            <div class = "picture">
            <Image src = "https://i.imgur.com/RdzM1lU.jpg" responsive rounded />   
            </div>          
            </div>
        }
        let previousButton, nextButton, saveButton;
        
        if (this.state.page == 3) {
            saveButton = <Button bsStyle="primary" disabled={this.state.button} onClick={this.handleClick}>Save</Button>
            previousButton= <Button onClick={this.handlePreviousPage}>Previous</Button>
            nextButton= null
        }

        else if (this.state.page == 2) {
            saveButton = null
            previousButton= <Button onClick={this.handlePreviousPage}>Previous</Button>
            nextButton= <Button onClick={this.handleNextPage}>Next</Button>
        }

        else if (this.state.page == 1) {
            saveButton = null
            previousButton= null
            nextButton= <Button onClick={this.handleNextPage}>Next</Button>
        }

        return (
            <Modal   dialogClassName="custom-modal" show={this.props.show} onHide={this.handleClose}>
               
                <Modal.Body>
                    {body}
                </Modal.Body>

                <Modal.Footer>
                    {previousButton}
                    {nextButton}
                    {saveButton}
                </Modal.Footer>
            </Modal>
        );
    }
}

function FieldGroup({ id, label, help, valid, ...props }) {
    return (
        <FormGroup controlId={id} validationState={valid}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            <FormControl.Feedback />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}


export default Register;
