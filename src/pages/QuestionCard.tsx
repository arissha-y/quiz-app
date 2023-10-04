import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Button,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

// variables
let quizPoint = 0;

const questionList = [
  {
    id: 1,
    question: "Question 1: ",
    answers: [],
  },
  {
    id: 2,
    question: "Question 2: ",
    answers: [],
  },
  {
    id: 3,
    question: "Question 3: ",
    answers: [],
  },
  {
    id: 4,
    question: "Question 4: ",
    answers: [],
  },
  {
    id: 5,
    question: "Question 5: ",
    answers: [],
  },
];

const QuestionCard = () => {
  const router = useRouter();

  const handleResultPage = () => {
    router.push("/ResultPage");
  };

  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Card align="center">
        <CardHeader>
          <Heading size="lg">{questionList[0].question}</Heading>
        </CardHeader>
        <CardBody>
          <Text>dvfvvvdvfdvdvfd</Text>
        </CardBody>
        <CardFooter>
          <ButtonGroup gap={4}>
            <Button colorScheme="blue" onClick={handleResultPage}>
              Next
            </Button>
            <Button colorScheme="blue">Back</Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default QuestionCard;
