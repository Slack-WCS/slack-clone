import React from 'react';
import styled from 'styled-components';

const StyledDeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
`;

export const DeleteButton = ({ altText, dataSelector, onClick }) => (
  <StyledDeleteButton onClick={onClick} data-selector={dataSelector}>
    <img width="24px" src="/trash.svg" alt={altText} />
  </StyledDeleteButton>
);
