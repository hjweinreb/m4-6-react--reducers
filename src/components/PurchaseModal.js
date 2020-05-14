import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { BookingContext } from './BookingContext'

import AvailableSeat from './Seat'

const PurchaseModal = ({ good, setGood, row, seat, price }) => {



    console.log("here is good", good)
    console.log("here is setgood", setGood)
    const [creditNum, setCreditNum] = React.useState("");
    const [creditExp, setCreditExp] = React.useState("");


    let isOpen;



    isOpen = good;

    const handleClickOpen = () => {
        //setOpen(true);
    };

    const handleClose = () => {
        setGood(false);


        fetch('/api/book-seat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                creditNum,
                creditExp,

            }),
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
            });
    }




    // if (good) {
    //     handleClickOpen();
    // }
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Purchase Ticket "}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You're purchasing 1 ticket (Row: {row}, Seat:{seat}) for the price of {price}.
                        <form>

                            <TextField
                                variant="outlined"
                                label="Credit card"
                                type="text"
                                value={creditNum}
                                onChange={(event) => setCreditNum(event.currentTarget.value)}
                                style={{ flex: 2 }}
                                required
                            />
                            <TextField
                                variant="outlined"
                                label="Expiration"
                                type="text"
                                value={creditExp}
                                onChange={(event) => setCreditExp(event.currentTarget.value)}
                                style={{ flex: 1 }}
                                required
                            />
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Purchase
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PurchaseModal;