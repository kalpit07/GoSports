// import React, { useState } from "react";
// import { Typography, Grid, TextField, Button } from "@mui/material";
// import axios from "axios";

// const registerUrl =
//   "https://xzvhb95cz6.execute-api.us-east-1.amazonaws.com/prod/register";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState(null);
//   const [registerMessage, setRegisterMessage] = useState(null);

//   const submitHandler = (event) => {
//     event.preventDefault();
//     if (
//       username.trim() === "" ||
//       name.trim() === "" ||
//       email.trim() === "" ||
//       password.trim() === ""
//     ) {
//       setMessage("All fields are required!");
//       return;
//     }

//     const requestConfig = {
//       headers: {
//         "x-api-key": "ZlnKjwP2qc3FQojiAsXPL6DxUXLrCeHl7bkRmnBe",
//       },
//     };

//     const requestBody = {
//       username: username,
//       name: name,
//       email: email,
//       password: password,
//     };

//     axios
//       .post(registerUrl, requestBody, requestConfig)
//       .then((response) => {
//         setRegisterMessage("Registration Successful!");
//       })
//       .catch((error) => {
//         if (error.response.status === 401 || error.response.status === 403) {
//           setMessage(error.response.data.message);
//         } else {
//           setMessage(
//             "Sorry, back-end server is down. Please, try again later."
//           );
//         }
//       });
//   };

//   return (
//     <div className="Register">
//       <form onSubmit={submitHandler} autoComplete="off">
//         <Grid
//           container
//           alignItems="center"
//           justify="center"
//           direction="column"
//           style={{ minHeight: "100vh" }}
//         >
//           <Grid item>
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <Typography
//               variant="h4"
//               style={{ fontWeight: "bold", color: "#1976D2" }}
//             >
//               Sign up
//             </Typography>
//           </Grid>
//           <br />
//           <br />
//           <Grid item>
//             <TextField
//               id="username-input"
//               name="username"
//               label="Username"
//               type="text"
//               value={username}
//               onChange={(event) => setUsername(event.target.value)}
//               variant="outlined"
//               style={{ width: 250 }}
//             />
//           </Grid>
//           <br />
//           <br />{" "}
//           <Grid item>
//             <TextField
//               id="name-input"
//               name="name"
//               label="Name"
//               type="text"
//               value={name}
//               onChange={(event) => setName(event.target.value)}
//               variant="outlined"
//               style={{ width: 250 }}
//             />
//           </Grid>
//           <br />
//           <br />
//           <Grid item>
//             <TextField
//               id="email-input"
//               name="email"
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               variant="outlined"
//               style={{ width: 250 }}
//             />
//           </Grid>
//           <br />
//           <br />
//           <Grid item>
//             <TextField
//               id="password-input"
//               name="password"
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//               variant="outlined"
//               style={{ width: 250 }}
//             />
//           </Grid>
//           <br />
//           <br />
//           <Button variant="contained" color="primary" type="submit">
//             Register
//           </Button>
//           {message && (
//             <p className="message" style={{ color: "red" }}>
//               {message}
//             </p>
//           )}
//           {registerMessage && (
//             <p className="registerMessage" style={{ color: "green" }}>
//               {registerMessage}
//             </p>
//           )}
//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default Register;
