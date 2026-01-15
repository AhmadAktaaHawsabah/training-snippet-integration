import { EventSubscriber, EntitySubscriberInterface, AfterInsert, InsertEvent, UpdateEvent, DataSource } from "typeorm";
import { Order } from "../order.entity";
import { OrderStatus } from "../eums/order-status.enum";

@EventSubscriber()
export class orderSubscriber implements EntitySubscriberInterface {

    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return Order;
    }

    beforeUpdate(event: UpdateEvent<Order>) {

        if (!event.entity || !event.databaseEntity) return;

        const previousStatus = event.databaseEntity.status;
        const currentStatus = event.entity.status;
        if (previousStatus !== OrderStatus.APPROVED && currentStatus === OrderStatus.APPROVED) {
            event.entity.approvedAt = new Date();
        }

    }

}

