import { injectable } from 'inversify'
import * as nodemailer from 'nodemailer'
import fs from 'fs'
import { IMailer, MailerDTO } from '../../application/contracts/mailer'

@injectable()
export class Mailer implements IMailer {
  private readonly transporter!: nodemailer.Transporter

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    } as any)
  }

  async send (mail: MailerDTO.Mail): Promise<void> {
    let html = fs.readFileSync(
      `${__dirname}/templates/${mail.template}.html`,
      'utf-8'
    )
    for (const key in mail.data) {
      html = html.replace(`{{${key}}}`, mail.data[key])
    }
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: mail.to,
      subject: mail.subject,
      html
    })
  }
}
