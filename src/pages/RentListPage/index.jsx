import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { FiEdit,FiTrash2 } from "react-icons/fi";
import {AuthContext} from "../../context/auth.context";
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

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

function RentListPage(props) {
  const [shop, setShop] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
   
  const getDetails = (id) => {
    axios
      .get(`${API_URL}/api/shops/${id}`)
      .then((respuesta) => setShop(respuesta.data))
      .catch(console.log);
  };

  useEffect(() => {
    getDetails(id);
  }, [id]);

  const handleDeleteReview = async (_id) => {
    try{
      console.log(_id)
      axios.delete(`${API_URL}/api/shops/${id}/review/${_id}`);
      navigate(0)
    }catch(err){
      console.log(err);
    }
  }

  const handleDeleteRent = async (_id) => {
    try{
      console.log(_id)
      axios.delete(`${API_URL}/api/shops/${id}/rent/${_id}`);
      navigate(0)
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className="ProjectDetails">
      <Center>
        <SimpleGrid columns={2} spacing={10}>
          <Box height="80px" className="marginTop">
            {shop && (
              <Button colorScheme="blue">
                <Link to={`/shops/${shop._id}/rent/create`}>Create RENT</Link>
              </Button>
            )}
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
                  {shop?.rent && (
                    <div key={shop.rent?._id}>
                      <ListItem>
                        <Text>
                          <SettingsIcon color="green.500" />
                          <Text as="b"> Available: </Text>
                          <input
                            type="checkbox"
                            checked={shop.rent?.available}
                          disabled
                          ></input>
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text>
                          <SettingsIcon color="green.500" />
                          <Text as="b"> Date starts:</Text>
                          {moment(new Date(shop?.rent?.date_start).toUTCString() ).format("DD/MM/YYYY")}
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text>
                          <SettingsIcon color="green.500" />
                          <Text as="b"> Date ends:</Text>
                          {moment(shop.rent?.date_end).format("DD/MM/YYYY")}
                        </Text>
                      </ListItem>
                    </div>
                  )}
                </List>
              </CardBody>
              <Image
                className="marginTopNeg spaceLeft"
                objectFit="cover"
                src="https://www.linkpicture.com/q/Store.png"
                alt="Chakra UI"
              />
              <CardFooter
                className="marginTopNeg"
                justify="space-between"
                flexWrap="wrap"
                sx={{ "& > button": { minW: "136px" } }}
              >
                <Link to="/shops">
                  <Button>Back to shops</Button>
                </Link>
                <Button className="spaceLeft1" colorScheme="whatsapp">
                  <Link to={`/shops/${shop?._id}/rent/${shop?.rent?._id}/edit`}>
                  <FiEdit />Edit Rent
                  </Link>
                </Button>
                <Button className="spaceLeft1" colorScheme="red" onClick={()=>handleDeleteRent(shop.rent._id)}>
                  <FiTrash2/>Delete Rent
                </Button>
              </CardFooter>
            </Card>
          </Box>
          <Box height="80px" className="marginTop">
            {shop && (
              <Button colorScheme="blue">
                <Link to={`/shops/${shop._id}/review/create`}>
                  Create a Review
                </Link>
              </Button>
            )}
            <div>
              <Text fontSize="5xl">Reviews</Text>
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              >
                {shop &&
                  shop?.review?.map((review) => (
                    <div key={review._id}>
                      <Card>
                        <CardHeader>
                          <Heading size="md"> {review.title}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Text>{review.review}</Text>
                          <Text>
                            Date: {moment(review.date).format("DD/MM/YYYY")}
                          </Text>
                        </CardBody>
                        {user?._id === review.owner && (
                        <CardFooter>
                          <Button className="spaceLeft1" colorScheme="whatsapp">
                            <Link to={`/shops/${shop?._id}/review/${review?._id}/edit`}>
                              <FiEdit />
                            </Link>
                          </Button>
                          <Button className="spaceLeft1" colorScheme="red" onClick={()=>handleDeleteReview(review._id)}>
                            <FiTrash2/>
                          </Button>
                        </CardFooter>
                  )}
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
