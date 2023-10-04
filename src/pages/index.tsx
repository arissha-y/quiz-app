import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Text, Box, Divider, Container, Button } from "@chakra-ui/react";
import React from "react";

export default function StartPage() {
  return (
    <>
      <Head>
        <title>Flux Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* main component*/}
      <Container>
        <Box>
          {/* HEADER */}
          {/* if given letak if not no need */}
          {/* CONTENT AREA */}

          {/* BUTTON AREA */}
          <Text></Text>
          <Divider orientation="horizontal" />
          <Button>Start Quiz</Button>
        </Box>
      </Container>
    </>
  );
}
