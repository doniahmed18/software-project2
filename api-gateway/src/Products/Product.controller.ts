import { Controller, Request, Get, Inject, OnModuleInit, Post,Headers, Param, Delete } from '@nestjs/common';
import { ProductService } from './Product.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller('products')
export class ProductController implements OnModuleInit {

    constructor(
        private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly productsClient: ClientKafka
    ) {}

    @Get('hello')
    getHello(): any {
        return this.productService.hello();
    }

    @Post('createProduct')
    async createProduct(@Request() req) {
        console.log(req.body.ProductName +"from api gateway");
        return this.productService.createProduct(req.body);
    }

    @Get('getProducts')
    async getProducts(@Headers('authorization') token: string) {
        console.log(this.productService.getProducts(token) +"from api gateway m");
        return this.productService.getProducts(token);
    }

    @Get('getProduct/:id') 
    async getProductById(@Param('id') id: string ,@Headers('authorization') token: string) {
        console.log(id); 
        console.log(token);
        return this.productService.getProductById(id ,token);
    }
    @Get('getGuestProducts')
    async getGuestProducts() {
       // console.log(this.productService.getProducts(token) +"from api gateway m");
        return this.productService.getGuestProducts();
    }
    @Get('getGuestCategoryProducts/:id')
    async getGuestCategoryProducts(@Param('id') id: string) {
       // console.log(this.productService.getProducts(token) +"from api gateway m");
        return this.productService.getGuestCategoryProducts(id);
    }
    @Get('getCategoryProducts/:id')
    async getCategoryProducts(@Headers('authorization') token: string,@Param('id') id: string) {
       // console.log(this.productService.getProducts(token) +"from api gateway m");
        return this.productService.getCategoryProducts(token,id);
    }

    @Get('getGuestProduct/:id') 
    async getGuestProductById(@Param('id') id: string) {
        console.log(id); 
        return this.productService.getGuestProductById(id );
    }
  


    @Post('editProduct/:id') 
    async editProduct( @Param('id') id: string,@Headers('authorization') token: string , @Request() req) {
        console.log(req.body);
        return this.productService.editProduct(id ,token, req.body); // Pass 'id' as a parameter
    }
    
    // For deleteProduct endpoint
    @Delete('deleteProduct/:id') // Define the route parameter ':id'
    async deleteProduct (@Param('id') id: string, @Headers('authorization') token: string  , @Request() req) {
        console.log(req.body);
        return this.productService.deleteProduct(id ,token); // Pass 'id' as a parameter
    }

    @Post('addReview/:id')
    async AddReview(@Param('id') id: string, @Headers('authorization') token: string , @Request() req) {
        console.log(req.body);
        return this.productService.AddReview(id , req.body.review ,req.body.rating, token); // Pass 'id' as a parameter
    }
    @Get('getUserReviews')
    async getUserReviews(@Headers('authorization') token: string) {
        console.log(this.productService.getUserReviews(token) +"from api gateway m");
        return this.productService.getUserReviews(token);
    }
    @Post('editReview/:id') 
    async editReview(@Headers('authorization') token: string, @Request() req,@Param('id') id: string) {
        console.log(req.body);
        return this.productService.editReview(token, id, req.body); // Pass 'id' as a parameter
    }
    
    // For deleteProduct endpoint
    @Delete('deleteReview/:id') // Define the route parameter ':id'
    async deleteReview(@Headers('authorization') token: string, @Request() req, @Param('id') id: string){
        console.log(req.body);
        return this.productService.deleteReview(token ,id); // Pass 'id' as a parameter
    }


    onModuleInit() {
        this.productsClient.subscribeToResponseOf('hellofromapi');
        this.productsClient.subscribeToResponseOf('createProduct');
        this.productsClient.subscribeToResponseOf('getProducts');
        this.productsClient.subscribeToResponseOf('getProductById');
        this.productsClient.subscribeToResponseOf('editProduct');
        this.productsClient.subscribeToResponseOf('deleteProduct');
        this.productsClient.subscribeToResponseOf('getGuestProductById');
        this.productsClient.subscribeToResponseOf('getGuestProducts');
        this.productsClient.subscribeToResponseOf('getGuestCategoryProducts');
        this.productsClient.subscribeToResponseOf('getCategoryProducts');
        this.productsClient.subscribeToResponseOf('addReview');
        this.productsClient.subscribeToResponseOf('getUserReviews');
        this.productsClient.subscribeToResponseOf('editReview');
        this.productsClient.subscribeToResponseOf('deleteReview');
    }
}
