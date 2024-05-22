import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Wishlist } from './interfaces/Wishlist';
import { CreateWishlistDto } from './dto/create.Wishlist.dto';
import { EditWishlistDto } from './dto/edit.Wishlist.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class wishlistService {
    constructor(
        @Inject('WISHLIST_MODEL')
        private wishlistModel: Model<Wishlist>,
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
    async createWishlist(CreateWishlistDto: CreateWishlistDto): Promise<Wishlist> {
        const newProduct = new this.wishlistModel(CreateWishlistDto);
        return await newProduct.save();
    }

    async getWishlist(token: string): Promise<Wishlist> {
        console.log("from service t" + token);
        this.validateToken(token);
        const userIDFromToken = this.validateTokenAndGetUserID(token);
        console.log("Called with UserID:", userIDFromToken);

        // Find the cart document based on the user ID
        const wishlistModel = await this.wishlistModel.findOne({ UserID: userIDFromToken }).exec();
console.log(wishlistModel);
        if (!wishlistModel) {
            // Handle case where no cart is found for the user
            console.log("No cart found for the user");
            return null;
        }

        // Log details of the cart
        console.log("wishlistModel details:");
        console.log(`_id: ${wishlistModel._id}`);
        console.log(`UserID: ${wishlistModel.UserID}`);
        console.log(`Products:${wishlistModel.products}`);
        return wishlistModel.toJSON();
    }
    async updateWishlist(token: string, productId: string): Promise<any> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        
        try {
            // Find the cart document for the user
            const wishlist = await this.wishlistModel.findOne({ UserID: userID }).exec();
    
            // Check if the cart exists
            if (!wishlist) {
                throw new Error('Cart not found');
            }
    
            console.log(wishlist.products + " wishlist.products");

            // Find the index of the product with the specified id in the products array
            const index = wishlist.products.findIndex((product: { id: string }) => product.id === productId);

            console.log(index + " index");

            // If the product is found, remove it from the products array
            if (index !== -1) {
                wishlist.products.splice(index, 1);
            } else {
                throw new Error('Product not found in wishlist');
            }
    
            console.log(wishlist.products + " wishlist.products");
            await wishlist.save();

    
            // Update the cart document in the database with the modified products array
    
            return { message: 'Product removed from cart successfully' };
        } catch (error) {
            console.error('Error updating cart:', error);
            throw new Error('Error updating cart');
        }
    }
    
    async editWishlist(token: string, id: string): Promise<Wishlist> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        const newProductItem = { id: id }; // Construct as an object
        return await this.wishlistModel.findOneAndUpdate(
            { UserID: userID },
            { $push: { products: newProductItem } },
            { new: true, upsert: true }
        );
    }


    async deleteWishlist(token: string): Promise<any> {
        try {
            this.validateToken(token);
            const userID = this.validateTokenAndGetUserID(token);
            const result = await this.wishlistModel.updateOne({ UserID: userID }, { ProductIDs: [] });
            return result;
        } catch (error) {
            console.error("Error updating Wishlist:", error);
            throw error; // Rethrow the error to handle it in the caller
        }
    }

}
