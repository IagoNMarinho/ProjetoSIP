import estilos from './Suporte.module.css'

interface ModalMensagemProps {
    exibir: boolean
    ocultar: () => void
}

export function Suporte({exibir, ocultar}: ModalMensagemProps){

    if(exibir){
        return(
        <div className={estilos.fundo}>
            <div className={estilos.conteiner}>
                <p className={estilos.titulo}>
                    Suporte
                </p>

                <div className={estilos.conteinerMensagem}>
                    <p className={estilos.mensagem}>
                        Como podemo te ajudar?
                    </p>
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