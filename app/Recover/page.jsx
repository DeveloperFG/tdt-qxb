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

import Image from "next/image";

import Link from "next/link";

import recover_password from '../img/envio.png'


export default function Recover() {

    // let { nome, setNome, sobrenome, setSobrenome, cpf, setCpf } = useContext(UserContext);

    const [email, setEmail] = useState('')
    const [load, setLoad] = useState(false)


    function RecoverPassword() {
        setLoad(true)

        if(email == ""){
            toast.warning("Digite seu email!")
            setLoad(false)
            return;

        }

        firebase.auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                alert('Enviamos um e-mail para você!')
                setEmail('')
                setLoad(false)
                window.location.href = "./Login";
            })
            .catch((error) => {
                alert('Erro ao enviar e-mail')
                console.log(error)
                setEmail('')

            }).finally(() => setLoad(false))
    }

    return (
        <main className=" sm:ml-28 p-2 flex w-full h-screen justify-center items-center flex-col">

            <Box marginTop='-20%'>
                    <Image src={recover_password} width={300} height={100} alt='recover_password' />
            </Box>
           
            <Typography id="modal-modal-title" variant="h6" component="h2" className='w-4/5 text-blue-950 text-base tex-start mb-1'>
                 Recupere sua senha...
            </Typography> 
           
        <Box width='80%' alignItems='center' justifyContent='center'>

            <Box mb={1}>
                <TextField id="outlined-basic" label="Seu email" variant="outlined"  value={email} onChange={(txt)=> setEmail(txt.target.value)}  className="w-full" />
            </Box>

            <Box sx={{ display: 'flex' }}>
                            {load == true ? <Load/> :  <Button style={{marginTop: '1%', width:"100%", backgroundColor:'#020a34', fontSize:'18px'}} onClick={RecoverPassword}>Enviar link</Button>  } 
            </Box>

            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' marginTop={1.5}>
                <Link href='/Login'>
                Ja tenho conta. Fazer login!
                </Link>
            </Box>

        </Box>

    </main>
    )
}
