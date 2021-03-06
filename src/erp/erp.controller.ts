import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { CategoryModel, ProductModel, StockModel } from './interfaces';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateProductDto,
  UpdateProductDto,
  CreateStockDto,
  UpdateStockDto,
  CreateWaybillDto,
} from './dto';
import { ERPService } from './erp.service';
import { TransactionService } from './transaction.service';
import moment = require('moment');

@Controller('/erp')
export class ERPController {
  constructor(
    private readonly erpService: ERPService,
    private readonly transactionService: TransactionService,
  ) {}

  // Cateories
  @Get('/categories')
  async getCategories(): Promise<CategoryModel[]> {
    return await this.erpService.getCategories();
  }
  @Post('/categories')
  async createCategory(
    @Body() cateory: CreateCategoryDto,
  ): Promise<CategoryModel> {
    return await this.erpService.createCategory(cateory);
  }
  @Put('/categories/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ) {
    return await this.erpService.updateCategory(id, category);
  }
  @Delete('/categories/:id')
  async removeCategory(@Param('id') id: string) {
    return await this.erpService.removeCategory(id);
  }

  // Products
  @Get('/products')
  async getProducts(): Promise<ProductModel[]> {
    return await this.erpService.getProducts();
  }
  @Post('/products')
  async createProduct(
    @Body() product: CreateProductDto,
  ): Promise<ProductModel> {
    return await this.erpService.createProduct(product);
  }
  @Put('/products/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ) {
    return await this.erpService.updateProduct(id, product);
  }
  @Delete('/products/:id')
  async removeProduct(@Param('id') id: string) {
    return await this.erpService.removeProduct(id);
  }

  // Stocks
  @Get('/stocks')
  async getStocks(): Promise<StockModel[]> {
    return await this.erpService.getStocks();
  }
  @Post('/stocks')
  async createStock(@Body() stock: CreateStockDto): Promise<StockModel> {
    return await this.erpService.createStock(stock);
  }
  @Put('/stocks/:id')
  async updateStock(
    @Param('id') id: string,
    @Body() stock: UpdateStockDto,
  ): Promise<StockModel> {
    return await this.erpService.updateStock(id, stock);
  }
  @Delete('/stocks/:id')
  async removeStock(@Param('id') id: string) {
    return await this.erpService.removeStock(id);
  }

  @Post('/waybill')
  async createWaybill(@Body() waybill: CreateWaybillDto) {
    await this.transactionService.CreateWaybill(waybill);
  }

  @Get('/waybills')
  async getWaybills(): Promise<any> {
    return await this.transactionService.GetWaybills();
  }

  // Residue
  @Get('/residue')
  async calculateResidue(
    @Query('startDate') start: Date,
    @Query('endDate') end: Date,
    @Query('stock') stock: string,
  ) {
    return await this.transactionService.CalculateResidue({
      stock: stock,
      startDate: moment.utc(start).startOf('day').toDate(),
      endDate: moment.utc(end).endOf('day').toDate(),
    });
  }
}
