import { Controller, Request, Get, Inject, OnModuleInit,Headers, Post, Param, Delete } from '@nestjs/common';
import { CouponService } from './Coupon.service';
import { ClientKafka } from '@nestjs/microservices';
import mongoose from 'mongoose';

@Controller('coupon')
export class CouponController implements OnModuleInit {

    constructor(
        private CouponService: CouponService,
        @Inject('COUPON_SERVICE') private readonly CouponClient: ClientKafka
    ) {}

    @Get('hello')
    getHello(): any {
        return this.CouponService.hello();
    }

    @Post('createCoupon')
    async createCoupon(@Request() req) {
        console.log(req.body.CouponName +"from api gateway");
        return this.CouponService.createCoupon(req.body);
    }



    @Get('getCoupon/:id') 
    async getCouponById(@Param('id') couponId: string){
        //console.log(id); // Access the 'id' directly from the route parameters
        return this.CouponService.getCouponById(couponId);
    }

    @Post('editCoupon') 
    async editCoupon(@Headers('authorization') token: string, @Request() req) {
        console.log(req.body);
        return this.CouponService.editCoupon(token, req.body); // Pass 'id' as a parameter
    }
    @Post('addpayment')
    async addpayment(@Headers('authorization') token: string, @Request() req) {
        
        console.log("sssss",req.body.Payment);

        return this.CouponService.addpayment(token, req.body.Payment); // Pass 'id' as a parameter
    }


    onModuleInit() {
        this.CouponClient.subscribeToResponseOf('hellofromapi');
        this.CouponClient.subscribeToResponseOf('createCoupon');
        this.CouponClient.subscribeToResponseOf('getCoupons');
        this.CouponClient.subscribeToResponseOf('getCouponById');
        this.CouponClient.subscribeToResponseOf('editCoupon');
        this.CouponClient.subscribeToResponseOf('addpayment');
     
    }
}
