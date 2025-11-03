import { Controller, Get, Post, Body, UseGuards, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserWithTempPasswordDto } from './dto/create-user-with-temp-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    console.log('📋 Liste complète des utilisateurs:');
    users.forEach(u => {
      console.log(`  - ID: ${u.id}, Email: ${u.email}, Username: ${u.username || 'NON DÉFINI'}`);
    });
    return users.map(user => ({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
      isTemporaryPassword: user.isTemporaryPassword,
      createdAt: user.createdAt,
    }));
  }

  @Post('create-with-temp-password')
  async createWithTempPassword(@Body() dto: CreateUserWithTempPasswordDto) {
    try {
      const { user, temporaryPassword } = await this.usersService.createWithTemporaryPassword(
        dto.email,
        dto.username,
        dto.role || 'employee',
      );

      // On retourne le mot de passe temporaire pour l'afficher à l'admin
      // L'admin pourra le copier et l'envoyer manuellement à l'utilisateur

      return {
        success: true,
        message: 'Utilisateur créé avec succès !',
        temporaryPassword, // Affiché dans l'interface pour que l'admin puisse le copier
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Une erreur est survenue lors de la création de l\'utilisateur',
      };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    try {
      await this.usersService.delete(id);
      return {
        success: true,
        message: 'Utilisateur supprimé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Une erreur est survenue lors de la suppression de l\'utilisateur',
      };
    }
  }
}
