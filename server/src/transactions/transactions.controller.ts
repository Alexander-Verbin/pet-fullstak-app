/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AuthorGuard } from "src/guard/author.guard";

@Controller("transaction")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionsService.create(
      createTransactionDto,
      Number(req.user.id),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.transactionsService.findAll(Number(req.user.id));
  }

  @Get("pagination")
  @UseGuards(JwtAuthGuard)
  findAllWidthPagination(
    @Req() req,
    @Query("page") page: number,
    @Query("limit") limit: number,
  ) {
    return this.transactionsService.findAllWidthPagination(
      Number(req.user.id),
      Number(page),
      Number(limit),
    );
  }

  @Get(":type/find")
  @UseGuards(JwtAuthGuard)
  findAllByType(@Req() req, @Param("type") type: string) {
    return this.transactionsService.findAllByType(Number(req.user.id), type);
  }

  @Get(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param("id") id: string) {
    return this.transactionsService.findOne(Number(id));
  }

  @Patch(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param("id") id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(Number(id), updateTransactionDto);
  }

  @Delete(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param("id") id: string) {
    return this.transactionsService.remove(+id);
  }
}
