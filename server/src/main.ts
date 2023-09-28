import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const server = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
};
server();
