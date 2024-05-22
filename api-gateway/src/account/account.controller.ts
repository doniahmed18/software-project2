import { Controller, Request,Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { ClientKafka } from '@nestjs/microservices';
// bdefine tl api / btae3 el account
@Controller('account') // /account
export class AccountController implements OnModuleInit {

    constructor(private accountServices:AccountService,
        @Inject('ACC_SERVICE') private readonly accountClient:ClientKafka){}
   

    @Get('hello') // /account/hello
    getHello():any{
        return this.accountServices.hello();
    }

    @Post('sign-up')
    async register(@Request() req) {
        console.log(req.body.body); // Log the request body
        return this.accountServices.register({ body: req.body }); // Pass the entire request body to the register method
    }
    @Post('confirmsign-up')
    async confirmregister(@Request() req) {
        console.log(req.body.body); // Log the request body
        return this.accountServices.confirmregister({ body: req.body }); // Pass the entire request body to the register method
    }

    @Post('sign-in') // /account/sign-in
    async login(@Request()req){
        console.log(req.body); // Log the request body
        return this.accountServices.login({body:req.body});
    }

    @Post('forget-password') // /account/forget-password
    async forgetpassword(@Request()req){
        console.log(req.body); // Log the request body
        return this.accountServices.forgetpassword({body:req.body});
    }
    @Post('change-password') // /account/forget-password
    async changepassword(@Request()req){
        console.log(req.body); // Log the request body
        return this.accountServices.changepassword({body:req.body});
    }
    @Get('getuserbyid/:id')
    async getuserbyid(@Request()req){
        console.log(req.params.id); // Log the request body
        return this.accountServices.getuserbyid(req.params.id);
    }


    onModuleInit() {
        this.accountClient.subscribeToResponseOf('hellofromapi'); // subscribe to the event
        this.accountClient.subscribeToResponseOf('register'); // subscribe to the event
        this.accountClient.subscribeToResponseOf('forgetpassword'); // subscribe to the event
        this.accountClient.subscribeToResponseOf('changepassword'); // subscribe to the event
        this.accountClient.subscribeToResponseOf('login'); // subscribe to the event
        this.accountClient.subscribeToResponseOf('confirmregister'); // subscribe to the event
        this.accountClient.subscribeToResponseOf('getuserbyid'); // subscribe to the event

    }

}
