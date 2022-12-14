import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const API_URL = "http://localhost:5005";

function AddShop(props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cost, setCost] = useState("");
  const [colony, setColony] = useState("");
  const [description, setDescription] = useState("");

  //Nos permite navegar dandole la URL como parametro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      //Prevenir el comportamiento del envio del formulario
      e.preventDefault();
      console.log({ name, address, cost, colony, description });
      //Enviar datos al server
      const newShop = await axios.post(`${API_URL}/api/shops`, {
        name,
        address,
        cost,
        colony,
        description,
      });
      //Enviar al detalle de la tienda
      navigate(`/shops/${newShop.data._id}/rent`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AddShop">
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
                New Shop
              </Heading>
            </VStack>
            <Card bg="#f6f8fa" variant="outline" w="308px">
              <CardBody>
                <form onSubmit={handleSubmit}>
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

export default AddShop;
