import type { Analysis } from "../SIMULADOR/simulatorService"

const STORAGE_KEY = "water-monitor-history"

class StorageService {

  getHistory(): Analysis[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    try {
      return JSON.parse(data) as Analysis[];
    } catch {
      return [];
    }
  }

 
  saveAnalysis(analysis: Analysis): void {
    const history = this.getHistory();

    history.unshift(analysis);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(history)
    );
  }

  
  saveMany(analyses: Analysis[]): void {
    const history = this.getHistory();

    history.unshift(...analyses);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(history)
    );
  }


  updateAnalysis(updated: Analysis): void {
    const history = this.getHistory();

    const index = history.findIndex(
      item => item.id === updated.id
    );

    if (index !== -1) {
      history[index] = updated;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
      );
    }
  }


  deleteAnalysis(id: string): void {
    const history = this.getHistory().filter(
      item => item.id !== id
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(history)
    );
  }

  getById(id: string): Analysis | undefined {
    return this.getHistory().find(
      item => item.id === id
    );
  }

 
  getByStatus(status: Analysis["status"]): Analysis[] {
    return this.getHistory().filter(
      item => item.status === status
    );
  }


  getByLocation(location: string): Analysis[] {
    return this.getHistory().filter(
      item =>
        item.location
          .toLowerCase()
          .includes(location.toLowerCase())
    );
  }


  getByDateRange(start: Date, end: Date): Analysis[] {
    return this.getHistory().filter(item => {
      const date = new Date(item.date);

      return date >= start && date <= end;
    });
  }


  getLastAnalysis(): Analysis | null {
    const history = this.getHistory();

    return history.length > 0
      ? history[0]
      : null;
  }


  count(): number {
    return this.getHistory().length;
  }

  getStatistics() { //função para captar a quantidade de analises
    const history = this.getHistory();
    return {
      total: history.length,
      potavel: history.filter(
          item => item.status === "Potável"
      ).length,
      atencao: history.filter(
          item => item.status === "Atenção"
      ).length,
      critica: history.filter(
          item => item.status === "Crítica"
      ).length
    };
  }

  clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}

const storageService = new StorageService();

export default storageService;