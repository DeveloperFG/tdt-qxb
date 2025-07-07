'use client'
import * as React from 'react';

import { useState, useContext } from "react";
import { ProdutoContext } from "@/context";

import { Button } from "@/components/ui/button";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

import { PatternFormat } from 'react-number-format';

import Checkbox from '@mui/material/Checkbox';

import { FaWhatsapp, FaWhatsappSquare  } from "react-icons/fa";
import { BsTelephoneForward, BsTelephoneForwardFill  } from "react-icons/bs";

import Load from '@/components/load/load';
import Notify from '../../components/notify/notify'

import firebase from '../firebase/db';

import { toast } from 'react-toastify';

import Link from "next/link";

import Image from "next/image";

import logo from '../img/Logo.png'

import { ToastContainer } from 'react-toastify';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Login() {


    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [load, setLoad]= useState(false)

    let {openDial, setOpenDial, user, setUser } = useContext(ProdutoContext);


  async function handleLogin(){

        if( email == '' || password == ''){
            toast.warning("Preencha todos os campos")
            return;
        }

        setLoad(true)

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value)=>{

        await firebase.firestore().collection('usuarios')
        .doc(value.user.uid)
        .get()
        .then((snapshot)=>{

            let dataUser = [];

            dataUser.push({
            uid: snapshot.data().uid,
            nome: snapshot.data().nome,
            email: snapshot.data().email,
            contato: snapshot.data().contato,
            telefone: snapshot.data().telefone,
            whats: snapshot.data().whatsapp,
            avatar: snapshot.data().avatar,
            status: snapshot.data().status,

            })
            setLoad(false)
            toast.success('Logado com sucesso!')
            localStorage.setItem('usuarioLogado', JSON.stringify(dataUser))
            
        })
            window.location.href = "/";
        // <Redirect to='/Cadastrar' />


        })
        .catch((error)=>{
        toast.error('Erro ao logar!!!' + error)
        console.log('Deu algum erro' + error)
        setLoad(false)
        
        })
    
    
    }      


  return (
    <main className=" sm:ml-28 p-2 flex w-full h-screen justify-center items-center flex-col">

        {setOpenDial && (
                <Notify/>
        )}

        <Image src={logo} width={300} height={300} alt='logo' />
       
            <Typography id="modal-modal-title" variant="h6" component="h2" className='w-4/5 text-blue-950 text-base tex-start mb-1'>
                 Faça seu login
            </Typography> 
           
        <Box width='80%' alignItems='center' justifyContent='center '>

            <Box mb={1}>
                <TextField id="outlined-basic" label="Email" variant="outlined"  value={email} onChange={(txt)=> setEmail(txt.target.value)}  className="w-full" />
            </Box>

            <Box mb={1}>
            <   TextField id="outlined-basic" label="Senha" variant="outlined" type="password"  value={password} onChange={(txt)=> setPassword(txt.target.value)}  className="w-full" />
            </Box>

            <Box sx={{ display: 'flex' }}>
                {load == true ? <Load/> :  <Button style={{marginTop: '1%', width:"100%", backgroundColor:'#020a34', fontSize:'18px'}} onClick={handleLogin}>Entrar</Button>  } 
            </Box>

            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' marginTop={1.5}>
                <Link href='#'>
                    Esqueceu a senha?
                </Link>

                <Link href='/Registro'>
                Não possui conta? Crie uma agora!
                </Link>
            </Box>

        </Box>

    </main>
  );
}
