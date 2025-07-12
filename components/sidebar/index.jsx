'use client'
import { useState, useContext, useEffect } from "react";
import { ProdutoContext } from "@/context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import firebase from "../../app/firebase/db";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";

import { Home, PanelBottom, Package, Settings2, ShoppingBag, Users, User, PackagePlus, LogOut, ShoppingCart, Menu, Box } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { TooltipTrigger } from "../ui/tooltip";

import { toast } from 'react-toastify';

import avatar from '../../app/img/avatar.png'

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Sidebar() {

    const [urlAvatar, setUrlAvatar] = useState([])
    const [user, setUser] = useState([])

    const { listaCart, dadosUser, open, setOpen, openModalAvatar, setOpenModalAvatar, modalCart, setModalCart } = useContext(ProdutoContext);

    const router = useRouter();

    const handleClose = () => setOpen(false);
    const handleNavigate = (path) => {
        router.push(path);
        setOpen(false);
    }

    function handleOpen() {
        setModalCart(true)
    }

    function ModalAvatar() {
        if (user.uid === undefined) {
            toast.warn("Faça login na plataforma!", { icon: "🚫" });
            return;
        }
        setOpenModalAvatar(true)
    }

    useEffect(() => {
        const storageUser = localStorage.getItem('usuarioLogado');
        if (storageUser) {
            setUrlAvatar(JSON.parse(storageUser))
        }
    }, [])

    useEffect(() => {
        async function checkLogin() {
            await firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    setUser({ uid: user.uid, email: user.email });
                } else {
                    setUser('');
                }
            })
        }

        checkLogin();
    }, [])

    async function fazerLogout() {
        try {
            const user = firebase.auth().currentUser;
            const userRef = firebase.firestore().collection('usuarios').doc(user.uid);

            await userRef.update({
                online: false,
                ultimoLogin: firebase.firestore.FieldValue.serverTimestamp(),
            });

            await firebase.auth().signOut();
            localStorage.removeItem('usuarioLogado');
            window.location.href = "/";
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <div className="flex w-full flex-col bg-muted/40">
            {/* Sidebar Desktop */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
                <nav className="fixed flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider>
                        <Link href="#" className="flex h-9 w9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full">
                            <Package className="h4 w-4" />
                            <span className="sr-only">Dashboard Avatar</span>
                        </Link>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Inicio</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Inicio</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/Pedidos" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
                                    <ShoppingBag className="h-5 w-5" />
                                    <span className="sr-only">Pedidos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Pedidos</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/Produtos" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
                                    <Package className="h-5 w-5" />
                                    <span className="sr-only">Meus itens</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Meus itens</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/Usuarios" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
                                    <Users className="h-5 w-5" />
                                    <span className="sr-only">Usuário</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Usuário</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/Cadastrar" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
                                    <PackagePlus className="h-5 w-5" />
                                    <span className="sr-only">Cadastrar</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Cadastrar</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>

                <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/Login" className="flex h9- w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground">
                                    <LogOut className="h-5 w-5 text-red-500" />
                                    <span className="sr-only"> Fazer Login</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right"> Fazer Login </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>

            {/* Mobile Header */}
            <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-violet-950 gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button size="icon" variant='ghost' className="sm:hidden">
                                <Menu className="w-5 h-5 text-white" />
                                <span className="sr-only">Abrir / fechar menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side='left' className="sm:max-w-x bg-indigo-950">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Button
                                    variant="ghost"
                                    onClick={() => handleNavigate("/")}
                                    className="flex justify-start items-center gap-4 px-2.5 text-white hover:bg-muted"
                                    >
                                    <ShoppingBag className="h-5 w-5 text-white" />
                                    Inicio
                                    </Button>
                                                                    <Button
                                    variant="ghost"
                                    onClick={() => handleNavigate("/Pedidos")}
                                    className="flex justify-start items-center gap-4 px-2.5 text-white hover:bg-muted"
                                    >
                                    <ShoppingBag className="h-5 w-5 text-white" />
                                    Pedidos
                                    </Button>
                                                                <Button
                                    variant="ghost"
                                    onClick={() => handleNavigate("/Produtos")}
                                    className="flex justify-start items-center gap-4 px-2.5 text-white hover:bg-muted"
                                    >
                                    <ShoppingBag className="h-5 w-5 text-white" />
                                    Meus itens
                                    </Button>
                                                                    <Button
                                    variant="ghost"
                                    onClick={() => handleNavigate("/Cadastrar")}
                                    className="flex justify-start items-center gap-4 px-2.5 text-white hover:bg-muted"
                                    >
                                    <ShoppingBag className="h-5 w-5 text-white" />
                                    Cadastrar
                                    </Button>
                                                                    <Button
                                    variant="ghost"
                                    onClick={() => handleNavigate("/Usuario")}
                                    className="flex justify-start items-center gap-4 px-2.5 text-white hover:bg-muted"
                                    >
                                    <ShoppingBag className="h-5 w-5 text-white" />
                                        Usuario
                                    </Button>

                                {user != '' ? (
                                    <Button
                                        variant="ghost"
                                        onClick={fazerLogout} 
                                        className="flex justify-start items-center gap-4 px-2.5 text-white hover:bg-muted"
                                        >
                                        <ShoppingBag className="h-5 w-5 text-white" />
                                        Sair
                                        </Button>
                                                                        ) : (
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleNavigate("/Login")}
                                        className="flex justify-start items-center gap-4 px-2.5 text-white hover:bg-muted"
                                        >
                                        <ShoppingBag className="h-5 w-5 text-white" />
                                        Fazer login
                                        </Button>
                                                                        )}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* Logo e Avatar */}
                    <div className="flex flex-1 justify-between items-center">
                        <Link href='/'>
                            <small className="text-white font-bold">TDT - QXB</small>
                        </Link>

                        {user && (
                            <div className="ml-auto mr-4">
                                <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant={urlAvatar.map((item) => item.avatar) != '' ? 'dot' : 'standard'}>
                                    <Avatar
                                        src={urlAvatar.map((item) => item.avatar) != '' ? urlAvatar.map((item) => item.avatar) : avatar}
                                        style={{ width: '25px', height: '25px' }}
                                        onClick={ModalAvatar}
                                    />
                                </StyledBadge>
                            </div>
                        )}

                        <div className="relative flex items-center">
                            <ShoppingCart className="h-6 w-6 text-white" onClick={handleOpen} />
                            <div className="absolute -top-2 -right-2 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                                <small className="text-white text-[10px]">{listaCart.length}</small>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}
