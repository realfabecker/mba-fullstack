import {
  FindManyNearbyParams,
  GymsRepository,
} from "@/repositories/gyms-repository";
import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return prisma.gym.create({
      data,
    });
  }

  async findById(id: string): Promise<Gym | null> {
    return prisma.gym.findUnique({
      where: {
        id,
      },
    });
  }

  async findManyNearby({
    longitude,
    latitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
    return Promise.resolve(gyms);
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: ((page || 1) - 1) * 20,
    });
  }
}
