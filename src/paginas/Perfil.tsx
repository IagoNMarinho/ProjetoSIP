import estilos from "./Perfil.module.css";

export function Perfil() {
  return (
    <div className={estilos.container}>

      <div className={estilos.banner}>
        <h1>Perfil do Usuário</h1>
        <p>Em breve disponível no SIP</p>
      </div>

      <div className={estilos.content}>

        <div className={estilos.card}>

          <h2> Página em Desenvolvimento</h2>

          <p>
            O sistema de perfis estará disponível em breve no <strong>SIP</strong>.
            Nesta página, cada usuário poderá acompanhar informações
            relacionadas à sua conta, ao seu histórico de utilização e aos
            recursos disponíveis na plataforma.
          </p>

          <p>
            O objetivo é oferecer um ambiente personalizado para facilitar o
            monitoramento das atividades e das informações cadastradas no
            sistema.
          </p>

        </div>

        <div className={estilos.card}>

          <h2> Integração com API</h2>

          <p>
            Esta funcionalidade será integrada a uma API responsável pela
            comunicação entre o sistema e o banco de dados.
          </p>

          <p>
            A API permitirá salvar, atualizar e recuperar as informações de
            cada usuário de forma segura, garantindo que todos os dados
            permaneçam sincronizados entre diferentes dispositivos.
          </p>

          <p>
            Além disso, ela possibilitará a autenticação de usuários,
            gerenciamento de permissões e armazenamento do histórico de uso da
            plataforma.
          </p>

        </div>

        <div className={estilos.card}>

          <h2>🏫 Perfis Institucionais</h2>

          <p>
            Para escolas, instituições ou profissionais responsáveis pela
            manutenção, o perfil apresentará um painel completo contendo:
          </p>

          <ul>

            <li> Quantidade total de detecções realizadas;</li>

            <li> Número de reservatórios cadastrados;</li>

            <li> Status de cada dispositivo (Ativo ou Inativo);</li>

            <li> Estatísticas gerais do sistema;</li>

            <li> Histórico de monitoramento;</li>

            <li> Registro de ocorrências e alertas emitidos.</li>

          </ul>

        </div>

        <div className={estilos.card}>

          <h2> Objetivo</h2>

          <p>
            O perfil reunirá todas as informações importantes em um único
            ambiente, permitindo uma visualização rápida dos dados e auxiliando
            no acompanhamento do funcionamento do sistema de monitoramento dos
            reservatórios de água.
          </p>

          <span className={estilos.status}>
            Disponível em breve.
          </span>

        </div>

      </div>

    </div>
  );
}