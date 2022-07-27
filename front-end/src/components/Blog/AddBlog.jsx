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
import BookIcon from "@mui/icons-material/Book";
import { default as UUID } from "node-uuid";
import "./Blog.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef } from "react";
import axios from "axios";

const theme = createTheme();
const AddBlog = () => {
  const [title, setTitle] = React.useState("");
  const [language, setLanguage] = React.useState("en");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    let date = new Date();

    let data = {};
    data["blog_id"] = UUID.v4();
    data["title"] = title;
    data["language"] = language;
    data["date"] = date;
    data["content"] = content;
    data["url"] = "https://source.unsplash.com/npxXWgQ33ZQ";
    // SET USER
    data["created_by"] = localStorage.getItem("email");

    axios
      .post(
        "https://8kk1oe9vo5.execute-api.us-east-1.amazonaws.com/prod/blogs/add",
        data
      )
      .then(function (response) {
        console.log(response);
        alert("Blog added!");
        setTitle();
        setLanguage("en");
        setContent("");
        setImage();
      })
      .catch(function (error) {
        console.log(error);
        alert("Couldn't add blog!");
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
              <BookIcon /> &nbsp;Add Blog
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
                    label="Blog Title"
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

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="content"
                    label="Content"
                    id="content"
                    multiline
                    rows={9}
                    onChange={(event) => setContent(event.target.value)}
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
                Add Blog
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AddBlog;
