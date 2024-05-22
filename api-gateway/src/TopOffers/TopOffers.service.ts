import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class TopOffersService {
    constructor(@Inject('TOPOFFERS_SERVICE') private readonly topOffersClient: ClientKafka) {}

// Adjust the return type to Promise<any>
public hello(): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.topOffersClient.send('hellofromapi', 'hello from api').subscribe({
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
public createTopOffers(data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           
        this.topOffersClient.send('createTopOffers', data).subscribe({
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

public getGuestTopOffers(): Promise<any> {
           
    return new Promise((resolve, reject) => {
           
        this.topOffersClient.send('getGuestTopOffers','').subscribe({
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
public getGuestCategoryTopOffers(TopOffersCategory:string): Promise<any> {
           
    return new Promise((resolve, reject) => {
           
        this.topOffersClient.send('getGuestCategoryTopOffers',TopOffersCategory).subscribe({
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
public getCategoryTopOffers(token:string,TopOffersCategory:string): Promise<any> {
           
    return new Promise((resolve, reject) => {
           const command = `${TopOffersCategory},${token}`;
        this.topOffersClient.send('getCategoryTopOffers',command).subscribe({
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

public getGuestTopOffersById(id: string ): Promise<any> {
   
    return new Promise((resolve, reject) => {

        this.topOffersClient.send('getGuestTopOffersById', id).subscribe({
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
    public getTopOffers(token : string): Promise<any> {
           
        return new Promise((resolve, reject) => {
               
            this.topOffersClient.send('getTopOffers', token).subscribe({
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
public getTopOffersById(id: string ,token :string): Promise<any> {
   
    return new Promise((resolve, reject) => {
       const data = `${id},${token}`;
        this.topOffersClient.send('getTopOffersById', data).subscribe({
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
public editTopOffers(id: string, token:string , data: any): Promise<any> {
       
    return new Promise((resolve, reject) => {
           const datad = `${id},${token}`;
        this.topOffersClient.send('editTopOffers', { datad, body: data }).subscribe({
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
public deleteTopOffers(id: string ,token :string): Promise<any> {
       
    return new Promise((resolve, reject) => {
           const data = `${id},${token}`;
        this.topOffersClient.send('deleteTopOffers', data).subscribe({
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
