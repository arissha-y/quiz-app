import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Text,
  Divider,
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
} from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function StartPage() {
  const [cookieName, setCookieName] = useState(""); // Define cookieName using state
  const [name, setName] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    checkCookies();
  }, []);

  const handleGoToQuestionCard = () => {
    if (!isError) {
      /**
       * IF NAME CHANGE IS DETECTED, RESET QUIZPOINTS AND CURRENTQUESTION
       * IF NOT DETECTED, RESUME
       */
      if (cookieName !== name) {
        Cookies.set("quizPoints", "0");
        Cookies.set("currentQuestion", "0");
      }

      Cookies.set("name", name);
      router.push("/QuestionCard");
    }
  };

  const isError = name === "";

  const checkCookies = () => {
    const storedCookieName = Cookies.get("name"); // already saved

    if (storedCookieName) {
      setName(storedCookieName); //show on input
      setCookieName(storedCookieName); //have a history what the current name's value
    }
  };

  return (
    <>
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

      {/* MODAL FOR USER TO INPUT THEIR NAME */}
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
