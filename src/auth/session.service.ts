import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionService {
  private sessions: Map<string, any> = new Map();

  createSession() {
    const sessionId = uuidv4();
    console.log("This is in the createSession function")
    console.log('sessionId', sessionId);
    this.sessions.set(sessionId, { context: [] });
    return sessionId;
  }

  getSession(sessionId: string) {
    return this.sessions.get(sessionId);
  }

  updateSession(sessionId: string, context: any) {
    if (this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, { context });
    }
  }

  deleteSession(sessionId: string) {
    this.sessions.delete(sessionId);
  }
}
