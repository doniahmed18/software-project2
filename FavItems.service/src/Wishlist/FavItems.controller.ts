import { Controller, UseGuards } from '@nestjs/common';
import { FavItemsService } from './FavItems.service';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('FavItems')
export class FavItemsController {
    constructor(private FavItemsService: FavItemsService) {}

    @MessagePattern('hellofromapi')
    hello(req) {
        console.log(req);
        return this.FavItemsService.hello(req.data);
    }

    @MessagePattern('createFavItems')
    async createFavItems(command) {
        console.log(command +"from product controller");
        return this.FavItemsService.createfavItems(command);
    }

    @MessagePattern('getFavItems')
    async getFavItems(token: string) {
        try {
            console.log("Called with token:", token);
            const products = await this.FavItemsService.getfavItems(token);
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return { statusCode: 500, message: "Error fetching products" };
        }
    }
    
    @MessagePattern('editFavItems')
    async editFavItems(command) {
        console.log(command.token);
        console.log(command.body.products[0],"asasa")
        return this.FavItemsService.editfavItems(command.token, command.body.products[0]);
    }

    @MessagePattern('deleteFavItems')
    async deleteFavItems(command) {
        try {
            console.log("Called with tokaaen:", command.token);
            console.log("Called with idsdsd:", command.token);
            const result = await this.FavItemsService.updatefavItems(command.token, command.id);
            return result;
        } catch (error) {
            console.error("Error updating cart:", error);
            return { statusCode: 500, message: "Error updating cart" };
        }
    }
    

    @UseGuards(JwtAuthGuard)
    @MessagePattern('me')
    async me(command) {
        const { id, ...rest } = command.user;
        return rest;
    }
}
