import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Text,
  Divider,
  Container,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  CardBody,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import Cookies from "js-cookie";

// Cookies.set("name", "arissha");

export default function StartPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGoToQuestionCard = () => {
    if (!isError) {
      router.push("/QuestionCard"); // Replace "/result" with the path of the result page
    }
  };

  // const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value === "") {
  //     console.log("got dedect");
  //   } else {
  //     setName(e.target.value);
  //   }
  // };

  // const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value === "") {
  //     console.log("got dedect");
  //   } else {
  //     setEmail(e.target.value);
  //   }
  // };

  const isError = email === "" || name === "";

  return (
    <>
      {/* main component*/}

      <Flex justifyContent="center" alignItems="center" minHeight="100vh">
        <Card align="center">
          <CardHeader>
            <Heading>How Good is Your General Knowledge?</Heading>
          </CardHeader>
          <CardBody pb="15px">
            <Text fontSize="lg">
              In this quiz, test your general knowledge to see if you are as
              knowledgeable as you think you are!
            </Text>
            <br />
            <Divider orientation="horizontal" />
          </CardBody>
          <CardFooter pt="0">
            <Button
              background="black"
              color="white"
              borderRadius="0"
              size="lg"
              w="150px"
              m="2"
              onClick={onOpen}
            >
              START
            </Button>
          </CardFooter>
        </Card>
      </Flex>

      {/* Modal for user to input their name and email */}
      {/* START QUIZ  -> open modal | SAVE BTN IN MODAL -> QuestionCard.tsx*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your details to continue</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name: </FormLabel>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email: </FormLabel>
              <Input
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              background="black"
              color="white"
              borderRadius="0"
              size="lg"
              w="150px"
              onClick={handleGoToQuestionCard}
              isDisabled={isError}
            >
              START QUIZ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
