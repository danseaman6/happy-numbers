import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Form,
  InputGroup
} from "react-bootstrap";

class App extends Component {
  state = {
    number1: null,
    number2: null,
    number3: null,
    message: "",
    messageType: "",
    guesses: 0
  };

  handleCheckNumbers = () => {
    if (this.state.number1 <= 0 || isNaN(this.state.number1)) {
      this.setState({
        message: "The first number must be greater than 0.",
        type: "warning"
      });
    } else if (
      this.state.number2 < 0 ||
      this.state.number3 < 0 ||
      isNaN(this.state.number2) ||
      isNaN(this.state.number3)
    ) {
      this.setState({
        message: "The second and third numbers cannot be less than 0.",
        type: "warning"
      });
    } else {
      const ABC =
        100 * this.state.number1 + 10 * this.state.number2 + this.state.number3;
      const factorialized =
        this.factorial(this.state.number1) +
        this.factorial(this.state.number2) +
        this.factorial(this.state.number3);

      this.setState({
        message:
          ABC === factorialized
            ? `Congratulations, you found the happy number! Fun Fact: ${ABC} is the only number that satisfies this condition.`
            : `Sorry, the number you entered results in ${factorialized}. Try Again!`,
        type: ABC === factorialized ? "success" : "warning"
      });
    }

    this.setState(prevState => ({
      guesses: prevState.guesses + 1
    }));
  };

  handleNumberChange = ({ target: { name, value } }) => {
    this.setState({ [name]: isNaN(parseInt(value)) ? null : +value });
  };

  handleShowAnswer = () => {
    this.setState(
      {
        number1: 1,
        number2: 4,
        number3: 5
      },
      () => this.handleCheckNumbers()
    );
  };

  getDisableCheckButton = () =>
    isNaN(parseInt(this.state.number1)) ||
    isNaN(parseInt(this.state.number2)) ||
    isNaN(parseInt(this.state.number3));

  getShowAnswerOption = () =>
    this.state.guesses > 2 && this.state.type === "warning";

  factorial = number => {
    let result = number;
    if (result === 0 || result === 1) {
      return 1;
    }

    while (number > 1) {
      number--;
      result *= number;
    }
    return result;
  };

  render() {
    return (
      <Container className="App">
        <Row className="problem-prompt justify-content-md-center">
          <strong>
            You are looking for a three-digit number ABC where the sum of the
            factorials of the digits equals the original number.
          </strong>
          <br />
          <strong>
            In other words, ABC = A! + B! + C! (Note that ABC does not mean A *
            B * C).
          </strong>
        </Row>
        <Row>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Enter Numbers Here:</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              value={this.state.number1}
              onChange={this.handleNumberChange}
              name="number1"
              placeholder="Number 1"
            />
            <Form.Control
              type="text"
              value={this.state.number2}
              onChange={this.handleNumberChange}
              name="number2"
              placeholder="Number 2"
            />
            <Form.Control
              type="text"
              value={this.state.number3}
              onChange={this.handleNumberChange}
              name="number3"
              placeholder="Number 3"
            />
            <InputGroup.Append>
              <Button
                variant="dark"
                onClick={this.handleCheckNumbers}
                disabled={this.getDisableCheckButton()}
              >
                Check Happy Number
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>

        {this.state.message && (
          <Row className="message-alert">
            <Col className="justify-content-md-center">
              <Alert variant={this.state.type}>
                <strong>{this.state.message}</strong>
              </Alert>
            </Col>
          </Row>
        )}

        {this.getShowAnswerOption() && (
          <Row className="answer-display">
            <Col>
              <Form.Text>
                You've tried a few times. You can ask for the answer when you're
                ready.
              </Form.Text>
            </Col>
            <Col>
              <Button
                className="answer-button"
                variant="outline-dark"
                onClick={this.handleShowAnswer}
              >
                Show The Answer
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default App;
