import { Controller, Request, Get, Inject, OnModuleInit, Post,Headers, Param, Delete } from '@nestjs/common';
import { CartService } from './Cart.service';
import { ClientKafka } from '@nestjs/microservices';


@Controller('cart')
export class CartController implements OnModuleInit {

    constructor(
        private cartService: CartService,
        @Inject('CART_SERVICE') private readonly cartClient: ClientKafka
    ) {}

    @Get('hello')
    getHello(): any {
        return this.cartService.hello();
    }

    @Post('createCart')
    async createProduct(@Request() req) {
        console.log(req.body.ProductName +"from api gateway");
        return this.cartService.createCart(req.body);
    }

    @Get('getCart') 
    async getCart( @Headers('authorization') token: string) {
        console.log("from controller t" + token)
       // console.log(id); // Access the 'id' directly from the route parameters
        return this.cartService.getCart( token);
    }
    

    @Post('editCart') 
    async editCart(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.cartService.editCart(token, req.body); // Pass 'id' as a parameter
    }

    @Post('editrentCart')
    async editrentCart(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.cartService.editrentCart(token, req.body); // Pass 'id' as a parameter
    }
    
    @Post('editcustomizeCart')
    async editcustomizeCart(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.cartService.editcustomizeCart(token, req.body); // Pass 'id' as a parameter
    }
    // For deleteProduct endpoint
    @Delete('deleteCart/:id') // Define the route parameter ':id'
    async deleteCart(@Headers('authorization') token: string, @Request() req, @Param('id') id: string){
        console.log(req.body);
        return this.cartService.deleteCart(token ,id); // Pass 'id' as a parameter
    }

    onModuleInit() {
        this.cartClient.subscribeToResponseOf('hellofromapi');
        this.cartClient.subscribeToResponseOf('createCart');
        this.cartClient.subscribeToResponseOf('getCart');
        this.cartClient.subscribeToResponseOf('editCart');
        this.cartClient.subscribeToResponseOf('deleteCart');
        this.cartClient.subscribeToResponseOf('editrentCart');
        this.cartClient.subscribeToResponseOf('editcustomizeCart');
    }
}
