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
import ResultPage from "./ResultPage";

export default function StartPage() {
  const router = useRouter();

  const handleGoToQuestionCard = () => {
    router.push("/QuestionCard"); // Replace "/result" with the path of the result page
  };

  return (
    <>
      <Head>
        <title>Flux Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* main component*/}

      <Flex justifyContent="center" alignItems="center" minHeight="100vh">
        <Card align="center">
          <CardHeader>
            <Heading size="md">Welcome to the Flux Quiz!</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </CardBody>
          <Divider orientation="horizontal" my={4} />
          <CardFooter>
            <Button colorScheme="blue" onClick={handleGoToQuestionCard}>
              Start Quiz
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </>
  );
}
