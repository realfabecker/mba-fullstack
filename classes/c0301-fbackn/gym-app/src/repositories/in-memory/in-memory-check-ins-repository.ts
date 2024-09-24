import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private items: CheckIn[] = [];

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkInsOnSameDate = this.items.find((checkIn) => {
      const { created_at, user_id } = checkIn;
      if (user_id !== userId) {
        return false;
      }
      return (
        created_at.toISOString().slice(0, 8) === date.toISOString().slice(0, 8)
      );
    });
    if (!checkInsOnSameDate) {
      return null;
    }
    return checkInsOnSameDate;
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = this.items.filter((i) => checkInId === i.id);
    return checkIn[0] || null;
  }

  async findManyByUserId(userId: string, page?: number): Promise<CheckIn[]> {
    return this.items
      .filter((i) => userId === i.user_id)
      .slice(((page || 1) - 1) * 20, (page || 1) * 20);
  }

  async countByUerId(userId: string): Promise<number> {
    return this.items.filter((i) => userId === i.user_id).length;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: Math.random().toString(32).slice(2),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };
    this.items.push(checkIn);
    return checkIn;
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
    }
    return checkIn;
  }
}
