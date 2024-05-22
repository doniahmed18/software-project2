import { Controller, Request, Get, Inject, OnModuleInit,Headers, Post, Param, Delete } from '@nestjs/common';
import { ProfileService } from './Profile.service';
import { ClientKafka } from '@nestjs/microservices';
import mongoose from 'mongoose';

@Controller('profile')
export class ProfileController implements OnModuleInit {

    constructor(
        private profileService: ProfileService,
        @Inject('PROFILE_SERVICE') private readonly profileClient: ClientKafka
    ) {}

    @Get('hello')
    getHello(): any {
        return this.profileService.hello();
    }

    @Post('createprofile')
    async createprofile(@Request() req) {
        console.log(req.body.profileName +"from api gateway");
        return this.profileService.createprofile(req.body);
    }



    @Get('getprofile') 
    async getprofileById(@Headers('authorization') token: string) {
        //console.log(id); // Access the 'id' directly from the route parameters
        return this.profileService.getprofileById(token);
    }

    @Post('editprofile') 
    async editprofile(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.profileService.editprofile(token, req.body); // Pass 'id' as a parameter
    }
    @Post('addpayment')
    async addpayment(@Headers('authorization') token: string, @Request() req) {
        
        console.log("sssss",req.body.Payment);

        return this.profileService.addpayment(token, req.body.Payment); // Pass 'id' as a parameter
    }


    onModuleInit() {
        this.profileClient.subscribeToResponseOf('hellofromapi');
        this.profileClient.subscribeToResponseOf('createprofile');
        this.profileClient.subscribeToResponseOf('getprofiles');
        this.profileClient.subscribeToResponseOf('getprofileById');
        this.profileClient.subscribeToResponseOf('editprofile');
        this.profileClient.subscribeToResponseOf('addpayment');
     
    }
}
