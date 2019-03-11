import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Container, Row, Button, Alert } from "react-bootstrap";

class App extends Component {
  state = {
    number1: null,
    number2: null,
    number3: null,
    errorMessage: "",
    guesses: 0,
    showAnswer: false
  };

  handleCheckNumbers = () => {
    if (this.state.number1 <= 0 || isNaN(this.state.number1)) {
      this.setState({
        errorMessage: "The first number must be greater than 0."
      });
    } else if (
      this.state.number2 < 0 ||
      this.state.number3 < 0 ||
      isNaN(this.state.number2) ||
      isNaN(this.state.number3)
    ) {
      this.setState({
        errorMessage: "The second andthird numbers cannot be less than 0."
      });
    } else {
      const ABC =
        100 * this.state.number1 + 10 * this.state.number2 + this.state.number3;
      const factorialized =
        this.factorial(this.state.number1) +
        this.factorial(this.state.number2) +
        this.factorial(this.state.number3);

      this.setState({
        errorMessage:
          ABC === factorialized
            ? `Congratulations, you found the happy number! Fun Fact: ${ABC} is the only number that satisfies this condition.`
            : `Sorry, the number you entered results in ${factorialized}. Try Again!`
      });
    }

    this.setState(prevState => ({
      guesses: prevState.guesses + 1
    }));
  };

  handleNumberChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value ? +value : null });
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
    !(this.state.number1 && this.state.number2 && this.state.number3);

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
        <Row>
          <h2>Enter Numbers Here:</h2>
        </Row>
        <Row>
          <input
            className="number-input"
            type="text"
            value={this.state.value}
            onChange={this.handleNumberChange}
            name="number1"
          />
          <input
            className="number-input"
            type="text"
            value={this.state.value}
            onChange={this.handleNumberChange}
            name="number2"
          />
          <input
            className="number-input"
            type="text"
            value={this.state.value}
            onChange={this.handleNumberChange}
            name="number3"
          />
        </Row>
        <Row className="number-submit-button">
          <Button
            variant="dark"
            onClick={this.handleCheckNumbers}
            disabled={this.getDisableCheckButton()}
          >
            Check Happy Number
          </Button>
        </Row>
        {this.state.errorMessage && (
          <Row>
            <strong>{this.state.errorMessage}</strong>
          </Row>
        )}
        {this.state.guesses > 2 && (
          <Row className="answer-display">
            <Button variant="outline-dark" onClick={this.handleShowAnswer}>
              Show The Answer
            </Button>
            <strong>
              {
                "You've tried a few times. You can click here for the answer when you're ready."
              }
            </strong>
          </Row>
        )}
      </Container>
    );
  }
}

export default App;
