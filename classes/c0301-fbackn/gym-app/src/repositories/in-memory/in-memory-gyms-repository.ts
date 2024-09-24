import { Gym, Prisma } from "@prisma/client";
import {
  FindManyNearbyParams,
  GymsRepository,
} from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository {
  private items: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: Math.random().toString(32).slice(2),
      title: data.title,
      description: data.description!,
      phone: data.phone!,
      //@ts-ignore
      latitude: data.latitude,
      //@ts-ignore
      longitude: data.longitude,
    };
    this.items.push(gym);
    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice(((page || 1) - 1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    return this.items.filter((i) => {
      const distance = getDistanceBetweenCoordinates(
        {
          longitude: i.longitude.toNumber(),
          latitude: i.latitude.toNumber(),
        },
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
      );
      return distance < 10;
    });
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((i) => i.id === gymId);
    return gym || null;
  }
}
