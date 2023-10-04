import Head from "next/head";
import React, { useState } from "react";
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
import Link from "next/link";

export default function StartPage() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");

  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Do something with the name and email values
  //   console.log("Name:", name);
  //   console.log("Email:", email);
  // };

  return (
    <>
      <Head>
        <title>Flux Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* main component*/}
      <Container>
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
            <Divider orientation="horizontal" />
            <CardFooter>
              <Link href="/questions">
                <Button colorScheme="blue">Start Quiz</Button>
              </Link>
            </CardFooter>
          </Card>
        </Flex>
      </Container>
    </>
  );
}
