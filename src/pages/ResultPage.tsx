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
  const { quizPoints, numQuestions } = router.query;

  const handleRestart = () => {
    router.push("/");
  };
  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Card align="center" w="700px">
        <CardHeader>
          <Heading size="xl">Your Results are: </Heading>
        </CardHeader>
        <CardBody w="100%">
          <Text textAlign="center">
            You scored{" "}
            <Text as="span" fontWeight="bold">
              {quizPoints}
            </Text>{" "}
            out of{" "}
            <Text as="span" fontWeight="bold">
              {numQuestions}
            </Text>{" "}
            points!
          </Text>
        </CardBody>
        <Divider orientation="horizontal" my={4} />
        <CardFooter justifyContent="flex-end" width="100%" pt="0">
          <Button
            background={"black"}
            color={"white"}
            size="lg"
            m={2}
            w="150px"
            borderRadius="0"
            onClick={handleRestart}
          >
            Restart
          </Button>
          {/* when restart is being clicked, go back to start page */}
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default ResultPage;
