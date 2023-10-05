import React, { useState } from "react";
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
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

// variables
let quizPoint = 0;

const questionList = [
  {
    id: 1,
    question: "What is the capital city of Canada?",
    answers: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correctAnswer: "Ottawa",
  },
  {
    id: 2,
    question:
      "In Greek mythology, which hero is known for slaying the Gorgon Medusa?",
    answers: ["Theseus", "Perseus", "Hercules", "Achilles"],
    correctAnswer: "Perseus",
  },
  {
    id: 3,
    question: "What is the official language of Brazil?",
    answers: ["Portuguese", "Italian", "French", "Spanish"],
  },
  // {
  //   id: 4,
  //   question: "Question 4: ",
  //   answers: [],
  // },
  // {
  //   id: 5,
  //   question: "Question 5: ",
  //   answers: [],
  // },
];

const QuestionCard = () => {
  const [quizPoints, setQuizPoint] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();

  const handleNextQuestion = () => {
    const currentQuestionObject = questionList[currentQuestion];
    const selectedAnswer = currentQuestionObject.answers.find(
      (answer) => answer === selectedOption
    );

    // if select the correct answer, counter + 1
    if (selectedAnswer === currentQuestionObject.correctAnswer) {
      setQuizPoint((currentPoints) => currentPoints + 1);
    }

    // if its the last question, route to result, else continue
    if (currentQuestion === questionList.length - 1) {
      router.push({
        pathname: "/ResultPage",
        query: { quizPoints, numQuestions: questionList.length },
      });
    } else {
      setCurrentQuestion((question) => question + 1);
    }

    setSelectedOption("");
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) {
      router.push("/");
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleAnswer = (selectedAnswer: string) => {
    setSelectedOption(selectedAnswer);
    console.log(selectedAnswer);
  };

  // ensure next button is enabled if any option is selected
  const isDisabled = !selectedOption;

  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Card align="center">
        <CardHeader>
          <Heading size="lg">{questionList[currentQuestion].question}</Heading>
        </CardHeader>
        <CardBody>
          <RadioGroup value={selectedOption} onChange={handleAnswer}>
            {questionList[currentQuestion].answers.map((answer, index) => (
              <Radio key={index} value={answer} size="lg" m={2}>
                {answer}
              </Radio>
            ))}
          </RadioGroup>
        </CardBody>

        <CardFooter>
          <ButtonGroup gap={4}>
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              colorScheme="blue"
              variant="outline"
              size="lg"
              m={2}
            >
              Back
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={isDisabled}
              colorScheme="blue"
              variant="outline"
              size="lg"
              m={2}
            >
              Next
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default QuestionCard;
