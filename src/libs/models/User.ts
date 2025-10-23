// src/libs/models/User.ts
import { Collection, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getDatabase } from '../database/connection';

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  refreshTokens?: string[];
}

export interface UserDocument extends Omit<User, '_id'> {
  _id: ObjectId;
}

export class UserModel {
  private static collection: Collection<UserDocument> | null = null;

  private static async getCollection(): Promise<Collection<UserDocument>> {
    if (!this.collection) {
      const db = await getDatabase();
      this.collection = db.collection<UserDocument>('users');
      
      // Create indexes
      await this.collection.createIndex({ email: 1 }, { unique: true });
    }
    return this.collection;
  }

  static async create(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'refreshTokens'>): Promise<UserDocument> {
    const collection = await this.getCollection();
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    
    const user: Omit<UserDocument, '_id'> = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      refreshTokens: [],
    };

    const result = await collection.insertOne(user as UserDocument);
    return { ...user, _id: result.insertedId };
  }

  static async findByEmail(email: string): Promise<UserDocument | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ email });
  }

  static async findById(id: string): Promise<UserDocument | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async validatePassword(user: UserDocument, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  static async addRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $push: { refreshTokens: refreshToken },
        $set: { updatedAt: new Date() }
      }
    );
  }

  static async removeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $pull: { refreshTokens: refreshToken },
        $set: { updatedAt: new Date() }
      }
    );
  }

  static async removeAllRefreshTokens(userId: string): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          refreshTokens: [],
          updatedAt: new Date()
        }
      }
    );
  }

  static async updateProfile(userId: string, updateData: Partial<Pick<User, 'firstName' | 'lastName' | 'email'>>): Promise<UserDocument | null> {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    return result;
  }
}
