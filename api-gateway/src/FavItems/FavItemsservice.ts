import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class FavItemsService {
    constructor(@Inject('FAVITEMS_SERVICE') private readonly FavItemsClient: ClientKafka) {
        this.FavItemsClient.subscribeToResponseOf('createFavItems'); // Subscribe to the response topic

    }

// Adjust the return type to Promise<any>
public hello(): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.FavItemsClient.send('hellofromapi', 'hello from api').subscribe({
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
public createFavItems(data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.FavItemsClient.send('createFavItems', data).subscribe({
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
public getFavItems(token: string): Promise<any> {
   
    return new Promise((resolve, reject) => {
       
        this.FavItemsClient.send('getFavItems', token ).subscribe({
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
public editFavItems(token: string, data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.FavItemsClient.send('editFavItems', { token, body: data }).subscribe({
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
public deleteFavItems(token: string , id:string): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.FavItemsClient.send('deleteFavItems', {token,id} ).subscribe({
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
