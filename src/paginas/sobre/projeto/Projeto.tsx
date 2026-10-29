
import { useState } from 'react'
import estilos from './Projeto.module.css'

import baiacuImg from '../../../assets/imagens/baiacu.png'
import contaminaraImg from '../../../assets/imagens/contaminara.png'
import aguatoImg from '../../../assets/imagens/aguato-mascote-removebg-preview.png'
const mascotes = [
    {
        nome: 'Aguato',
        categoria: 'Estado adequado',
        imagem: aguatoImg,
        cor: 'seguro',
        descricao:
            'O protagonista do SIP! Inspirado pelo carinho da dupla por gatos, Aguato representa o monitoramento constante, a atenção e o cuidado com a qualidade da água.',
        personalidade: 'Calmo, gentil, empático e observador.',
    },
    {
        nome: 'Baiácu',
        categoria: 'Estado de atenção',
        imagem: baiacuImg,
        cor: 'atencao',
        descricao:
            'Nosso baiacu surgiu em 2025, ainda na fase de pré-TCC. Ele representa a atenção necessária quando algum parâmetro monitorado apresenta uma alteração.',
        personalidade: 'Medroso às vezes, mas mais forte do que imagina.',
    },
    {
        nome: 'Contaminara',
        categoria: 'Estado crítico',
        imagem: contaminaraImg,
        cor: 'critico',
        descricao:
            'A vilã do trio! Essa criatura metamórfica representa os riscos associados à contaminação da água e a importância de identificar possíveis alterações.',
        personalidade: 'Misteriosa, teimosa e sempre irritada com Aguato.',
    },
]

const secoes = [
    {
        id: 'problema',
        numero: '01',
        titulo: 'O problema',
        destaque: 'Informação que faz falta.',
        paragrafos: [
            'A qualidade da água consumida no ambiente escolar é uma preocupação relacionada à saúde e ao bem-estar dos alunos e dos demais profissionais da instituição. Quando não há um acompanhamento adequado, alterações na qualidade da água podem passar despercebidas, expondo as pessoas a possíveis riscos à saúde.',
            'Um dos principais problemas é a falta de acesso a informações atualizadas e confiáveis sobre as condições da água disponível para consumo. A ausência de meios acessíveis de consulta dificulta a identificação de possíveis alterações e pode fazer com que os estudantes continuem consumindo água sem saber que ela apresenta algum problema.',
            'Além disso, a comunicação de alertas nem sempre alcança todos os alunos de maneira eficaz. Mesmo quando há orientações para evitar o consumo, parte da comunidade escolar pode não receber a informação a tempo.',
            'Dessa forma, o SIP busca enfrentar a dificuldade de acompanhar a qualidade da água escolar e de acessar informações claras sobre suas condições de consumo.',
        ],
    },
    {
        id: 'solucao',
        numero: '02',
        titulo: 'A solução',
        destaque: 'Água + tecnologia.',
        paragrafos: [
            'Para enfrentar esse problema, o SIP propõe um sistema de monitoramento da qualidade da água, integrado a uma plataforma web e mobile e a um dispositivo físico. O equipamento utiliza sensores para coletar informações sobre parâmetros como pH, turbidez, TDS (sólidos totais dissolvidos) e temperatura.',
            'Os dados coletados são apresentados de forma clara e acessível na plataforma, permitindo que alunos, funcionários e responsáveis pela instituição consultem as informações sobre a água monitorada.',
            'A proposta também busca tornar o monitoramento mais acessível por meio de uma solução portátil, interativa e de baixo custo, facilitando sua utilização no ambiente escolar.',
            'Assim, o SIP pretende facilitar o acesso a informações sobre a qualidade da água e auxiliar na identificação de possíveis alterações.',
        ],
    },
    {
        id: 'funcionamento',
        numero: '03',
        titulo: 'Como funciona?',
        destaque: 'Do sensor até a informação.',
        paragrafos: [
            'O SIP integra um dispositivo físico e uma plataforma digital para coletar, armazenar e apresentar informações sobre a qualidade da água.',
            'O dispositivo possui quatro sensores conectados a um ESP32-S3, responsável pela comunicação com a internet. Essa conexão permite transmitir os dados sem depender de cabos fixos, tornando o equipamento portátil. Os parâmetros monitorados são pH, temperatura, turbidez e TDS.',
            'As informações são armazenadas no Firebase, utilizado para guardar os dados do sensor, os registros de usuários e as instituições cadastradas. Esses dados são disponibilizados na plataforma, desenvolvida com React e TypeScript (TSX), com recursos de autenticação, gráficos e visualização das medições.',
            'O sistema compara os dados recebidos com parâmetros previamente estabelecidos e classifica os resultados nos estados adequado, atenção ou crítico. Os usuários que habilitaram as notificações podem receber alertas sobre as condições identificadas.',
        ],
    },
    {
        id: 'identidade',
        numero: '04',
        titulo: 'Identidade visual',
        destaque: 'Uma identidade que tem personalidade.',
        paragrafos: [
            'A identidade visual do SIP tem como base os tons de azul, escolhidos por sua relação com a água. O verde, o amarelo e o vermelho complementam a paleta, representando os estados adequado, atenção e crítico, respectivamente.',
            'A ideia é tornar a interpretação dos estados mais intuitiva, de maneira semelhante a um semáforo. Mas o grande diferencial está nos três mascotes: Aguato, Baiácu e Contaminara.',
            'Criados por Arthur Soares, responsável pelo character design do projeto, os personagens ajudam a aproximar a plataforma da comunidade escolar e tornam a experiência mais leve e interessante.',
        ],
    },
    {
        id: 'beneficios',
        numero: '05',
        titulo: 'Benefícios',
        destaque: 'Mais acesso, mais informação.',
        paragrafos: [
            'O SIP busca tornar o acompanhamento da qualidade da água no ambiente escolar mais acessível, reunindo tecnologia, informação e praticidade em uma única solução.',
            'Os dados organizados em gráficos e indicadores facilitam a consulta das informações. As notificações também podem ajudar a comunidade escolar a tomar conhecimento de situações que mereçam atenção com mais rapidez.',
            'A portabilidade do sensor permite utilizá-lo em diferentes locais, enquanto a plataforma centraliza informações e facilita a consulta dos registros.',
            'Com indicadores visuais, cores e mascotes, o SIP também busca incentivar o interesse dos estudantes pelo monitoramento da água e contribuir para uma comunidade escolar mais informada.',
        ],
    },
]

export function Projeto() {
    const [mascoteAtual, setMascoteAtual] = useState(0)

    const mascote = mascotes[mascoteAtual]

    function mostrarAnterior() {
        setMascoteAtual((atual) =>
            atual === 0 ? mascotes.length - 1 : atual - 1
        )
    }

    function mostrarProximo() {
        setMascoteAtual((atual) =>
            atual === mascotes.length - 1 ? 0 : atual + 1
        )
    }

    return (
        <main className={estilos.paginaProjeto}>
            <div
                className={estilos.decoracaoFundo}
                aria-hidden="true"
            />

            <header className={estilos.hero}>
                <span className={estilos.etiqueta}>
                    <span className={estilos.pontoAgua} />
                    CONHEÇA O UNIVERSO SIP
                </span>

                <div className={estilos.titulo}>
                    <h1>CONHEÇA O</h1>
                    <h1>
                        NOSSO <span>PROJETO</span>
                    </h1>
                </div>

                <p className={estilos.subtituloHero}>
                    Água, tecnologia e criatividade trabalhando juntas
                    por uma comunidade escolar mais informada.
                </p>

                <a className={estilos.botaoHero} href="#origem">
                    Descubra o SIP
                    <span aria-hidden="true">↓</span>
                </a>

                <div
                    className={estilos.ondaDecorativa}
                    aria-hidden="true"
                >
                    <span />
                    <span />
                    <span />
                </div>
            </header>

            <div className={estilos.conteudoProjeto}>
                <section
                    id="origem"
                    className={`${estilos.secao} ${estilos.secaoOrigem}`}
                >
                    <div className={estilos.cabecalhoSecao}>
                        <span className={estilos.miniEtiqueta}>
                            COMO TUDO COMEÇOU
                        </span>

                        <h2>Origem</h2>

                        <p>
                            Toda história tem um começo, não é mesmo?
                            E com o SIP não foi diferente...
                        </p>
                    </div>

                    <div className={estilos.caixaTexto}>
                        <p>
                            O SIP nasceu de um projeto acadêmico
                            interdisciplinar, desenvolvido no 2º ano do
                            Ensino Médio da ETEC de Hortolândia, integrado
                            ao curso de Desenvolvimento de Sistemas e
                            apelidado de "Mini TCC".
                        </p>

                        <p>
                            Nesse contexto, a dupla responsável pelo projeto,
                            Arthur Soares e Iago Marinho, optou por trabalhar
                            com uma temática relacionada à água, pois
                            observamos que era um assunto pouco explorado
                            em conjunto com a tecnologia.
                        </p>

                        <div className={estilos.perguntaDestaque}>
                            <span aria-hidden="true">💡</span>

                            <h3>
                                Como seria um projeto de TCC que juntasse
                                ÁGUA + TECNOLOGIA?
                            </h3>
                        </div>

                        <p>
                            Diante desse cenário, observamos relatos de
                            estudantes que sentiam certo incômodo ao consumir
                            a água da escola. Essas preocupações surgiram
                            tanto no Ensino Médio quanto em experiências
                            anteriores, durante o Ensino Fundamental.
                        </p>

                        <p>
                            Além disso, lemos uma notícia na internet que
                            relatava a detecção de urina em um reservatório
                            de água. Com isso, refletimos sobre a falta de
                            meios confiáveis, constantes e acessíveis para
                            consultar a qualidade da água consumida no
                            ambiente escolar.
                        </p>

                        <p>
                            Essa reflexão ganhou ainda mais força em 2026,
                            quando, no primeiro semestre, Hortolândia,
                            cidade onde fica a ETEC, enfrentou um episódio
                            de contaminação. Embora a escola tenha orientado,
                            por meio de comunicados virtuais, que os alunos
                            não consumissem a água, a informação não chegou
                            de forma eficaz a todos.
                        </p>

                        <p>
                            Os alunos que consumiram a água relataram um
                            odor desagradável, e alguns disseram ter sentido
                            um leve mal-estar após o consumo.
                        </p>

                        <div className={estilos.notaDestaque}>
                            <h3>Assim nasce o SIP.</h3>

                            <p>
                                Embora a ideia já estivesse sendo
                                desenvolvida antes do episódio de
                                contaminação, o ocorrido reforçou a
                                importância de melhorar o acesso a
                                informações sobre a qualidade da água escolar.
                            </p>
                        </div>
                    </div>
                </section>

                {secoes.map((secao) => (
                    <section
                        key={secao.id}
                        id={secao.id}
                        className={estilos.secao}
                    >
                        <div className={estilos.cabecalhoSecao}>
                            <span className={estilos.miniEtiqueta}>
                                {secao.numero} / O UNIVERSO SIP
                            </span>

                            <h2>{secao.titulo}</h2>

                            <p>{secao.destaque}</p>
                        </div>

                        <div className={estilos.caixaTexto}>
                            {secao.paragrafos.map((paragrafo, indice) => (
                                <p key={`${secao.id}-${indice}`}>
                                    {paragrafo}
                                </p>
                            ))}
                        </div>

                        {secao.id === 'identidade' && (
                            <div className={estilos.paletaCores}>
                                <div className={estilos.corAzul}>
                                    <span />
                                    <p>Azul</p>
                                    <small>Identidade SIP</small>
                                </div>

                                <div className={estilos.corVerde}>
                                    <span />
                                    <p>Verde</p>
                                    <small>Adequado</small>
                                </div>

                                <div className={estilos.corAmarela}>
                                    <span />
                                    <p>Amarelo</p>
                                    <small>Atenção</small>
                                </div>

                                <div className={estilos.corVermelha}>
                                    <span />
                                    <p>Vermelho</p>
                                    <small>Crítico</small>
                                </div>
                            </div>
                        )}

                        {secao.id === 'identidade' && (
                            <div className={estilos.areaMascotes}>
                                <div className={estilos.cabecalhoMascotes}>
                                    <span className={estilos.miniEtiqueta}>
                                        CONHEÇA A TURMINHA
                                    </span>

                                    <h3>
                                        Três personagens, um universo!
                                    </h3>

                                    <p>
                                        Cada mascote tem sua própria
                                        personalidade e seu papel na
                                        identidade do SIP.
                                    </p>
                                </div>

                                <div
                                    className={estilos.carrossel}
                                    aria-label="Carrossel dos mascotes do SIP"
                                >
                                    <button
                                        type="button"
                                        className={estilos.setaCarrossel}
                                        onClick={mostrarAnterior}
                                        aria-label="Mostrar mascote anterior"
                                    >
                                        ‹
                                    </button>

                                    <article
                                        className={estilos.cardMascote}
                                        data-status={mascote.cor}
                                        aria-live="polite"
                                    >
                                        <div
                                            className={
                                                estilos.ilustracaoMascote
                                            }
                                        >
                                            <img
                                                src={mascote.imagem}
                                                alt={`Ilustração do mascote ${mascote.nome}`}
                                                loading="lazy"
                                            />
                                        </div>

                                        <span
                                            className={
                                                estilos.etiquetaMascote
                                            }
                                        >
                                            {mascote.categoria}
                                        </span>

                                        <h4>{mascote.nome}</h4>

                                        <p>{mascote.descricao}</p>

                                        <div
                                            className={
                                                estilos.personalidadeMascote
                                            }
                                        >
                                            <span>Personalidade</span>

                                            <p>{mascote.personalidade}</p>
                                        </div>
                                    </article>

                                    <button
                                        type="button"
                                        className={estilos.setaCarrossel}
                                        onClick={mostrarProximo}
                                        aria-label="Mostrar próximo mascote"
                                    >
                                        ›
                                    </button>
                                </div>

                                <div
                                    className={estilos.indicadoresCarrossel}
                                    aria-label="Selecionar mascote"
                                >
                                    {mascotes.map((item, indice) => (
                                        <button
                                            key={item.nome}
                                            type="button"
                                            className={
                                                indice === mascoteAtual
                                                    ? estilos.indicadorAtivo
                                                    : estilos.indicador
                                            }
                                            onClick={() =>
                                                setMascoteAtual(indice)
                                            }
                                            aria-label={`Mostrar ${item.nome}`}
                                            aria-pressed={
                                                indice === mascoteAtual
                                            }
                                        />
                                    ))}
                                </div>

                                <p className={estilos.creditoMascotes}>
                                    Character design por Arthur Soares.
                                </p>
                            </div>
                        )}
                    </section>
                ))}

                <section
                    id="desenvolvedores"
                    className={`${estilos.secao} ${estilos.secaoDesenvolvedores}`}
                >
                    <div className={estilos.cabecalhoSecao}>
                        <span className={estilos.miniEtiqueta}>
                            A DUPLA POR TRÁS DO PROJETO
                        </span>

                        <h2>Quem está por trás do SIP?</h2>

                        <p>
                            Dois carinhas, muitas ideias e um projeto
                            construído com dedicação!
                        </p>
                    </div>

                    <div className={estilos.gradeDesenvolvedores}>
                        <article className={estilos.cardDesenvolvedor}>
                            <div
                                className={estilos.avatarDesenvolvedor}
                                aria-hidden="true"
                            >
                                AS
                            </div>

                            <span className={estilos.cargoDesenvolvedor}>
                                Estudante · Desenvolvedor de Sistemas
                            </span>

                            <h3>Arthur Soares</h3>

                            <p>
                                Tenho 17 anos e sou estudante do curso técnico
                                de Desenvolvimento de Sistemas integrado ao
                                Ensino Médio na ETEC de Hortolândia. Busco
                                contribuir com planejamento, organização e
                                criatividade em todos os projetos dos quais
                                participo, desenvolvendo elementos gráficos
                                autorais e priorizando a qualidade em cada
                                etapa do processo. Estou em constante
                                aprendizado, aprimorando minhas habilidades
                                para enfrentar os desafios e oportunidades
                                do mercado profissional.
                            </p>
                        </article>

                        <article className={estilos.cardDesenvolvedor}>
                            <div
                                className={estilos.avatarDesenvolvedor}
                                aria-hidden="true"
                            >
                                IM
                            </div>

                            <span className={estilos.cargoDesenvolvedor}>
                                Estudante · Desenvolvedor de Sistemas
                            </span>

                            <h3>Iago Marinho</h3>

                            <p>
                                Jovem de 18 anos, cursando Técnico em
                                Desenvolvimento de Sistemas integrado ao
                                Ensino Médio na instituição de ensino Etec
                                Hortolândia. Valorizo as experiências e
                                aprendizados adquiridos ao longo da minha
                                trajetória, buscando evoluir continuamente,
                                aprimorar minhas competências e estar
                                preparado para futuras oportunidades
                                profissionais.
                            </p>
                        </article>
                    </div>

                    <div className={estilos.mensagemFinal}>
                        <span aria-hidden="true">💧</span>

                        <h3>Esse é o universo SIP!</h3>

                        <p>
                            Tecnologia, criatividade e informação reunidas
                            em um projeto feito para a comunidade escolar.
                        </p>
                    </div>
                </section>
            </div>

            <footer className={estilos.rodapeProjeto}>
                <span className={estilos.marcaRodape}>SIP</span>

                <p>
                    Monitoramento, informação e cuidado com a água.
                </p>
            </footer>
        </main>
    )
}
