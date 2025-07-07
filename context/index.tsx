'use client'

import {createContext, useState, useEffect } from 'react'


interface AuthContextType {
    nome: string ,
    preco: number,
    src: string
  }


  export const ProdutoContext = createContext({});


function ContextProvider({children} : {children: React.ReactNode}){

    const [lista, setLista] = useState<AuthContextType[]>([])
    const [listaCart, setListaCart] = useState<AuthContextType[]>([])

    const [open, setOpen] = useState(false);
    const [openDial, setOpenDial] = useState(false);
    const [openModalAvatar, setOpenModalAvatar]= useState(false)

    const [modalCart, setModalCart] = useState(false)

    const [aberto, setAberto] = useState(true);

    const [dadosUser, setDadosUser ] = useState([]);
    const [user, setUser ] = useState([]);

    return(
        <ProdutoContext.Provider value={{lista , setLista, open, setOpen, openDial, setOpenDial, aberto, setAberto, 
        dadosUser, setDadosUser, user, setUser, openModalAvatar, setOpenModalAvatar, modalCart, setModalCart, listaCart, setListaCart }}>
            {children}
        </ProdutoContext.Provider>
    )
}

export { ContextProvider}