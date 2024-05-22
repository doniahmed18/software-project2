import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { WishlistService } from 'src/Wishlist/Wishlistservice';
import { CartService } from 'src/cart/Cart.service';
import { OrderService } from 'src/order/Order.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FavItemsService } from 'src/FavItems/FavItemsservice';

@Injectable()
export class AccountService {
    constructor(@Inject('ACC_SERVICE') private readonly accountClient:ClientKafka,
    private readonly cartService:CartService,
    private readonly wishlistService:WishlistService,
    private readonly orderService:OrderService,
    private readonly favItemsService:FavItemsService
){}
// b5aly el methods deh tb3t 7agat using kafka ll acc microservice 

  // Adjust the return type to Promise<any>
public hello(): Promise<any> {
    // Return a Promise resolving to the data received from the subscription
    return new Promise((resolve, reject) => {
        // Subscribe to the observable
        this.accountClient.send('hellofromapi', 'hello from api').subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data); // Resolve the Promise with the received data
            },
            error: (error) => {
                console.error("Error:", error);
                reject(error); // Reject the Promise if an error occurs
            }
        });
    });
}

public forgetpassword(command: any): Promise<any> {
    // Return a Promise resolving to the data received from the subscription
    return new Promise((resolve, reject) => {
        // Subscribe to the observable
        this.accountClient.send('forgetpassword', command).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data); // Resolve the Promise with the received data
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}

public register(command: any): Promise<any> {
    // Return a Promise resolving to the data received from the subscription
    return new Promise((resolve, reject) => {
        // Subscribe to the observable
        this.accountClient.send('register', command).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data); // Resolve the Promise with the received data
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); // Reject the promise with status code 409
            }
        });
    });
}
// Adjust the return type to Promise<any>
public confirmregister(command: any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.accountClient.send('confirmregister', command).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                const UserID = data.id; 
                console.log("id received:", UserID);
                if (data.userData && data.userData.message) {
                    reject(data.userData.message); 
                    return; 
                }
                if (!UserID) {
                    reject(new HttpException("User exists", HttpStatus.CONFLICT)); 

                    return;
                }
                Promise.all([
                    this.cartService.createCart({ UserID, products: [] }),
                    this.wishlistService.createWishlist({ UserID, products: [] }),
                    this.orderService.createOrder({ UserID, products: [] }),
                    this.favItemsService.createFavItems({ UserID, products: [] })

                ]).then(([cartData, wishlistData, orderData ,favItemsData]) => {
                    resolve({ userData: data, orderData, cartData, wishlistData ,favItemsData});
                }).catch((error) => {
                    reject(new HttpException(error, HttpStatus.CONFLICT)); 
                });
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); 
            }
        });
    });
}


public changepassword(command :any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.accountClient.send('changepassword', command).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data); 
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); 
            }
        });
    });
}

// Adjust the return type to Promise<any>
public login(command: any): Promise<any> {
    // Return a Promise resolving to the data received from the subscription
    return new Promise((resolve, reject) => {
        // Subscribe to the observable
        this.accountClient.send('login', command).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data); // Resolve the Promise with the received data
            },
            error: (error) => {
                console.error("Error:", error);
                reject(error); // Reject the Promise if an error occurs
            }
        });
    });
}
public getuserbyid(command:string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.accountClient.send('getuserbyid', command).subscribe({
            next: (data) => {
                console.log("Data received:", data);
                resolve(data); 
            },
            error: (error) => {
                console.error("Error:", error);
                reject(new HttpException(error, HttpStatus.CONFLICT)); 
            }
        });
    });
}
}
