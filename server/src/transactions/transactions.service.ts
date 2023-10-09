/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "./entities/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      user: { id },
      category: { id: Number(createTransactionDto.category) },
    };
    if (!newTransaction) {
      throw new BadRequestException("Что то пошло не так...");
    }
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      order: {
        createdAt: "DESC",
      },
    });

    if (!transactions) {
      throw new NotFoundException("Пока не было не одной транзакции");
    }
    return transactions;
  }

  async findOne(id: number) {
    const transactions = await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        category: true,
      },
    });

    if (!transactions) {
      throw new NotFoundException("Такая транзакция не найдена");
    }
    return transactions;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transactions = await this.transactionRepository.findOne({
      where: {
        id,
      },
    });
    if (!transactions) {
      throw new NotFoundException("Такая транзакция не найдена");
    }
    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const transactions = await this.transactionRepository.findOne({
      where: {
        id,
      },
    });
    if (!transactions) {
      throw new NotFoundException("Такая транзакция не найдена");
    }
    return await this.transactionRepository.delete(id);
  }

  async findAllWidthPagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      relations: {
        category: true,
        user: true,
      },
      order: {
        createdAt: "DESC",
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return transactions;
  }
}
