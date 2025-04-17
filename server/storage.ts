import { medicines, type Medicine, type InsertMedicine } from "@shared/schema";

export interface IStorage {
  getMedicine(id: number): Promise<Medicine | undefined>;
  getMedicineByName(name: string): Promise<Medicine | undefined>;
  createMedicine(medicine: InsertMedicine): Promise<Medicine>;
}

export class MemStorage implements IStorage {
  private medicines: Map<number, Medicine>;
  private currentId: number;

  constructor() {
    this.medicines = new Map();
    this.currentId = 1;
  }

  async getMedicine(id: number): Promise<Medicine | undefined> {
    return this.medicines.get(id);
  }

  async getMedicineByName(name: string): Promise<Medicine | undefined> {
    return Array.from(this.medicines.values()).find(
      (medicine) => medicine.name.toLowerCase() === name.toLowerCase()
    );
  }

  async createMedicine(insertMedicine: InsertMedicine): Promise<Medicine> {
    const id = this.currentId++;
    const medicine: Medicine = {
      id,
      ...insertMedicine,
      imageUrl: insertMedicine.imageUrl || null
    };
    this.medicines.set(id, medicine);
    return medicine;
  }
}

export const storage = new MemStorage();