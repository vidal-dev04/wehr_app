import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    // Si vous n'avez pas de serveur SMTP configuré, utilisez ethereal.email pour les tests
    // Pour la production, configurez les variables d'environnement MAIL_* dans .env
    
    // Créer un compte de test ethereal
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.MAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER || testAccount.user,
        pass: process.env.MAIL_PASSWORD || testAccount.pass,
      },
    });
  }

  async sendTemporaryPassword(
    email: string,
    username: string,
    temporaryPassword: string,
  ) {
    // Attendre que le transporteur soit initialisé
    if (!this.transporter) {
      await this.initializeTransporter();
    }

    const mailOptions = {
      from: '"WeHR Support" <noreply@wehr.com>',
      to: email,
      subject: 'Votre compte WeHR a été créé',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Bienvenue sur WeHR !</h2>
          <p>Votre compte a été créé avec succès.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Nom d'utilisateur :</strong> ${username}</p>
            <p style="margin: 5px 0;"><strong>Mot de passe temporaire :</strong> <code style="background-color: #fff; padding: 5px 10px; border-radius: 3px;">${temporaryPassword}</code></p>
          </div>
          
          <p><strong>⚠️ Important :</strong> Pour des raisons de sécurité, vous devrez changer ce mot de passe lors de votre première connexion.</p>
          
          <p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:4200'}/login" 
               style="display: inline-block; padding: 12px 24px; background-color: #EF4444; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
              Se connecter
            </a>
          </p>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Si vous n'avez pas demandé la création de ce compte, veuillez ignorer cet email.
          </p>
        </div>
      `,
      text: `
        Bienvenue sur WeHR !
        
        Votre compte a été créé avec succès.
        
        Nom d'utilisateur : ${username}
        Mot de passe temporaire : ${temporaryPassword}
        
        ⚠️ Important : Pour des raisons de sécurité, vous devrez changer ce mot de passe lors de votre première connexion.
        
        Accédez à l'application : ${process.env.FRONTEND_URL || 'http://localhost:4200'}/login
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);

    console.log('📧 Email envoyé:', info.messageId);
    console.log('🔗 Preview URL:', nodemailer.getTestMessageUrl(info));

    return info;
  }
}
