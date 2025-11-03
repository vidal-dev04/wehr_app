import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

async function seed() {
  console.log('🔄 Chargement de la configuration...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL non définie dans .env');
    process.exit(1);
  }

  console.log('🔗 Connexion à la base de données...');
  
  // Connexion à la base de données
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: true, // Neon requiert SSL
  });

  await dataSource.initialize();
  console.log('✅ Connecté à la base de données');

  // Créer l'utilisateur admin
  const hashedPassword = await bcrypt.hash('password', 10);
  
  await dataSource.query(`
    INSERT INTO users (id, email, username, password, role, "isActive", "isTemporaryPassword", "createdAt", "updatedAt")
    VALUES (
      gen_random_uuid(),
      'admin@wehr.com',
      'admin',
      $1,
      'admin',
      true,
      false,
      NOW(),
      NOW()
    )
    ON CONFLICT (email) DO NOTHING;
  `, [hashedPassword]);

  console.log('✅ Utilisateur admin créé avec succès');
  console.log('📧 Email: admin@wehr.com');
  console.log('👤 Username: admin');
  console.log('🔑 Password: password');

  await dataSource.destroy();
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Erreur lors du seed:', error);
  process.exit(1);
});
