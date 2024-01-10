import { CustomerService, TransactionBaseService } from "@medusajs/medusa";
import { Twilio } from "twilio";
class SmsService extends TransactionBaseService {
  private customerService: CustomerService;
  //   private twilioSmsService;
  private client;
  private accountSid = process.env.TWILIO_SMS_ACCOUNT_SID;
  private authToken = process.env.TWILIO_SMS_AUTH_TOKEN;
  private serviceSid = process.env.TWILIO_SERVICE_SID;

  constructor(container) {
    super(container);
    this.customerService = container.customerService;
    // this.twilioSmsService = container.resolve("twilioSmsService");
    console.log(this.accountSid, this.authToken);
    this.client = new Twilio(this.accountSid, this.authToken);
  }

  async sendOTP(sendTo: string) {
    return await this.client.verify.v2
      .services(this.serviceSid)
      .verifications.create({ to: sendTo, channel: "sms" })
      .then((verification) => verification)
      .catch((err) => {
        throw new Error(err);
      });
  }

  async VerifyOTP(data: { sendTo: string; otp: string }) {
    return await this.client.verify.v2
      .services(this.serviceSid)
      .verificationChecks.create({ to: data.sendTo, code: data.otp })
      .then((verification) => verification)
      .catch((err) => {
        throw new Error(err);
      });
  }
}
export default SmsService;
