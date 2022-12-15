import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

function AddRent(props) {
  const [available, setAvailable] = useState(false);
  const [date_start, setDate_start] = useState("");
  const [date_end, setDate_end] = useState("");
  const { user } = useContext(AuthContext);
  console.log(user);
  //Nos permite navegar dandole la URL como parametro
  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    try {
      //Prevenir el comportamiento del envio del formulario
      e.preventDefault();
      console.log({ available, date_start, date_end });
      console.log("111", id);
      //Enviar datos al server
      const newShop = await axios.post(
        `${API_URL}/api/shops/${id}/rent/create`,
        { available, date_start, date_end, owner: user._id, shop: id }
      );
      //Enviar al detalle de la tienda
      navigate(`/shops/${id}/rent`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AddRent">
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
                New Rent
              </Heading>
            </VStack>
            <Card bg="#f6f8fa" variant="outline" w="308px">
              <CardBody>
                <form onSubmit={handleSubmit}>
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
                        value={date_start}
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

export default AddRent;
