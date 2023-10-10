/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "./entities/transaction.entity";
import { Category } from "src/category/entities/category.entity";
import { CategoryService } from "src/category/category.service";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Category])],
  controllers: [TransactionsController],
  providers: [TransactionsService, CategoryService],
})
export class TransactionsModule {}
