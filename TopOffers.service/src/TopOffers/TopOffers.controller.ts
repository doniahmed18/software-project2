import { Controller, UseGuards } from '@nestjs/common';
import { TopOffersService } from './TopOffers.service';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('TopOffers')
export class TopOffersController {
    constructor(private topOffersService: TopOffersService) {}

    @MessagePattern('hellofromapi')
    hello(req) {
        console.log(req);
        return this.topOffersService.hello(req.data);
    }

    @MessagePattern('createTopOffers')
    async createTopOffers(command) {
        console.log(command +"from TopOffers controller");
        return this.topOffersService.createTopOffers(command);
    }
    
    @MessagePattern('getGuestTopOffers')
    async getGuestTopOffers() {
        try {
            const TopOffers = await this.topOffersService.getGuestTopOffers();
            return TopOffers;
        } catch (error) {
            console.error("Error fetching TopOffers:", error);
            return { statusCode: 500, message: "Error fetching TopOffers" };
        }
    }
    @MessagePattern('getGuestCategoryTopOffers')
    async getGuestCategoryTopOffers(categoryName : string) {
        try {
            console.log("called with categoryName " + categoryName);
            const TopOffers = await this.topOffersService.getGuestCategoryTopOffers(categoryName);
            return TopOffers;
        } catch (error) {
            console.error("Error fetching TopOffers:", error);
            return { statusCode: 500, message: "Error fetching TopOffers" };
        }
    }
    @MessagePattern('getCategoryTopOffers')
    async getCategoryTopOffers(command:any) {
        try {
            const [categoryName, token] = command.split(','); // Assuming the data is in the format "categoryName,token"
            console.log("called with token " + token);
            const TopOffers = await this.topOffersService.getCategoryTopOffers(token,categoryName);
            return TopOffers;
        } catch (error) {
            console.error("Error fetching TopOfferss:", error);
            return { statusCode: 500, message: "Error fetching TopOfferss" };
        }
    }
    

    @MessagePattern('getGuestTopOffersById')
    async getGuestTopOffersById(command) {

        return this.topOffersService.getGuestTopOffersById(command);
    }

    @MessagePattern('getTopOffers')
    async getTopOffers(token :string) {
        try {
            console.log("called with token " + token);
            const TopOffers = await this.topOffersService.getTopOffers(token);
            return TopOffers;
        } catch (error) {
            console.error("Error fetching TopOffers:", error);
            return { statusCode: 500, message: "Error fetching TopOffers" };
        }
    }
    

    @MessagePattern('getTopOffersById')
    async getTopOffersById(command) {
        const [id, token] = command.split(','); // Assuming the data is in the format "id,token"
        console.log("UserID:", id);
        console.log("Token:", token);
        return this.topOffersService.getTopOffersById(id , token);
    }

    @MessagePattern('editTopOffers')
    async editTopOffers(command) {
        const [id, token] = command.datad.split(','); // Assuming the data is in the format "id,token"
        console.log("UserID:", id);
        console.log("Token:", token);
        console.log(command);
        return this.topOffersService.editTopOffers(id, token , command.body);
    }

    @MessagePattern('deleteTopOffers')
    async deleteTopOffers(command) {
        const [id, token] = command.split(','); // Assuming the data is in the format "id,token"
        console.log("UserID:", id);
        console.log("Token:", token);
        console.log(command);
        return this.topOffersService.deleteTopOffers(id , token);
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern('me')
    async me(command) {
        const { id, ...rest } = command.user;
        return rest;
    }
}
