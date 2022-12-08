import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack,Box,Text,StackDivider } from '@chakra-ui/react';


function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='lg'>
          <Text fontSize='5xl'>
            <p className="title">Sign Up</p>
          </Text>  
        </Heading>
        <br/>
      </CardHeader>
      <CardBody>
      <form onSubmit={handleSignupSubmit}>
      <Stack divider={<StackDivider />} spacing='4'>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Email
          </Heading>
          <Text pt='2' fontSize='sm'>
            <input type="email" name="email" value={email} onChange={handleEmail} />
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
          Password:
          </Heading>
          <Text pt='2' fontSize='sm'>
          <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </Text> 
        </Box>  
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Name:
          </Heading>
          <Text pt='2' fontSize='sm'>
            <input type="text" name="name" value={name} onChange={handleName} />
          </Text> 
          <br/>
          <button className="btn" type="submit">Sign Up</button>
        </Box>

      </Stack>
      </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>Already have account?</p>
          <br/>
          <Link className="btn" to={"/login"}> Login</Link>

      </CardBody>
      
    </Card>
  );
}

export default SignupPage;
