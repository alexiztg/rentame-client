import "./ProfilePage.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Card,Heading,Text,
  CardHeader,CardFooter,
  Flex,
  Avatar,CardBody,
  Image,
  Box, 
  Center} from "@chakra-ui/react";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  return (
    <div>
    <Center>
      

      <Card maxW='md'>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src='https://i.pinimg.com/564x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg' />

        <Box>
          <Heading size='sm'>Welcome {user.name}</Heading>
          <Text>{user.email}</Text>
        </Box>
      </Flex>
      
    </Flex>
  </CardHeader>
  <CardBody>
    <Text>
      Welcome to CRAZY RENT, in this page you can find the BEST SHOP
      that you are looking for, even... you can add a review talking what do you think
      about this SHOP. Lets's see the SHOPS!
      <br/>
      <br/>
      Use the button named "Shops" to see all the Shops 
    </Text>
  </CardBody>
  <Center>
  <Image
    objectFit='cover'
    src='https://thumbs.dreamstime.com/b/stick-figures-holding-word-welcome-vector-banner-text-welcome-welcome-together-people-big-colorful-letters-114865217.jpg'
    alt='Chakra UI'
  /></Center>

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    
  </CardFooter>
</Card>
</Center>
      
    </div>
  );
}

export default ProfilePage;
