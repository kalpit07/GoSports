import React from "react";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { default as UUID } from "node-uuid";

const BlogCard = ({ blog }) => {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          pt: "0%",
        }}
        image={blog.url}
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {blog.title}
        </Typography>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            View Blog
          </Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{blog.title}</DialogTitle>

            <Grid container justifyContent="center">
              <img src={blog.url} width="450" styles={{ radius: "20px" }} />
            </Grid>
            <DialogContent>
              <DialogContentText>{blog.content}</DialogContentText>
              <br />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (localStorage["language"] === "zh") {
                    alert("Sorry, voice not supported.");
                  } else {
                    let message = [];
                    message.push("Blog Title");
                    message.push(blog.title);
                    message.push("Blog Content");
                    message.push(blog.content);
                    console.log(message);

                    let data = {};
                    data["message"] = message;
                    data["language"] = localStorage.getItem("language");
                    data["id"] = UUID.v4();

                    axios
                      .post(
                        "https://8kk1oe9vo5.execute-api.us-east-1.amazonaws.com/prod/polly",
                        data
                      )
                      .then(function (response) {
                        setTimeout(() => {
                          new Audio(
                            "https://gosports-polly.s3.amazonaws.com/" +
                              data["id"] +
                              ".mp3"
                          ).play();
                        }, 2000);
                      })
                      .catch(function (error) {
                        console.log(error);
                        alert("Couldn't play audio!");
                      });
                  }
                }}
              >
                Listen
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
