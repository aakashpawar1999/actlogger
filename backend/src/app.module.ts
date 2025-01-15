import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, SupabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
