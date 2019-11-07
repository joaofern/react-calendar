import moment from "moment";

function dateToString(date) {
  return moment(date).format("YYYY-MM-DD HH:mm");
}

function validateForm(text, start, end) {
  const error = {
    text: "",
    start: "",
    end: ""
  };
  if (text.length < 1 || text.length > 25)
    error.text = "Text field must have between 1 and 25 characters.";
  if (start.getTime() > end.getTime() || start.getTime() === end.getTime())
    error.end = "End date must be greater than start date.";
  const today = new Date();
  if (today.getTime() > start.getTime())
    error.start = "Start date must be grater than current time.";
  return error;
}

function validateDateFormat(dateString) {
  //Check for all digits
  var dateReg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  if (dateString.match(dateReg) === null) return false;
  //Check for valid date
  var d = moment(dateString, "YYYY-MM-DD HH:mm");
  if (!d.isValid()) return false;
  else return true;
}

export { dateToString, validateForm, validateDateFormat };
