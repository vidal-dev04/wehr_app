import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      role: registerDto.role || UserRole.EMPLOYEE,
    });

    // Generate token
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    console.log('🔍 Recherche utilisateur avec identifiant:', loginDto.email);
    
    // Find user by email OR username
    let user = await this.usersService.findByEmail(loginDto.email);
    console.log('📧 Recherche par email:', user ? 'Trouvé' : 'Non trouvé');
    
    if (!user) {
      user = await this.usersService.findByUsername(loginDto.email);
      console.log('👤 Recherche par username:', user ? 'Trouvé' : 'Non trouvé');
    }
    
    if (!user) {
      console.log('❌ Aucun utilisateur trouvé avec:', loginDto.email);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('🔐 Tentative de connexion pour:', user.username || user.email);
    console.log('📝 Mot de passe saisi (clair):', loginDto.password);
    console.log('🔑 Hash dans DB:', user.password);
    console.log('🔍 isTemporaryPassword:', user.isTemporaryPassword);

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    
    console.log('✅ Mot de passe valide?', isPasswordValid);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Generate token
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        employee: user.employee,
        isTemporaryPassword: user.isTemporaryPassword,
      },
      token,
    };
  }

  async changePassword(userId: string, newPassword: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    console.log('🔐 Changement de mot de passe pour:', user.username || user.email);
    console.log('📝 Nouveau mot de passe (clair):', newPassword);

    // Hash le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('🔒 Mot de passe hashé:', hashedPassword);

    // Mettre à jour le mot de passe et le flag isTemporaryPassword
    const updatedUser = await this.usersService.update(userId, {
      password: hashedPassword,
      isTemporaryPassword: false,
    });

    console.log('✅ Utilisateur mis à jour, isTemporaryPassword:', updatedUser.isTemporaryPassword);
    console.log('🔑 Password dans DB après update:', updatedUser.password);

    return {
      message: 'Mot de passe changé avec succès',
    };
  }

  private generateToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
