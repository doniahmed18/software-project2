import { Controller, Request, Get, Inject, OnModuleInit,Headers, Post, Param, Delete } from '@nestjs/common';
import { OrderService } from './Order.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller('Order')
export class OrderController implements OnModuleInit {

    constructor(
        private orderService: OrderService,
        @Inject('ORDER_SERVICE') private readonly OrderClient: ClientKafka
    ) {}

    @Get('hello')
    getHello(): any {
        return this.orderService.hello();
    }

    @Post('createOrder')
    async createProduct(@Request() req) {
        console.log(req.body.ProductName +"from api gateway");
        return this.orderService.createOrder(req.body);
    }

    @Get('getOrder') 
    async getOrder(@Headers('authorization') token: string) {
     //   console.log(id); // Access the 'id' directly from the route parameters
        return this.orderService.getOrder(token);
    }


    @Post('editOrder') 
    async editOrder(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.orderService.editOrder(token, req.body); // Pass 'id' as a parameter
    }

    @Post('editrentOrder')
    async editrentOrder(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.orderService.editrentOrder(token, req.body); // Pass 'id' as a parameter
    }
    
    @Post('editcustomizeOrder')
    async editcustomizeOrder(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.orderService.editcustomizeOrder(token, req.body); // Pass 'id' as a parameter
    }
    
    // For deleteProduct endpoint
    @Delete('deleteOrder') // Define the route parameter ':id'
    async deleteOrder(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.orderService.deleteOrder(token); // Pass 'id' as a parameter
    }

    onModuleInit() {
        this.OrderClient.subscribeToResponseOf('hellofromapi');
        this.OrderClient.subscribeToResponseOf('createOrder');
        this.OrderClient.subscribeToResponseOf('getOrder');
        this.OrderClient.subscribeToResponseOf('editOrder');
        this.OrderClient.subscribeToResponseOf('editrentOrder');
        this.OrderClient.subscribeToResponseOf('editcustomizeOrder');
        this.OrderClient.subscribeToResponseOf('deleteOrder');
    }
}
