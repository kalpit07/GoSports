import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Event from "./components/Event/Event";
import Blog from "./components/Blog/Blog";
import Booking from "./components/Booking/Booking";
import AddEvent from "./components/Event/AddEvent";
import MyEvent from "./components/Event/MyEvent";
import AddBlog from "./components/Blog/AddBlog";
import MyBlog from "./components/Blog/MyBlog";

function App() {
  return (
    <div className="App">
      <div className="Header">{/* <Navbar /> */}</div>
      <div className="Content">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Register />} />
            <Route exact path="/events" element={<Event />} />
            <Route exact path="/myevents" element={<MyEvent />} />
            <Route exact path="/addevent" element={<AddEvent />} />
            <Route exact path="/blogs" element={<Blog />} />
            <Route exact path="/addblog" element={<AddBlog />} />
            <Route exact path="/myblogs" element={<MyBlog />} />

            {/* Chnage */}
            <Route exact path="/bookings" element={<Booking />} />
            {/* Change End */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
