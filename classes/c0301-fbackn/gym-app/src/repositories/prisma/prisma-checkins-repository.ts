import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaCheckinsRepository implements CheckInsRepository {
  async countByUerId(userId: string): Promise<number> {
    return prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return prisma.checkIn.create({
      data,
    });
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    return prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: new Date(date.getFullYear(), date.getMonth(), date.getDay()),
          lte: new Date(date.getFullYear(), date.getMonth(), date.getDay() + 1),
        },
      },
    });
    return checkIn || null;
  }

  async findManyByUserId(userId: string, page?: number): Promise<CheckIn[]> {
    return prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: ((page || 1) - 1) * 20,
    });
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    return prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });
  }
}
