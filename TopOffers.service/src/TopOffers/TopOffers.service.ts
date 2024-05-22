import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { TopOffers } from './interfaces/TopOffers';
import { CreateTopOffersDto } from './dto/create.TopOffers.dto';
import { EditTopOffersDto } from './dto/edit.TopOffers.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TopOffersService {
    constructor(
        @Inject('TOPOFFERS_MODEL')
        private topOffersModel: Model<TopOffers>,
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
    async createTopOffers(CreateTopOffersDto: CreateTopOffersDto): Promise<TopOffers> {
        const newTopOffers = new this.topOffersModel(CreateTopOffersDto);
        return await newTopOffers.save();
    }
    async getGuestTopOffers( ): Promise<string> {

        const TopOffers = await this.topOffersModel.find().exec();
        const serializedTopOffers = TopOffers.map(TopOffers => TopOffers.toJSON());
        console.log(JSON.stringify(serializedTopOffers) + " from service s" );
        return JSON.stringify(serializedTopOffers);
    
    }
    async getGuestCategoryTopOffers(categoryName : string): Promise<string> {
        const TopOffers = await this.topOffersModel.find({TopOffersCategory : categoryName}).exec();
        const serializedTopOffers = TopOffers.map(TopOffers => TopOffers.toJSON());
        console.log(JSON.stringify(serializedTopOffers) + " from service s" );
        return JSON.stringify(serializedTopOffers);
    }
    async getCategoryTopOffers(token :string,categoryName:string): Promise<string> {
        this.validateToken(token);
        const TopOffers = await this.topOffersModel.find({TopOffersCategory : categoryName}).exec();
        const serializedTopOffers = TopOffers.map(TopOffers => TopOffers.toJSON());
        console.log(JSON.stringify(serializedTopOffers) + " from service s" );
        return JSON.stringify(serializedTopOffers);
    }
    
    async getGuestTopOffersById(TopOffersId: string ): Promise<TopOffers> {
        console.log(TopOffersId);
        console.log("ss");

        return (await this.topOffersModel.findById(TopOffersId).exec()).toJSON();
    }

    async getTopOffers( token : string): Promise<string> {
        this.validateToken(token);
        const TopOffers = await this.topOffersModel.find().exec();
        const serializedTopOffers = TopOffers.map(TopOffers => TopOffers.toJSON());
        console.log(JSON.stringify(serializedTopOffers) + " from service s" );
        return JSON.stringify(serializedTopOffers);
    }
    async getTopOffersById(TopOffersId: string ,token : string): Promise<TopOffers> {
        console.log(TopOffersId);
        console.log("ss");
        console.log(token);
        this.validateToken(token);
        return (await this.topOffersModel.findById(TopOffersId).exec()).toJSON();
    }
    async editTopOffers(TopOffersId: string, token : string , EditTopOffersDto: EditTopOffersDto): Promise<TopOffers> {
        console.log(token);
        this.validateToken(token);
        return await this.topOffersModel.findByIdAndUpdate(TopOffersId, EditTopOffersDto, { new: true });
    }

    async deleteTopOffers(TopOffersId: string, token : string): Promise<TopOffers> {
        this.validateToken(token);
        return await this.topOffersModel.findByIdAndDelete(TopOffersId);
    }
}
