import { Controller, Request, Get, Inject, OnModuleInit,Headers, Post, Param, Delete } from '@nestjs/common';
import { WishlistService } from './Wishlistservice';
import { ClientKafka } from '@nestjs/microservices';

@Controller('Wishlist')
export class WishlistController implements OnModuleInit {

    constructor(
        private wishlistService: WishlistService,
        @Inject('WISHLIST_SERVICE') private readonly WishlistClient: ClientKafka
    ) {}

    @Get('hello')
    getHello(): any {
        return this.wishlistService.hello();
    }

    @Post('createWishlist')
    async createProduct(@Request() req) {
        console.log(req.body.ProductName +"from api gateway");
        return this.wishlistService.createWishlist(req.body);
    }

    @Get('getWishlist') 
    async getWishlist(@Headers('authorization') token: string) {
       // console.log(id); // Access the 'id' directly from the route parameters
        return this.wishlistService.getWishlist(token);
    }

    @Post('editWishlist') 
    async editWishlist(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.wishlistService.editWishlist(token, req.body); // Pass 'id' as a parameter
    }
    
    // For deleteProduct endpoint
    @Delete('deleteWishlist/:id') // Define the route parameter ':id'
    async deleteWishlist(@Headers('authorization') token: string, @Request() req,@Param('id') id: string) {
        console.log(req.body);
        return this.wishlistService.deleteWishlist(token ,id); // Pass 'id' as a parameter
    }

    onModuleInit() {
        this.WishlistClient.subscribeToResponseOf('hellofromapi');
        this.WishlistClient.subscribeToResponseOf('createWishlist');
        this.WishlistClient.subscribeToResponseOf('getWishlist');
        this.WishlistClient.subscribeToResponseOf('editWishlist');
        this.WishlistClient.subscribeToResponseOf('deleteWishlist');
    }
}
