import React from 'react'
import emailjs from '@emailjs/browser';
import {useNavigate } from "react-router-dom";
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


const ContactPage = () => {
    const navigate = useNavigate();
    const sendEmail = (event) => {
        event.preventDefault();
    
        emailjs.sendForm('service_lgd0coi','template_fc8boey',event.target,'8VbVJ4bQ-3M7mlUgI')
        .then(response => navigate(0))
        .catch(error => console.log(error))
      }
    
      return (
        <div className='div-form'>
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
                Contact Us
              </Heading>
            </VStack>
            <Card bg="#f6f8fa" variant="outline" w="308px">
              <CardBody>
                <form onSubmit={sendEmail}>
                  <Stack spacing="4">
                    <FormControl>
                      <FormLabel size="sm">Name</FormLabel>
                      <Input
                        type="text"
                        bg="white"
                        size="sm"
                        name='name'
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Email</FormLabel>
                      <Input
                        bg="white"
                        size="sm"
                        type="email"
                        name='email'
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size="sm">Message</FormLabel>
                      <textarea 
                      name="message" 
                      id="" 
                      cols="20" 
                      rows="10"></textarea>
                    </FormControl>
                    <Button
                      colorScheme="blue"
                      color="white"
                      size="sm"
                      _hover={{ bg: "#2c974b" }}
                      _active={{ bg: "#298e46" }}
                      type="submit"
                    >
                      SEND!
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
          </Stack>
        </Center>
      </Box>
        </div>
      )
}

export default ContactPage