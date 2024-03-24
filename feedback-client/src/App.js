import { Box } from "@mui/material";
import PostSection from "./pages/FeedbackPage";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react"; // import useState
import { useNavigate } from "react-router-dom";

function App() {
  const [userType, setUserType] = useState(null); // Track userType
  const navigate = useNavigate();

  const isAdminAuth = async () => {
    try {
      const res = await axios.get("/api/v1/admin/auth");
      if (res.status === 200) {
        setUserType(res.data.userType); // Set userType in state
        localStorage.setItem("token", res.data.token); // Store token in localStorage
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const isUserAuth = async () => {
    try {
      const res = await axios.get("/api/v1/user/auth", {
        withCredentials: true,
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token); // Store token in localStorage
        setUserType(res.data.userType); // Set userType in state
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    // Check if token exists in localStorage
    isAdminAuth();
    isUserAuth();
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    if (storedToken) {
      // Set token in axios default headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      // Fetch user authentication
    }
  }, []);

  return (
    <Box>
      <Routes>
        {userType === "user" || userType === "admin" ? (
          <Route path="/post" element={<PostSection />} />
        ) : (
          <Route path="/" element={<SignInSide />} />
        )}
        <Route path="/post" element={<PostSection />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Box>
  );
}

export default App;
