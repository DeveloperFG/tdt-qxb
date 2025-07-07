import Image from "next/image";
import erro404 from './img/erro.png'

import Link from "next/link";

export default function Pagina404(){
    return(
        <div className=" flex flex-col  w-full h-screen items-center justify-center bg-gray-600"> 
            <div className=" flex flex-col  w-full h-screen items-center justify-center ">
                <h1 className="text-white mb- -40 text-1.5xl  ">Erro 404 - Parece que você se desviou da rota</h1>

                        <Image src={erro404} alt="Erro 404" width={300} height={300} className="mt- -50" />

                        <p className="text-white mt- 400">
                            Mas não se preocupe
                        </p>
                        <p className="text-white">
                            vamos lhe ajudar a retornar!
                        </p>

                    <Link href="/" className="mt-10 bg-blue-950 text-white pt-2 pr-2 pb-2 pl-2 font-bold rounded ">Voltar</Link>
            </div>
            
        </div>
       
    )
}