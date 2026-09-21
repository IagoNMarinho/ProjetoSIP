/*com esse arquivo torna-se possível reutilizar o mesmo modal para qualquer confirmação. Basta mudar o título, o texto e a função que 
será executada ao confirmar, sem precisar criar um modal diferente para cada botão. Isso deixa o componente muito mais flexível e organizado */

import estilos from './Confirmar.module.css'

interface ModalMensagemProps {
    exibir: boolean
    ocultar: () => void
    titulo: string
    texto: string
    aoConfirmar: () => void
}

export function Confirmar({exibir, ocultar, titulo, texto, aoConfirmar}: ModalMensagemProps){

    if(exibir){
        return(
        <div className={estilos.fundo}>
            <div className={estilos.conteiner}>
                <p className={estilos.titulo}>
                    {titulo}
                </p>

                <div className={estilos.conteinerMensagem}>
                    <p className={estilos.mensagem}>
                        {texto}
                    </p>
                </div>

                <div className={estilos.alinhamento}>    
                    <button 
                        className={estilos.botao}
                        onClick={ocultar}
                        >
                            Cancelar
                    </button>
                    
                    <button 
                        className={estilos.botaoConfirmar}
                        onClick={aoConfirmar}
                        >
                            Confirmar
                    </button>
                </div>

            </div>
        </div>
        )
    }
}