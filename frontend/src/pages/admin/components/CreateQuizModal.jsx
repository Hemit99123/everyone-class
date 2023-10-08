import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Select,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { createQuiz } from '../utils/quizOperations';

const QuizModal = ({ id, isOpenQuizModal, onCloseQuizModal }) => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const addQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['', '', ''],
      correctAnswer: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionTitleChange = (index, value) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === index) {
        return { ...question, question: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        const updatedOptions = [...question.options];
        updatedOptions[optionIndex] = value;
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        return { ...question, correctAnswer: value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSaveChanges = () => {
    // Save questions, title, and genre
    createQuiz(title, id, description, questions);
    setQuestions([]);
    setTitle('');
    onCloseQuizModal();
  };

  return (
    <>
      <Modal isOpen={isOpenQuizModal} onClose={onCloseQuizModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign a quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Quiz Name</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
            </FormControl>

            {questions.map((question, index) => (
              <div key={index}>
                <FormControl mt={4}>
                  <FormLabel>Question {index + 1}</FormLabel>
                  <Input
                    value={question.question}
                    onChange={(e) => handleQuestionTitleChange(index, e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Options</FormLabel>
                  {question.options.map((option, optionIndex) => (
                    <Input
                      key={optionIndex}
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                  ))}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Correct Answer</FormLabel>
                  <Select
                    value={question.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                  >
                    {question.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ))}

            <Button mt={4} colorScheme="blue" onClick={addQuestion}>
              Add Question
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveChanges} marginRight={2}>
              Save changes
            </Button>
            <Button onClick={onCloseQuizModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuizModal;
