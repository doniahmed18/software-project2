import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Identity } from './interfaces/identity';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import * as nodemailer from 'nodemailer';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Transporter } from 'nodemailer';
@Injectable()
export class IdentityService {
    emailService: any;
    

    constructor(
        @Inject('IDENTITY_MODEL')
        private identityModel: Model<Identity>,
        private jwtService:JwtService,
       
        ) {}

    hello(message){
        return message;
    }
    async sendEmail(email: string, subject: string, text: string, html: string) {
        try {
            // Create a transporter object using SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'softwarepro753@gmail.com',
                    pass: 'fbrd zjvp eekf nsfg'
                }
            });
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'softwarepro753@gmail.com',
                to: email,
                subject: subject,
                text: text,
                html: html
            });
    
            console.log("Email sent:", info.response);
            return info.response;
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async sendVerificationEmail(email : string, password : string, firstName : string, lastName : string, phoneNumber : string, address : string, company : string, username : string): Promise<void> {
        const verificationLink = `http://localhost:3000/verify-email?email=${email}&password=${password}&firstName=${firstName}&lastName=${lastName}&phoneNumber=${phoneNumber}&address=${address}&company=${company}&username=${username}`;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'softwarepro753@gmail.com',
                pass: 'fbrd zjvp eekf nsfg',
            },
        });

        await transporter.sendMail({
            from: 'softwarepro753@gmail.com',
            to: email,
            subject: 'Verify Your Email Address',
            text: `Please click the following link to verify your email address: ${verificationLink} with this information ${email} ${password} ${firstName} ${lastName} ${phoneNumber} ${address} ${company} ${username}`,
            html: `<p>Please click the following link to verify your email address:</p><a href="${verificationLink}">${verificationLink}</a>`,
        });
    }
    ////////////////////////////////////////
    async sendResetPasswordEmail(email: string, link: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'softwarepro753@gmail.com',
                pass: 'fbrd zjvp eekf nsfg',
            },
        });

        await transporter.sendMail({
            from: 'softwarepro753@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Your can set new password by navigating to this ${link}.`,
            html: `<p>Your can set new password by navigating to this <strong>${link}</strong>.</p>`,
        });
    }
    ////////////////////////////////////////
    async changepassword (email: string, password: string) {
        console.log(email);
        const user = await this.identityModel.findOne({ Email: email });
        if (!user) {
            throw new Error("User not found");
        }
        await this.identityModel.updateOne({ Email: email }, { password: password });
        const payload = {
           Email: email,
           message : "Password reset successful. Please check your email for the new password."
        };
        return payload;
    }
        
async getuserbyid(id:string){
    console.log(id)
    const user=await this.identityModel.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    else {
        return user.toJSON()
    }
}
    async resetPassword(email: string) {
        console.log(email);
        
        const user = await this.identityModel.findOne({ Email: email });
        if (!user) {
            throw new Error("User not found");
        }
        const newPassword = Math.random().toString(36).slice(-8);
        const verificationLink = `http://localhost:3000/reset-email-password?email=${email}`;

        await this.sendResetPasswordEmail(email, verificationLink);
        const payload = {
           Email: email,
           message : "Password reset link sent successful. Please check your email ."
        };
        return payload;
    }
    

    ///////////////////////////////
    async register(email : string, password : string, firstName : string, lastName : string, phoneNumber : string, address : string, company : string, username : string) {
        try {
            // Check if the username already exists in the database
            const existingUser = await this.identityModel.findOne({ username: username }).exec();
            if (existingUser) {
                // Username already exists, return an error message
                throw new HttpException('Username already exists. Please choose another username.', HttpStatus.CONFLICT);
            }

            await this.sendVerificationEmail(email, password , firstName, lastName, phoneNumber, address, company, username);
            // Username doesn't exist, proceed with registration
            const payload = {
                First_Name: firstName,
                username: username,
                email: email,
                password: password,
                Last_Name: lastName,
                Phone_Number: phoneNumber,
                Address: address,
                Company: company
            };
            return payload;
        } catch (error) {
            // Handle any error that occurs during registration
            console.error("Error occurred during registration:", error);
            return { error: 'An error occurred during registration.' };
        }
    }
    
    //////////////////////////////
    async confirmregister(CreateIdentityDto: CreateIdentityDto) {
        try {
            // Check if the username already exists in the database
            const existingUser = await this.identityModel.findOne({ username: CreateIdentityDto.username }).exec();
            if (existingUser) {
                // Username already exists, return an error message
                throw new HttpException('Username already exists. Please choose another username.', HttpStatus.CONFLICT);
            }
        
            // Username doesn't exist, proceed with registration
            const createIdentity = new this.identityModel(CreateIdentityDto);
            let saveResult = await createIdentity.save();
            console.log(saveResult);
            console.log(saveResult._id.toString());
            const payload = {
                id: saveResult._id.toString(),
                First_Name: saveResult.First_Name,
                username: saveResult.username,
                email: saveResult.Email
            };
           
            return payload;
        } catch (error) {
            // Handle any error that occurs during registration
            console.error("Error occurred during registration:", error);
            return { error: 'An error occurred during registration.' };
        }
    }



    //////////////////////////////

    async validateUser(loginDto:LoginDto){
        let loginResult =await this.identityModel.findOne({
            username:loginDto.username,
            password:loginDto.password,
        });
        console.log(loginResult +"mwgoda");
        let jsonData =loginResult.toObject();
        let {__v, _id, ...userData}=jsonData;

        return {
            id:jsonData._id,
            ...userData
        }
    }

    async getUserbyUsername(username:string){
        let loginResult =await this.identityModel.findOne({
            username:username,
           
        });

        if(loginResult===null){
            return null;
        }
        let jsonData =loginResult.toObject();
        let {__v, _id, ...userData}=jsonData;

        return {
            id:jsonData._id,
            ...userData
        }
    }
    async login(user: any) {
        // Validate user credentials
        const validatedUser = await this.validateUser(user);
    
        if (validatedUser) {
            // User is validated, generate JWT token
            const payload = {
                id: validatedUser.id,
                First_Name: validatedUser.First_Name,
                username: validatedUser.username
            };
            console.log(payload);
            const token = this.jwtService.sign(payload);
            const tokenvalue: any = this.jwtService.decode(token);
    console.log(tokenvalue);
    console.log(token);
            return {
                access_token: token,
                expires_in: tokenvalue.exp
            };
        } else {
            // User validation failed, return null or handle the error accordingly
            throw new HttpException('invalid information', HttpStatus.CONFLICT);
        }
    }
    
}
