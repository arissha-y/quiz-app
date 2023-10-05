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
} from "@chakra-ui/react";

export default function StartPage() {
  const router = useRouter();

  const handleGoToQuestionCard = () => {
    router.push("/QuestionCard"); // Replace "/result" with the path of the result page
  };

  return (
    <>
      {/* main component*/}

      <Flex justifyContent="center" alignItems="center" minHeight="100vh">
        <Card align="center">
          <CardHeader>
            <Heading> How Good is Your General Knowledge?</Heading>
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
              onClick={handleGoToQuestionCard}
            >
              START QUIZ
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </>
  );
}
