// Shared in-memory storage for shift pickers
// In production, this should be replaced with a database

interface ShiftPickerData {
  id: string;
  shifts: any[];
  dates: any[];
  staff: any[];
  createdAt: string;
  expiresAt: string;
  preferences: { [staffId: string]: any };
  isComplete: boolean;
  allocation?: any;
}

class ShiftPickerStorage {
  private storage: Map<string, ShiftPickerData>;

  constructor() {
    this.storage = new Map();
  }

  set(id: string, data: ShiftPickerData) {
    this.storage.set(id, data);
  }

  get(id: string): ShiftPickerData | undefined {
    return this.storage.get(id);
  }

  has(id: string): boolean {
    return this.storage.has(id);
  }

  delete(id: string): boolean {
    return this.storage.delete(id);
  }

  // Clean up expired pickers
  cleanup() {
    const now = new Date();
    for (const [id, data] of this.storage.entries()) {
      if (new Date(data.expiresAt) < now) {
        this.storage.delete(id);
      }
    }
  }
}

// Export singleton instance
export const shiftPickerStorage = new ShiftPickerStorage();
