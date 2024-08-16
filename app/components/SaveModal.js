import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { collection, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { db } from '@/firebase';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid lightgray',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};


const SaveModal = ({ cardSet, userId }) => {

    const [cardSetName, setCardSetName] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Still WIP
    const handleSaveSet = async () => {
        if (!userId || !cardSetName || cardSetName.length === 0 || cardSet.length === 0) {
            alert('Please enter a name')
            return
        }

        try {
            const userDocRef = collection(db, "flashcardSets", userId, "sets")

            // Query to check if a set with the same title already exists
            const existingSetQuery = query(userDocRef, where("title", "==", cardSetName));
            const querySnapshot = await getDocs(existingSetQuery);

            if (!querySnapshot.empty) {
                alert("A flashcard set with this title already exists. Please choose a different title.");
                return;
            }

            const newSetDocRef = doc(userDocRef)

            const batch = writeBatch(db)

            batch.set(newSetDocRef, { title: cardSetName })

            cardSet.forEach((card, index) => {
                const newCardDocRef = doc(newSetDocRef, "cards", `card${index + 1}`)
                batch.set(newCardDocRef, card)
            })

            await batch.commit()
            console.log("Flashcard set saved successfully")
            setCardSetName("")
            handleClose()
        } catch (e) {
            console.error("Error saving flashcard set:", e)
        }
    }

    return (
        <div>
            <Button
                sx={{
                    marginTop: "30px",
                }}
                onClick={handleOpen}>Save Set</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        textAlign='center'
                        id="modal-modal-title"
                        variant="h6"
                        component="h2">
                        Enter Set Name Below
                    </Typography>
                    <TextField
                        sx={{
                            marginTop: '10px'
                        }}
                        size='small'
                        label='Enter Set Name'
                        fullWidth
                        onChange={(e) => setCardSetName(e.target.value)}
                    />
                    <Button
                        sx={{
                            marginTop: "10px",
                        }}
                        onClick={handleSaveSet}
                    >
                        Confirm
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default SaveModal