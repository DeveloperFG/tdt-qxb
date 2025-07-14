'use client'
import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProdutoContext } from "@/context";

import firebase from "../firebase/db";

import { Modal } from "@mui/material";
import Load from "@/components/load/load";

import Image from "next/image";

import Box from '@mui/material/Box';

import FileUploadIcon from '@mui/icons-material/FileUpload';

import Typography from '@mui/material/Typography';
import * as BsIcons from 'react-icons/bs';

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


export default function ModalAvatar(){

    let {openModalAvatar, setOpenModalAvatar, dadosUser, user, setDadosUser} = useContext(ProdutoContext);

    const [loading, setLoading] = useState(false)

    const [imgProduto, setImgProduto] = useState ('')
    const [inputProduto, setInputProduto] = useState ()
    const [urlProduto, setUrlProduto] = useState ('')
    
    const handleClose = () => setOpenModalAvatar(false);


    useEffect(() => {
        const storageUser = localStorage.getItem('usuarioLogado');

        if (storageUser) {
            setDadosUser(JSON.parse(storageUser))
            return;
        } else {
            console.log('Sem usuários logados.')
        }

    }, [])


    const handleFile = (e) => {

        setInputProduto()
  
        if (e.target.files[0]) {
  
            const image = e.target.files[0];
  
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
  
                setImgProduto(image)
                setUrlProduto(URL.createObjectURL(e.target.files[0]))
  
            } else {
                toast.warn("envie uma imagem do tipo PNG ou JPEG", {
                    icon: "🚫"
                });
                setImgProduto('');
                setInputProduto('');
                return;
            }
  
        }
  
    }
  
    async function updateAvatar() {

      if(imgProduto == []){
        toast.warn("Antes selecione uma imagem!", {
                    icon: "🚫"
                });
        return;
      }

      setLoading(true)
  
      let idCliente = user.uid
      let nomeCliente = dadosUser.map((item)=> item.nome).toString()
      let contatoCliente = dadosUser.map((item)=> item.contato).toString()
      let emailCliente = dadosUser.map((item)=> item.email).toString()
      let statusCliente = dadosUser.map((item)=> item.status).toString()
      let whatsCliente = dadosUser.map((item)=> item.whatsapp).toString()
      let telefoneCliente = dadosUser.map((item)=> item.telefone).toString()
  
      const uploadTask = await firebase.storage()
          .ref(`img/avatar/${imgProduto.name}`)
          .put(imgProduto)
          .then(async () => {
  
              console.log('upload com sucesso!')
  
              await firebase.storage().ref('img/avatar')
                  .child(imgProduto.name).getDownloadURL()
                  .then(async(ul) => {
                      let urlFoto = ul
  
                      await firebase.firestore().collection('usuarios')
                          .doc(idCliente)
  
                          .update({
                            nome: nomeCliente,
                            contato: contatoCliente,
                            email: emailCliente,
                            status: statusCliente,
                            whatsapp: whatsCliente,
                            telefone: telefoneCliente,
                            avatar: urlFoto,
  
                          })
  
                          .then(() => {
  
  
                            let updateAvatar = []
  
                            updateAvatar.push({
                              nome: nomeCliente,
                              contato: contatoCliente,
                              email: emailCliente,
                              status: statusCliente,
                              whatsapp: whatsCliente,
                              telefone: telefoneCliente,
                              avatar: urlFoto,
                            })
                  
  
                            localStorage.setItem('usuarioLogado', JSON.stringify(updateAvatar))
                  
                          
                            setImgProduto('')
                            setUrlProduto('')
                            setInputProduto('')
  
                              toast.success("Foto atualizada!", {
                                  icon: "✅"
                              });
  
                            setLoading(false)
  
                            window.location.reload()
  
                          })
                          .catch((error) => {
                            setLoading(false)
  
                              console.log(error + 'Deu algum erro')
                              toast.error("Erro ao fazer upload!", {
                                  icon: "❌"
                              });
                          })
  
                        
                  })
                  
          })
     }

    function closeModalAvatar(){
        setOpenModalAvatar(false)
      }
    
   
    function deleteImg() {
        setImgProduto('')
        setUrlProduto('')
        setInputProduto('')
    }
  

    return(
           <div> 
            <Modal
              open={openModalAvatar}
              onClose={closeModalAvatar}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>

                <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'gray'}}>
                 Imagem do perfil
                </Typography> 

                {dadosUser.map((item)=> item.avatar != '' && (
                  <Image
                  key={dadosUser.map((item)=> item.id).toString()}
                  src={dadosUser.map((item)=> item.avatar).toString()}
                  width={300}
                  height={300}
                  alt="foto avatar"
              /> 
                ))}

                <div  style={{ display:'flex', marginTop:'6px', padding:'4px', 
                    justifyContent:'space-between', alignItems:'center'}}>
                    <Box width='100%' marginTop='4%'>
                          <label for='arquivo' className='label-input'>Carregar imagem  <FileUploadIcon color="white"/></label>
                          <input type='file' name='arquivo' id='arquivo' multiple accept='image/*' value={inputProduto} onChange={handleFile} />
                          <span style={{marginLeft:'3%'}}>{imgProduto.name}</span>
                     </Box>

                  </div>

                  <Box>
                      {imgProduto.length != '' && loading == false && (
                        <Box display='flex' alignItems='center' justifyContent='start' height='10'>
                            <BsIcons.BsXCircle className='icon' color="red" onClick={deleteImg} />
                              <span style={{ margin: '2%', color: 'red' }} onClick={deleteImg}>excluir imagem</span>
                        </Box>

                            )}
                   </Box>
                    {!loading ? <Button style={{marginTop: '3%', width:"100%", backgroundColor:'#020a34'}} onClick={updateAvatar}>Enviar imagem</Button>  :
                    
                    <Load/>
                    
                    }
                      
    
              </Box>

          </Modal>
           </div>
    )
}