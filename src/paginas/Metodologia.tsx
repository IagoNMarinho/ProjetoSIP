import estilos from './Metodologia.module.css'
import { useEffect, useRef } from 'react'

import { MdWaterDrop } from "react-icons/md";


export function Metodologia(){

    const onda1 = useRef<HTMLDivElement>(null) // Cria uma referência para acessar e manipular o elemento <div> da onda 1
    const onda2 = useRef<HTMLDivElement>(null) // Cria uma referência para acessar e manipular o elemento <div> da onda 2
    const onda3 = useRef<HTMLDivElement>(null) // Cria uma referência para acessar e manipular o elemento <div> da onda 3
    const onda4 = useRef<HTMLDivElement>(null) // Cria uma referência para acessar e manipular o elemento <div> da onda 4

    useEffect(() => {
        function movimentarOndas() { // Função responsável por movimentar as ondas durante a rolagem
            const rolagemPos = window.scrollY // Obtém a posição vertical da página durante a rolagem
            if(onda1.current){
                onda1.current.style.backgroundPositionX = 400 + rolagemPos * 4 + 'px'
            }
            if(onda2.current){
                onda2.current.style.backgroundPositionX = 300 + rolagemPos * -4 + 'px'
            }
            if(onda3.current){
                onda3.current.style.backgroundPositionX = 200 + rolagemPos * 2 + 'px'
            }
            if(onda4.current){
                onda4.current.style.backgroundPositionX = 100 + rolagemPos * -2 + 'px'
            }
        }
        // Adiciona o evento que detecta a rolagem da página
        window.addEventListener('scroll', movimentarOndas)
        // Remove o evento quando o componente deixar de existir 
        return () => { 
            window.removeEventListener('scroll', movimentarOndas) 
        }
    }, [])

    return(
        <main className={estilos.conteiner}>
            
            <section className={estilos.ondasBox}>
                <div className={estilos.titulo}>
                    <h1>Metodologia</h1>
                </div>
                <div ref={onda1} className={`${estilos.onda} ${estilos.onda1}`}></div>
                <div ref={onda2} className={`${estilos.onda} ${estilos.onda2}`}></div>
                <div ref={onda3} className={`${estilos.onda} ${estilos.onda3}`}></div>
                <div ref={onda4} className={`${estilos.onda} ${estilos.onda4}`}></div>
            </section>

            <section className={estilos.conteudo}>
                <h1> <MdWaterDrop /> Água</h1>
                <p>Falamos de um elemento natural, cuja falta impede a vida na Terra; de um bem universal e de direito de todos; de um elemento sem cor, sem cheiro e sem sabor, mas que pode inspirar artistas, músicos e poetas; de um meio de purificação e renovação da alma como acreditam os índios e os sacerdotes; do fluído do útero materno que germina as sementes de nossas vidas e de um bem econômico que garante o desenvolvimento e o progresso.</p>
                <p>A ONU, Organização das Nações Unidas, escolheu o período de 2018 a 2028 como a Década Internacional da Água, com o lema: “Água, fonte de Vida”. O ano de 2003 também foi um marco para o tema, sendo considerado o Ano Internacional da Água Doce. É um convite para parar e refletir sobre de que água estamos falando. Reflexo, água e reflexão se misturam, para tentarmos entender por que tanto se discute sobre o assunto.</p>
                <p>Do ponto de vista científico, a água é uma substância química formada pela união de dois átomos de hidrogênio (H) e um átomo de oxigênio (O), representada pela fórmula H₂O. Suas características físico-químicas a tornam uma das substâncias mais importantes para a existência da vida na Terra. Entre suas principais propriedades está a capacidade de atuar como solvente universal, possibilitando a dissolução e o transporte de diversas substâncias, como sais minerais, nutrientes e gases essenciais aos organismos vivos.</p>
                <p>Além de sua relevância biológica, a água desempenha papel fundamental na manutenção dos ecossistemas, na regulação climática e no desenvolvimento das atividades humanas. Ela é utilizada no abastecimento doméstico, na agricultura, na produção industrial, na geração de energia e em diversas outras aplicações indispensáveis para a sociedade. Dessa forma, a água não deve ser compreendida apenas como um recurso natural abundante, mas como um elemento estratégico para a saúde pública, o desenvolvimento econômico e a sustentabilidade ambiental.</p>
            </section>
            <section className={estilos.conteudo}>
                <h1> <MdWaterDrop /> PH</h1>
                <p>O sensor de pH é um dispositivo utilizado para medir o grau de acidez, neutralidade ou alcalinidade de uma solução aquosa. A escala de pH varia de 0 a 14, sendo que valores menores que 7 indicam soluções ácidas, iguais a 7 indicam soluções neutras e maiores que 7 representam soluções alcalinas (básicas).</p>
                <p>Seu funcionamento é baseado em um eletrodo de vidro sensível aos íons de hidrogênio (H⁺) presentes na água. Quando o eletrodo é imerso na solução, ocorre uma diferença de potencial elétrico entre o eletrodo de medição e o eletrodo de referência. Essa diferença de potencial varia de acordo com a concentração de íons H⁺ presentes na água.</p>
                <p>O circuito eletrônico do módulo amplifica esse pequeno sinal elétrico e o envia ao Arduino como uma tensão analógica. A partir desse valor, o microcontrolador realiza os cálculos necessários para determinar o pH da solução.</p>
                <p>Como a resposta do eletrodo sofre influência da temperatura e do desgaste natural do sensor, recomenda-se realizar calibrações periódicas utilizando soluções tampão de pH conhecido (geralmente pH 4,00, 7,00 e 10,00), garantindo maior precisão nas medições.</p>
                <p>Para a água destinada ao consumo humano, a legislação brasileira recomenda que o pH permaneça entre 6,0 e 9,5. Valores fora dessa faixa podem indicar alterações na qualidade da água ou comprometer processos de tratamento e distribuição.</p>
            </section>
            <section className={estilos.conteudo}>
                <h1> <MdWaterDrop /> Turbidez</h1>
                <p>O sensor de turbidez é um dispositivo utilizado para medir o grau de transparência ou opacidade de um líquido, indicando a quantidade de partículas em suspensão presentes na água, como argila, areia, sedimentos, matéria orgânica, algas e outros resíduos. Quanto maior a concentração dessas partículas, maior será a turbidez da água.</p>
                <p>Seu funcionamento é baseado em um sistema óptico, composto por um LED emissor de luz e um fototransistor receptor. O LED emite um feixe luminoso que atravessa a amostra de água. Em águas limpas, a luz atravessa o líquido com pouca dispersão e uma maior quantidade de luz alcança o receptor. Já em águas turvas, as partículas suspensas espalham e bloqueiam parte da luz (fenômeno conhecido como Efeito Tyndall), fazendo com que uma menor intensidade luminosa seja detectada pelo fototransistor.</p>
                <p>A partir da intensidade de luz recebida, o circuito eletrônico gera um sinal elétrico proporcional ao nível de turbidez. Esse sinal pode ser convertido para a unidade NTU (Nephelometric Turbidity Unit), amplamente utilizada para expressar a turbidez da água. Dessa forma, quanto maior o valor em NTU, maior é a quantidade de partículas suspensas presentes na amostra.</p>
            </section>
            <section className={estilos.conteudo}>
                <h1> <MdWaterDrop />TDS (Total de Sólidos Dissolvidos)</h1>
                <p>O sensor de TDS funciona medindo a condutividade elétrica (CE) da água por meio de dois eletrodos imersos no líquido. Quanto maior a concentração de íons dissolvidos (como sais minerais), maior será a condutividade elétrica. O circuito converte esse valor em uma estimativa da concentração de sólidos dissolvidos, exibindo o resultado em ppm (partes por milhão).</p>
                <p>Água com poucos minerais apresenta baixa condutividade e valores próximos de 0 ppm, enquanto água com maior quantidade de sais dissolvidos apresenta valores mais elevados. É importante destacar que o sensor de TDS não mede diretamente a potabilidade da água, pois não detecta microrganismos, substâncias tóxicas ou contaminantes biológicos, apenas estima a concentração de sólidos dissolvidos.</p>
            </section>
            <section className={estilos.conteudo}>
                <h1> <MdWaterDrop />Temperatura</h1>
                <p>O DS18B20 é um sensor digital utilizado para medir a temperatura de líquidos, ambientes e superfícies. Seu funcionamento é baseado em um elemento sensor interno de silício, que detecta a variação da temperatura e a converte diretamente em um valor digital. Esse valor é enviado ao microcontrolador por meio do protocolo de comunicação 1-Wire, permitindo que apenas um fio de dados seja utilizado para a transmissão das informações.</p>
                <p>O sensor possui uma faixa de medição de -55 °C a +125 °C, com margem de erro de aproximadamente ±0,5 °C, oferecendo alta precisão para aplicações de monitoramento. Além disso, cada DS18B20 possui um identificador único de 64 bits, possibilitando a conexão de vários sensores no mesmo pino digital do Arduino sem que haja conflito entre as leituras.</p>
            </section>
            <section className={estilos.conteudo}>
                <h1> <MdWaterDrop />Influência da Temperatura para os demais sensores</h1>
                <p>A temperatura exerce influência sobre diversas propriedades físicas e químicas da água, podendo afetar diretamente a precisão das medições realizadas por sensores de qualidade da água. Dessa forma, recomenda-se que o sensor de temperatura seja utilizado em conjunto com sensores de TDS, pH e turbidez, permitindo a compensação de variações térmicas e proporcionando resultados mais confiáveis.</p>
                <p>No sensor de TDS, o aumento da temperatura provoca um crescimento natural da condutividade elétrica da água. Assim, uma mesma amostra analisada a 35 °C apresenta maior condutividade do que quando medida a 20 °C, mesmo sem alteração na concentração de sólidos dissolvidos. Para minimizar esse efeito, muitos sensores empregam a Compensação Automática de Temperatura (Automatic Temperature Compensation – ATC), corrigindo os valores obtidos para uma temperatura de referência, geralmente 25 °C.</p>
                <p>De forma semelhante, a temperatura também interfere nas medições de pH. Embora não altere diretamente a concentração de íons hidrogênio presentes na solução, ela modifica a resposta eletroquímica do eletrodo de vidro utilizado pelos sensores. Além disso, o aumento da temperatura pode intensificar determinadas reações químicas presentes na água, ocasionando pequenas variações no valor do pH. Por esse motivo, sensores modernos também utilizam compensação automática de temperatura para aumentar a precisão das medições.</p>
                <p>Em relação ao sensor de turbidez, a influência da temperatura é praticamente inexistente, uma vez que seu princípio de funcionamento baseia-se na dispersão e transmissão da luz pelas partículas suspensas na água, e não em propriedades elétricas ou químicas.</p>
            </section>
        </main>
    )
}