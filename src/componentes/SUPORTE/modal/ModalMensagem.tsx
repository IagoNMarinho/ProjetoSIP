import estilos from './ModalMensagem.module.css'

interface ModalMensagemProps {
    exibir: boolean
    titulo: string
    texto: string
    foto?: string
    ocultar: () => void
}

export function ModalMensagem({exibir, ocultar, titulo, texto, foto}: ModalMensagemProps){
    if(exibir){
        return(
        <div className={estilos.fundo}>
            <div className={estilos.conteiner}>
                <p className={estilos.titulo}>{titulo}</p>

                {foto && (
                    <img
                        src={foto}
                        alt="Foto do usuário"
                        width={100}
                    />
                )} 

                <div className={estilos.conteinerMensagem}>
                    <p className={estilos.mensagem}>{texto}</p>
                </div>

                <button 
                    className={estilos.botao}
                    onClick={ocultar}
                    >
                        Fechar
                </button>

            </div>
        </div>
        )
    }
}