import { Controller, Request, Get, Inject, OnModuleInit,Headers, Post, Param, Delete } from '@nestjs/common';
import { FavItemsService } from './FavItemsservice';
import { ClientKafka } from '@nestjs/microservices';

@Controller('FavItems')
export class FavItemsController implements OnModuleInit {

    constructor(
        private favItemsService: FavItemsService,
        @Inject('FAVITEMS_SERVICE') private readonly FavItemsClient: ClientKafka
    ) {}

    @Get('hello')
    getHello(): any {
        return this.favItemsService.hello();
    }

    @Post('createFavItems')
    async createProduct(@Request() req) {
        console.log(req.body.ProductName +"from api gateway");
        return this.favItemsService.createFavItems(req.body);
    }

    @Get('getFavItems') 
    async getFavItems(@Headers('authorization') token: string) {
       // console.log(id); // Access the 'id' directly from the route parameters
        return this.favItemsService.getFavItems(token);
    }

    @Post('editFavItems') 
    async editFavItems(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.favItemsService.editFavItems(token, req.body); // Pass 'id' as a parameter
    }
    
    // For deleteProduct endpoint
    @Delete('deleteFavItems/:id') // Define the route parameter ':id'
    async deleteFavItems(@Headers('authorization') token: string, @Request() req,@Param('id') id: string) {
        console.log(req.body);
        return this.favItemsService.deleteFavItems(token ,id); // Pass 'id' as a parameter
    }

    onModuleInit() {
        this.FavItemsClient.subscribeToResponseOf('hellofromapi');
        this.FavItemsClient.subscribeToResponseOf('createFavItems');
        this.FavItemsClient.subscribeToResponseOf('getFavItems');
        this.FavItemsClient.subscribeToResponseOf('editFavItems');
        this.FavItemsClient.subscribeToResponseOf('deleteFavItems');
    }
}
