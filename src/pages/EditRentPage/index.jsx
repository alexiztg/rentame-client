import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment'
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    CardBody,
    Heading,
    Stack,
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    VStack,
  } from "@chakra-ui/react";
  

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function EditRentPage(props) {
    const [available, setAvailable] = useState(false);
    const [date_start, setDate_start] = useState("");
    const [date_end, setDate_end] = useState("");
    const { id, idRent } = useParams();
    const navigate = useNavigate();

    console.log("1",id);
    console.log("2",idRent);

  useEffect(() => {
    // <== ADD
    axios
        .get(`${API_URL}/api/shops/${id}/rent/${idRent}`)
        .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneRent = response.data;
        console.log("oneRent",oneRent);
        setAvailable(oneRent.available);
        setDate_start(oneRent.date_start);
        setDate_end(oneRent.date_end)
      })
      .catch((error) => console.log(error));
  }, [id, idRent]);

  const handleFormSubmit = (e) => {
    // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { available, date_start, date_end };

    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/shops/${id}/rent/${idRent}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/shops/${id}/rent`);
      });
  };

  return (
    <div className="EditRentPage">
      <Box>
        <Center>
          <Stack spacing="4">
            <VStack as="header" spacing="6" mt="8">
              <Heading
                as="h1"
                fontWeight="300"
                fontSize="24px"
                letterSpacing="-0.5px"
              >
                Edit Rent
              </Heading>
            </VStack>
            <Card bg="#f6f8fa" variant="outline" w="308px">
              <CardBody>
                <form onSubmit={handleFormSubmit}>
                  <Stack spacing="4">
                    <FormControl>
                      <FormLabel size="sm">Available</FormLabel>
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        bg="white"
                        size="sm"
                        name="available"
                        value={available}
                        onChange={(e) => setAvailable(e.target.checked)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Date Start</FormLabel>
                      <Input
                        type="date"
                        bg="white"
                        size="sm"
                        name="date_start"
                        value={moment(date_start).format("YYYY/MM/DD")}
                        onChange={(e) => setDate_start(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Date End</FormLabel>
                      <Input
                        type="date"
                        bg="white"
                        size="sm"
                        name="date"
                        value={date_end}
                        onChange={(e) => setDate_end(e.target.value)}
                      />
                    </FormControl>
                    <Button
                      colorScheme="blue"
                      color="white"
                      size="sm"
                      _hover={{ bg: "#2c974b" }}
                      _active={{ bg: "#298e46" }}
                      type="submit"
                      value="Submit"
                    >
                      Create Rent
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
          </Stack>
        </Center>
      </Box>
    </div>
  );
}

export default EditRentPage;