import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import mongoose from 'mongoose';
import { Observable } from 'rxjs';
@Injectable()
export class CouponService {
    constructor(@Inject('COUPON_SERVICE') private readonly CouponClient: ClientKafka) {}

// Adjust the return type to Promise<any>
public hello(): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.CouponClient.send('hellofromapi', 'hello from api').subscribe({
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
public createCoupon(data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.CouponClient.send('createCoupon', data).subscribe({
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

public addpayment(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.CouponClient.send('addpayment', { token, data }).subscribe({
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

public getCouponById(couponId:string): Promise<any> {
   
    return new Promise((resolve, reject) => {
    
        this.CouponClient.send('getCouponById',  {couponId}).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data); 
            },
            error: (error) => {
                console.error("Error:", error);
                if (error instanceof HttpException) {
                    // If the error is an HttpException, forward it as is
                    reject(error);
                } else {
                    // If it's not an HttpException, create a new HttpException with status code 500
                    reject(new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR));
                }
            }
        });
    });
}


// Adjust the return type to Promise<any>
public editCoupon(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.CouponClient.send('editCoupon', { token, body: data }).subscribe({
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
