import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Cart } from './interfaces/Cart';
import { CreateCartDto } from './dto/create.Cart.dto';
import { EditCartDto } from './dto/edit.cart.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class CartService {
    constructor(
        @Inject('CART_MODEL')
        private cartModel: Model<Cart>,
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
    async createCart(CreateCartDto: CreateCartDto): Promise<Cart> {
        const newProduct = new this.cartModel(CreateCartDto);
        return await newProduct.save();
    }

    async getCart(token: string): Promise<Cart> {
        console.log("from service t" + token);
        this.validateToken(token);
        const userIDFromToken = this.validateTokenAndGetUserID(token);
        console.log("Called with UserID:", userIDFromToken);

        // Find the cart document based on the user ID
        const cart = await this.cartModel.findOne({ UserID: userIDFromToken }).exec();
console.log(cart);
        if (!cart) {
            // Handle case where no cart is found for the user
            console.log("No cart found for the user");
            return null;
        }

        // Log details of the cart
        console.log("Cart details:");
        console.log(`_id: ${cart._id}`);
        console.log(`UserID: ${cart.UserID}`);
        console.log("Products:");
        return cart.toJSON();
    }
    
    
    async updateCart(token: string, productId: string): Promise<any> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        
        try {
            // Find the cart document for the user
            const cart = await this.cartModel.findOne({ UserID: userID }).exec();
    
            // Check if the cart exists
            if (!cart) {
                throw new Error('Cart not found');
            }
    console.log(cart.products + "cart.products")
    console.log(cart.products[0] + "cart.products[0]")
            // Find the index of the product with the specified id in the products array
            const index = cart.products.findIndex((item: any) => item.id === productId);
            console.log(index + "index  ")
            // If the product is found, remove it from the products array
            if (index !== -1) {
                cart.products.splice(index, 1);
            } else {
                throw new Error('Product not found in cart');
            }
            // Update the cart document in the database with the modified products array
await cart.save();

    console.log(cart.products + "cart.products")
            // Update the cart document in the database with the modified products array
            
    
            return { message: 'Product removed from cart successfully' };
        } catch (error) {
            console.error('Error updating cart:', error);
            throw new Error('Error updating cart');
        }
    }
    
    
    async editCart(token: string, id: string, newQuantity: number ,type:string): Promise<Cart> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        const newProductItem = { id: id, quantity: newQuantity ,type:type}; // Construct as an object
        return await this.cartModel.findOneAndUpdate(
            { UserID: userID },
            { $push: { products: newProductItem } },
            { new: true, upsert: true }
        );
    }
    async editrentCart(token: string, id: string, startdate: Date ,enddate: Date ,type:string): Promise<Cart> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        const newProductItem = { id: id, startdate: startdate ,enddate:enddate ,type:type}; // Construct as an object
        return await this.cartModel.findOneAndUpdate(
            { UserID: userID },
            { $push: { products: newProductItem } },
            { new: true, upsert: true }
        );
    }
    
    async editcustomizeCart(token: string, id: string,color :string,material:string,height:string,width:string,type:string,quantity:number): Promise<Cart> {
        this.validateToken(token);
        const userID = this.validateTokenAndGetUserID(token);
        const newProductItem = { id: id, color: color ,material:material ,height:height,width:width,type:type,quantity:quantity}; // Construct as an object
        return await this.cartModel.findOneAndUpdate(
            { UserID: userID },
            { $push: { products: newProductItem } },
            { new: true, upsert: true }
        );
    }
    async deleteCart(userID: string): Promise<any> {
        try {
            const result = await this.cartModel.updateOne({ UserID: userID }, { ProductIDs: [] });
            return result;
        } catch (error) {
            console.error("Error updating cart:", error);
            throw error; // Rethrow the error to handle it in the caller
        }
    }

}
