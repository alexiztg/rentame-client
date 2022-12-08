import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack,Box,Text,StackDivider } from '@chakra-ui/react'


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
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
        <Heading size='md'>
          <p className="title">Login</p>
        </Heading>
        <br/>
      </CardHeader>
      <CardBody>
      <form onSubmit={handleLoginSubmit}>
      <Stack divider={<StackDivider />} spacing='4'>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Email:
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
        <br/>

        <button className="btn" type="submit">Login</button>
        </Box>
      </Stack>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <br/>
      <Link className="btn" to={"/signup"}> Sign Up</Link>
      </CardBody>
      </Card>
  );
}

export default LoginPage;
