import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import { CustomerRepository } from '../../../repositories/customer';
import { Customer } from "../../../models/Customer";

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {

  try {
    const { customerId, dlId } = req.body;
    const locationUpdated = await CustomerRepository
      .createQueryBuilder()
      .update(Customer)
      .set({ dl_id: dlId })
      .where("id = :id", { id: customerId })
      .execute();

    res.json({
      locationUpdated,
    })
  } catch (error) {
    console.error('Error updating customer region:', error);
    res.status(500).json({ error: 'Error customer region', errwor: error });
  }
}
