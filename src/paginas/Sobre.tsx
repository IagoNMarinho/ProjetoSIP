import estilos from './Sobre.module.css'
import login from '../assets/imagens/logo.png'
import ReiArthur from '../assets/imagens/ReiArthur.jpeg'
import FotoIago from '../assets/imagens/FotoIago.jpeg'

export function Sobre() {
    return (
        <main className={estilos.conteiner}>
            <section className={estilos.sobresip}>
                <div className={estilos.textosobresip}>
                    <span>PROJETO SIP</span>

                        <h1>O que é 
                        e o que fazemos?</h1>

                        <p>
                            Um sistema criado por alunos 
                            da ETEC de Hortolândia,
                            a fim de garantir um 
                            consumo seguro da água escolar!
                        </p>
                        <button>
                            Saiba mais
                        </button>
                         </div>
                    <div className={estilos.imagemlogo}>
                    <img src={login} alt="Logo SIP"
                    className={estilos.logosip} />
                </div>

            </section>
            <section className={estilos.servicos}>
                <h2>Serviços SIP</h2>

                <div className={estilos.boxs}>
                    <article className={estilos.box}>
                        <h3>Detecção</h3>

                        <p>Através do ítem físico
                          você pode monitorar a agua 
                         ou consultar os resultados do
                          monitoramento de sua escola!</p>
                    </article>
                    <article className={estilos.box}>
                        <h3>Consulta</h3>

                        <p>Através do ítem físico
                          você pode monitorar a agua 
                         ou consultar os resultados do
                          monitoramento de sua escola!</p>
                    </article>
                    <article className={estilos.box}>
                        <h3>Informação</h3>

                        <p>Através do ítem físico
                          você pode monitorar a agua 
                         ou consultar os resultados do
                          monitoramento de sua escola!</p>
                    </article>
                </div>
            </section>
            <section className={estilos.equipe}>
                <h2>NOSSA EQUIPE</h2>

                <p className={estilos.subtitulo}>
                    Conheça os estudantes responsáveis 
                    pelo projeto SIP.
                </p>

                <div className={estilos.membros}>
                     <article className={estilos.membro}>
                        <div className={estilos.foto}>
                            
                            <img
                                src={ReiArthur}
                                alt="Arthur"
                            />

                        </div>

                            <div className={estilos.info}>
                                <h3>Arthur Soares</h3>

                                <span>Estudante - Desenvolvedor de Sistemas</span>

                                <p>Tenho 17 anos e sou estudante do curso técnico 
                                    de Desenvolvimento de Sistemas integrado ao 
                                    Ensino Médio na ETEC de Hortolândia. Busco 
                                    contribuir com planejamento, organização e 
                                    criatividade em todos os projetos dos quais 
                                    participo, desenvolvendo elementos gráficos 
                                    autorais e priorizando a qualidade em cada etapa 
                                    do processo. Estou em constante aprendizado, 
                                    aprimorando minhas habilidades para enfrentar 
                                    os desafios e oportunidades do mercado 
                                    profissional.</p>
                            </div>
                    </article>
                               <article className={estilos.membro}>
                        <div className={estilos.foto}>
                            
                            <img
                            src={FotoIago} alt= "Iago"/>

                        </div>

                            <div className={estilos.info}>
                                <h3>Iago Marinho</h3>

                                <span>Estudante - Desenvolvedor de Sistemas</span>

                                <p>Jovem de 18 anos, cursando Técnico
                                 em Desenvolvimento de Sistemas integrado 
                                 ao Ensino Médio na instituição de ensino 
                                 Etec Hortolândia. Valorizo as experiências 
                                 e aprendizados adquiridos ao longo da minha 
                                 trajetória, buscando evoluir continuamente, 
                                 aprimorar minhas competências e estar 
                                 preparado para futuras oportunidades profissionais.</p>
                            </div>
                     </article>
                </div>
            </section>
        </main>
    )
}