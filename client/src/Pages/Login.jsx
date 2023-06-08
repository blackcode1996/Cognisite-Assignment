import React, { useState } from "react";
import {
  Button,
  Box,
  Grid,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Login_lottie from "../assests/login_lottie.json";
import Lottie from "lottie-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState();

  const toast = useToast();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    let userData = {
      mobile,
      password,
    };

    try {
      const response = await axios.post(
        "https://cognisite-assignment.onrender.com/login",
        userData
      );
      toast({
        title: "Login success!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Set token in local storage
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      marginTop={{ sm: "15px" }}
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid templateColumns={{ md: "7fr 5fr" }} gap={4} h={"100%"} w={"100%"}>
        <Stack align="center" justify="center" spacing={8}>
          <Text fontSize="4xl" textAlign="center">
            Welcome Back!
          </Text>
          <Stack
            direction="column"
            spacing={4}
            w="80%"
            maxW={500}
            as="form"
            onSubmit={handleSignup}
          >
            <Stack direction="column" spacing={2}>
              <Input
                type="text"
                placeholder="Your mobile number"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Stack>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
            <Text textAlign="center">
              Don't have an account? <Link to="/">Signup</Link>
            </Text>
          </Stack>
        </Stack>
        <Stack align="center" justify="center">
          <Lottie animationData={Login_lottie} />
        </Stack>
      </Grid>
    </Box>
  );
}

export default Login;
