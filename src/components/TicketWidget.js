import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatContext } from './SeatContext'
import Tippy from '@tippy.js/react';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import seatImageSrc from '../assets/seat-available.svg';
import PurchaseModal from './PurchaseModal';
import AvailableSeat from './Seat'


const TicketWidget = () => {

  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);

  if (!hasLoaded) {
    return <CircularProgress />;
  }

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seat = seats[seatId];

              console.log(seats)

              return (
                <SeatWrapper key={seatId}>

                  {seat.isBooked &&

                    <BookedSeat

                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      price={seat.price}
                      status={seat.isBooked ? 'unavailable' : 'available'}
                      src={seatImageSrc}></BookedSeat>

                  }

                  {
                    !seat.isBooked &&
                   


                      <AvailableSeat
                        seat={seat}
                        rowIndex={rowIndex}
                        seatIndex={seatIndex}
                        price={seat.price}
                        status={seat.isBooked ? 'unavailable' : 'available'}
                       >
                      </AvailableSeat>

            
                  }
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper >
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;


const BookedSeat = styled.img`
filter: grayscale(100%);

`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
