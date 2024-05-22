import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Profile } from './interfaces/Profile';
import { CreateProfileDto } from './dto/create.Profile.dto';
import { EditProfileDto } from './dto/edit.Profile.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ProfileService {
    constructor(
        @Inject('PROFILE_MODEL')
        private profileModel: Model<Profile>,
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
    async createprofile(CreateProfileDto: CreateProfileDto): Promise<Profile> {
        const newProduct = new this.profileModel(CreateProfileDto);
        return await newProduct.save();
    }

    async getprofile(token:string): Promise<string> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        console.log("Called with :", token);
        const user = await this.profileModel.findById( userID ).exec(); 
        
        console.log(JSON.stringify(user) + " from service s" );
        return JSON.stringify(user);
    }


    async editprofile(token: string, EditProfileDto: EditProfileDto): Promise<Profile> {
        this.validateToken(token);
        const profileId = this.validateTokenAndGetUserID(token);
        return (await this.profileModel.findByIdAndUpdate(profileId, EditProfileDto, { new: true })).toJSON();
    }
    async addpayment(token: string, type: string, name: string,expiry:string,cvv:string,account:string,accounttype:string): Promise<Profile> {
        console.log("here", type, name, expiry, cvv);
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        console.log("userID:", userID);
        const newPaymentItem = { type: type, name: name, expiry: expiry, cvv: cvv , account:account, accounttype:accounttype};
        console.log("newPaymentItem:", newPaymentItem);
        const updatedProfile = await this.profileModel.findOneAndUpdate(
            { _id: userID },
            { $push: { Payment: newPaymentItem } },
            { new: true, upsert: true }
        );
        console.log("updatedProfile:", updatedProfile);
        return updatedProfile.toJSON();
    }


}
