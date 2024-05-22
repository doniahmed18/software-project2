import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CartService {
    constructor(@Inject('CART_SERVICE') private readonly cartClient: ClientKafka) {
        this.cartClient.subscribeToResponseOf('createCart'); // Subscribe to the response topic

    }

// Adjust the return type to Promise<any>
public hello(): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.cartClient.send('hellofromapi', 'hello from api').subscribe({
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
public createCart(data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.cartClient.send('createCart', data).subscribe({
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
public getCart(token:string): Promise<any> {
   
    return new Promise((resolve, reject) => {
        const data = `${token}`; 
       console.log("from service t" + token);
        this.cartClient.send('getCart', token).subscribe({
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

public editCart(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.cartClient.send('editCart', { token, body: data }).subscribe({
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

public editrentCart(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.cartClient.send('editrentCart', { token, body: data }).subscribe({
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

public editcustomizeCart(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.cartClient.send('editcustomizeCart', { token, body: data }).subscribe({
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

public deleteCart(token: string , id : string): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.cartClient.send('deleteCart', {token , id}).subscribe({
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
