import { Controller, UseGuards } from '@nestjs/common';
import { ProductService } from './Product.service';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('Product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @MessagePattern('hellofromapi')
    hello(req) {
        console.log(req);
        return this.productService.hello(req.data);
    }

    @MessagePattern('createProduct')
    async createProduct(command) {
        console.log(command +"from product controller");
        return this.productService.createProduct(command);
    }
    
    @MessagePattern('getGuestProducts')
    async getGuestProducts() {
        try {
            const products = await this.productService.getGuestProducts();
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return { statusCode: 500, message: "Error fetching products" };
        }
    }
    @MessagePattern('getGuestCategoryProducts')
    async getGuestCategoryProducts(categoryName : string) {
        try {
            console.log("called with categoryName " + categoryName);
            const products = await this.productService.getGuestCategoryProducts(categoryName);
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return { statusCode: 500, message: "Error fetching products" };
        }
    }
    @MessagePattern('getCategoryProducts')
    async getCategoryProducts(command:any) {
        try {
            const [categoryName, token] = command.split(','); // Assuming the data is in the format "categoryName,token"
            console.log("called with token " + token);
            const products = await this.productService.getCategoryProducts(token,categoryName);
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return { statusCode: 500, message: "Error fetching products" };
        }
    }
    

    @MessagePattern('getGuestProductById')
    async getGuestProductById(command) {

        return this.productService.getGuestProductById(command);
    }

    @MessagePattern('getProducts')
    async getProducts(token :string) {
        try {
            console.log("called with token " + token);
            const products = await this.productService.getProducts(token);
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return { statusCode: 500, message: "Error fetching products" };
        }
    }
    

    @MessagePattern('getProductById')
    async getProductById(command) {
        const [id, token] = command.split(','); // Assuming the data is in the format "id,token"
        console.log("UserID:", id);
        console.log("Token:", token);
        return this.productService.getProductById(id , token);
    }

    @MessagePattern('editProduct')
    async editProduct(command) {
        const [id, token] = command.datad.split(','); // Assuming the data is in the format "id,token"
        console.log("UserID:", id);
        console.log("Token:", token);
        console.log(command);
        return this.productService.editProduct(id, token , command.body);
    }

    @MessagePattern('deleteProduct')
    async deleteProduct(command) {
        const [id, token] = command.split(','); // Assuming the data is in the format "id,token"
        console.log("UserID:", id);
        console.log("Token:", token);
        console.log(command);
        return this.productService.deleteProduct(id , token);
    }
    @MessagePattern('addReview')
    async AddReview(command) {
        const [productid,review,rating, token] = command.split(','); // Assuming the data is in the format "id,token"
        console.log("Token:", token);
        console.log("Review:", review)
        console.log("rating", rating)
        console.log(command);
        return this.productService.AddReview( productid,review,rating, token);
    }
    @MessagePattern('getUserReviews')
    async getUserReviews(command) {
        const [token] = command.split(','); // Assuming the data is in the format "id,token"
        console.log("Token:", token);
        console.log(command);
        return this.productService.getUserReviews( token);
    }
    @MessagePattern('editReview')
    async editReview(command) {
        console.log(command);
        console.log("token"+ command.token);
        const review = command.body.review;
        return this.productService.editReview(command.token,command.productid,review);
    }

    @MessagePattern('deleteReview')
    async deleteReview(command) {
        try {
            console.log("Called with token:", command.token);
            const result = await this.productService.updateReview(command.token, command.id);
            return result;
        } catch (error) {
            console.error("Error updating cart:", error);
            return { statusCode: 500, message: "Error updating cart" };
        }
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern('me')
    async me(command) {
        const { id, ...rest } = command.user;
        return rest;
    }
}
