import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ChatGateway } from '../../src/chat/chat.gateway';
import { AppModule } from '../../src/app.module';

describe('ChatGateway', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const httpServer = createServer();
    server = new Server(httpServer);
    new ChatGateway().server = server;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle WebSocket connection', (done) => {
    const client = require('socket.io-client')('http://localhost:3000');
    client.on('connect', () => {
      client.emit('msgToServer', 'Hello server');
    });

    client.on('msgToClient', (message: string) => {
      expect(message).toBe('Hello server');
      client.disconnect();
      done();
    });
  });

  it('should handle disconnection', (done) => {
    const client = require('socket.io-client')('http://localhost:3000');
    client.on('disconnect', () => {
      done();
    });

    client.on('connect', () => {
      client.disconnect();
    });
  });

  it('should log connection and disconnection', (done) => {
    const client = require('socket.io-client')('http://localhost:3000');
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    client.on('connect', () => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Client connected'));
      client.disconnect();
    });

    client.on('disconnect', () => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Client disconnected'));
      logSpy.mockRestore();
      done();
    });
  });
});
