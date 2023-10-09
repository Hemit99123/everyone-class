import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Badge,
  Container,
  VStack,
  Center,
  Card,
  Heading,
  CardBody,
  CardFooter,
  Stack,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Radio,
  RadioGroup,
  Spacer,
  ModalCloseButton,
  useMediaQuery
} from '@chakra-ui/react';
import { getOneClass } from '../utils/getOneClass';
import { getPost } from '../utils/postOperations';
import { getQuiz } from '../utils/quizOperations';
import { useParams } from 'react-router-dom';
import Post from './Post';
import NotFound from './NotFound';
import Loading from '../../../common/Loading';

const ClassFeed = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [classroom, setClassroom] = useState();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mark, setMark] = useState(0)
  const [isSmallerThan500] = useMediaQuery('(max-width: 500px)')

  const handleNextQuestion = () => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedSelectedOptions = { ...prevSelectedOptions };
      const currentQuestion = selectedQuiz?.questions[currentQuestionIndex];
      const nextQuestion = selectedQuiz?.questions[currentQuestionIndex + 1];
  
      // Enable options for the next question and disable for the current question
      if (currentQuestion && nextQuestion) {
        currentQuestion.options.forEach((option) => {
          if (option !== updatedSelectedOptions[currentQuestion.questionId]) {
            updatedSelectedOptions[currentQuestion.questionId] = null;
          }
        });
        nextQuestion.options.forEach((option) => {
          updatedSelectedOptions[nextQuestion.questionId] = null;
        });
      }
      
      //console.log("Length of selected options: ") will uncomment later
      //console.log(updatedSelectedOptions.length) will uncomment later
      return updatedSelectedOptions;
    });
  
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const isLastQuestion = currentQuestionIndex === selectedQuiz?.questions.length - 1;
  const totalQuestions = selectedQuiz?.questions.length;
  //const isOptionSelected = selectedOptions.length === 0 will uncomment later

  const handleOptionChange = (questionId, option, correctAnswer) => {
    // Disable other options for the current question once an option is selected
    const updatedSelectedOptions = { [questionId]: option };
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      ...updatedSelectedOptions,
    }));

    // Check if the chosen option matches the correct answer
    if (option === correctAnswer) {
      // Increment the score if the answer is correct
      setScore((prevScore) => prevScore + 1);
    } 
  };

  const handleAttemptClick = (quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
    setCurrentQuestionIndex(0); // Reset to the first question when attempting a quiz
    setScore(0); // Reset the score when attempting a quiz
    setMark(0); // Do the same thing with the mark
    // Store the initially selected options for each question
    const initialOptions = {};
    quiz.questions.forEach((question) => {
      initialOptions[question.questionId] = question.options[0]; // Initially select the first option
    });
  };

  const handleCloseModal = () => {
    setSelectedQuiz(null);
    setIsModalOpen(false);
  };

  const viewResult = (onClose) => {
    setMark(Math.round((score / totalQuestions * 100)))
    onClose();
    setIsResultOpen(true)
    setSelectedOptions({})
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getPost(id);
        setPost(response);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClassData = async () => {
      try {
        const response = await getOneClass(id);
        setClassroom(response);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchQuizData = async () => {
      try {
        const response = await getQuiz(id);
        setQuiz(response);
      } catch (error) {
        console.error(error);
      }
    };

    Promise.all([fetchPostData(), fetchClassData(), fetchQuizData()]).then(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!classroom) {
    return <NotFound />;
  }

  return (
    <div>
      <Container maxW="100%" p={8}>
        <VStack align="stretch" spacing={6}>
          <Box py={4} px={6} rounded="md" shadow="lg">
            <Center>
              <Text fontWeight="bold" fontSize="2xl" mb={2}>
                {classroom?.title}
              </Text>
            </Center>
            <Badge bgColor={'teal'} color={'white'}>
              {classroom?.genre}
            </Badge>
            <Text fontSize="lg" fontWeight="medium" mb={2}>
              Instructor: {classroom?.instructor}
            </Text>
            <Text fontSize="md" mb={2}>
              Class ID: <b>{classroom?._id}</b> (use this if you wish to save this class!)
            </Text>
            <Text fontSize="md" mb={4}>
              {classroom?.description}
            </Text>
          </Box>
        </VStack>
      </Container>

      <Box ml={isSmallerThan500 ? 3:9}>
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          Quizzes
        </Text>
        <Box display="flex" flexWrap="wrap">
          {quiz.map((item) => (
            <Box key={item._id} mb="4" mr="4" /*flexBasis="200px"*/ minWidth={"250px"} w={"30vw"} flexGrow={"1"}>
              <Card minHeight="150px">
                <CardBody>
                  <Stack mt="0.5" spacing="3">
                    <Heading size="md" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{item.quiz_title}</Heading>
                    <Text
                      maxW="100%"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {item.description}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleAttemptClick(item)}
                  >
                    Attempt
                  </Button>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Modal for attempting a quiz */}
            <Modal isOpen={isModalOpen} isCentered>
          <ModalOverlay/>
          <ModalContent minh='fit-content' minw='fit-content'>
            <ModalHeader fontSize={'1.8rem'} marginBottom={"10px"}  borderBottom={"1px"}>Attempt Quiz</ModalHeader>
            <ModalBody>
              {selectedQuiz &&
                selectedQuiz.questions.map((question, index) => (
                  <Box
                    key={question.questionId}
                    display={index === currentQuestionIndex ? 'block' : 'none'}
                  >
                    <Text marginBottom={"10px"} fontSize={'1.1rem'}>{question.question}</Text>
                    <RadioGroup
                      value={selectedOptions[question.questionId]}
                      pb={'50px'} 
                      onChange={(value) =>
                        handleOptionChange(
                          question.questionId,
                          value,
                          question.correctAnswer
                        )
                      }
                    >
                      <Stack direction="column">
                        {question.options.map((option) => (
                          <Radio
                            key={option}
                            value={option}
                            isChecked={selectedOptions[question.questionId] === option}
                            isDisabled={!!selectedOptions[question.questionId] && selectedOptions[question.questionId] !== option}
                          >
                            {option}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                    {!isLastQuestion && /*isOptionSelected &&*/ (
                      <Button onClick={() => handleNextQuestion(question.correctAnswer)} 
                      mt="auto">
                        Next
                      </Button>
                    )}
                  </Box>
                ))}
            </ModalBody>
            <ModalFooter>
              {isLastQuestion && (
                <Button onClick={() => viewResult(handleCloseModal)}>View Results</Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* Modal for results */}
        <Modal isOpen={isResultOpen} onClose={!isResultOpen} isCentered size={'xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton onClick={() => {setIsResultOpen(false)}}/>
            <ModalHeader fontSize={"1.3rem"}>Your result:</ModalHeader>
            <ModalBody minHeight={'50px'} fontSize={"2rem"}>
              Result: {mark}%
              <Spacer />
              {mark >= 50 ? (
                <>
                  You passed!
                </>
              ) : (
                <>
                  You failed
                </>
              )}
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>

        <Box>
          <Text fontSize="4xl" fontWeight="bold" mb={4}>
            Feed
          </Text>
          {post.map((item) => (
            <Post
              key={item._id}
              id={item._id}
              title={item.title}
              message={item.message}
              zoom={item.zoom}
              githubName={item.githubName}
              githubURL={item.githubURL}
              githubCloneURL={item.githubCloneURL}
              githubDescription={item.githubDescription}
              githubLanguage={item.githubLanguage}
              sketchfabHTML={item.sketchfabHTML}
              sketchfabTitle={item.sketchfabTitle}
              youtubeID={item.youtubeID}
              realworldApplication={item.realworldApplication}
              userSub={classroom?.userSub}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default ClassFeed;