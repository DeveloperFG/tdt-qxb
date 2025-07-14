'use client'
import { useState, useContext, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ProdutoContext } from "@/context";
import firebase from '../firebase/db';

import Image from "next/image";

import { Modal } from "@mui/material";
import Box from '@mui/material/Box';

import { FaWhatsapp, FaWhatsappSquare  } from "react-icons/fa";
import { BsTelephoneForward, BsTelephoneForwardFill  } from "react-icons/bs";
import { FaStar } from 'react-icons/fa';


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

    console.log('dados do vendedor ao clicar no item', accessLast)


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


        const StarRating = ({ totalStars = 5 }) => {
                const [rating, setRating] = useState(0);       // Valor clicado
                const [hover, setHover] = useState(null);       // Valor quando passa o mouse

                return (
                    <div style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
                    {[...Array(totalStars)].map((_, index) => {
                        const currentRating = index + 1;

                        return (
                        <label key={index}>
                            <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                            style={{ display: 'none' }}
                            />
                            <FaStar
                            size={15}
                            color={
                                currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'
                            }
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                            />
                        </label>
                        );
                    })}
                    </div>
                );
                };

    return(
           <div> 
                <Modal 
                    open={modalDetails}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                       <strong>Detalhes do produto</strong> 

                        <div style={{ width:"100%", display:'flex', alignItems:'center'}}>
                                <div style={{ width:"100%",display:'flex', alignItems:'start', justifyContent:'start', flexDirection:'column'}}>
                                    <p>Produto:<small> {itemClicado.nome}</small></p>
                                    <p>Preço:<small> R$: {itemClicado.preco},00</small></p>
                                    <p>Tempo de uso:<small> {itemClicado.uso}</small></p>
                                    <p>Descrição:<small> {itemClicado.descricao}</small></p>

                                    <div style={{ borderBottom:"1px solid black", width:'100%', height:'0'}}></div>
                                    <div style={{ marginBottom:'10px'}}></div>

                                    <strong>Vendedor</strong> 
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                               
                                        <div> 
                                            
                                            <Image
                                                src={accessLast.avatar}
                                                width={70}
                                                height={40}
                                                alt="foto"
                                        /> 

                                        </div>
                                       

                                        <div style={{display:'flex', flexDirection:'column', marginLeft:'5px'}}>
                                                <small style={{color:'blue'}}>Nome: {itemClicado.nome_vendedor}</small>
                                                {/* <small style={{color:'blue'}}>Contato: {itemClicado.contato_vendedor}</small>
                                                <small style={{color:'blue'}}>Whatsapp: {itemClicado.whats_vendedor ? itemClicado.whats_vendedor : "Não possui" }</small> */}
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <FaWhatsappSquare size={20} color='green' />
                                                    <BsTelephoneForward size={20} color="blue" style={{marginLeft:'5px'}} />
                                                </div>
                                                <small style={{color:'blue'}}>Reputação:</small>
                                                  <StarRating />
                                        </div>
                                    
                                    </div>
                                            <div style={{ borderBottom:"1px solid black", width:'100%', height:'0', marginTop:'5px'}}></div>
                                            <div style={{ marginBottom:'10px'}}></div>
                                   
                                    <small style={{color:'blue'}}>Ultimo acesso: {formatarData(accessLast.ultimoLogin)}</small>
                                </div>                                        
                        </div>
                </Box>

                     

                </Modal>
           </div>
    )
}