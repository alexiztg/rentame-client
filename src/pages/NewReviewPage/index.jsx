import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
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

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

function AddReview(props) {
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const { user } = useContext(AuthContext);
  console.log(user);
  //Nos permite navegar dandole la URL como parametro
  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    try {
      //Prevenir el comportamiento del envio del formulario
      e.preventDefault();
      console.log({ review, title, date });
      console.log("111", id);
      //Enviar datos al server
      const newShop = await axios.post(
        `${API_URL}/api/shops/${id}/review/create`,
        { review, title, date, owner: user._id, shop: id }
      );
      //Enviar al detalle de la tienda
      navigate(`/shops/${id}/rent`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AddReview">
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
                New Review
              </Heading>
            </VStack>
            <Card bg="#f6f8fa" variant="outline" w="308px">
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <Stack spacing="4">
                    <FormControl>
                      <FormLabel size="sm">Title</FormLabel>
                      <Input
                        type="text"
                        bg="white"
                        size="sm"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Review</FormLabel>
                      <Input
                        type="text"
                        bg="white"
                        size="sm"
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Date</FormLabel>
                      <Input
                        type="date"
                        bg="white"
                        size="sm"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                      Create Review
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

export default AddReview;
