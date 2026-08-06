import { useCallback, useEffect, useState } from "react";
import arduinoService from "../SIMULADOR/arduinoService";
import type { Analysis } from "../SIMULADOR/simulatorService";
import storageService from "../SIMULADOR/storageService";

export function useArduino() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [monitoring, setMonitoring] = useState(false);

  const [lastAnalysis, setLastAnalysis] = useState<Analysis | null>(
    storageService.getLastAnalysis()
  );

  const [error, setError] = useState<string | null>(null);


  const connect = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await arduinoService.connect();

      setConnected(true);
    } catch {
      setError("Não foi possível conectar ao Arduino.");
    } finally {
      setLoading(false);
    }
  }, []);

  

  const disconnect = useCallback(() => {
    arduinoService.disconnect();

    setConnected(false);
    setMonitoring(false);
  }, []);

 

  const detectOnce = useCallback(
    (fixedLocation = true) => {
      try {
        const analysis = arduinoService.detectOnce(fixedLocation);

        storageService.saveAnalysis(analysis);

        setLastAnalysis(analysis);

        return analysis;
      } catch {
        setError("Arduino desconectado.");

        return null;
      }
    },
    []
  );


  const startMonitoring = useCallback(
    (interval = 5000, fixedLocation = true) => {
      try {
        setMonitoring(true);

        arduinoService.startMonitoring(
          (analysis) => {
            storageService.saveAnalysis(analysis);

            setLastAnalysis(analysis);
          },
          interval,
          fixedLocation
        );
      } catch {
        setMonitoring(false);

        setError("Não foi possível iniciar o monitoramento.");
      }
    },
    []
  );


  const stopMonitoring = useCallback(() => {
    arduinoService.stopMonitoring();

    setMonitoring(false);
  }, []);

  useEffect(() => {
    return () => {
      arduinoService.stopMonitoring();
    };
  }, []);

  return {
    connected,
    loading,
    monitoring,
    error,

    lastAnalysis,

    connect,
    disconnect,

    detectOnce,

    startMonitoring,
    stopMonitoring,
  };
}