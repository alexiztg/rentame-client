import { useState, useEffect } from "react";
import axios from "axios";
import './index.css'
import { Link } from "react-router-dom";
import { Card, Image,
    Stack,
    CardBody,
    Heading,
    Text,
    CardFooter,
    Button,
    Grid
 } from "@chakra-ui/react";
 
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
 
 
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
  }, [] );
 
  
  return (
    <div className="ShopListPage"> 
    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        {shops.map((shop) => {
          return (
            
            <Card w='45vw' direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' key={shop._id}>
                <Image  objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src='https://www.linkpicture.com/q/Store.png'alt='Caffe Latte'/>
                <Stack>
                    <CardBody>
                    <Heading size='md'>{shop.name}</Heading>
                    <Text py='2'>{shop.description}</Text>
                    </CardBody>
                    <CardFooter>
                    <Button colorScheme='blue'>
                    <Link to={`/shops/${shop._id}/rent`}>
                        More info
                    </Link>
                    </Button>
                    </CardFooter>
                </Stack>
            </Card>  
           
          );
        })}     
        </Grid>  
    </div>
  );
}
export default ShopListPage;