// src/lib/features/auth/data/repositories/user.repository.ts
import { ObjectId } from 'mongodb';
import { dbManager } from '@/lib/core/database';
import type { 
  UserDocument, 
  CreateUserData, 
  UpdateUserData, 
  UserRepository 
} from '../../domain/types';

export const userRepository: UserRepository = {
  async create(userData: CreateUserData): Promise<UserDocument> {
    const collection = await dbManager.getCollection<UserDocument>('users');
    
    const user: Omit<UserDocument, '_id'> = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      refreshTokens: [],
    };

    const result = await collection.insertOne(user as UserDocument);
    return { ...user, _id: result.insertedId };
  },

  async findByEmail(email: string): Promise<UserDocument | null> {
    const collection = await dbManager.getCollection<UserDocument>('users');
    return await collection.findOne({ email });
  },

  async findById(id: string): Promise<UserDocument | null> {
    const collection = await dbManager.getCollection<UserDocument>('users');
    return await collection.findOne({ _id: new ObjectId(id) });
  },

  async updateProfile(userId: string, updateData: UpdateUserData): Promise<UserDocument | null> {
    const collection = await dbManager.getCollection<UserDocument>('users');
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );
    return result;
  },

  async addRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const collection = await dbManager.getCollection<UserDocument>('users');
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: { refreshTokens: refreshToken },
        $set: { updatedAt: new Date() },
      }
    );
  },

  async removeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const collection = await dbManager.getCollection<UserDocument>('users');
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $pull: { refreshTokens: refreshToken },
        $set: { updatedAt: new Date() },
      }
    );
  },

  async removeAllRefreshTokens(userId: string): Promise<void> {
    const collection = await dbManager.getCollection<UserDocument>('users');
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          refreshTokens: [],
          updatedAt: new Date(),
        },
      }
    );
  },
};
