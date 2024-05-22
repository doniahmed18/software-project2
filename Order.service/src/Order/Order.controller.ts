import { Controller, UseGuards } from '@nestjs/common';
import { OrderService } from './Order.service';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @MessagePattern('hellofromapi')
    hello(req) {
        console.log(req);
        return this.orderService.hello(req.data);
    }

    @MessagePattern('createOrder')
    async createOrder(command) {
        console.log(command +"from product controller");
        return this.orderService.createOrder(command);
    }

    @MessagePattern('getOrder')
    async getOrder(command: string) {

        try {
           // const [userID, token] = command.split(','); // Assuming the data is in the format "id,token"
           // console.log("Called with UserID:", userID);
            const products = await this.orderService.getOrder(command);
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return { statusCode: 500, message: "Error fetching products" };
        }
    }
    


    @MessagePattern('editOrder')
    async editOrder(command) {
        console.log(command);
        console.log("token"+ command.token);
        const quantity = command.body.products[1];
        const id = command.body.products[0];
        const type = command.body.products[2];
        return this.orderService.editOrder(command.token, id,quantity,type);
    }
    
    @MessagePattern('editrentOrder')
    async editrentOrder(command) {
        console.log(command);
        console.log("token"+ command.token);
        const startdate = command.body.products[1];
        const id = command.body.products[0];
        const enddate = command.body.products[2];
        const type = command.body.products[3];
        return this.orderService.editrentOrder(command.token, id,startdate,enddate,type);
    }
    @MessagePattern('editcustomizeOrder')
    async editcustomizeOrder(command) {
        console.log(command);
        console.log("token"+ command.token);
        const color = command.body.products[1];
        const id = command.body.products[0];
        const material = command.body.products[2];
        const height = command.body.products[3];
        const width = command.body.products[4];
        const type = command.body.products[5];
        const quantity = command.body.products[6];
        return this.orderService.editcustomizeOrder(command.token, id,color,material,height,width,type,quantity);
    }

    @MessagePattern('deleteOrder')
    async deleteOrder(token: string) {
        try {
           // console.log("Called with UserID:", userID);
            const result = await this.orderService.updateOrder(token, { ProductIDs: [] });
            return result;
        } catch (error) {
            console.error("Error updating Order:", error);
            return { statusCode: 500, message: "Error updating Order" };
        }
    }
    

    @UseGuards(JwtAuthGuard)
    @MessagePattern('me')
    async me(command) {
        const { id, ...rest } = command.user;
        return rest;
    }
}
