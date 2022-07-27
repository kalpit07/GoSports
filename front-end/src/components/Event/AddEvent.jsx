import React from "react";
import Navbar from "../Navbar/Navbar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { default as UUID } from "node-uuid";
import "./Event.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef } from "react";
import axios from "axios";

const theme = createTheme();
const AddEvent = () => {
  const [title, setTitle] = React.useState("");
  const [language, setLanguage] = React.useState("en");
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [seats, setSeats] = React.useState("");
  const [image, setImage] = React.useState("");
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Title", title);
    console.log("language", language);
    console.log("Location", location);
    console.log("Date", date);
    console.log("Description", description);
    console.log("Price", price);
    console.log("Seats", seats);
    console.log("Image", image);

    let data = {};
    data["event_id"] = UUID.v4();
    data["title"] = title;
    data["language"] = language;
    data["location"] = location;
    data["date"] = date;
    data["description"] = description;
    data["price"] = price;
    data["seats"] = seats;
    data["available_seats"] = seats;
    data["url"] = "https://source.unsplash.com/9HI8UJMSdZA";
    // SET USER
    data["created_by"] = localStorage.getItem("email");

    axios
      .post(
        "https://8kk1oe9vo5.execute-api.us-east-1.amazonaws.com/prod/events/add",
        data
      )
      .then(function (response) {
        console.log(response);
        alert("Event added!");
        setTitle();
        setLanguage("en");
        setLocation();
        setDate("");
        setDescription();
        setPrice();
        setSeats();
        setImage();
      })
      .catch(function (error) {
        console.log(error);
        alert("Couldn't add event!");
      });
  };

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              <CelebrationIcon /> &nbsp;Add Event
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Event Title"
                    name="title"
                    onChange={(event) => setTitle(event.target.value)}
                    autoComplete="off"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Language
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={language}
                      label="Language"
                      onChange={(event) => {
                        setLanguage(event.target.value);
                      }}
                    >
                      <MenuItem value={"en"}>English</MenuItem>
                      <MenuItem value={"hi"}>Hindi</MenuItem>
                      <MenuItem value={"zh"}>Chinese</MenuItem>
                      <MenuItem value={"fr"}>French</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    autoComplete="off"
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    sx={{
                      display: null,
                    }}
                    required
                    id="date"
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    multiline
                    rows={4}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="off"
                    name="price"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="seats"
                    label="Seats"
                    name="seats"
                    onChange={(event) => setSeats(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="image"
                    label="Select image"
                    name="image"
                    type="file"
                    ref={inputRef}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => setImage(event.target.value)}
                    style={{ display: null }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Event
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AddEvent;
