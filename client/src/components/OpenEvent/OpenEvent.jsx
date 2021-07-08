import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const StyledImage = styled.img`
  max-width: 600px;
  align-self: center;
  width: 100%;
`;

const Title = styled.div`
    font-size: 28px;
    text-align: center;
    margin-top: 20px;
    color: #2f3235;
    font-weight: bold;
`;

const StyledButton = styled.div`
  width: 150px;
  align-self: center;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  padding: 8px 14px;
  color: #fff!important;
  text-decoration: none;
  border: none;
  border-radius: 1px;
  vertical-align: middle;
  line-height: 1.1;
  outline: none;
  margin: 5px 0;
  font-family: PT Sans,Arial,sans-serif;
  font-weight: 700;
  font-size: 14px;
  background: #ee3942;
  text-shadow: none;
`;

const Text = styled.p`
    font-size: ${(props) => (props.bold ? '22px' : '19px')};
    font-weight: ${(props) => props.bold && 'bold'};
`;

const OpenEvent = ({ currentEvent, setEventOpen }) => (
  <Wrapper>
    <StyledImage src={currentEvent.image} alt="Event" />
    <Title>{currentEvent.title}</Title>
    <Text>{currentEvent.description}</Text>
    <Text>
      <Text bold>Дата</Text>
      {moment(currentEvent.dateEvent).format('DD/MM/YYYY')}
    </Text>
    <Text>
      <Text bold>Место проведения</Text>
      {currentEvent.location}
    </Text>
    <Text>
      <Text bold>Ближайшее метро</Text>
      {currentEvent.subway}
    </Text>
    <StyledButton>
      Купить
    </StyledButton>
    <StyledButton
      disabled
      onClick={() => {
        debugger;
        setEventOpen(false);
      }}
    >
      Вернуться ко всем событиям
    </StyledButton>
  </Wrapper>
);
export default OpenEvent;
