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


export default function ModalCart(){

    let { modalCart, setModalCart, listaCart, setListaCart} = useContext(ProdutoContext);

    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState()
    const [quantProduto, setQuantProduto]= useState(1)

    const [control, setControl] = useState(false)
   
    const handleClose = () => setModalCart(false);


        useEffect(()=>{

            let colunaPreco = listaCart.map((item)=> parseFloat(item.preco))
            const soma = colunaPreco.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      

            setTotal(soma)
      
        },[modalCart, control])
  
    function handleRemoveItem(item){

        let novaLista = listaCart.filter(function(i) { return i.code !== item.code; });
        setListaCart(novaLista)
        toast.warning(`item removido: ${item.nome}`)
        setControl(!control)
    
      }
     

    function handleFinalizar(){
        toast.success('Compra finalizada, Total de ' + 'R$' + ': ' + total.toFixed(2) )
      }
  
  function addQuantidadeMais(){
        setQuantProduto(quantProduto+1)
  }

  function addQuantidadeMenos(){
    setQuantProduto(quantProduto-1)
}


console.log(listaCart)

    return(
           <div> 
                <Modal 
                    open={modalCart}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                    {listaCart == '' ? <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'gray'}}>
                        Seu carrinho estar vazio...
                    </Typography> : <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'gray'}}>
                        Carrinho
                    </Typography>}
                    

                              {listaCart.map((item, index)=>(
                                    <div key={index} style={{ display:'flex', border: '0.5px dotted gray' , marginTop:'6px', marginBottom:'10px', padding:'4px', 
                                        justifyContent:'space-between', alignItems:'center'}}>
                                        <div>
                                            <Image
                                                key={index}
                                                src={item.imagem}
                                                width={100}
                                                height={100}
                                                alt="Imagem do produt"
                                            />                                   
                                        </div>

                                        <div style={{ width:"100%", display:'flex', alignItems:'center'}}>
                                            <div style={{ width:"100%",display:'flex', alignItems:'start', justifyContent:'start', flexDirection:'column'}}>
                                                <small>{item.nome}</small>
                                                <small>{item.preco},00</small>
                                            </div>
                                            
                                            <div style={{display:'flex'}}>
                                                <KeyboardArrowUpIcon style={{ margin:'2px'}} onClick={addQuantidadeMais}/>
                                                    <div> {quantProduto} </div>
                                                <KeyboardArrowDownIcon style={{margin:'2px'}} onClick={addQuantidadeMenos}/>
                                            </div>

                                            <div>
                                                <CircleX className="h5 w-5 text-red-600 ml-2" onClick={()=> handleRemoveItem(item)}/>    
                                            </div>
                                        </div>
                                                                                                            
                                    </div>
                                ))}

                                    <div style={{color:'green'}}>
                                        <small style={{fontSize:'16px',  fontWeight:'bolder'}}>Total: R$ {parseFloat(total).toFixed(2)}</small>
                                    </div>
                            
                  
                    <br></br>


                        {loading == true ? (
                        <>
                            <span style={{color:"green"}}>Enviando mensagem...</span>
                        </>
                        ):
                        ''
                        }

                        {listaCart == '' ?   '' : <Button style={{marginTop: '-7%', width:"100%"}} onClick={handleFinalizar}>Finalizar compra</Button> }
                    
                    </Box>

                </Modal>
           </div>
    )
}