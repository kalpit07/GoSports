import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import NativeSelect from "@mui/material/NativeSelect";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "./EventCard";
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";

const Event = () => {
  const [language, setLanguage] = React.useState("en");
  const [events, setEvents] = React.useState([]);

  useEffect(() => {
    let data = {};
    data["email"] = localStorage.getItem("email");
    data["language"] = localStorage.getItem("language");
    axios
      .post(
        "https://8kk1oe9vo5.execute-api.us-east-1.amazonaws.com/prod/events/all",
        data
      )
      .then(function (response) {
        console.log(response);
        console.log("Data retrieved!");
        console.log(response["data"]);
        console.log(typeof response["data"]);
        setEvents(response["data"]["events"]);
      })
      .catch(function (error) {
        console.log(error);
        alert("Couldn't fetch event details!");
      });
  }, []);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLanguage(event.target.value);
    console.log(event.target.value);
    localStorage.setItem("language", event.target.value);
    let data = {};
    data["email"] = localStorage.getItem("email");
    data["language"] = localStorage.getItem("language");
    axios
      .post(
        "https://8kk1oe9vo5.execute-api.us-east-1.amazonaws.com/prod/events/all",
        data
      )
      .then(function (response) {
        console.log(response);
        console.log("Data retrieved!");
        console.log(response["data"]);
        console.log(typeof response["data"]);
        setEvents(response["data"]["events"]);
      })
      .catch(function (error) {
        console.log(error);
        alert("Couldn't fetch event details!");
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
          <Typography variant="h3">Events</Typography>
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
              <Button
                style={{ height: "40px", width: "175px" }}
                variant="contained"
                onClick={() => {
                  navigate("/addevent");
                }}
              >
                + Add Event
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <br />
      <br />
      <div className="Events">
        <Container>
          <Grid container spacing={4}>
            {events.map((event) => (
              <Grid item key={event.event_id} xs={12} sm={6} md={4}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Event;
