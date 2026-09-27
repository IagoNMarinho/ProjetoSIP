# Sistema Informativo da Potabilidade

## O problema

A qualidade da água em ambientes acadêmicos, especialmente em áreas rurais, nem sempre é monitorada de forma adequada, o que pode representar riscos à saúde da comunidade escolar. A ingestão de água contaminada pode aumentar a incidência de doenças como leptospirose, cólera, hepatite A e giardíase, já que os agentes infecciosos responsáveis por essas enfermidades se desenvolvem e se disseminam com facilidade em água sem tratamento adequado. Fatores como enchentes, chuvas intensas e falhas no saneamento básico agravam ainda mais esse cenário.

Diante disso, este projeto propõe um sistema de monitoramento da potabilidade da água, dividido em duas partes que conversam entre si: uma aplicação web e um dispositivo físico com sensores. A ideia é ajudar a identificar contaminações antes que se tornem um problema de saúde, dando à escola uma forma simples de acompanhar a qualidade da água que consome.

## Como o sistema é dividido

O projeto tem duas frentes de desenvolvimento:

1. **Aplicação web**, onde a comunidade escolar acompanha os dados da água em tempo real e o histórico de análises.
2. **Dispositivo físico** utilizando o modelo de ESP32-S3 juntamente com os sensores de pH, TDS (Total de Sólidos Dissolvidos), Turbidez e Temperatura, que fica de fato em contato com a água, faz as leituras e envia para a nuvem.

As duas se conectam através do back-end no Firebase, que funciona como ponte entre o hardware e a aplicação.

---

## Aplicação web

Construída em React + TypeScript, com Vite e CSS Modules para estilização.

Ao entrar na aplicação, o usuário passa por uma tela de autenticação, possibilitando acesso a página principal de detecção, onde pode:

- **Iniciar um monitoramento contínuo**, em que o dispositivo envia leituras em intervalos configuráveis, ou disparar uma **leitura imediata**, para conferir a água a qualquer momento, fora do padrão de monitoramento;
- Acompanhar um **painel de status** com os valores de PH, Turbidez, TDS e Temperatura, que muda de cor conforme o resultado: verde quando está tudo bem, amarelo em alerta, vermelho em situação crítica;
- Consultar o **histórico de análises**, com gráficos das coletas anteriores;
  
Toda coleta, sendo do monitoramento automático ou de uma leitura avulsa, é salva no Firestore, o que garante que nada se perde e que o histórico fica sempre disponível para consulta.

## Dispositivo físico (ESP32-S3)

O hardware é o que realmente entra em contato com a água. Ele é montado em torno de uma placa **ESP32-S3**, programada em C++ (Arduino), e tem como objetivo coletar os dados de qualidade da água de forma autônoma, funcionando à distância, sem precisar estar ligado a um computador, apenas com um powerbank.

Os dados são enviados ao **Firebase Realtime Database**, e o dispositivo também responde a comandos vindos da aplicação web: ao clicar em "Parar" no site, ele continua enviando um sinal de vida (informando que segue ativo e conectado), mas pausa o envio das analises, assim a aplicação sabe diferenciar um dispositivo pausado de um dispositivo desligado ou com problema de conexão.

## Back-end

O back-end do projeto é o **Firebase**, usado de duas formas complementares:

- **Realtime Database**, como canal de comunicação em tempo real entre o ESP32 e a aplicação web, é onde o dispositivo grava cada leitura de TDS e seu sinal de vida, é o local que o site vai buscar os dados assim que chegam;
- **Firestore**, como banco de dados definitivo do sistema, guarda o histórico de análises, os dados das instituições cadastradas e tudo que precisa ficar salvo para consulta posterior;
- **Firebase Authentication**, controlando o acesso à aplicação, com persistência de sessão e rotas protegidas para quem não está autenticado.
