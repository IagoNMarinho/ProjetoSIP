

export interface SensorData {
  ph: number;
  turbidity: number;
  temperature: number;
  tds: number;
}

export interface Analysis {
  id: string;
  date: string;
  location: string;
  fixedLocation: boolean;
  sensors: SensorData;
  status: "Potável" | "Atenção" | "Imprópria";
}

class SimulatorService {
  private connected = false;
  private interval: ReturnType<typeof setInterval> | null = null;

  private locations = [
    "Caixa d'Água Principal",
    "Refeitório",
    "Laboratório",
    "Bloco A",
    "Bloco B",
    "Reservatório Externo",
  ];

  async connect(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = true;
        resolve(true);
      }, 1500);
    });
  }

  disconnect() {
    this.connected = false;

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }


  isConnected() {
    return this.connected;
  }

  
  private random(min: number, max: number) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
  }



  private generateGoodValues(): SensorData {
    return {
      ph: this.random(6.8, 8.2),
      turbidity: this.random(0, 4),
      temperature: this.random(20, 29),
      tds: this.random(120, 450),
    };
  }


  private generateBadValues(): SensorData {
    const type = Math.floor(Math.random() * 4);

    switch (type) {
      case 0:
        return {
          ph: this.random(4.5, 5.8),
          turbidity: this.random(1, 4),
          temperature: this.random(20, 28),
          tds: this.random(150, 300),
        };

      case 1:
        return {
          ph: this.random(6.8, 8),
          turbidity: this.random(8, 18),
          temperature: this.random(22, 28),
          tds: this.random(180, 350),
        };

      case 2:
        return {
          ph: this.random(6.5, 8),
          turbidity: this.random(0, 4),
          temperature: this.random(33, 40),
          tds: this.random(200, 400),
        };

      default:
        return {
          ph: this.random(6.5, 8),
          turbidity: this.random(0, 4),
          temperature: this.random(22, 28),
          tds: this.random(650, 1000),
        };
    }
  }

  private getStatus(sensor: SensorData): Analysis["status"] {
    const problems = [
      sensor.ph < 6 || sensor.ph > 9,
      sensor.turbidity > 5,
      sensor.temperature > 30,
      sensor.tds > 500,
    ].filter(Boolean).length;

    if (problems === 0) return "Potável";

    if (problems === 1) return "Atenção";

    return "Imprópria";
  }

  generateReading(fixedLocation = true): Analysis {
    if (!this.connected) {
      throw new Error("Arduino não conectado.");
    }

    const good = Math.random() < 0.7;

    const sensors = good
      ? this.generateGoodValues()
      : this.generateBadValues();

    return {
      id: crypto.randomUUID(),

      date: new Date().toISOString(),

      fixedLocation,

      location: fixedLocation
        ? "Caixa d'Água Principal"
        : this.locations[Math.floor(Math.random() * this.locations.length)],

      sensors,

      status: this.getStatus(sensors),
    };
  }

  startMonitoring(
    callback: (analysis: Analysis) => void,
    interval = 5000,
    fixedLocation = true
  ) {
    if (!this.connected) {
      throw new Error("Arduino não conectado.");
    }

    this.stopMonitoring();

    callback(this.generateReading(fixedLocation));

    this.interval = setInterval(() => {
      callback(this.generateReading(fixedLocation));
    }, interval);
  }

  stopMonitoring() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

const simulatorService = new SimulatorService();

export default simulatorService;