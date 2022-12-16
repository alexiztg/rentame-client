import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment'
import { useParams, useNavigate } from "react-router-dom";
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

function EditReviewPage(props) {
    const [review, setReview] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const { id, idReview } = useParams();
    const navigate = useNavigate();

  useEffect(() => {
    // <== ADD
    axios
        .get(`${API_URL}/api/shops/${id}/review/${idReview}`)
        .then((response) => {
        
        const oneReview = response.data;
        setReview(oneReview.review);
        setTitle(oneReview.title);
        setDate(oneReview.date)
      })
      .catch((error) => console.log(error));
  }, [id, idReview]);

  const handleFormSubmit = (e) => {
    // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { review, title, date : moment(date).format("YYYY-MM-DD[T13:00:00.000Z]") };
    
    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/shops/${id}/review/${idReview}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/shops/${id}/rent`);
      });
  };

  return (
    <div className="EditReviewPage">
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
                Edit Review
              </Heading>
            </VStack>
            <Card bg="#f6f8fa" variant="outline" w="308px">
              <CardBody>
                <form onSubmit={handleFormSubmit}>
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
                        value={moment(date).format("YYYY-MM-DD")}
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
                      value="Submit"
                    >
                      Edit Review
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

export default EditReviewPage;