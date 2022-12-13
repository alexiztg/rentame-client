import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import moment from 'moment'
import {
  Card,
  CardHeader,
  CardFooter,
  Flex,
  Box,
  Heading,
  Text,
  CardBody,
  Image,
  Button,
  List,
  ListItem,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

function RentListPage(props) {
  const [shop, setShop] = useState(null);
  const { id } = useParams();
  const getDetails = (id) => {
    axios
      .get(`http://localhost:5005/api/shops/${id}`)
      .then((respuesta) => setShop(respuesta.data))
      .catch(console.log);
  };
  

  useEffect(() => {
    getDetails(id);
  }, [id]);

  return (
    <div className="ProjectDetails">
    <Center>
    <SimpleGrid columns={2} spacing={10}>
    <Box height='80px'>
      <Card maxW="md">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                {shop && (
                  <>
                    <Heading size="sm">
                      <Text as="b">Name: </Text>
                      {shop.name}
                    </Heading>
                    <Text as="b">Address: </Text>
                    {shop.address}
                  </>
                )}
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <List spacing={3}>
            <ListItem>
              {shop && (
                <>
                  <SettingsIcon color="green.500" />
                  <Text as="b"> Cost: </Text>${shop.cost}
                </>
              )}
            </ListItem>
            <ListItem>
              {shop && (
                <>
                  <SettingsIcon color="green.500" />
                  <Text as="b"> Colony: </Text>
                  {shop.colony}
                </>
              )}
            </ListItem>
            <ListItem>
              <Text>
                {shop && (
                  <>
                    <SettingsIcon color="green.500" />
                    <Text as="b"> Description: </Text>
                    {shop.description}
                  </>
                )}
              </Text>
            </ListItem>
            {shop &&
              shop.rent.map((rent) => (
                <div key={rent._id}>
                  <ListItem>
                    <Text>
                      <SettingsIcon color="green.500" />
                      <Text as="b"> Available:</Text>
                      {rent.available}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      <SettingsIcon color="green.500" />
                      <Text as="b"> Date starts:</Text>
                      {rent.date_start}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      <SettingsIcon color="green.500" />
                      <Text as="b"> Date ends:</Text>
                      {rent.date_end}
                    </Text>
                  </ListItem>
                </div>
              ))}
          </List>
        </CardBody>
        <Image
          objectFit="cover"
          src="https://www.linkpicture.com/q/Store.png"
          alt="Chakra UI"
        />
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{ "& > button": { minW: "136px" } }}
        >
          <Link to="/shops">
            <Button>Back to shops</Button>
          </Link>
        </CardFooter>
      </Card>
      </Box>
      <Box height='80px'>
      <div>
      <Text fontSize='5xl'>Reviews</Text>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
        {shop &&
        shop.review.map((review) => (
          
          <div key={review._id}>
          <Card>
            <CardHeader>
              <Heading size="md"> {review.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                {review.review}
              </Text>
            </CardBody>
            <CardFooter>
              <Text>{review.date}</Text>
            </CardFooter>
          </Card>
          </div>
          ))}
          
          
        </SimpleGrid>
      </div>
      </Box>
      </SimpleGrid>
      </Center>
    </div>
  );
}

export default RentListPage;
