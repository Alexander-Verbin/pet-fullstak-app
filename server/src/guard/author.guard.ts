/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CategoryService } from "src/category/category.service";
import { TransactionsService } from "../transactions/transactions.service";

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly categoryService: CategoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, type } = request.params;
    const user = request.user;
    let entity;

    switch (type) {
      case "transaction":
        entity = await this.transactionsService.findOne(id);
        break;
      case "category":
        entity = await this.categoryService.findOne(id);
        break;
      default:
        throw new NotFoundException("Что то пошло не так...");
    }

    if (entity && user && entity.user.id === user.id) {
      return true;
    }

    throw new BadRequestException("Что то пошло не так...");
  }
}
