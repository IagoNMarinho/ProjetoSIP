import { useEffect, useState } from "react";
import { useArduino } from "../componentes/SIMULADOR/useArduino";
import styles from "./Detectar.module.css";

export default function Detectar() {

    const {

        connected,
        loading,
        monitoring,

        lastAnalysis,

        connect,
        disconnect,

        detectOnce,

        startMonitoring,
        stopMonitoring

    } = useArduino();

    const [fixedLocation, setFixedLocation] = useState(true);

    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {

        const timer = setInterval(() => {

            const now = new Date();

            setCurrentTime(
                now.toLocaleString("pt-BR")
            );

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const handleConnect = async () => {
        await connect();
    };

    const handleDisconnect = () => {
        disconnect();
    };

    const handleDetection = () => {
        detectOnce(fixedLocation);
    };

    const handleStartMonitoring = () => {
        startMonitoring(5000, fixedLocation);
    };

    const handleStopMonitoring = () => {
        stopMonitoring();
    };


    return (

        <div className={styles.container}>

            <h1 className={styles.title}>
                Detectar Qualidade da Água
            </h1>

            <div className={styles.statusBar}>

                <span>

                    Arduino:

                    {connected
                        ? " 🟢 Conectado"
                        : " 🔴 Desconectado"}

                </span>

                <span>
                    {currentTime}
                </span>

            </div>

            <div className={styles.buttons}>

                <button
                    onClick={handleConnect}
                    disabled={connected || loading}
                >
                    Conectar
                </button>

                <button
                    onClick={handleDisconnect}
                    disabled={!connected}
                >
                    Desconectar
                </button>

                <button
                    onClick={handleDetection}
                    disabled={!connected}
                >
                    Nova Detecção
                </button>

                <button
                    onClick={handleStartMonitoring}
                    disabled={!connected || monitoring}
                >
                    Iniciar Monitoramento
                </button>

                <button
                    onClick={handleStopMonitoring}
                    disabled={!monitoring}
                >
                    Parar Monitoramento
                </button>

            </div>

            <div className={styles.locationBox}>

                <label>

                    <input
                        type="checkbox"
                        checked={fixedLocation}
                        onChange={(e) =>
                            setFixedLocation(e.target.checked)
                        }
                    />
                    Local Fixo
                </label>

            </div>
                        {lastAnalysis ? (

                <>

                    <div className={styles.cards}>

                        <div className={styles.card}>
                            <h3>pH</h3>
                            <span>{lastAnalysis.sensors.ph}</span>
                        </div>

                        <div className={styles.card}>
                            <h3>Turbidez</h3>
                            <span>
                                {lastAnalysis.sensors.turbidity} NTU
                            </span>
                        </div>

                        <div className={styles.card}>
                            <h3>Temperatura</h3>
                            <span>
                                {lastAnalysis.sensors.temperature} °C
                            </span>
                        </div>

                        <div className={styles.card}>
                            <h3>TDS</h3>
                            <span>
                                {lastAnalysis.sensors.tds} ppm
                            </span>
                        </div>

                    </div>

                    <div
                        className={`${styles.statusCard} ${
                            lastAnalysis.status === "Potável"
                                ? styles.good
                                : lastAnalysis.status === "Atenção"
                                ? styles.warning
                                : styles.bad
                        }`}
                    >

                        <h2>Status da Água</h2>

                        <h1>{lastAnalysis.status}</h1>

                    </div>

                    <div className={styles.infoCard}>

                        <p>
                            <strong>Local:</strong>{" "}
                            {lastAnalysis.location}
                        </p>

                        <p>

                            <strong>Data:</strong>{" "}

                            {new Date(
                                lastAnalysis.date
                            ).toLocaleDateString("pt-BR")}

                        </p>

                        <p>

                            <strong>Hora:</strong>{" "}

                            {new Date(
                                lastAnalysis.date
                            ).toLocaleTimeString("pt-BR")}

                        </p>

                    </div>

                </>

            ) : (

                <div className={styles.empty}>

                    <h2>
                        Nenhuma análise realizada.
                    </h2>

                    <p>
                        Conecte o Arduino e faça uma detecção.
                    </p>

                </div>

            )}

        </div>

    );

}