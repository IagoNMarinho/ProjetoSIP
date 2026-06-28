import estilos from './Secao3.module.css'
import { FaCircle } from "react-icons/fa6";
import grafico from '../../assets/imagens/grafico.png'

export function Secao3() {
    return (
        <div className={estilos.conteiner}>
            <div className={estilos.analises}>
                <div className={estilos.titulo}>
                    <h2>    
                        Histórico de análises
                    </h2>
                    <button>
                        Ver todas
                    </button>
                </div>

                <div className={estilos.card}>
                    <figure>
                        <img />
                    </figure>
                    <div className={estilos.box1}>
                        <h2>Análise #001</h2>
                        <p>Reponsável: Iago Marinho</p>
                    </div>
                    <div className={estilos.box1}>
                        <p>22 de março de 2026</p>
                        <p>10h 30min</p>
                    </div>
                    <div className={estilos.box2}>
                        <button className={estilos.critico}>
                            <FaCircle/>
                            <span>Crítica</span>
                        </button>
                        <button className={estilos.detalhes}>
                            <span>Ver detalhes</span>
                        </button>
                    </div>

                </div>

                <div className={estilos.card}>
                    <figure>
                        <img />
                    </figure>
                    <div className={estilos.box1}>
                        <h2>Análise #002</h2>
                        <p>Reponsável: Iago Marinho</p>
                    </div>
                    <div className={estilos.box1}>
                        <p>24 de março de 2026</p>
                        <p>10h 30min</p>
                    </div>
                    <div className={estilos.box2}>
                        <button className={estilos.pendente}>
                            <FaCircle/>
                            <span>Pendente</span>
                        </button>
                        <button className={estilos.detalhes}>
                            <span>Ver detalhes</span>
                        </button>
                    </div>
                    
                </div>

                <div className={estilos.card}>
                    <figure>
                        <img />
                    </figure>
                    <div className={estilos.box1}>
                        <h2>Análise #003</h2>
                        <p>Reponsável: Arthur Soares</p>
                    </div>
                    <div className={estilos.box1}>
                        <p>27 de março de 2026</p>
                        <p>10h 30min</p>
                    </div>
                    <div className={estilos.box2}>
                        <button className={estilos.adequada}>
                            <FaCircle/>
                            <span>Adequada</span>
                        </button>
                        <button className={estilos.detalhes}>
                            <span>Ver detalhes</span>
                        </button>
                    </div>
                    
                </div>

            </div>
            <div className={estilos.grafico}>
                <div className={estilos.titulo}>
                    <h2>    
                        Gráfico
                    </h2>
                    <button>
                        semana ^
                    </button>
                </div>
                <img src={grafico} />
            </div>
        </div>
    )
}