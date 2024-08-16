'use client'
import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Card, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import Flashcard from 'app/components/Flashcard'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase'

const page = () => {

    const { userId } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // Perform any necessary redirects or navigation here
        if (!userId) {
            router.push('/');
        }
        console.log(userId)
    }, [router, userId]);

    const [prompt, setPrompt] = useState("")
    const [cardSet, setCardSet] = useState([
        { front: '1', back: '1' },
        { front: '2', back: '2' },
        { front: '3', back: '3' },
        { front: '4', back: '4' },
        { front: '5', back: '5' },
        { front: '6', back: '6' },
        { front: '7', back: '7' },
        { front: '8', back: '8' },
        { front: '9', back: '9' },
        { front: '10', back: '10' },
    ])
    const [buttonText, setButtonText] = useState('✨Generate✨')
    const [cardSetName, setCardSetName] = useState("Test01")

    const handleGenerate = async () => {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        })
        const data = await response.json()
        setCardSet(data)
        setButtonText('✨Generate Again✨')
        setPrompt("")
        console.log(data)
    }

    // Still WIP
    const handleSaveSet = async () => {
        console.log(cardSet, userId, cardSetName)
        if (!userId || !cardSetName || cardSetName.length === 0) { alert('Please enter a name') }

        try {
            const batch = writeBatch(db)
            const userDocRef = doc(collection(db, 'users'), userId)
            const docSnap = await getDoc(userDocRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                if (collections.find((f) => c.name === cardSetName)) {
                    alert('Flashcard Collection with the same name already exists')
                    return
                }
                else {
                    collections.push({ cardSetName })
                    batch.set(userDocRef, { flashcards: collections }, { merge: true })
                }
            }
            else {
                batch.set(userDocRef, { flashcards: [{ cardSetName }] })
            }

        } catch (error) {
            console.error('Error saving card set:', error)
        }
    }

    return (
        <Box
            paddingX={"24px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            maxWidth={"1200px"}
            marginX={"auto"}
        >
            <Box
                marginBottom={"30px"}
                sx={{
                    marginY: "30px",
                    width: '100%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <IconButton onClick={() => { router.back() }}>
                    <ArrowBack />
                </IconButton>
                <Typography
                    textAlign={"center"}
                    variant="h4"
                    flex={1}
                >
                    Generate New Set
                </Typography>
            </Box>
            <Box sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "20px",
            }}>
                <TextField
                    label="Prompt..."
                    multiline
                    fullWidth
                    size='medium'
                    value={prompt}
                    onChange={(e) => { setPrompt(e.target.value) }}
                />
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleGenerate}
                >
                    {buttonText}
                </Button>
            </Box>
            <Box sx={{
                padding: "24px",
                marginY: "30px",
                width: "100%",
                textAlign: "center",
                // backgroundColor: "gray",
            }}>{cardSet.length === 0 ? "Generate a new set to get started!" :
                <>
                    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={"20px"}>
                        {cardSet.map((card, index) => (
                            <Flashcard cardObj={card} key={index} />
                        ))}
                    </Box>
                    <Button
                        sx={{
                            marginY: "30px",
                        }}
                    >
                        Save Set
                    </Button>
                </>
                }
                <Button
                    onClick={handleSaveSet}
                    sx={{
                        marginY: "30px",
                    }}
                >
                    Save Set
                </Button>
            </Box>



        </Box>
    )
}

export default page