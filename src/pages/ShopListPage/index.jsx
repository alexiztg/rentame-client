import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  Grid,
  HStack
} from "@chakra-ui/react";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

function ShopListPage() {
  const [shops, setShops] = useState([]);

  const getAllShops = () => {
    axios
      .get(`${API_URL}/api/shops`)
      .then((response) => setShops(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllShops();
  }, []);

  return (
    <div className="ShopListPage">
      <br />
      <HStack spacing="24px">
        <Button className="spaceLeft" colorScheme="blue">
          <Link to={`/new-shop`}>Create a New Shop</Link>
        </Button>
      </HStack>
      <br />
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {shops.map((shop) => {
          return (
            <div key={shop._id}>
              <Card
                w="45vw"
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                key={shop._id}
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src="https://www.linkpicture.com/q/Store.png"
                  alt="Caffe Latte"
                />
                <Stack>
                  <CardBody>
                    <Heading size="md">{shop.name}</Heading>
                    <Text py="2">{shop.description}</Text>
                  </CardBody>
                  <CardFooter>
                    <Button colorScheme="blue">
                      <Link to={`/shops/${shop._id}/rent`}>More info</Link>
                    </Button>
                    <Button className="spaceLeft1" colorScheme="whatsapp">
                      <Link to={`/shops/${shop._id}/edit`}>Edit</Link>
                    </Button>
                    <Button className="spaceLeft1" colorScheme="red">
                      <Link to={`/shops/${shop._id}`}>Delete</Link>
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            </div>
          );
        })}
      </Grid>
    </div>
  );
}
export default ShopListPage;
