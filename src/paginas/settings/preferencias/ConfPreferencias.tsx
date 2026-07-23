import estilos from "./ConfPreferencias.module.css"

import { useState } from "react"

export function ConfPreferencias() {
    const [tema, setTema] = useState('sistema')
    const [daltonismo, setDaltonismo] = useState('sem filtro')
    const [libras, setLibras] = useState('sem filtro')

    const [notificacoes, setNotificacoes] = useState({
        alertas: true,
        analises: true,
        gole: true,
        email: false,
    });

    function alterarNotificacao(
        campo: keyof typeof notificacoes
    ) {
        setNotificacoes((anterior) => ({
        ...anterior,
        [campo]: !anterior[campo],
        }));
    }

    function salvarPreferencias() {
        console.log({
        tema,
        daltonismo,
        libras,
        notificacoes,
    });

    }

    return (
        <main className={estilos.conteiner}>
        <section className={estilos.intro}>
            <h2 className={estilos.titulo}>Preferências</h2>

            <p>
            Altere ou visualize as configurações referentes à aparência,
            notificações e acessibilidade da plataforma SIP.
            </p>
        </section>

        <section className={estilos.sessao}>
            <h2 className={estilos.titulo}>Aparência</h2>

            <div className={estilos.campo}>
            <label>Tema</label>

            <select
                className={estilos.input}
                value={tema}
                onChange={(e) => setTema(e.target.value)}
            >
                <option value="claro">Claro</option>
                <option value="escuro">Escuro</option>
                <option value="contraste">Alto contraste</option>
                <option value="sistema">Sistema</option>
            </select>
            </div>
        </section>

        <section className={estilos.sessao}>
            <h2 className={estilos.titulo}>Notificações</h2>

            <div className={estilos.checkbox}>
            <label>
                <input
                type="checkbox"
                checked={notificacoes.alertas}
                onChange={() => alterarNotificacao("alertas")}
                />
                Receber alertas de contaminação
            </label>

            <label>
                <input
                type="checkbox"
                checked={notificacoes.analises}
                onChange={() => alterarNotificacao("analises")}
                />
                Receber notificações de novas análises
            </label>

            <label>
                <input
                type="checkbox"
                checked={notificacoes.gole}
                onChange={() => alterarNotificacao("gole")}
                />
                Receber lembretes do GOLE+
            </label>

            <label>
                <input
                type="checkbox"
                checked={notificacoes.email}
                onChange={() => alterarNotificacao("email")}
                />
                Receber e-mails do sistema
            </label>
            </div>
        </section>

        <section className={estilos.sessao}>
            <h2 className={estilos.titulo}>Acessibilidade</h2>
            <div className={estilos.campo}>
            <label>Filtro de daltonismo:</label>

                <select
                    className={estilos.input}
                    value={daltonismo}
                    onChange={(e) => setDaltonismo(e.target.value)}
                >
                    <option value='semfiltro'>sem filtro</option>
                    <option value='Protanopia'>Protanopia</option>
                    <option value="Deuteranopia">Deuteranopia</option>
                    <option value="Tritanopia">Tritanopia</option>
                    <option value="Protanomalia">Protanomalia</option>
                    <option value="deuteranomalia">Deuteranomalia</option>
                    <option value="acromatopsia">Acromatopsia</option>
                </select>

            </div>

            <div className={estilos.campo}>
            <label>Auxílio de libras:</label>

                <select
                    className={estilos.input}
                    value={libras}
                    onChange={(e) => setLibras(e.target.value)}
                >
                    <option value='sem'>Sem auxílio</option>
                    <option value='com'>Com auxílio</option>
                </select>

            </div>
            
        </section>

        <div className={estilos.botoes}>
            <button
                className={estilos.botao}
                onClick={salvarPreferencias}
            >
                Salvar preferências
            </button>
        </div>
        </main>
    );
}