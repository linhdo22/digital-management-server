import { Request, Response } from "express";
import { User } from "src/entity/user";
import { PaymentServices } from "src/service/payment.service";
import userService from "src/service/user.service";
import crypto from "crypto";
import qs from "qs";
import dateFormat from "dateformat";
import moment from "moment";

const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_Returnurl = "http://localhost:3000/payment/vnpay-return";
const vnp_TmnCode = "NY64XAFL"; //Mã website tại VNPAY
const vnp_HashSecret = "ZZIOHCMIXAMUAOAXRSGIKNKXOFKGREVO"; //Chuỗi bí mật

function sortObject(obj: any) {
  var sorted: any = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

class PaymentControllerClass {
  async getAll(req: Request, res: Response) {
    const { userId } = req.body;
    const paymentList = await PaymentServices.getList(userId);
    res.jsonp({ data: paymentList });
  }

  async getPayingStatus(req: Request, res: Response) {
    const { userId } = req.body;
    const user = await userService.get(userId);
    res.jsonp({ data: user?.paying });
  }
  async changePayingStatus(req: Request, res: Response) {
    const { status, userId } = req.body;
    await userService.changePaymentStatus(userId, status);
    console.log();
    res.jsonp({ data: status });
  }
  async finishPayment(req: Request, res: Response) {
    const { paymentId } = req.body;
    const payment = await PaymentServices.finishPayment(paymentId);
    res.jsonp({ data: payment });
  }
  async createPayment(req: Request, res: Response) {
    const { amount, orderInfo } = req.body;
    const ipAddr = "127.0.0.1";

    const tmnCode = vnp_TmnCode;
    const secretKey = vnp_HashSecret;
    let vnpUrl = vnp_Url;
    const returnUrl = vnp_Returnurl;

    const date = new Date();

    const createDate = moment(date).format("YYYYMMDDHHmmss");
    const orderId = moment(date).format("HHmmss");

    let locale = req.body.language ?? "";
    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params: any = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;

    vnp_Params = sortObject(vnp_Params);

    var signData = qs.stringify(vnp_Params, { encode: false });

    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

    res.jsonp({ redirect: vnpUrl });
  }
}

export const PaymentController = new PaymentControllerClass();
