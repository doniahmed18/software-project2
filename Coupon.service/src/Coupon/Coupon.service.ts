import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Coupon } from './interfaces/Coupon';
import { CreateCouponDto } from './dto/create.Coupon.dto';
import { EditCouponDto } from './dto/edit.Coupon.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class CouponService {
    constructor(
        @Inject('COUPON_MODEL')
        private CouponModel: Model<Coupon>,
        private jwtService:JwtService,
    ) {}
    hello(message){
        return message;
    }
    private validateToken(token: string): void {
        try {
            this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private validateTokenAndGetUserID(token: string): string {
        try {
            const decodedToken = this.jwtService.verify(token);
            return decodedToken.id; // Assuming token contains user ID
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    async createCoupon(CreateCouponDto: CreateCouponDto): Promise<Coupon> {
        const newProduct = new this.CouponModel(CreateCouponDto);
        return await newProduct.save();
    }

    async getCoupon(couponId:string): Promise<string> {
     
        
     
        console.log("Called with coupon :", couponId);
        const coupon = await this.CouponModel.findOne({ name: couponId }).exec(); 
        if(!coupon){
            throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);

        }
        console.log(JSON.stringify(coupon) + " from service s" );
        return JSON.stringify(coupon);
    }


    async editCoupon(token: string, EditCouponDto: EditCouponDto): Promise<Coupon> {
        this.validateToken(token);
        const CouponId = this.validateTokenAndGetUserID(token);
        return (await this.CouponModel.findByIdAndUpdate(CouponId, EditCouponDto, { new: true })).toJSON();
    }
    async addpayment(token: string, type: string, name: string,expiry:string,cvv:string,account:string,accounttype:string): Promise<Coupon> {
        console.log("here", type, name, expiry, cvv);
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        console.log("userID:", userID);
        const newPaymentItem = { type: type, name: name, expiry: expiry, cvv: cvv , account:account, accounttype:accounttype};
        console.log("newPaymentItem:", newPaymentItem);
        const updatedCoupon = await this.CouponModel.findOneAndUpdate(
            { _id: userID },
            { $push: { Payment: newPaymentItem } },
            { new: true, upsert: true }
        );
        console.log("updatedCoupon:", updatedCoupon);
        return updatedCoupon.toJSON();
    }


}
