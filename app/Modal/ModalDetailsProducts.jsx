'use client'
import { useState, useContext, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ProdutoContext } from "@/context";
import firebase from '../firebase/db';

import Image from "next/image";

import { Modal } from "@mui/material";
import Box from '@mui/material/Box';


import Typography from '@mui/material/Typography';
import {CircleX } from "lucide-react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { toast } from "react-toastify";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #fbfff6',
    boxShadow: 24,
    p: 4,
    zIndex: 100
  };


export default function ModalDetailsProducts(){

    let { modalDetails, setModalDetails } = useContext(ProdutoContext);
    let { dadosUser, setDadosUser,  lista, itemClicado } = useContext(ProdutoContext);

    const[accessLast, setAccessLast] = useState([])

    const timestamp = itemClicado?.ultimoLogin

    const resultado = lista.filter(item => item.id === itemClicado.id);


    console.log("itemClicado.id no modal", itemClicado.id_vendedor)

    console.log("dadosUser uid no modal", dadosUser)


    console.log("accessLast nome no modal", accessLast.ultimoLogin)




   useEffect(() => {
    async function buscarUsuarioPorId() {
        try {
        const userRef = firebase.firestore().collection('usuarios').doc(itemClicado?.id_vendedor);
        const doc = await userRef.get();

        if (doc.exists) {
            console.log("estar dentro do useEffect");
            setAccessLast(doc.data());
        } else {
            console.log("Usuário não encontrado");
        }
        } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        }
    }

  buscarUsuarioPorId(); // <<< chamada da função aqui
}, [itemClicado?.id_vendedor]);
  
    

    const formatarData = (timestamp) => {
            if (!timestamp || !timestamp.seconds) return '---';

            const date = new Date(timestamp.seconds * 1000); // segundos → milissegundos
            return date.toLocaleString('pt-BR'); // Ex: 09/07/2025 21:11:23
    };

    const handleClose = () => setModalDetails(false);

    return(
           <div> 
                <Modal 
                    open={modalDetails}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                       <strong>Detalhes</strong> 


                        <div style={{ width:"100%", display:'flex', alignItems:'center'}}>
                                <div style={{ width:"100%",display:'flex', alignItems:'start', justifyContent:'start', flexDirection:'column'}}>
                                    <p>Produto:<small> {itemClicado.nome}</small></p>
                                    <p>Preço:<small> R$: {itemClicado.preco},00</small></p>
                                    <p>Tempo de uso:<small> {itemClicado.uso}</small></p>
                                    <p>Descrição:<small> {itemClicado.descricao}</small></p>

                                    <div style={{ borderBottom:"1px solid black", width:'100%', height:'0'}}></div>
                                    <div style={{ marginBottom:'10px'}}></div>
                                    <small style={{color:'blue'}}>Vendedor: {itemClicado.nome_vendedor}</small>
                                    <small style={{color:'blue'}}>Contato: {itemClicado.contato_vendedor}</small>
                                    <small style={{color:'blue'}}>Whatsapp: {itemClicado.whats_vendedor ? itemClicado.whats_vendedor : "Não possui" }</small>
                                    <div style={{ borderBottom:"1px solid black", width:'100%', height:'0'}}></div>
                                    <div style={{ marginBottom:'10px'}}></div>
                                    <small style={{color:'blue'}}>Ultimo acesso: {formatarData(accessLast.ultimoLogin)}</small>
                                </div>                                        
                        </div>
                </Box>

                     

                </Modal>
           </div>
    )
}