/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { TransactionsService } from "src/transactions/transactions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Transaction])],
  controllers: [CategoryController],
  providers: [CategoryService, TransactionsService],
})
export class CategoryModule {}
