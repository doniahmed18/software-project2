import { Controller,Request, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { MessagePattern } from '@nestjs/microservices';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { ExistsAuthGuard } from './strategies/exists-auth.guard';

@Controller('identity')
export class IdentityController {
    constructor(private identityService : IdentityService){}

    @MessagePattern('hellofromapi')
    hello(req){
        console.log(req);
       return this.identityService.hello(req.data)
    }

   
    @MessagePattern('register')
    async register(command){
        console.log(command);
        console.log(command.body.Email);
        const email = command.body.Email;
        const password = command.body.password;
        const firstName = command.body.First_Name;
        const lastName = command.body.Last_Name;
        const phoneNumber = command.body.Phone_Number;
        const address = command.body.Address;
        const company = command.body.Company;
        const username = command.body.username;
console.log(command.body.password)
        return this.identityService.register(email, password, firstName, lastName, phoneNumber, address, company, username);
    }
    @MessagePattern('confirmregister')
    async confirmregister(command){
        console.log(command);
        console.log(command.body.Email);
        const email = command.body.Email;
        const password = command.body.Password;
        const firstName = command.body.First_Name;
        const lastName = command.body.Last_Name;
        const phoneNumber = command.body.Phone_Number;
        const address = command.body.Address;
        const company = command.body.Company;
        const username = command.body.username;

        return this.identityService.confirmregister(command.body);
    }

    @MessagePattern('forgetpassword')
    async forgetpassword(command){
        console.log(command.body);
        console.log('command user: ', command.body.email);
        return this.identityService.resetPassword(command.body.email);
    }
    
    @MessagePattern('changepassword')
    async changepassword(command){
        console.log("called");
        console.log(command.body);
        console.log('command user: ', command.body.email);
        return this.identityService.changepassword(command.body.email, command.body.password);
    }
    
    @MessagePattern('login')
    async login(command){
        console.log('command user: ', command.body);
        return this.identityService.login(command.body);
    }
    @MessagePattern('getuserbyid')
    async getuserbyid(command){
        console.log(command);
        return this.identityService.getuserbyid(command);
    }
    @UseGuards(JwtAuthGuard)
    @MessagePattern('me')
    async me(command){
        const {id , ...rest} =command.user;
        return rest;
    }

    

}
