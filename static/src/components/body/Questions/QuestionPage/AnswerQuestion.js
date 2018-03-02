import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { fetchAPI } from '../../../utility'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class AnswerQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: {
                text: '',
                user_id: this.props.user.id,
                question_id: this.props.id,
                avatar: this.props.user.display_image
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleAsk = this.handleAsk.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
    }

    // handle functions
    handleClick(type) {
        let answer = this.state.answer;
        this.setState({
            answer: answer
        })
    }

    handleAnswerChange(e) {
        let answer = this.state.answer;
        answer.text = e.target.value;
        this.setState({
            answer: answer
        })
    }

    handleAsk() {
		this.saveAnswer();
		this.cleanState();
		this.props.updateanswers();
    }

    async saveAnswer() {
        try {
            console.log(this.state.answer)
            fetchAPI("POST", "/api/qa/answer/", this.state.answer).then(response => {
                console.log(response)
                if (response.success) {
                    console.log(response)
                }
            }).catch((e) => console.error("Error:" + e))
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    cleanState() {
        this.setState({
<<<<<<< HEAD
            question: {
                text: '',
                user_id: this.props.user.id,
                avatar: this.props.user.display_image
            }
=======
            answer :{
				text: '',
				user_id: this.props.user.id,
				question_id: this.props.id
			}
>>>>>>> c848b1914b7decf2a88625b4c9acba96218e0649
        })
		this.refs.answering.value = "";
    }

    render() {
        return (
            <div className="ask-box">
                <br />
                <div>
                    <textarea
                        className="ask-box text"
						ref="answering"
                        rows="5"
                        placeholder="Answer away!"
                        onChange={(e) => this.handleAnswerChange(e)} />
                </div>
                <div className="ask-box-footer">
                    <Button id="ask-box-button" onClick={() => this.handleAsk()}>Answer Question</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

AnswerQuestion = connect(
    mapStateToProps,
)(AnswerQuestion);

export default AnswerQuestion;
