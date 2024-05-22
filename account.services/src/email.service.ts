import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'softwarepro753@gmail.com',
        pass: 'D1234567890@12',
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: 'softwarepro753@gmail.com',
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
