import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { FavItems } from './interfaces/FavItems';
import { CreateFavItemsDto } from './dto/create.FavItems.dto';
import { EditFavItemsDto } from './dto/edit.FavItems.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class FavItemsService {
    constructor(
        @Inject('FAVITEMS_MODEL')
        private favItemsModel: Model<FavItems>,
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
    async createfavItems(CreateFavItemsDto: CreateFavItemsDto): Promise<FavItems> {
        const newProduct = new this.favItemsModel(CreateFavItemsDto);
        return await newProduct.save();
    }

    async getfavItems(token: string): Promise<FavItems> {
        console.log("from service t" + token);
        this.validateToken(token);
        const userIDFromToken = this.validateTokenAndGetUserID(token);
        console.log("Called with UserID:", userIDFromToken);

        // Find the cart document based on the user ID
        const favItemsModel = await this.favItemsModel.findOne({ UserID: userIDFromToken }).exec();
console.log(favItemsModel);
        if (!favItemsModel) {
            // Handle case where no cart is found for the user
            console.log("No cart found for the user");
            return null;
        }

        // Log details of the cart
        console.log("favItemsModel details:");
        console.log(`_id: ${favItemsModel._id}`);
        console.log(`UserID: ${favItemsModel.UserID}`);
        console.log(`Products:${favItemsModel.products}`);
        return favItemsModel.toJSON();
    }
    async updatefavItems(token: string, productId: string): Promise<any> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        
        try {
            // Find the cart document for the user
            const favItems = await this.favItemsModel.findOne({ UserID: userID }).exec();
    
            // Check if the cart exists
            if (!favItems) {
                throw new Error('Cart not found');
            }
    
            console.log(favItems.products + " favItems.products");

            // Find the index of the product with the specified id in the products array
            const index = favItems.products.findIndex((product: { id: string }) => product.id === productId);

            console.log(index + " index");

            // If the product is found, remove it from the products array
            if (index !== -1) {
                favItems.products.splice(index, 1);
            } else {
                throw new Error('Product not found in favItems');
            }
    
            console.log(favItems.products + " favItems.products");
            await favItems.save();

    
            // Update the cart document in the database with the modified products array
    
            return { message: 'Product removed from cart successfully' };
        } catch (error) {
            console.error('Error updating cart:', error);
            throw new Error('Error updating cart');
        }
    }
    
    async editfavItems(token: string, id: string): Promise<FavItems> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        const newProductItem = { id: id }; // Construct as an object
        return await this.favItemsModel.findOneAndUpdate(
            { UserID: userID },
            { $push: { products: newProductItem } },
            { new: true, upsert: true }
        );
    }


    async deletefavItems(token: string): Promise<any> {
        try {
            this.validateToken(token);
            const userID = this.validateTokenAndGetUserID(token);
            const result = await this.favItemsModel.updateOne({ UserID: userID }, { ProductIDs: [] });
            return result;
        } catch (error) {
            console.error("Error updating favItems:", error);
            throw error; // Rethrow the error to handle it in the caller
        }
    }

}
