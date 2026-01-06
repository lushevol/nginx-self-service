import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { changeRequests } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { randomUUID } from 'crypto';

@Injectable()
export class ChangeRequestService {
  async create(
    team: string,
    env: string,
    upstreams: string,
    locations: string,
  ) {
    const id = randomUUID();
    const now = Date.now();
    await db.insert(changeRequests).values({
      id,
      team,
      environment: env,
      upstreamsConfig: upstreams,
      locationsConfig: locations,
      status: 'PENDING',
      createdAt: now,
      updatedAt: now,
    });
    return id;
  }

  async findAllByTeam(team: string) {
    return db
      .select()
      .from(changeRequests)
      .where(eq(changeRequests.team, team))
      .orderBy(desc(changeRequests.createdAt));
  }

  async findPending() {
    return db
      .select()
      .from(changeRequests)
      .where(eq(changeRequests.status, 'PENDING'));
  }

  async updateStatus(id: string, status: string, prId?: string) {
    await db
      .update(changeRequests)
      .set({ status, prId, updatedAt: Date.now() })
      .where(eq(changeRequests.id, id));
  }

  async delete(id: string) {
    await db.delete(changeRequests).where(eq(changeRequests.id, id));
  }
}
