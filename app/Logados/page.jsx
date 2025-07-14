'use client'
import * as React from 'react';

import { useEffect, useState, useContext } from 'react'
// import { UserContext } from '@/context/userContext';

import firebase from '../firebase/db';

import Load from '@/components/load/load';

import { toast } from 'react-toastify';

import { Box, Modal } from "@mui/material";
import { Button } from "@/components/ui/button";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";


export default function Logados() {

    const [usuariosOnline, setUsuariosOnline] = useState([])
    const [load, setLoad] = useState(false)


    useEffect(() => {
        const unsubscribe = firebase.firestore()
            .collection('usuarios')
            .where('online', '==', true)
            .onSnapshot((snapshot) => {
            const onlineUsers = [];

            snapshot.forEach((doc) => {
                const data = doc.data();
                
                onlineUsers.push({
                id: doc.id,
                nome: data.nome || ''
                });
            });

            setUsuariosOnline(onlineUsers);
            });

  return () => unsubscribe(); // limpa o listener
}, []);

    return (
         <Box display='flex' flexDirection='column' width='100%' height='100%' alignItems='center' justifyContent='center' >


            <h1 className="text-2x1 mb-12  "> Usuarios logados...</h1>
                <Box sx={{ display: 'flex' }}>
                    {load ==  true ? <Load/> : <p> {usuariosOnline.map((user, index)=>(
                        <p key={user.id}>{index + 1}. {user.nome}</p>
                    ))} </p>}
                </Box>
          </Box>
    )
}
