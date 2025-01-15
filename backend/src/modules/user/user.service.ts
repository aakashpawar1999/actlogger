import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a user
  async createUser(googleId: string, email: string, name: string) {
    try {
      const userCreate = await this.prisma.user.create({
        data: { googleId, email, name },
        select: {
          email: true,
          name: true,
        },
      });

      if (userCreate) {
        return { data: userCreate };
      } else {
        return 'ERROR';
      }
    } catch (error) {
      return 'ERROR';
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      const getAllUsers = await this.prisma.user.findMany({
        select: {
          email: true,
          name: true,
        },
      });

      if (getAllUsers) {
        return { data: getAllUsers };
      } else {
        return 'ERROR';
      }
    } catch (error) {
      return 'ERROR';
    }
  }

  // Update a user
  async updateUser(email: string, data: { name: string }) {
    const userUpdate = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        name: data.name,
      },
    });

    if (userUpdate) {
      return { data: userUpdate };
    } else {
      return 'ERROR';
    }
  }

  // Delete a user
  async deleteUser(email: string) {
    try {
      const userDelete = await this.prisma.user.delete({
        where: { email },
      });

      if (userDelete) {
        return 'SUCCESS';
      } else {
        return 'ERROR';
      }
    } catch (error) {
      return 'ERROR';
    }
  }
}
