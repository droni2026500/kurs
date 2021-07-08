import { Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OpenEvent from './OpenEvent';
import { eventsMethod } from '../../api/events';

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1100px;
  justify-content: center;
  padding-top: 40px;
  flex-wrap: wrap;
`;
const StyledImage = styled.img`
  width: 100%;
`;
const EventContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 1px solid #e6e8ea;
  padding-bottom: 40px;
  margin: 20px;
  max-width: 350px;
  justify-content: space-between;
`;
const Title = styled(Typography)`
  margin: 10px 0;
  font-size: 20px;
  text-align: center;
`;
const OpenDetails = styled.div`
  max-width: 150px;
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
  border-radius: 5px;
`;

const Events = () => {
  const [eventOpen, setEventOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [allEvents, setAllEvents] = useState(null);

  useEffect(() => {
    (async () => {
      const dataevents = await eventsMethod.getEvents();
      console.log(dataevents.data.events);
      setAllEvents(dataevents.data.events);
    })();
  }, []);

  return (
    <Wrapper eventOpen={eventOpen}>
      {!eventOpen && allEvents && allEvents.map((event, index) => (
      // eslint-disable-next-line react/no-array-index-key
        <EventContainer key={index}>
          <StyledImage src={event.image} alt="Event" />
          <Title>{event.title}</Title>
          <OpenDetails
            onClick={() => {
              setEventOpen(true);
              setCurrentEvent(event);
            }}
          >
            Узнать подробности
          </OpenDetails>
        </EventContainer>
      ))}
      {eventOpen && (
        <OpenEvent
          currentEvent={currentEvent}
          setEventOpen={setEventOpen}
          eventOpen={eventOpen}
        />
      )}
    </Wrapper>
  );
};
export default Events;
