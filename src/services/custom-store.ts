import {
  Customer,
  CustomerService,
  TransactionBaseService,
} from "@medusajs/medusa";

class CustomStoreService extends TransactionBaseService {
  private customerService: CustomerService;
  constructor(container) {
    super(container);
    this.customerService = container.customerService;
  }

  async retrieveByPhone(phone: string) {
    return await this.customerService.retrieveByPhone(phone);
  }
}
export default CustomStoreService;
