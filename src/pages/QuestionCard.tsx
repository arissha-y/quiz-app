import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

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
    correctAnswer: "Portuguese",
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

/**
 *
 * RUNTIME ERROR WHEN REFRESH
 */
const QuestionCard = () => {
  const [quizPoints, setQuizPoint] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();
  const previousValues = useRef([quizPoints, currentQuestion]);
  const hasSetInitialState = useRef<boolean>(false);
  console.log("hasSetInitialState.current", hasSetInitialState.current);
  const {
    isOpen: isOpenNoAnswer,
    onOpen: onOpenNoAnswer,
    onClose: onCloseNoAnswer,
  } = useDisclosure();

  const {
    isOpen: isOpenStartPage,
    onOpen: onOpenStartPage,
    onClose: onCloseStartPage,
  } = useDisclosure();

  // Read user's progress from cookies
  useEffect(() => {
    const quizPoint = Number(Cookies.get("quizPoints"));
    if (!isNaN(quizPoint)) {
      setQuizPoint(quizPoint);
    }

    const currentQuestion = Number(Cookies.get("currentQuestion"));
    if (!isNaN(currentQuestion)) {
      setCurrentQuestion(currentQuestion);
    }
  }, []);

  const handleNextQuestion = () => {
    const currentQuestionObject = questionList[currentQuestion];
    const selectedAnswer = currentQuestionObject.answers.find(
      (answer) => answer === selectedOption
    );

    // if select the correct answer, counter + 1
    if (selectedAnswer == undefined) {
      onOpenNoAnswer(); // Open the modal if no answer is selected
      return;
    }
    if (selectedAnswer === currentQuestionObject.correctAnswer) {
      setQuizPoint((currentPoints) => currentPoints + 1);
      settingQuizPointCookie(quizPoints.toString());
    }

    // if its the last question, route to result, else continue
    if (currentQuestion === questionList.length - 1) {
      router.push({
        pathname: "/ResultPage",
        query: {
          quizPoints: quizPoints + 1,
          numQuestions: questionList.length,
        },
      });
    } else {
      setCurrentQuestion((question) => question + 1);
      settingCurrentQuestionCookie(currentQuestion.toString());
    }

    setSelectedOption("");
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) {
      // OPEN MODAL ASK IF USER WISH TO PROCEED TO GO BACK START PAGE OR NOT
      onOpenStartPage();
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const settingQuizPointCookie = (quizPoints: string) => {
    Cookies.set("quizPoints", quizPoints);
  };

  const settingCurrentQuestionCookie = (currentQuestion: string) => {
    Cookies.set("currentQuestion", currentQuestion);
  };

  const handleBackToStart = () => {
    router.push("/");
  };

  const handleAnswer = (selectedAnswer: string) => {
    setSelectedOption(selectedAnswer);
  };

  // user's progress
  const userProgress = ((currentQuestion + 1) / questionList.length) * 100; // Calculate the progress percentage

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Progress value={userProgress} size="lg" w="700px" mb={4} />
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
                {questionList[currentQuestion].answers.map((answer, index) => (
                  <Radio
                    key={`${currentQuestion}-${index}`}
                    value={answer}
                    size="md"
                    m={2}
                  >
                    {answer}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Divider orientation="horizontal" />
          </CardBody>

          <CardFooter justifyContent="flex-end" width="100%" pt="0">
            <ButtonGroup>
              <Button
                onClick={handlePreviousQuestion}
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
        {/* </Flex> */}
      </Flex>

      {/* Modal for selecting an answer */}
      <Modal isOpen={isOpenNoAnswer} onClose={onCloseNoAnswer}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>No Answer Selected</ModalHeader>
          <ModalBody>
            <Text>Please select an answer to proceed.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onCloseNoAnswer}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* MODAL IF USER GOES BACK TO START PAGE */}
      <Modal isOpen={isOpenStartPage} onClose={onCloseStartPage}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            You will be redirected back to the start page.
          </ModalHeader>
          <ModalBody>
            <Text>Do you wish to proceed?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onCloseStartPage}
              w="100px"
              m={2}
              colorScheme="black"
              variant="outline"
            >
              NO
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleBackToStart}
              w="100px"
              m={2}
              background={"black"}
              color={"white"}
            >
              YES
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionCard;
