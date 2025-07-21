import { AggregateRoot } from '@nestjs/cqrs';

interface ProductInventoryState {
  productId: string;
  productName: string
  quantity: number;
  reserved: number;
  available: number;
}

interface InventoryEvent {
  id?: string
  aggregateId: string
  type: string
  payload: any;
  version: number;
  createdAt: Date;
}

export class ProductInventory extends AggregateRoot {
  private state: ProductInventoryState;
  private currentVersion: number;

  constructor(private readonly initialVersion: number = 0) {
    super();
    this.currentVersion = initialVersion;
  }

   static createNew(productId: string, productName: string, initialQuantity: number = 0): ProductInventory {
    const aggregate = new ProductInventory(0);
    
    // // สร้าง Event เริ่มต้น
    // const payload: ProductInventoryCreatedEvent = { productId, productName, initialQuantity };
    // aggregate.applyEvent(
    //   { type: 'ProductInventoryCreated', payload, version: 1 }, // Event แรกเวอร์ชัน 1
    //   true // เป็น Event ใหม่
    // );
    
    // // ตั้งค่าสถานะเริ่มต้น (จากการ Apply Event แรก)
    // // การสร้าง state ตรงนี้หลังจาก applyEvent เพื่อให้ state ถูก initialize ตาม Event แรก
    // aggregate.state = {
    //   productId: productId,
    //   productName: productName,
    //   quantity: initialQuantity,
    //   reserved: 0,
    //   available: initialQuantity,
    //   version: 1, // หลัง apply Event แรก
    // };

    return aggregate;
  }
}