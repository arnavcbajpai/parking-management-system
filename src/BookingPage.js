import React, { useEffect, useState } from "react";
import { Form, Header, Icon, Segment, Grid, Message } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

export default function BookingPage() {
  const [isFormSubmit, setisFormSubmit] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState(false);
  const [uniqId, setUniqId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [parkingSpotFlag, setParkingSpotFlag] = useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState();
  const regexCheck = /^[6789]\d{9}$/;

  const handleSubmit = () => {
    if (phoneNumber === "") {
      setIsPhoneNumberEmpty(true);
    } else {
      setUniqId(parseInt(Math.random() * 10000));
      setisFormSubmit(true);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const re = /^[0-9\b]+$/;
    console.log(e.target.value);
    // if value is not blank, then test the regex
    if (e.target.value === "" || re.test(e.target.value)) {
      setIsPhoneNumberEmpty(false);
      setPhoneNumber(e.target.value);
      if (!regexCheck.test(e.target.value)) {
        setIsPhoneNumberEmpty(true);
        if (e.target.value.length > 10) {
          setPhoneNumberErrorMessage("Phone number exceeds 10 digits");
        } else if (e.target.value.length < 10) {
          setPhoneNumberErrorMessage("Phone number must be 10 digits");
        }
      }
    }
  };

  useEffect(() => {
    // on first render to get position
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    // api call do here please
    console.log(`Latitude is - ${latitude} and longitude is ${longitude}`);
  }, [latitude]);

  useEffect(() => {
    console.log("UNIQUE ID DISPLAY", uniqId);
  }, [uniqId]);

  return (
    <div>
      <Header as="h2" icon textAlign="center" style={{ margin: "20px 0 60px" }}>
        <Icon
          name="car"
          circular
          style={{ display: "inline-block", margin: "0px 20px" }}
        />
        <Header.Content style={{ display: "inline-block" }}>
          Car Parking Slot Allotment
        </Header.Content>
      </Header>

      <Grid textAlign="center" verticalAlign="middle">
        <Segment style={{ height: "auto", width: "400px" }}>
          <Form
            success={isFormSubmit}
            unstackable={true}
            loading={isFormSubmit}
            size="large"
            widths="equal"
          >
            <Form.Group>
              <Form.Input
                fluid
                label="Phone Number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                // error={isPhoneNumberEmpty}
                error={
                  isPhoneNumberEmpty && {
                    content: phoneNumberErrorMessage,
                    pointing: "above",
                  }
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Button
                content="Find a Slot!"
                size="small"
                color="blue"
                icon="right arrow"
                labelPosition="right"
                name="check"
                onClick={(e) => {
                  console.log("e", e.target.name);
                  setParkingSpotFlag(true);
                }}
              />
            </Form.Group>
            <Form.Field widths="equal">
              {parkingSpotFlag && (
                <Form.Input
                  readOnly
                  fluid
                  label="Nearest Parking Spot"
                  placeholder="XXXXXXXXXXXXXXXXXXXXxx"
                />
              )}
            </Form.Field>
            <Form.Button onClick={handleSubmit}>Submit</Form.Button>
          </Form>
        </Segment>
      </Grid>
    </div>
  );
}
