import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly enabled: boolean;
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(private prisma: PrismaService) {
    const clientID = process.env.GOOGLE_CLIENT_ID || '';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
    const enabled = !!(clientID && clientSecret);

    super({
      clientID: clientID || 'dummy',
      clientSecret: clientSecret || 'dummy',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
      scope: ['email', 'profile'],
    });

    this.enabled = enabled;
    if (!enabled) {
      Logger.warn('Google OAuth disabled — set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET');
    }
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    if (!this.enabled) {
      return done(new Error('Google OAuth not configured'));
    }

    const { name, emails } = profile;
    const email = emails?.[0]?.value || `${profile.id}@google-oauth.local`;
    const firstName = name?.givenName || '';
    const lastName = name?.familyName || '';

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          first_name: firstName,
          last_name: lastName,
          is_guest: false,
        },
      });
    }

    done(null, { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name });
  }
}
