import estilos from "./Detectar.module.css";

export function Detectar() {
    return (
        <div className={estilos.container}>

            <div className={estilos.card}>

                <h1>Página em Desenvolvimento</h1>

                <p>
                    Esta funcionalidade depende da conclusão da etapa física do
                    projeto, responsável pelo monitoramento dos reservatórios
                    de água por meio de um dispositivo baseado em Arduino.
                </p>

                <p>
                    O desenvolvimento desta página será iniciado após a
                    finalização do protótipo físico e da definição da forma de
                    comunicação entre o dispositivo e a aplicação web.
                </p>

                <h2>Funcionalidades previstas</h2>

                <ul>
                    <li>Recebimento dos dados enviados pelos sensores.</li>

                    <li>Comunicação entre o Arduino e o sistema.</li>

                    <li>Visualização das detecções em tempo real.</li>

                    <li>Monitoramento dos reservatórios cadastrados.</li>

                    <li>Registro do histórico de detecções.</li>

                    <li>Geração de alertas quando houver anomalias.</li>

                    <li>Atualização automática das informações do sistema.</li>
                </ul>

                <div className={estilos.aviso}>

                    <h3>Aviso</h3>

                    <p>
                        Como a comunicação entre o hardware e a aplicação ainda
                        não foi definida, esta página permanecerá em
                        desenvolvimento até que sejam estabelecidos o método de
                        integração, o protocolo de comunicação e o envio dos
                        dados para a aplicação.
                    </p>

                </div>

            </div>

        </div>
    );
}