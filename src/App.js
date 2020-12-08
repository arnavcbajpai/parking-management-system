import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Checkbox,
  Modal,
  Button,
  Header,
  Icon,
  Table,
} from "semantic-ui-react";
import "./App.css";

function App() {
  const [phoneNo, setPhoneNo] = useState(""); //phone no
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false); // checkbox flag
  const [isSubmit, setIsSubmit] = useState(false); // modal flag
  const [isPhoneNoError, setIsPhoneNoError] = useState(false); // phone no validation
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [noBookingFlag, setNoBookingFlag] = useState(false);
  const regexCheck = /^[6789]\d{9}$/;
  const resetValues = () => {
    setPhoneNo("");
    setIsAlreadyBooked(false);
    setIsPhoneNoError(false);
  };
  const handlePhoneNumberChange = (e) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      console.log("Here");
      setIsPhoneNoError(false);
      setPhoneNo(e.target.value);
      if (!regexCheck.test(e.target.value) && e.target.value.length > 10) {
        setPhoneNumberErrorMessage("Phone number exceeds 10 digits");
      }
    }
    // phone number change
    setIsPhoneNoError(false);
    setPhoneNo(e.target.value);
  };
  const handleCheckboxChange = () => {
    // checkbox api call
    setIsAlreadyBooked(!isAlreadyBooked);
  };
  useEffect(() => {
    // check from data base if the booking is already present
    const ph = 945;
    if (isAlreadyBooked) {
      if (parseInt(phoneNo) !== ph) {
        setNoBookingFlag(true);
      }
    }
  }, [isAlreadyBooked]);
  const handleSubmit = () => {
    // api integration
    if (!phoneNo) {
      setIsPhoneNoError(true);
    } else {
      setIsPhoneNoError(false);
      setIsSubmit(true);
      console.log(
        `Phone number is ${phoneNo}. Is it checked? ${isAlreadyBooked}`
      );
    }
  };
  return (
    <div className="App">
      <div style={{ padding: "20px 0" }}>
        <Header as="h2" icon textAlign="center">
          <Icon name="car" circular />
          <Header.Content>Car Parking Slot Allotment</Header.Content>
        </Header>
      </div>
      <Modal
        basic
        onClose={() => console.log("Close")}
        onOpen={() => console.log("Open")}
        open={noBookingFlag}
        size="small"
      >
        <Header icon>
          <Icon name="archive" />
          Booking Not Found!!!
        </Header>
        <Modal.Content>
          <p>There is no booking associated with this phone number!!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={() => {
              resetValues();
              setNoBookingFlag(false);
            }}
          >
            <Icon name="checkmark" /> Ok
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        size="mini"
        open={isSubmit}
        onClose={() => {
          setIsSubmit(false);
        }}
      >
        <Modal.Header>Confirm Booking?</Modal.Header>
        <Modal.Content>
          <p>{`Are you sure you want to book a slot with +91-${phoneNo}? ${
            isAlreadyBooked ? "(Already Booked)" : ""
          }`}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => setIsSubmit(false)}>
            Yes
          </Button>
          <Button negative onClick={() => setIsSubmit(false)}>
            No
          </Button>
        </Modal.Actions>
      </Modal>
      <Grid textAlign="center" columns="equal" style={{ margin: "50px 0 0" }}>
        <Grid.Row>
          <Grid.Column
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card>
                <Card.Content>
                  <Card.Header style={{ margin: "10px 0 0" }}>
                    Parking Slot Booking.
                  </Card.Header>
                  <div
                    className="ui description"
                    style={{ margin: "20px 0 0" }}
                  >
                    <input
                      className="ui input"
                      type="text"
                      name="phoneNo"
                      value={phoneNo}
                      onChange={handlePhoneNumberChange}
                    />
                    <div className="ui description">
                      {isPhoneNoError && (
                        <div class="ui pointing label">
                          Please enter your Phone Number
                        </div>
                      )}
                      <Checkbox
                        style={{ margin: "20px 5px 0" }}
                        label="Already Booked?"
                        onChange={handleCheckboxChange}
                        checked={isAlreadyBooked}
                      />
                      <div style={{ margin: "20px 0" }}>
                        <button
                          className="ui primary button"
                          onClick={handleSubmit}
                        >
                          Allot A Slot!
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </Grid.Column>
          <Grid.Column>
            <Table celled>
              <Table.Header>
                <Table.HeaderCell>Rate List</Table.HeaderCell>
              </Table.Header>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>No. of Hours</Table.HeaderCell>
                  <Table.HeaderCell>Rate per hour.</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>0-1</Table.Cell>
                  <Table.Cell>₹ 20</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>1-4</Table.Cell>
                  <Table.Cell>₹ 15</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>More than 4</Table.Cell>
                  <Table.Cell>₹ 10</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
