import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import NativeSelect from "@mui/material/NativeSelect";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookingCard from "./BookingCard";

const Booking = () => {
  const [bookings, setBookings] = React.useState([]);

  useEffect(() => {
    let data = {};
    localStorage.setItem("language", "en");
    data["email"] = localStorage.getItem("email");
    data["language"] = localStorage.getItem("language");
    axios
      .post(
        "https://8kk1oe9vo5.execute-api.us-east-1.amazonaws.com/prod/bookings",
        data
      )
      .then(function (response) {
        setBookings(response["data"]["bookings"]);
      })
      .catch(function (error) {
        console.log(error);
        alert("Couldn't fetch bookings details!");
      });
  }, []);

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.value);
    localStorage.setItem("language", event.target.value);
    let data = {};
    data["email"] = localStorage.getItem("email");
    data["language"] = localStorage.getItem("language");
    axios
      .post(
        "https://8kk1oe9vo5.execute-api.us-east-1.amazonaws.com/prod/bookings",
        data
      )
      .then(function (response) {
        setBookings(response["data"]["bookings"]);
      })
      .catch(function (error) {
        console.log(error);
        alert("Couldn't fetch bookings details!");
      });
  };
  return (
    <div>
      <Navbar />
      <br />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Typography variant="h3">Bookings</Typography>
        </Grid>
      </Grid>
      <br />
      <div className="language">
        <Container>
          <Grid container>
            <Grid item xs>
              <Container>
                <Box
                  sx={{
                    width: 1 / 3,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Language
                    </InputLabel>
                    <NativeSelect
                      defaultValue={localStorage.getItem("language")}
                      inputProps={{
                        name: "language",
                        id: "uncontrolled-native",
                      }}
                      onChange={handleChange}
                    >
                      <option value={"en"}>English</option>
                      <option value={"hi"}>Hindi</option>
                      <option value={"zh"}>Chinese</option>
                      <option value={"fr"}>French</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Container>
            </Grid>
            <Grid item justifyContent="flex-end">
              {/* <Grid container></Grid> */}
            </Grid>
          </Grid>
        </Container>
      </div>
      <br />
      <br />
      <div className="MyEvents">
        <Container>
          <Grid container spacing={4}>
            {bookings.map((booking) => (
              <Grid item key={booking.event_id} xs={12} sm={6} md={4}>
                <BookingCard booking={booking} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Booking;
