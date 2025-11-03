import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['employee'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    // Recherche insensible à la casse
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employee', 'employee')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getOne();
  }

  async findByUsername(username: string): Promise<User | null> {
    console.log('🔎 Recherche par username:', username);
    
    // Recherche insensible à la casse
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employee', 'employee')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .getOne();
    
    console.log('🔎 Résultat:', user ? `Trouvé: ${user.username} (${user.email})` : 'Non trouvé');
    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    // Vérifier que l'utilisateur existe
    const user = await this.findOne(id);
    
    console.log('🔍 ID de l\'utilisateur à mettre à jour:', id);
    console.log('📝 Utilisateur trouvé:', user.username || user.email, '- ID:', user.id);
    console.log('📝 Données à mettre à jour:', userData);
    
    // CRITIQUE : Utiliser update() avec WHERE pour cibler UN SEUL utilisateur
    const updateResult = await this.userRepository.update(
      { id: id }, // WHERE clause EXPLICITE avec l'ID
      userData
    );
    
    console.log('✅ Nombre de lignes mises à jour:', updateResult.affected);
    
    // Récupérer l'utilisateur mis à jour
    const updatedUser = await this.findOne(id);
    
    console.log('✅ Utilisateur après mise à jour:', {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      isTemporaryPassword: updatedUser.isTemporaryPassword,
      passwordHash: updatedUser.password?.substring(0, 20) + '...'
    });
    
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async createWithTemporaryPassword(
    email: string,
    username: string,
    role: string,
  ): Promise<{ user: User; temporaryPassword: string }> {
    // Générer un mot de passe temporaire aléatoire
    const temporaryPassword = this.generateTemporaryPassword();

    // Hash le mot de passe
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Créer l'utilisateur
    const user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
      role: role as any,
      isTemporaryPassword: true,
      isActive: true,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      user: savedUser,
      temporaryPassword,
    };
  }

  private generateTemporaryPassword(): string {
    // Générer un mot de passe aléatoire de 12 caractères
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}
