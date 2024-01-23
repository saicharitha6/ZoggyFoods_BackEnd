import {
  Customer,
  CustomerService,
  TransactionBaseService,
} from "@medusajs/medusa";
import { Expo } from "expo-server-sdk";

class PushNotificationService extends TransactionBaseService {
  private customerService: CustomerService;
  private expo: Expo;
  constructor(container) {
    super(container);
    this.customerService = container.customerService;
    this.expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  }
  getMessage() {
    return `Welcome to My Store!`;
  }

  async getCustomers() {
    const customers = await this.customerService.list();
    return customers;
  }

  async sendPushNotification(customers: Customer[], body) {
    let messages = [];
    let tickets = [];
    const { title, message, data } = body;
    for (let customer of customers) {
      const { metadata } = customer;
      if (metadata && metadata?.pushNotificationToken) {
        const { pushNotificationToken } = metadata;
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushNotificationToken)) {
          console.error(
            `Push token ${pushNotificationToken} is not a valid Expo push token`
          );
          continue;
        }

        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
          to: pushNotificationToken,
          sound: "default",
          body: message,
          title,
          data: { withSome: "data" },
        });
        let chunks = this.expo.chunkPushNotifications(messages);
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
          try {
            let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
    return tickets;
  }
}
export default PushNotificationService;
