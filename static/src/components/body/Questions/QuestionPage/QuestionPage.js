import React, {Component} from 'react'
import {fetchAPI} from '../../../utility'
import {Col, Row, Well} from 'react-bootstrap'
import Answer from './Answer.js'
import AnswerQuestion from './AnswerQuestion.js'
import Votes from "../../../votes/Votes";
import { connect } from 'react-redux'

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {
                answers: []
            },
            loading: true
        }
		this.answerhandler = this.answerhandler.bind(this);
    }
	
	answerhandler() {
		console.log("question answered");
        this.getQuestion();
    }

	componentDidMount(){
		this.getQuestion()
	}
	
    componentWillMount() {
        this.setState({loading: true});
        this.getQuestion()
    }

    async getQuestion() {
        try {
            fetchAPI("GET", "/api/qa/questions/?question_id=" + this.props.match.params.id + "&loggedin_id=" + this.props.user.id).then(response => {
                if (response.success) {
                    this.setState({
                        question: response.question,
                        loading: false
                    })
                }
            })
        } catch (e) {
            console.error("Error:", e)
        }
    }

    render() {
        if (!this.state.loading) {
            let answers = this.state.question.answers.map((answer) => {
                return (
                    <div key={answer.id}>
                        <Answer
                            user={this.props.user}
                            answer={answer}
                        />
                    </div>
                )
            });
            return (
                <div className="answer-page">
                    <Row>
                        <Col md={12}>
                            <span className="question-tag">{this.state.question.engineer}</span>
                        </Col>
                    </Row>
                    <Row className="question-box-text">
                        <Col md={1}>
                            <Votes
                                question={this.state.question}
                                status = {this.state.question.vote_status} //this may switch
                                user={this.props.user}
                                comment_status = {'question'}
                            /> 
                        </Col>
                        <Col md={11}>
                            <h1>{this.state.question.title}</h1>
                            <p>{this.state.question.text}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Well bsSize="large">
                                <h2> Know the Answer? </h2>
                                <AnswerQuestion
                                id={this.props.match.params.id}
								updateanswers={this.answerhandler}
                            />
                          </Well>
                        </Col>
                    </Row>
                    <div>
                    {answers}
                    </div>
                </div>
            )
        } else {
            return <h2>Loading...</h2>
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

QuestionPage = connect(
    mapStateToProps,
)(QuestionPage);

export default QuestionPage;