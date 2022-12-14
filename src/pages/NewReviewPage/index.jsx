import { useState, useEffect } from "react";
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

const API_URL = "http://localhost:5005";

function AddReview(props) {
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [idShop, setIdShop] = useState("");
  const [shops, setShops] = useState([]);

  //Nos permite navegar dandole la URL como parametro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
    //   //Prevenir el comportamiento del envio del formulario
    //   e.preventDefault();
    //   console.log({ review, title, date });
    //   //Enviar datos al server
    //                                 // const newShop = await axios.post(
    //                                 //     `${API_URL}/api/shops/${shop._id}/review/create`,
    //                                 //     { review, title, date }
    //                                 // );
    //   //Enviar al detalle de la tienda
    //   navigate(`/shops/${newShop.data._id}/rent`);
    } catch (err) {
      console.log(err);
    }
  };

  const getShops = async () => {
    try{
        //Buscar las Shop
        const allShops = await axios.get(`${API_URL}/api/shops`)
        setShops(allShops.data);
        //Debido al comportamiento del select definimos el primer elemento en el estado de IdShop
        setIdShop(allShops.data[0]._id);
    }catch (err) {
        console.log(err)
  }
}

  useEffect(()=>{
    getShops();
  },[])

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
                    <FormControl>
                      <FormLabel size="sm">Shop</FormLabel>
                      {/* <select onChange={(e)=> setIdShop(e.target.value) }>
                      {shops.map(({_id}) =>(
                         <option key={_id} value={_id}>{_id}</option>
                         ))}
                      </select> */}
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
