import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class ProductService {
    constructor(@Inject('PRODUCT_SERVICE') private readonly productsClient: ClientKafka) {}

// Adjust the return type to Promise<any>
public hello(): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.productsClient.send('hellofromapi', 'hello from api').subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}

// Adjust the return type to Promise<any>
public createProduct(data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.productsClient.send('createProduct', data).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}

public getGuestProducts(): Promise<any> {
           
    return new Promise((resolve, reject) => {
           
        this.productsClient.send('getGuestProducts','').subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}
public getGuestCategoryProducts(ProductCategory:string): Promise<any> {
           
    return new Promise((resolve, reject) => {
           
        this.productsClient.send('getGuestCategoryProducts',ProductCategory).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}
public getUserReviews(token:string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.productsClient.send('getUserReviews',token).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    }
    );
}
public getCategoryProducts(token:string,ProductCategory:string): Promise<any> {
           
    return new Promise((resolve, reject) => {
           const command = `${ProductCategory},${token}`;
        this.productsClient.send('getCategoryProducts',command).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}

public getGuestProductById(id: string ): Promise<any> {
   
    return new Promise((resolve, reject) => {

        this.productsClient.send('getGuestProductById', id).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data); 
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}

    // Adjust the return type to Promise<any>
    public getProducts(token : string): Promise<any> {
           
        return new Promise((resolve, reject) => {
               
            this.productsClient.send('getProducts', token).subscribe({
                next: (data) => {
                    console.log("Data received:", data);
                    resolve(data);   
                },
                error: (error) => {
                    console.error("Error:", error);
                    reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
                }
            });
        });
    }
    
public AddReview(id: string , review: string ,rating:Number,token :string): Promise<any> {
       
    return new Promise((resolve, reject) => {
           const data = `${id},${review},${rating},${token}`;
        this.productsClient.send('addReview', data).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}
// Adjust the return type to Promise<any>
public getProductById(id: string ,token :string): Promise<any> {
   
    return new Promise((resolve, reject) => {
       const data = `${id},${token}`;
        this.productsClient.send('getProductById', data).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data); 
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}


// Adjust the return type to Promise<any>
public editProduct(id: string, token:string , data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           const datad = `${id},${token}`;
        this.productsClient.send('editProduct', { datad, body: data }).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}

// Adjust the return type to Promise<any>
public deleteProduct(id: string ,token :string): Promise<any> {
       
    return new Promise((resolve, reject) => {
           const data = `${id},${token}`;
        this.productsClient.send('deleteProduct', data).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}
public editReview(token: string, productid:string ,data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.productsClient.send('editReview', { token, productid,body: data }).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}

public deleteReview(token: string , id : string): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.productsClient.send('deleteReview', {token , id}).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data);   
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}

}
