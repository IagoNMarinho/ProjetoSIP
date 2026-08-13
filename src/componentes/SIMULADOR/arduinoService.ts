import simulatorService from "../SIMULADOR/simulatorService";
import type { Analysis } from "../SIMULADOR/simulatorService";

class ArduinoService {
  async connect(): Promise<boolean> {
    return simulatorService.connect();
  }

  disconnect(): void {
    simulatorService.disconnect();
  }

  isConnected(): boolean {
    return simulatorService.isConnected();
  }

  detectOnce(fixedLocation: boolean = true): Analysis {
    return simulatorService.generateReading(fixedLocation);
  }

  startMonitoring(
    callback: (analysis: Analysis) => void,
    interval: number = 5000,
    fixedLocation: boolean = true,
  ): void {
    simulatorService.startMonitoring(callback, interval, fixedLocation);
  }

  stopMonitoring(): void {
    simulatorService.stopMonitoring();
  }
}

const arduinoService = new ArduinoService();

export default arduinoService;

export type { Analysis };
