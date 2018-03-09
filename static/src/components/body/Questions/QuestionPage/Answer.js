import React, { Component } from 'react'
import {fetchAPI} from '../../../utility'
import { Col, Row, Image } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import Votes from "../../../votes/Votes"
import { connect } from 'react-redux'

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      display_image: ""
    }
    this.answerHandler = this.answerHandler.bind(this);
  }

  answerHandler() {
      this.getUser()
  }

  componentDidMount(){
      this.getUser()
  }

  async getUser() {
    try {
        fetchAPI("GET", "/api/users/" + this.props.answer.user_id).then(response => {
        if (response.success) {
            this.setState({
                fname: response.user.fname,
                lname: response.user.lname,
                display_image: response.user.display_image
            })
        }
        console.log(response)
      })
    } catch (e) {
        console.error("Error:", e)
    }
}

  render() {
    let avatarPath = `\\images\\avatar\\` + this.state.display_image;
      return (
        <div key={this.props.answer.id} className="question-box">
          <Row>
            <Col lg={2} md={4} xs={5}>
              <Votes
                  question = {this.props.answer}
                  status = {this.props.answer.vote_status}
                  user={this.props.user}
                  comment_status = {'answer'}
              />
              <Image src={avatarPath} width={64} circle />
            </Col>
            <Col lg={10} md={8} xs={7}>
              <h1>{this.props.answer.title}</h1>
              {this.state.fname} {this.state.lname}
              &nbsp;- {moment(this.props.answer.register_date).format("LLL")}
              <p>{this.props.answer.text}</p>
            </Col>
          </Row>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
      user: state.login.user
  }
}

Answer = connect(
  mapStateToProps,
)(Answer);

export default Answer;
