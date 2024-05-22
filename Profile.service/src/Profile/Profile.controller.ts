import { Controller, UseGuards } from '@nestjs/common';
import { ProfileService } from './Profile.service';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import mongoose from 'mongoose';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @MessagePattern('hellofromapi')
    hello(req) {
        console.log(req);
        return this.profileService.hello(req.data);
    }

    @MessagePattern('createprofile')
    async createprofile(command) {
        console.log(command +"from product controller");
        return this.profileService.createprofile(command);
    }

    @MessagePattern('getprofileById')
    async getprofile(token: string) {
        try {
             const products = await this.profileService.getprofile(token);
            return products;
        } catch (error) {
            console.error("Error fetching users:", error);
            return { statusCode: 500, message: "Error fetching products" };
        }
    }
    
    @MessagePattern('editprofile')
    async editprofile(command) {
        console.log(command);
        return this.profileService.editprofile(command.token, command.body);
    }

@MessagePattern('addpayment')
    async addpayment(command) {
        console.log("cmkakdma");
        console.log(command.data.type,command.data.name,command.data.expiry,command.data.cvv);
        console.log(command);
        return this.profileService.addpayment(command.token, command.data.type, command.data.name,command.data.expiry,command.data.cvv ,command.data.account,command.data.accounttype);
    }
    

    @UseGuards(JwtAuthGuard)
    @MessagePattern('me')
    async me(command) {
        const { id, ...rest } = command.user;
        return rest;
    }
}
