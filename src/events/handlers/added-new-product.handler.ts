import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AddedNewProductEvent } from "../impl/added-new-product.event";
// import { PrismaService } from "src/shared/services/prisma.service";

@EventsHandler(AddedNewProductEvent)
export class AddedNewProductEventHandler implements IEventHandler<AddedNewProductEvent> {
  constructor() {}

  public handle(event: AddedNewProductEvent) {
    console.log(`Handling AddedNewProductEvent for productId: ${event.productInventory.productId}`);
    // const { productId, productName, initialQuantity } = event;

    // try {
    //   const result = await this.prismaService.productInventoryProjection.create({
    //     data: {
    //       productId,
    //       productName,
    //       quantity: initialQuantity,
    //       reserved: 0,
    //       available: initialQuantity,
    //     },
    //   });
    //   console.log(`Added new product event handled for productId: ${result.productId}`);
    // } catch (error) {
    //   console.error(`Failed to handle AddedNewProductEvent for productId ${productId}:`, error);
    // }
  }
}