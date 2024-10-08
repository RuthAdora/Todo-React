//import  { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, Component } from "react";
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import ListItem from "./ListItem";
import { toBeInTheDOM } from "@testing-library/jest-dom/dist/matchers";

class App extends Component {
  //declares react components name app that inherits properties and methods from the component
  constructor(props) {
    /* constructor method that is called when the component is first created */
    super(props);

    // Setting up state
    this.state = {
      //This line initializes the component's state using an object
      userInput: "", //An empty string to store the user's input value.
      list: [], //An empty array to store the list of items.
      showEditModal: false,
      editedItemIndex: null,
      editedItemValue: "",
    };
  }

  setEditedItemValue = (value) => {
    this.setState({ editedItemValue: value });
  };

  // Set a user input value
  updateInput(value) {
    //Defines a function named updateInput that takes a value parameter.
    this.setState({
      //This line updates the component's state by setting the userInput property to the value passed to the function.

      userInput: value,
    });
  }

  // Add item if user input in not empty
  addItem() {
    //This function is responsible for handling the logic to add a new item to the list
    if (this.state.userInput !== "") {
      //This  conditional statement checks if the userInput state value is not empty. If the input is not empty, it proceeds to add the item to the list.

      const userInput = {
        //Creates a new object to represent the item to be added to the list.
        // Add a random id which is used to delete
        id: Math.random(), //Generates a random ID for each item using Math.random()

        // Add a user value to list
        value: this.state.userInput, //Sets the value property of the item to the current userInput value.
      };

      // Update list
      const list = [...this.state.list]; //Creates a copy of the existing list state using the spread operator (...)
      list.push(userInput); //Adds the newly created userInput object to the copied list.

      // reset state
      this.setState({
        //Updates the component's state with the modified list and resets the userInput to an empty string, clearing the input field for the next item.
        list,
        userInput: "",
      });
    }
  }

  // Function to delete item from list use id to delete
  deleteItem(key) {
    const list = [...this.state.list]; //Creates a copy of the existing list state using the spread operator.

    // Filter values and leave value which we need to delete
    const updateList = list.filter((item) => item.id !== key);
    /*Uses the filter method on the copied list.
The callback function within filter iterates through each item.
It checks if the item.id is not equal to the provided key.
If the condition is true, the item is included in the updateList. 
This effectively filters out the item with the matching key. */

    // Update list in state
    this.setState({
      //Updates the component's state with the filtered updateList, essentially removing the item with the matching key.
      list: updateList,
    });
  }
  editItem = (index) => {
    //This function allows editing an item in the list state based on its index.

    const value = this.state.list[index].value;

    this.setState({
      showEditModal: true,
      editedItemIndex: index,
      editedItemValue: value,
    });
  };

  handleSaveEdit = () => {
    // const { list, editedItemIndex } = this.state;
    const updatedList = [...this.state.list]; // Create a copy of the list
    updatedList[this.state.editedItemIndex].value = this.state.editedItemValue; // Update the value at the specified index
    this.setState({ list: updatedList, showEditModal: false });
  };
  /*const todos = [...this.state.list]; //Creates a copy of the entire list state.
      
        let updatedTodos = [...todos] //Creates another copy of the list for making changes.
        const previousName = updatedTodos[index].value; // Store the previous name
       this.setState({ //Updates the component's state with the modified updatedTodos, reflecting the changes in the UI.
          list: updatedTodos,
          //Add the previous name to the state if needed
          previousName: previousName,
          editItemIndex: index,
          showEditModal: true,
     });
      
    } */

  render() {
    //It determines what gets displayed on the screen based on the component's state and props
    return (
      //<container> <row> ... bootstrap
      // <hr /> element creates a horizontal line to visually separate the title from the input section.
      //<Col> component defines a column with specific sizing
      //<InputGroup> component groups the input and button elements.
      //<FormControl> element represents the input field:

      <Container>
        <Modal
          show={this.state.showEditModal}
          onHide={() => this.setState({ showEditModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={this.state.editedItemValue}
              onChange={(e) => this.setEditedItemValue(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showEditModal: false })}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSaveEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          TODO LIST
        </Row>

        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="add item . . . "
                size="lg"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button
                  variant="dark"
                  className="mt-2"
                  onClick={() => this.addItem()}
                >
                  ADD
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {/* map over and print items */}
              {this.state.list.map((item, index) => {
                return (
                  <div key={index}>
                    <ListGroup.Item
                      variant="dark"
                      action
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "15px",
                      }}
                    >
                      {item.value}
                      <span>
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="light"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => this.editItem(index)}
                        >
                          Edit
                        </Button>
                      </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
              {this.state.list.map((item, index) => (
                <ListItem
                  key={index}
                  item={item}
                  index={index}
                  deleteItem={this.deleteItem}
                  editItem={this.editItem}
                  showEditModal={this.state.showEditModal}
                  setShowEditModal={this.setShowEditModal}
                  editedItemValue={this.state.editedItemValue}
                  setEditedItemValue={this.setEditedItemValue}
                  handleSave={this.handleSaveEdit}
                />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
