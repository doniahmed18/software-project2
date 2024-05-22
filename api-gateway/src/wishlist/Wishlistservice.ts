import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class WishlistService {
    constructor(@Inject('WISHLIST_SERVICE') private readonly WishlistClient: ClientKafka) {
        this.WishlistClient.subscribeToResponseOf('createWishlist'); // Subscribe to the response topic

    }

// Adjust the return type to Promise<any>
public hello(): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.WishlistClient.send('hellofromapi', 'hello from api').subscribe({
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
public createWishlist(data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.WishlistClient.send('createWishlist', data).subscribe({
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
public getWishlist(token: string): Promise<any> {
   
    return new Promise((resolve, reject) => {
       
        this.WishlistClient.send('getWishlist', token ).subscribe({
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
public editWishlist(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.WishlistClient.send('editWishlist', { token, body: data }).subscribe({
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
public deleteWishlist(token: string , id:string): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.WishlistClient.send('deleteWishlist', {token,id} ).subscribe({
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
