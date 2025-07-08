'use client'
import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProdutoContext } from "@/context";

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
    let { dadosUser, lista, itemClicado } = useContext(ProdutoContext);


    console.log("item clicado", itemClicado)

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
                                    <small style={{color:'blue'}}>Vendedor: {dadosUser[0]?.nome}</small>
                                    <small style={{color:'blue'}}>Contato: {dadosUser[0]?.contato}</small>
                                </div>                                        
                        </div>
                </Box>

                     

                </Modal>
           </div>
    )
}