import React from 'react';
import styled from 'styled-components';
import seatImageSrc from '../assets/seat-available.svg';
import Tippy from '@tippy.js/react';

import PurchaseModal from './PurchaseModal'



const AvailableSeat = ({ handleClickOpen, rowIndex, seatIndex, width, height, price, status, seat, }, good) => {


    const [sendThis, setSendThis] = React.useState(false);



    console.log("here is ", seat.price)

    return (
        <div>
            <PurchaseModal good={sendThis} setGood={setSendThis} row={rowIndex} seat={seatIndex} price={price}></PurchaseModal>
            <Button onClick={() => setSendThis(true)}>
                <TippyO content={`Row ${rowIndex}, Seat ${seatIndex} – $${seat.price}`}>
                    <Seat
                        src={seatImageSrc}>
                    </Seat>
                </TippyO>
            </Button>
        </div>
    )

}

export default AvailableSeat;

const Seat = styled.img`
 
`;

const TippyO = styled(Tippy)`
  background-color: grey;
`;

const Button = styled.button`
border: none;
padding: 0;
margin: 0;
:hover {
  filter: grayscale(25%);
  cursor: pointer;
}

`