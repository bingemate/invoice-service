import { Controller, Get, Headers, HttpCode, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from './dto/invoice.dto';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiOperation({ description: "Get current user's invoices" })
  @ApiOkResponse({ type: [InvoiceDto] })
  @Get()
  async getInvoices(@Headers() headers): Promise<InvoiceDto[]> {
    const userId = headers['user-id'];
    return await this.invoiceService.getInvoicesByUserId(userId);
  }

  @ApiOperation({ description: "Get current user's last invoice" })
  @ApiOkResponse({ type: InvoiceDto })
  @Get('/last')
  async getLastInvoice(@Headers() headers): Promise<InvoiceDto> {
    const userId = headers['user-id'];
    return await this.invoiceService.getLastInvoiceByUserId(userId);
  }

  @ApiOperation({ description: "Get current user's invoice by id" })
  @ApiOkResponse({ type: InvoiceDto })
  @ApiParam({ name: 'invoiceId', format: 'uuid' })
  @Get('/:invoiceId')
  async getInvoiceById(
    @Headers() headers,
    @Param('invoiceId') invoiceId,
  ): Promise<InvoiceDto> {
    const userId = headers['user-id'];
    return await this.invoiceService.getInvoiceById(invoiceId, userId);
  }
}
