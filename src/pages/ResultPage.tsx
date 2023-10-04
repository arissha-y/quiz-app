import {
  Container,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

const ResultPage = () => {
  const router = useRouter();

  const handleRestart = () => {
    router.push("/");
  };
  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Card align="center">
        <CardHeader>
          <Heading size="xl">Your Results are: </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </CardBody>
        <Divider orientation="horizontal" my={4} />
        <CardFooter>
          <Button colorScheme="blue" onClick={handleRestart}>
            Restart
          </Button>
          {/* when restart is being clicked, go back to start page */}
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default ResultPage;
