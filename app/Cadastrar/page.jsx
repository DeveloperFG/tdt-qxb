'use client'
import * as React from 'react';

// hooks
import { useState, useEffect, useContext } from "react";

import { ProdutoContext } from "@/context";

// banco de dados
import firebase from '../firebase/db';

// Modal
import { Button } from "@/components/ui/button";
import { Box, Modal } from "@mui/material";
import Typography from '@mui/material/Typography';

import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';

// input
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


// card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

// outros

import FileUploadIcon from '@mui/icons-material/FileUpload';
import Load from '@/components/load/load';
import { toast } from 'react-toastify';
import * as BsIcons from 'react-icons/bs';

// icons e imagens

import { FaPlusCircle } from "react-icons/fa";

// ccs da pagina

import './styles.css'

// Modal
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      bgcolor: 'background.paper',
      border: '2px solid #fbfff6',
      boxShadow: 24,
      p: 4,
    };


export default function Cadastrar() {


  let { user, setUser} = useContext(ProdutoContext);

  const[idProduto, setIdProduto] = useState('')
  const[idVendedor, setIdVendedor] = useState('')

  const[nome, setNome]= useState('')
  const[preco, setPreco] = useState('')
  const[descricao, setDescricao]= useState('')

  const [imgProduto, setImgProduto] = useState ('')
  const [inputProduto, setInputProduto] = useState ()
  const [urlProduto, setUrlProduto] = useState ('')
  

  const [open, setOpen] = useState(false)
  const [uso, setUso] = useState('');
  const [openSelect, setOpenSelect] = useState(false);

  const [status, setStatus] = useState('')
  const [openSelectStatus, setOpenSelectStatus] = useState(false);

  const[lista, setLista] = useState([])
  
  const [load, setLoad]= useState(false)

  const [loadLista, setLoadLista]= useState(false)

  const [openEdit, setOpenEdit] = useState(false)

  const [control, setControl]= useState(false)

  const [isFocus, setIsFocus]= useState(false)

  const [quantidade, setQuantidade] = useState('')


  const handleFocus = () => {
    setIsFocus(true)
  }

  const handleBlur = () => {
    setIsFocus(false)
  }


  const handleClose = () => setOpen(false);

  const handleCloseEdite = () => setOpenEdit(false);

    function handleOpenModalEdit(item){
      setOpenEdit(true)

      setIdProduto(item.id)
      setIdVendedor(item.vendedor)
      setNome(item.nome)
      setPreco(item.preco)
      setUso(item.uso)
      setDescricao(item.descricao)
      setImgProduto(item.imagem)
      setStatus(item.status)
      setQuantidade(item.quantidade)
      
    }

    function handleOpenModal(){
      setNome('')
      setPreco('')
      setUso('')
      setDescricao('')
      setImgProduto('')
      setUrlProduto('')
      setInputProduto('')
      setStatus('')
      setQuantidade('')
      
      setOpen(true)
    }


    function handleChangeSelect(event){
      setUso(event.target.value);
    };

    const handleCloseSelect = () => {
      setOpenSelect(false);
    };

    const handleOpenSelect = () => {
      setOpenSelect(true);
    };

    function handleChangeSelectStatus(event){
      setStatus(event.target.value);
    };


    const handleCloseSelectStatus = () => {
      setOpenSelectStatus(false);
    };

    const handleOpenSelectStatus = () => {
      setOpenSelectStatus(true);
    };



      useEffect(() => {
        async function checkLogin() {
          await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // usuario logado entra aqui
              setUser({
                uid: user.uid,
                email: user.email,

              })

            } else {
              // se não entra aqui
              setUser('')
            }
          })
        }

        checkLogin();

      }, [])

    useEffect(()=> {

      setLoadLista(true)

      async function getProdutos(){


        await firebase.firestore().collection('produtos')
      .get()
      .then((snapshot) => {
        
        let dataLista = []

        snapshot.forEach((doc) => {

          dataLista.push({
            id: doc.id,
            nome: doc.data().nome,
            preco: doc.data().preco,
            imagem:doc.data().imagem,
            uso: doc.data().uso,
            descricao: doc.data().descricao,
            vendedor: doc.data().vendedor,
            status: doc.data().status,
            quantidade: doc.data().quantidade,
          })

          // localStorage.setItem('listaProdutos', JSON.stringify(dataLista))
          
        })

        
        setLoadLista(false)
        setLista(dataLista)


      })

      .catch((err) => {
        // toast.error('Erro ao buscar no banco!' + err)
        console.log('erro ao buscar no banco' + err)
        })
    }
    
    getProdutos()
    


    }, [control])


      
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



    async function handleCadastrarProduto() {

  
      setLoad(true)
  
      if(nome == '' || preco == '' || uso == '' || descricao == '' || imgProduto == '' ){
        toast.warn('Preencha todos os campos!!!')
        setLoad(false)
        return;
      }

      const nomeUnico = `${nome}_${Date.now()}`
  
      const uploadTask = await firebase.storage()
          .ref(`img/fotos/${nomeUnico}`)
          .put(imgProduto)
          .then(async () => {
  
              console.log('Upload realizado com sucesso!')
              // toast.success("Upload sucesso!", {
              //     icon: "😁"
              // });
  
              await firebase.storage().ref('img/fotos')
                  .child(nomeUnico).getDownloadURL()
                  .then(async(ul) => {
                      let urlFoto = ul;
  
                      await firebase.firestore().collection('produtos')
                          .doc()
                          .set({
                            nome: nome,
                            preco: parseFloat(preco),
                            uso: uso,
                            descricao: descricao,
                            imagem: urlFoto,
                            status: 'estoque',
                            quantidade: quantidade,
                            vendedor: user.uid
                          })
  
                          .then(() => {
                            setLoad(false)
                            setNome('')
                            setPreco('')
                            setUso('')
                            setDescricao('')
                            setImgProduto('')
                            setUrlProduto('')
                            setInputProduto('')
                            setQuantidade('')
                              toast.success("Novo produto cadastrado!", {
                                  icon: "✅"
                              });
  
                              setTimeout(setControl(!control), 2000)
  
                          })
                          .catch((error) => {
                              setLoad(false)
                              console.log(error + 'Deu algum erro')
                              toast.error("Erro ao fazer upload!", {
                                  icon: "❌"
                              });
                          })
                  })
          })
  
  }


      async function EditarItem(){

            await firebase.firestore().collection('produtos')
            .doc(idProduto)
            .update({
                nome: nome,
                preco: preco,
                uso: uso,
                descricao: descricao,
                imagem: imgProduto,
                vendedor: idVendedor,
                quantidade: quantidade,
                status: status
            })

            .then(() => {
                toast.success('Item atualizado!')
                setIdProduto('')
                setNome('')
                setPreco('')
                setUso('')
                setDescricao('')
                setImgProduto('')
                setStatus('')
                setIdVendedor('')
                setQuantidade('')
            })
            .catch((error) => {
                toast.error('Erro ao atualizar!' + error)

            })
        }



  async function PublicarItem(item){

     let resultado =  window.confirm('Deseja publicar esse item?')

     if(resultado){

      await firebase.firestore().collection('produtos')
      .doc(item.id)
      .update({

          id: item.id,
          nome: item.nome,
          preco: item.preco,
          uso: item.uso,
          imagem: item.imagem,
          descricao: item.descricao,
          vendedor: item.vendedor,
          quantidade: item.quantidade,
          status:'publicados',
      })

      .then(() => {

        toast.success('Item Publicado!')
        setIdProduto('')
        setNome('')
        setPreco('')
        setUso('')
        setDescricao('')
        setImgProduto('')
        setIdVendedor('')
        setQuantidade('')

        // const publicados = dataProduto.filter(dados => dados.status == 'publicados');

        // localStorage.setItem('listaProdutos', JSON.stringify(publicados))


      })

      .catch((error) => {
          toast.error('Erro ao atualizar!' + error)

      })

     }else{
      console.log('Item não publicado')
     }

    }

   async function ExcluirItem(item){

      let resultado =  window.confirm('Deseja excluir esse item?')
 
      if(resultado){

          await firebase.firestore().collection('produtos').doc(item.id)
            .delete()
            .then(() => {
              toast.success('Exluido com sucesso!!!')
              setTimeout(setControl(!control), 2000)
              
            })
            .catch((error) => {
              console.log('Erro ao excluir!!!' + error)
      
            })
 
     }


  }


  function ExcluiImg() {
    setImgProduto('')
    setUrlProduto('')
    setInputProduto('')
}

  return (
    <main className="sm:ml-28 p-2">

            <br></br>

        <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>

                <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'gray', marginBottom:'2%'}}>
                  Cadastre seu produto...
                </Typography> 

                <Box mb={2}>
                  <TextField id="outlined-basic" label="Nome" variant="outlined" value={nome} onChange={(txt)=> setNome(txt.target.value)} className="w-full" />
                </Box>
                <Box mb={1}>
                  <TextField id="outlined-basic" type='text' onFocus={handleFocus} onBlur={handleBlur} label="Preço" variant="outlined" value={preco} onChange={(txt)=> setPreco(txt.target.value)}  className="w-full" />
                    <span style={{color:'red', fontSize:'12px'}}>{isFocus && 'Insira apenas numeros e ponto (ex: 230.80)'}</span>
                </Box>
                
                <FormControl sx={{ mb:1, minWidth: 120 , width:'100%' }}>
                    <InputLabel id="demo-controlled-open-select-label">Uso</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={openSelect}
                      onClose={handleCloseSelect}
                      onOpen={handleOpenSelect}
                      value={uso}
                      label="Uso"
                      onChange={handleChangeSelect}
                    >
                      <MenuItem value='novo'>Novo </MenuItem>
                      <MenuItem value='semi novo'>Semi novo </MenuItem>
                      <MenuItem value='6 meses'>Até 6 meses </MenuItem>
                      <MenuItem value='6 á 12 meses'>De 6 á 12 meses</MenuItem>
                      <MenuItem value='12 á 24 meses'>De 12 á 24 meses </MenuItem>
                      <MenuItem value='maie de 36 meses'>Mais de 36 meses </MenuItem>
                    </Select>
                </FormControl>

                <Box mb={1}>
                  <TextField id="outlined-basic" label="Descrição do produto" variant="outlined" value={descricao} onChange={(txt)=> setDescricao(txt.target.value)}  className="w-full" />
                </Box>            

                <Box mb={1} my={1}>
                      <TextField id="outlined-basic" type='number' label="Quantidade" variant="outlined" value={quantidade} onChange={(txt)=> setQuantidade(txt.target.value)} className="w-full" />
                  </Box>    
                
                <Box display='flex' width='100%' flexDirection='row' alignItems='center' justifyContent='start' marginTop='3%'>
                  <Box display='flex' width='100%' alignItems='start' justifyContent='start'>
                        {/* <span style={{fontSize:'12px'}}>Imagem do produto :</span> */}
                          <label for='arquivo' className='label-input'>Enviar arquivo <FileUploadIcon color="white"/> </label>
                          <input type='file' name='arquivo' id='arquivo' multiple accept='image/*' value={inputProduto} onChange={handleFile} />         
                  </Box>
                  
                  <Box display='flex' width='90%' justifyContent='start'>
                      <small>{imgProduto.name}</small>
                  </Box>
                 
                </Box>

                <Box width='40%' marginTop='1%'>
                        {imgProduto.length != '' && load == false && (
                         <Box display='flex' width='150px' alignItems='center' justifyContent='start' >
                          <BsIcons.BsXCircle className='icon' color="red" onClick={ExcluiImg} />
                            <span style={{ margin: '2%', color: 'red' }} onClick={ExcluiImg} >excluir imagem</span>
                        </Box>

                          )}
                  </Box>
               
                

                 <Box sx={{ display: 'flex' }}>
                  {load == true ? <Load/> :  <Button style={{marginTop: '7%', width:"100%", backgroundColor:'#020a34'}} onClick={handleCadastrarProduto}>Cadastrar </Button>  } 
                </Box>

              </Box>

        </Modal>

        <Modal
              open={openEdit}
              onClose={handleCloseEdite}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>

                <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'gray'}}>
                  Edite seu produto...
                </Typography> 

                <Box mb={1} my={1}>
                  <TextField id="outlined-basic" label="Nome" variant="outlined" value={nome} onChange={(txt)=> setNome(txt.target.value)} className="w-full" />
                </Box>
                <Box mb={1} my={2}>
                  <TextField id="outlined-basic" label="Preço" variant="outlined" value={preco} onChange={(txt)=> setPreco(txt.target.value)}  className="w-full" />
                </Box>
                
              <FormControl sx={{ mb: 2, minWidth: 120 }} style={{display:'flex'}}>
                <InputLabel id="demo-controlled-open-select-label">Uso</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openSelect}
                  onClose={handleCloseSelect}
                  onOpen={handleOpenSelect}
                  value={uso}
                  label="Uso"
                  onChange={handleChangeSelect}
                >
                  <MenuItem value='novo'>Novo </MenuItem>
                  <MenuItem value='semi novo'>Semi novo </MenuItem>
                  <MenuItem value='6 meses'>Até 6 meses </MenuItem>
                  <MenuItem value='6 á 12 meses'>De 6 á 12 meses</MenuItem>
                  <MenuItem value='12 á 24 meses'>De 12 á 24 meses </MenuItem>
                  <MenuItem value='maie de 36 meses'>Mais de 36 meses </MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ mb: 2, minWidth: 120 }} style={{display:'flex'}}>
                <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openSelectStatus}
                  onClose={handleCloseSelectStatus}
                  onOpen={handleOpenSelectStatus}
                  value={status}
                  label="Status"
                  onChange={handleChangeSelectStatus}
                >
                  <MenuItem value='estoque'>Estoque </MenuItem>
                  <MenuItem value='publicados'>Publicar </MenuItem>

                </Select>
              </FormControl>
              


                <Box mb={1} my={1}>
                  <TextField id="outlined-basic" label="Descrição do produto" variant="outlined" value={descricao} onChange={(txt)=> setDescricao(txt.target.value)}  className="w-full" />
                </Box>
                
{/* 
                <Box mb={1}>
                  <TextField id="outlined-basic" label="Url imagem" variant="outlined" value={imgProduto} onChange={(txt)=> setImgProduto(txt.target.value)}  className="w-full" />
                </Box> */}
                
                 <Box sx={{ display: 'flex' }}>
                  {load == true ? <Load/> :  <Button style={{marginTop: '3%', width:"100%", backgroundColor:'#020a34'}} onClick={EditarItem}>Atualizar </Button>  } 
                </Box>

              </Box>

          </Modal>
          
          <Box display='flex' flexDirection='column' width='100%' height='100%' alignItems='center' justifyContent='center' >

              {lista == '' ? 'Você ainda não tem itens cadastrados...' : <h1 className="text-2x1 mb-12  "> {lista == '' ? 'Carregando itens...' : 'Meus itens'} </h1>}

            {loadLista == true ? <Load/> : (
              <>
                    {lista.map((item, index)=> {

                    return(
                      <div key={index} style={{display:'flex', width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

                        <Card sx={{ maxWidth: '100%' }} style={{marginBottom:'12px',}}>
                            <CardActionArea style={{display:'flex',  width:'98%', justifyContent:'space-between'}}>
                              <CardMedia style={{objectFit:'contain' , width:"50%", alignItems:'center', justifyContent: 'center',}}
                                component="img"
                                // width='400px'
                                // height="40"
                                image={item.imagem}
                                alt={item.nome}
                              />
                              <CardContent style={{ display:'flex', width:'50%', height: '30%',  flexDirection:'column', alignItems:'start', justifyContent: 'start'}}>
                                <Typography gutterBottom variant="h5" component="div" width='100%'>
                                  {item.nome}
                                </Typography>
                                <CardContent style={{width:'100%'}}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }} width='100%'>
                                    <small>Uso: {item.uso} </small> 
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                      <small>Descrição: {item.descricao}</small>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                      <small>Preço: {(item.preco).toFixed(2)}</small>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                      <small style={{fontWeight:'bold', color:'blue'}}>QUANT: {item.quantidade}</small>
                                    </Typography>
                                </CardContent>
                              </CardContent>
                            </CardActionArea>
                            <CardActions style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                              <Button  color="primary" onClick={()=> handleOpenModalEdit(item)}>
                                Editar Item
                              </Button>
                              <Button  color="primary" onClick={()=> ExcluirItem(item)}>
                                Excluir Item
                              </Button>
                              <Button  color="primary" onClick={()=> PublicarItem(item)}>
                                Publicar Item
                              </Button>
                            </CardActions>
                      </Card>
                      </div>
                    )
                    })}
              </>
            )}


              <Box width='100%'>
                <Box className='cadastar-link'>
                  <Box>
                      <FaPlusCircle style={{display:'flex',  height:'15vh'}} color='#020a34' size={50} onClick={handleOpenModal} />
                  </Box>
                </Box>
                  
              </Box>

          </Box>
      
    </main>
  );
}
