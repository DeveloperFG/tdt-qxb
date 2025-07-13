'use client'

import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProdutoContext } from "@/context";

import Image from "next/image";

import Load from "@/components/load/load";
import Produtos from "./Produtos/page";

import Link from "next/link";

import { Modal } from "@mui/material";
import Box from '@mui/material/Box';

import {CircleX, Link2 } from "lucide-react";

import * as BsIcons from 'react-icons/bs';

import firebase from "../app/firebase/db";

import { toast } from 'react-toastify';

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

export default function Home() {

  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')

  let {lista, setLista, listaCart, setListaCart, modalDetails, setModalDetails, itemClicado,  setItemClicado} = useContext(ProdutoContext);
  let {open, setOpen} = useContext(ProdutoContext);
  let {dadosUser, setDadosUser, user, setUser, } = useContext(ProdutoContext);
  
  const [publicados, setPublicados]= useState([])
  const [quantidade, setQuantidade]= useState('')

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

          useEffect(() => {
              const storageUser = localStorage.getItem('usuarioLogado');

              if (storageUser) {
                  setDadosUser(JSON.parse(storageUser))
                  return;
              } else {
                  console.log('Sem usuários logados.')
              }

          }, [])

        //   useEffect(() => {
        //     const storageProdutos = localStorage.getItem('listaProdutos');

        //     if (storageProdutos) {
        //         setLista(JSON.parse(storageProdutos))
        //         return;
        //     } else {
        //         console.log('Você não tem produtos.')
        //     }

        // }, [])


       

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

        }, [setUser])


        useEffect(()=> {

         setLoading(true)
    
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
                quantidade: doc.data().quantidade,
                status: doc.data().status,
                id_vendedor: doc.data().id_vendedor,
                nome_vendedor: doc.data().nome_vendedor,
                contato_vendedor: doc.data().contato_vendedor,
                whats_vendedor: doc.data().whats_vendedor,
                ultimoLogin: doc.data().ultimoLogin,
              })

              const publicados = dataLista.filter(dados => dados.status == 'publicados');
              setLista(publicados)

              const colunaQuantidade = dataLista.map((item)=> parseFloat(item.quantidade))
              const totalItens = colunaQuantidade.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
              setQuantidade(totalItens)

              // localStorage.setItem('listaProdutos', JSON.stringify(publicados))
              
            })

              setLoading(false)
             
    
        })
    
          .catch((err) => {
            // toast.error('Erro ao buscar no banco!' + err)
            console.log('erro ao buscar no banco' + err)
            })
        }
        
        getProdutos()
        
    
    
        }, [])



      // FUNCÃO TEMPORARIAMENTE DESATIVADA
      // function addCarrinho(item){

      //   // console.log(item)

      //   let randomCode = Math.floor(Math.random() * 100000000000) + 1;

      //   const verifica = (item) => {
      //     const chaves = ['wmv', '3gp', 'mp4', 'mp3', 'avi'];
      //    let teste = chaves.includes(item) ? "Encontrou" : "Não encontrou";

      //     console.log(teste)
      //  }
  
      //   let newLista = {
      //     id: item.id,
      //     code: randomCode,
      //     nome: item.nome,
      //     preco: item.preco,
      //     imagem: item.imagem,
      //     quantidade: parseFloat(item.quantidade),
      //     vendedor: item.vendedor
      //   }

      //   setListaCart(value => [...value, newLista])
      //   toast.success('Adicionado:' + ' ' + item.nome)

      // }
    

    function deleteImg() {
      setImgProduto('')
      setUrlProduto('')
      setInputProduto('')
  }


  function handleFinalizar(){
    toast.success('Compra finalizada!')
  }


  // function pushCart(produto) {
  //   const inCart = myCart.find((p) => (p.id === produto.id))
  //   if (!inCart) {
  //     produto.qtd = 1
  //     myCart.push(produto)

  //   } else {
  //     produto.qtd++
  //   }

  //   produto.totalItem = produto.qtd * produto.preco;

  //   setMyCart(myCart)
  // }

  
  // function calcTotal() {
  //   total = myCart.reduce((acumulador, item) => {
  //     return acumulador += item.totalItem
  //   }, 0)

  //   setTotal(total)
  // }


  // function calcCount() {
  //   count = myCart.reduce((acc, item) => {
  //     return acc += item.qtd
  //   }, 0);

  //   setCount(count);
  // }

  function detailsProducts(item){
    if(!user){
          toast.warn("Primeiro faça login na plataforma!", {
                    icon: "🚫"
                });
                setTimeout(()=>{
                  window.location.href = "/Login";
                },3500)
          
          return;
      }
    setModalDetails(true)
    setItemClicado(item)
  }

  useEffect(() => {
  async function carregarDados() {
    const usuarioLogado = await firebase.auth().currentUser;
    if (usuarioLogado) {
      const snap = await firebase.firestore().collection('usuarios').doc(usuarioLogado.uid).get();
      setUser(usuarioLogado.email);
      setDadosUser([{ nome: snap.data().nome }]);
    }
    setLoading(false);
  }

  carregarDados();
}, []);

const BemVindo = ({ user, dadosUser, loading }) => {
  if (loading || !user || dadosUser.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: '1%' }}>
      <small style={{ color: 'green' }}>
        {'olá: ' + dadosUser.map((item) => item.nome).join(', ')}
      </small>
    </div>
  );
};

  return (

      <main className="flex flex-col w-full h-full justify-center items-center sm:ml-28 p-2">

       <BemVindo user={user} dadosUser={dadosUser} loading={loading} />

        {lista === '' ? (
          <h1 className="text-2xl mb-8">
            {lista !== '' ? 'Ainda não há itens publicados...' : 'Carregando...'}
          </h1>
        ) : (
          <h1 className="text-2xl mb-8 font-bold">Ultimas publicões</h1>
        )}

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-self-center self-center">
          {lista.map((item, index) => (
            <div
              key={index}
              className="w-[180px] h-[220px] bg-white flex flex-col items-center justify-between p-2 border border-gray-300 rounded-lg shadow-md"
            >
              <div className="text-green-700 font-bold text-sm">R$: {item.preco}</div>

              {item.imagem !== '' ? (
                <div className="w-[120px] h-[120px] flex justify-center items-center overflow-hidden">
                  <Image
                    key={index}
                    src={item.imagem}
                    alt="Imagem do produto"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <Load />
              )}

              <span className="font-bold text-xs text-center truncate">{item.nome}</span>
              <span className="text-green-600 text-[10px]">Estoque: {item.quantidade}</span>

              <Button className="w-full text-[10px] py-1" onClick={()=> detailsProducts(item)}>
                Ver detalhes...
              </Button>
              {/* <Button className="w-full text-[10px] py-1" onClick={() => addCarrinho(item)}>
               Adicionar
              </Button> */}
            </div>
          ))}
        </section>
      </main>
        );
      }

