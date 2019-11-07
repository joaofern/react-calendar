import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import MaskedFormControl from "react-bootstrap-maskedinput";

import {
  dateToString,
  validateForm,
  validateDateFormat
} from "../validations/dates";

function MyModal(props) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");

  useEffect(() => {
    if (props.selected) {
      setText(props.selected.title);
      setStart(dateToString(props.selected.start));
      setEnd(dateToString(props.selected.end));
    } else {
      setText("");
      setStart("");
      setEnd("");
    }
  }, [props.selected]);

  useEffect(() => {
    props.start && setStart(dateToString(props.start));
    props.end && setEnd(dateToString(props.end));
  }, [props.start, props.end]);

  const handleClose = () => {
    props.setShow(false);
    props.setSelected();
    clearValidations();
    setText("");
  };

  const handleDelete = () => {
    props.setShow(false);
    props.deleteEvent();
    clearValidations();
  };

  const handleSave = () => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    clearValidations();

    if (!validateDateFormat(start)) {
      setStartError("Invalid start date format.");
      return;
    }
    if (!validateDateFormat(end)) {
      setEndError("Invalid end date format.");
      return;
    }

    const error = validateForm(text, startDate, endDate);
    let errorsFound = false;
    if (error.text.length > 0) {
      setTextError(error.text);
      errorsFound = true;
    }
    if (error.start.length > 0) {
      setStartError(error.start);
      errorsFound = true;
    }
    if (error.end.length > 0) {
      setEndError(error.end);
      errorsFound = true;
    }
    if (errorsFound) return;

    const myEvent = {
      title: text,
      start: startDate,
      end: endDate
    };
    clearValidations();
    setText("");
    props.addEvent(myEvent);
    props.setShow(false);
  };

  const handleChange = (str, value) => {
    switch (str) {
      case "text":
        setText(value);
        break;
      case "start":
        setStart(value);
        break;
      case "end":
        setEnd(value);
        break;
      default:
        break;
    }
  };

  const clearValidations = () => {
    setTextError("");
    setStartError("");
    setEndError("");
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label
                style={
                  textError.length > 0 ? { color: "red" } : { color: "black" }
                }
              >{`Text: ${textError}`}</Form.Label>
              <Form.Control
                onChange={e => {
                  handleChange("text", e.currentTarget.value);
                }}
                type="text"
                placeholder="Enter reminder note"
                value={text}
              />
            </Form.Group>
            <div>
              <Form.Group>
                <Form.Label
                  style={
                    startError.length > 0
                      ? { color: "red" }
                      : { color: "black" }
                  }
                >{`Start date: ${startError}`}</Form.Label>
                <MaskedFormControl
                  type="text"
                  name="dateAndTime"
                  mask="1111-11-11 11:11"
                  value={start}
                  onChange={e => {
                    handleChange("start", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label
                  style={
                    endError.length > 0 ? { color: "red" } : { color: "black" }
                  }
                >{`End date: ${endError}`}</Form.Label>
                <MaskedFormControl
                  type="text"
                  name="dateAndTime"
                  mask="1111-11-11 11:11"
                  value={end}
                  onChange={e => {
                    handleChange("end", e.target.value);
                  }}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
          {!props.selected && (
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          )}
          {props.selected && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MyModal;
