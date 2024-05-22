import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './interfaces/Order';
import { CreateOrderDto } from './dto/create.Order.dto';
import { EditOrderDto } from './dto/edit.Order.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_MODEL')
        private orderModel: Model<Order>,
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
    async createOrder(CreateOrderDto: CreateOrderDto): Promise<Order> {
        const newProduct = new this.orderModel(CreateOrderDto);
        return await newProduct.save();
    }

    async getOrder(token: string): Promise<string> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        const products = await this.orderModel.find({ UserID: userID }).exec(); // Filter Order items based on UserID
        // Serialize each product to JSON format for logging
        const serializedProducts = products.map(product => product.toJSON());
        console.log(JSON.stringify(serializedProducts) + " from service s" );
        return JSON.stringify(serializedProducts);
    }
    async updateOrder(token: string, update: any): Promise<any> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        return this.orderModel.updateOne({ UserID: userID }, { $set: { products: [] } }).exec();
    }


    async editOrder(token: string, id: string, newQuantity: number ,type:string): Promise<Order> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        const newProductItem = { id: id, quantity: newQuantity ,type:type}; // Construct as an object
        return await this.orderModel.findOneAndUpdate(
            { UserID: userID },
            { $push: { products: newProductItem } },
            { new: true, upsert: true }
        );
    }
    async editrentOrder(token: string, id: string, startdate: Date ,enddate: Date ,type:string): Promise<Order> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        const newProductItem = { id: id, startdate: startdate ,enddate:enddate ,type:type}; // Construct as an object
        return await this.orderModel.findOneAndUpdate(
            { UserID: userID },
            { $push: { products: newProductItem } },
            { new: true, upsert: true }
        );
    }
    
    async editcustomizeOrder(token: string, id: string,color :string,material:string,height:string,width:string,type:string,quantity:number): Promise<Order> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        const newProductItem = { id: id, color: color ,material:material ,height:height,width:width,type:type,quantity:quantity}; // Construct as an object
        return await this.orderModel.findOneAndUpdate(
            { UserID: userID },
            { $push: { products: newProductItem } },
            { new: true, upsert: true }
        );
    }
    async deleteOrder(token: string): Promise<any> {
        try {
            this.validateToken(token);
            const userID = this.validateTokenAndGetUserID(token);   
            const result = await this.orderModel.updateOne({ UserID: userID }, { ProductIDs: [] });
            return result;
        } catch (error) {
            console.error("Error updating order:", error);
            throw error; // Rethrow the error to handle it in the caller
        }
    }

}
