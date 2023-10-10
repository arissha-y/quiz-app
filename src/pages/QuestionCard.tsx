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
  Divider,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

// console.log(Cookies.get("name"));

// id, counter for cookies

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
    correctAnswer: "Portugese",
  },
  {
    id: 4,
    question: "In what year did the Titanic sin?",
    answers: ["1931", "1923", "1905", "1912"],
    correctAnswer: "1912",
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    answers: ["Fe", "Au", "Ag", "Pb"],
    correctAnswer: "Au",
  },
  {
    id: 6,
    question: "What is the world's largest ocean?",
    answers: [
      "Atlantic Ocean",
      "Pacific Ocean",
      "Indian Ocean",
      "Southern Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    id: 7,
    question: "In which year did the first manned moon landing occur?",
    answers: ["1959", "1965", "1969", "1973"],
    correctAnswer: "1969",
  },
  {
    id: 8,
    question: "Which country won the Fifa World Cup 2018?",
    answers: ["Brazil", "Germany", "Argentina", "France"],
    correctAnswer: "France",
  },
  {
    id: 9,
    question: "Who wrote the novel `Pride and Prejudice?`",
    answers: [
      "Emily Bronte",
      "Jane Austen",
      "Charlotte Bronte",
      "Charles Dickens",
    ],
    correctAnswer: "Jane Austen",
  },
  {
    id: 10,
    question: "Which stadium is known as the `Theatre of Dreams`?",
    answers: ["Anfield", "Old Trafford", "Camp Nou", "Santiago Bernabeu"],
    correctAnswer: "Old Trafford",
  },
];

const QuestionCard = () => {
  const [quizPoints, setQuizPoint] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNextQuestion = () => {
    const currentQuestionObject = questionList[currentQuestion];
    const selectedAnswer = currentQuestionObject.answers.find(
      (answer) => answer === selectedOption
    );

    // if select the correct answer, counter + 1
    if (selectedAnswer == undefined) {
      onOpen(); // Open the modal if no answer is selected
      return;
    }
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
  };

  // ensure next button is enabled if any option is selected
  const isDisabled = selectedOption === "";

  // user's progress
  const userProgress = ((currentQuestion + 1) / questionList.length) * 100; // Calculate the progress percentage

  return (
    <>
      <Flex justifyContent="center" alignItems="center" minHeight="100vh">
        <Flex direction="column" alignItems="center" w="700px">
          <Progress value={userProgress} size="lg" w="100%" mb={4} />
          <Card align="center" w="700px">
            <CardHeader w="100%" backgroundColor={"blue.100"}>
              <Flex alignItems="flex-start">
                <Text fontSize="lg" fontWeight="bold">
                  Q{questionList[currentQuestion].id}:
                </Text>
                <Text fontSize="lg" ml={4}>
                  {questionList[currentQuestion].question}
                </Text>
              </Flex>
            </CardHeader>

            <CardBody w="100%" h="1000px">
              <RadioGroup value={selectedOption} onChange={handleAnswer}>
                <Stack direction="column" pb="15px">
                  {questionList[currentQuestion].answers.map(
                    (answer, index) => (
                      <Radio
                        key={`${currentQuestion}-${index}`}
                        value={answer}
                        size="md"
                        m={2}
                      >
                        {answer}
                      </Radio>
                    )
                  )}
                </Stack>
              </RadioGroup>
              <Divider orientation="horizontal" />
            </CardBody>

            <CardFooter justifyContent="flex-end" width="100%" pt="0">
              <ButtonGroup>
                <Button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  colorScheme="black"
                  variant="outline"
                  size="lg"
                  m={2}
                  w="150px"
                  borderRadius="0"
                >
                  BACK
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={isDisabled}
                  background={"black"}
                  color={"white"}
                  size="lg"
                  m={2}
                  w="150px"
                  borderRadius="0"
                >
                  NEXT
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Flex>
      </Flex>

      {/* Modal for selecting an answer */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>No Answer Selected</ModalHeader>
          <ModalBody>
            <Text>Please select an answer to proceed.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionCard;
