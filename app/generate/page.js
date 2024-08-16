'use client'
import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Card, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import Flashcard from 'app/components/Flashcard'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { collection, doc, getDoc, getDocs, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase'
import SaveModal from '../components/SaveModal'

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
    const [cardSet, setCardSet] = useState([])
    const [buttonText, setButtonText] = useState('✨Generate✨')

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
                    <SaveModal userId={userId} cardSet={cardSet} />
                </>
                }
            </Box>



        </Box>
    )
}

export default page