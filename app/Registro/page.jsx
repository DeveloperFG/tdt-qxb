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

import HowToRegIcon from '@mui/icons-material/HowToReg';

import Load from '@/components/load/load';
import Notify from '../../components/notify/notify'

import { toast } from 'react-toastify';

import firebase from '../firebase/db';

import Link from "next/link";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Registro() {

    const [nome, setNome] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [contato, setContato] = useState('')


    const [whats, setWhats] = useState(false)
    const [fone, setFone] = useState(false)

    const [load, setLoad]= useState(false)

    let {openDial, setOpenDial} = useContext(ProdutoContext);


    async function CadastraUser() {
      
      if(nome == '' || password == ''|| email == '' || contato == ''){
                toast.warning("Preencha todos os campos")
                return;
            }

            if(whats == false && fone == false){
                setOpenDial(true)
                return;
            }


            setLoad(true)

      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
  
          await firebase.firestore().collection('usuarios')
            .doc(value.user.uid)
            .set({
              nome: nome,
              email: email,
              contato: contato,
              whatsapp: whats,
              telefone: fone,
              avatar: '',
              status: 'primeiro_acesso',
              mensalidade: '',
              vendas_realizadas: 0,
              vendas_perdidas: 0,
              primeiroAcesso: firebase.firestore.FieldValue.serverTimestamp(),

            })
            .then(() => {
              toast.success('Cadastrado com sucesso!')
              setNome('')
              setEmail('')
              setPassword('')
              setContato('')
              setLoad(false)

              window.location.href = "./Login";

            })
  
        })
        .catch((error) => {
          if (error.code === 'auth/weak-password') {
            toast.warning('Senha muito fraca..')
          } else if (error.code === 'auth/email-already-in-use') {
            toast.warning('Esse email já existe!');
          }
          
          setLoad(false)
        })

     
  
   }



  return (
    <main className=" sm:ml-28 p-2 flex w-full h-screen justify-center items-center flex-col">

        {setOpenDial && (
                <Notify/>
        )}

        <HowToRegIcon style={{width:100, height:100, color:'#020a34'}} />
       
            <Typography id="modal-modal-title" variant="h6" component="h2" className='w-4/5 text-blue-950 text-base tex-start mb-1'>
                Crie sua conta
            </Typography> 
           
        <Box width='80%' alignItems='center' justifyContent='center'> 

            <Box mb={1}>
                <TextField id="outlined-basic" label="Nome" variant="outlined" value={nome} onChange={(txt)=> setNome(txt.target.value)} className="w-full" />
            </Box>
            <Box mb={1}>
            <   TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(txt)=> setEmail(txt.target.value)}  className="w-full" />
            </Box>

            <Box mb={1}>
                <TextField id="outlined-basic" label="Senha" variant="outlined"  type="password"  value={password} onChange={(txt)=> setPassword(txt.target.value)}  className="w-full" />
            </Box>


             <Box display='flex' alignItems='center' justifyContent='start'>
                <PatternFormat className='w-3/5'
                    value={contato}
                    onChange={(txt)=>setContato(txt.target.value)}
                    format='(##) # ####-####'
                    autoComplete='tel-national'
                    customInput={TextField}
                    placeholder='(88) 9 9999-9999'
                />

                <Checkbox {...label} value={fone} onChange={()=>setFone(!fone)} 
                icon={<BsTelephoneForward size={25} />} checkedIcon={<BsTelephoneForwardFill size={25} color='green'  />} />
                <Checkbox
                    {...label}
                    value={whats}
                    onChange={()=>setWhats(!whats)}
                    icon={<FaWhatsapp size={25}/>}
                    checkedIcon={<FaWhatsappSquare size={25} color='green' />}
                />
            </Box>

            <Box sx={{ display: 'flex' }}>
                {load == true ? <Load/> :  <Button style={{marginTop: '7%', width:"100%", backgroundColor:'#020a34', fontSize:'18px'}} onClick={CadastraUser}>Cadastrar</Button>  } 
            </Box>

            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' marginTop={1.5}>
                <Link href='/Recover'>
                    Esqueceu a senha?
                </Link>

                <Link href='/Login'>
                Ja tenho conta? Fazer login!
                </Link>
            </Box>

        </Box>

    </main>
  );
}
