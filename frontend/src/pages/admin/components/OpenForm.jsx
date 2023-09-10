import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

const OpenForm = ({ item, form, toggleform }) => {
    const toggleMarginRight = 4
  return (
    <Button onClick={toggleform} mt={4}>
      <Flex alignItems="center">
        {form ? (
          <TriangleUpIcon mr={toggleMarginRight} />
        ) : (
          <TriangleDownIcon mr={toggleMarginRight} />
        )}
        <span>Link {item}</span>
      </Flex>
    </Button>
  );
};

export default OpenForm;
