import { useState, useEffect } from "react";
import axios from "axios";
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

function EditShopPage(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [cost, setCost] = useState("");
    const [colony, setColony] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

  useEffect(() => {
    // <== ADD
    axios
        .get(`${API_URL}/api/shops/${id}`)
        .then((response) => {
        /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
        const oneShop = response.data;
        setName(oneShop.name);
        setAddress(oneShop.address);
        setCost(oneShop.cost)
        setColony(oneShop.colony)
        setDescription(oneShop.description)
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleFormSubmit = (e) => {
    // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { name, address, cost, colony, description };

    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/shops/${id}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/shops/${id}/rent`);
      });
  };

  return (
    <div className="EditShopPage">
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
                Edit Shop
              </Heading>
            </VStack>
            <Card bg="#f6f8fa" variant="outline" w="308px">
              <CardBody>
                <form onSubmit={handleFormSubmit}>
                  <Stack spacing="4">
                    <FormControl>
                      <FormLabel size="sm">Name</FormLabel>
                      <Input
                        type="text"
                        bg="white"
                        size="sm"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Address</FormLabel>
                      <Input
                        type="text"
                        bg="white"
                        size="sm"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Cost</FormLabel>
                      <Input
                        type="text"
                        bg="white"
                        size="sm"
                        name="cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Colony</FormLabel>
                      <Input
                        type="text"
                        bg="white"
                        size="sm"
                        name="colony"
                        value={colony}
                        onChange={(e) => setColony(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Description</FormLabel>
                      <textarea
                        type="text"
                        bg="white"
                        size="sm"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                      Create
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

export default EditShopPage;