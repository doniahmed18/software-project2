import { Controller, UseGuards } from '@nestjs/common';
import { CouponService } from './Coupon.service';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import mongoose from 'mongoose';

@Controller('Coupon')
export class CouponController {
    constructor(private CouponService: CouponService) {}

    @MessagePattern('hellofromapi')
    hello(req) {
        console.log(req);
        return this.CouponService.hello(req.data);
    }

    @MessagePattern('createCoupon')
    async createCoupon(command) {
        console.log(command +"from product controller");
        return this.CouponService.createCoupon(command);
    }

    @MessagePattern('getCouponById')
    async getCoupon(command) {
        try {

             const products = await this.CouponService.getCoupon(command.couponId);
            return products;
        } catch (error) {
            console.error("Error fetching users:", error);
            return { statusCode: 500, message: "Error fetching products" };
        }
    }
    
    @MessagePattern('editCoupon')
    async editCoupon(command) {
        console.log(command);
        return this.CouponService.editCoupon(command.token, command.body);
    }

@MessagePattern('addpayment')
    async addpayment(command) {
        console.log("cmkakdma");
        console.log(command.data.type,command.data.name,command.data.expiry,command.data.cvv);
        console.log(command);
        return this.CouponService.addpayment(command.token, command.data.type, command.data.name,command.data.expiry,command.data.cvv ,command.data.account,command.data.accounttype);
    }
    

    @UseGuards(JwtAuthGuard)
    @MessagePattern('me')
    async me(command) {
        const { id, ...rest } = command.user;
        return rest;
    }
}
