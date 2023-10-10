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
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AuthorGuard } from "src/guard/author.guard";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    console.log("!!!", req.user);
    return this.categoryService.create(createCategoryDto, Number(req.user.id));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.categoryService.findAll(Number(req.user.id));
  }

  @Get(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(Number(id));
  }

  @Patch(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(Number(id), updateCategoryDto);
  }

  @Delete(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param("id") id: string) {
    return this.categoryService.remove(Number(id));
  }
}
