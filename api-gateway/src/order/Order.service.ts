import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class OrderService {
    constructor(@Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka) {
        this.orderClient.subscribeToResponseOf('createOrder'); // Subscribe to the response topic

    }

// Adjust the return type to Promise<any>
public hello(): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.orderClient.send('hellofromapi', 'hello from api').subscribe({
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
public createOrder(data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.orderClient.send('createOrder', data).subscribe({
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
public getOrder(token:string): Promise<any> {
   
    return new Promise((resolve, reject) => {
      // const data = `${id},${token}`
        this.orderClient.send('getOrder', token ).subscribe({
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

public editOrder(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.orderClient.send('editOrder', { token, body: data }).subscribe({
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

public editrentOrder(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.orderClient.send('editrentOrder', { token, body: data }).subscribe({
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

public editcustomizeOrder(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.orderClient.send('editcustomizeOrder', { token, body: data }).subscribe({
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
public deleteOrder(token:string): Promise<any> {
       
    return new Promise((resolve, reject) => {
          // const data = `${id},${token}`
        this.orderClient.send('deleteOrder', token ).subscribe({
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
