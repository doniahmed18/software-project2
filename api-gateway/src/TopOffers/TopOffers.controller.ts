import { Controller, Request, Get, Inject, OnModuleInit, Post,Headers, Param, Delete } from '@nestjs/common';
import { TopOffersService } from './TopOffers.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller('topOffers')
export class TopOffersController implements OnModuleInit {

    constructor(
        private topOffersService: TopOffersService,
        @Inject('TOPOFFERS_SERVICE') private readonly topOffersClient: ClientKafka
    ) {}

    @Get('hello')
    getHello(): any {
        return this.topOffersService.hello();
    }

    @Post('createTopOffers')
    async createTopOffers(@Request() req) {
        console.log(req.body.TopOffersName +"from api gateway");
        return this.topOffersService.createTopOffers(req.body);
    }

    @Get('getTopOffers')
    async getTopOfferss(@Headers('authorization') token: string) {
        console.log(this.topOffersService.getTopOffers(token) +"from api gateway m");
        return this.topOffersService.getTopOffers(token);
    }

    @Get('getTopOffers/:id') 
    async getTopOffersById(@Param('id') id: string ,@Headers('authorization') token: string) {
        console.log(id); 
        console.log(token);
        return this.topOffersService.getTopOffersById(id ,token);
    }
    @Get('getGuestTopOffers')
    async getGuestTopOfferss() {
       // console.log(this.TopOffersService.getTopOfferss(token) +"from api gateway m");
        return this.topOffersService.getGuestTopOffers();
    }
    @Get('getGuestCategoryTopOffers/:id')
    async getGuestCategoryTopOfferss(@Param('id') id: string) {
       // console.log(this.TopOffersService.getTopOfferss(token) +"from api gateway m");
        return this.topOffersService.getGuestCategoryTopOffers(id);
    }
    @Get('getCategoryTopOffers/:id')
    async getCategoryTopOfferss(@Headers('authorization') token: string,@Param('id') id: string) {
       // console.log(this.TopOffersService.getTopOfferss(token) +"from api gateway m");
        return this.topOffersService.getCategoryTopOffers(token,id);
    }

    @Get('getGuestTopOffers/:id') 
    async getGuestTopOffersById(@Param('id') id: string) {
        console.log(id); 
        return this.topOffersService.getGuestTopOffersById(id );
    }


    @Post('editTopOffers/:id') 
    async editTopOffers( @Param('id') id: string,@Headers('authorization') token: string , @Request() req) {
        console.log(req.body);
        return this.topOffersService.editTopOffers(id ,token, req.body); // Pass 'id' as a parameter
    }
    
    // For deleteTopOffers endpoint
    @Delete('deleteTopOffers/:id') // Define the route parameter ':id'
    async deleteTopOffers (@Param('id') id: string, @Headers('authorization') token: string  , @Request() req) {
        console.log(req.body);
        return this.topOffersService.deleteTopOffers(id ,token); // Pass 'id' as a parameter
    }


    onModuleInit() {
        this.topOffersClient.subscribeToResponseOf('hellofromapi');
        this.topOffersClient.subscribeToResponseOf('createTopOffers');
        this.topOffersClient.subscribeToResponseOf('getTopOffers');
        this.topOffersClient.subscribeToResponseOf('getTopOffersById');
        this.topOffersClient.subscribeToResponseOf('editTopOffers');
        this.topOffersClient.subscribeToResponseOf('deleteTopOffers');
        this.topOffersClient.subscribeToResponseOf('getGuestTopOffersById');
        this.topOffersClient.subscribeToResponseOf('getGuestTopOffers');
        this.topOffersClient.subscribeToResponseOf('getGuestCategoryTopOffers');
        this.topOffersClient.subscribeToResponseOf('getCategoryTopOffers');
    }
}
