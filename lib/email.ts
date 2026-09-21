import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Strong Tower Concepts <onboarding@resend.dev>";

interface TransactionEmailData {
  customerFirstName: string;
  customerLastName?: string | null;
  customerEmail: string;
  transactionReference: string;
  transactionType: string;
  amount: number;
  status: string;
  description?: string | null;
  transactionDate?: Date;
  balanceAfter?: number | null;
  serviceName?: string | null;
}

interface OrderItem {
  productName: string;
  productType: string;
  model?: string | null;
  lengthInches?: number | null;
  widthInches?: number | null;
  thicknessInches?: number | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

interface OrderEmailData {
  orderNumber: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  totalAmount: number;
  paymentReference: string;
  paidAt: Date;
  items: OrderItem[];
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(date?: Date) {
  return (date || new Date()).toLocaleString("en-NG");
}

function buildEmailLayout(content: string) {
  return `
    <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:30px 15px;">

        <div style="background:#111827;padding:24px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:24px;">
            STRONG TOWER CONCEPTS
          </h1>
          <p style="margin:8px 0 0;color:#d1d5db;">
            One Vision, Many Solutions, Endless Value
          </p>
        </div>

        <div style="background:#ffffff;padding:30px;">
          ${content}
        </div>

        <div style="padding:20px;text-align:center;color:#6b7280;font-size:12px;">
          © ${new Date().getFullYear()} Strong Tower Concepts.
          All rights reserved.
        </div>

      </div>
    </div>
  `;
}

function formatProductDetails(item: OrderItem) {
  const details: string[] = [];

  if (item.model) {
    details.push(`Model: ${escapeHtml(item.model)}`);
  }

  if (item.lengthInches != null && item.widthInches != null) {
    details.push(
      `Size: ${item.lengthInches}" x ${item.widthInches}"`
    );
  }

  if (item.thicknessInches != null) {
    details.push(
      `Thickness: ${item.thicknessInches}"`
    );
  }

  return details.join(" | ");
}

function buildItemsHtml(items: OrderItem[]) {
  return items
    .map((item) => {
      const details = formatProductDetails(item);

      return `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
            <strong>${escapeHtml(item.productName)}</strong>

            ${
              details
                ? `
                  <div style="font-size:13px;color:#6b7280;margin-top:4px;">
                    ${details}
                  </div>
                `
                : ""
            }
          </td>

          <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center;">
            ${item.quantity}
          </td>

          <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right;">
            ${formatCurrency(item.lineTotal)}
          </td>
        </tr>
      `;
    })
    .join("");
}

/* =========================================================
   CENTRAL STC TRANSACTION EMAIL
   ========================================================= */

export async function sendTransactionEmail(
  transaction: TransactionEmailData
) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");

    return {
      success: false,
      error: "RESEND_API_KEY is not configured.",
    };
  }

  const customerName = escapeHtml(
    transaction.customerFirstName
  );

  const transactionStatus = escapeHtml(
    transaction.status
  );

  const transactionType = escapeHtml(
    transaction.transactionType
  );

  const reference = escapeHtml(
    transaction.transactionReference
  );

  const description = transaction.description
    ? escapeHtml(transaction.description)
    : "";

  const balanceSection =
    transaction.balanceAfter != null
      ? `
        <p style="margin:8px 0;">
          <strong>Wallet Balance:</strong>
          ${formatCurrency(transaction.balanceAfter)}
        </p>
      `
      : "";

  const serviceSection = transaction.serviceName
    ? `
        <p style="margin:8px 0;">
          <strong>Service:</strong>
          ${escapeHtml(transaction.serviceName)}
        </p>
      `
    : "";

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: transaction.customerEmail,
      subject: `${transactionStatus} – ${reference}`,
      html: buildEmailLayout(`
        <h2 style="margin-top:0;color:#111827;">
          Transaction ${transactionStatus}
        </h2>

        <p style="color:#374151;">
          Dear ${customerName},
        </p>

        <p style="color:#374151;line-height:1.6;">
          This is to confirm that your transaction with Strong Tower
          Concepts has been processed.
        </p>

        <div style="background:#f9fafb;padding:18px;margin:24px 0;">

          <p style="margin:8px 0;">
            <strong>Transaction Type:</strong>
            ${transactionType}
          </p>

          <p style="margin:8px 0;">
            <strong>Transaction Reference:</strong>
            ${reference}
          </p>

          <p style="margin:8px 0;">
            <strong>Amount:</strong>
            ${formatCurrency(transaction.amount)}
          </p>

          <p style="margin:8px 0;">
            <strong>Status:</strong>
            <span style="color:#15803d;">
              ${transactionStatus}
            </span>
          </p>

          ${
            description
              ? `
                <p style="margin:8px 0;">
                  <strong>Description:</strong>
                  ${description}
                </p>
              `
              : ""
          }

          ${serviceSection}

          <p style="margin:8px 0;">
            <strong>Date:</strong>
            ${formatDate(transaction.transactionDate)}
          </p>

          ${balanceSection}

        </div>

        <p style="color:#374151;line-height:1.6;">
          Please keep this transaction reference for your records.
        </p>

        <p style="color:#374151;">
          Thank you for choosing Strong Tower Concepts.
        </p>
      `),
    });

    return {
      success: true,
      id: result.data?.id,
    };
  } catch (error) {
    console.error("STC transaction email error:", error);

    return {
      success: false,
      error: "Failed to send transaction email.",
    };
  }
}

/* =========================================================
   WALLET EMAILS
   ========================================================= */

export async function sendWalletFundingEmail(
  data: TransactionEmailData
) {
  return sendTransactionEmail({
    ...data,
    transactionType: "WALLET FUNDING",
    status: data.status || "PAYMENT APPROVED",
    description:
      data.description || "Wallet funding transaction",
  });
}

export async function sendWalletDebitEmail(
  data: TransactionEmailData
) {
  return sendTransactionEmail({
    ...data,
    transactionType: "WALLET DEBIT",
    status: data.status || "TRANSACTION APPROVED",
    description:
      data.description || "Wallet debit transaction",
  });
}

export async function sendWalletRefundEmail(
  data: TransactionEmailData
) {
  return sendTransactionEmail({
    ...data,
    transactionType: "WALLET REFUND",
    status: data.status || "REFUND APPROVED",
    description:
      data.description || "Wallet refund transaction",
  });
}

/* =========================================================
   SERVICE PAYMENT EMAIL
   ========================================================= */

export async function sendServicePaymentEmail(
  data: TransactionEmailData
) {
  return sendTransactionEmail({
    ...data,
    transactionType:
      data.transactionType || "SERVICE PAYMENT",
    status: data.status || "PAYMENT APPROVED",
  });
}

/* =========================================================
   CUSTOMER ORDER CONFIRMATION
   ========================================================= */

export async function sendCustomerOrderConfirmation(
  order: OrderEmailData
) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");

    return {
      success: false,
      error: "RESEND_API_KEY is not configured.",
    };
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customerEmail,
      subject: `Order Confirmed – ${order.orderNumber}`,
      html: buildEmailLayout(`
        <h2 style="margin-top:0;color:#111827;">
          Payment Approved
        </h2>

        <p style="color:#374151;">
          Dear ${escapeHtml(order.customerFirstName)},
        </p>

        <p style="color:#374151;line-height:1.6;">
          Thank you for your order with Strong Tower Concepts.
          Your payment has been successfully verified and your
          order has been received.
        </p>

        <div style="background:#f9fafb;padding:18px;margin:24px 0;">

          <p style="margin:5px 0;">
            <strong>Order Number:</strong>
            ${escapeHtml(order.orderNumber)}
          </p>

          <p style="margin:5px 0;">
            <strong>Payment Status:</strong>
            <span style="color:#15803d;">
              PAYMENT APPROVED
            </span>
          </p>

          <p style="margin:5px 0;">
            <strong>Payment Reference:</strong>
            ${escapeHtml(order.paymentReference)}
          </p>

          <p style="margin:5px 0;">
            <strong>Amount Paid:</strong>
            ${formatCurrency(order.totalAmount)}
          </p>

          <p style="margin:5px 0;">
            <strong>Payment Date:</strong>
            ${formatDate(order.paidAt)}
          </p>

          <p style="margin:5px 0;">
            <strong>Order Status:</strong>
            PAYMENT APPROVED
          </p>

        </div>

        <h3 style="color:#111827;">
          Order Details
        </h3>

        <table style="width:100%;border-collapse:collapse;">

          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:12px;text-align:left;">
                Product
              </th>

              <th style="padding:12px;text-align:center;">
                Qty
              </th>

              <th style="padding:12px;text-align:right;">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            ${buildItemsHtml(order.items)}
          </tbody>

        </table>

        <h3 style="color:#111827;margin-top:28px;">
          Delivery Information
        </h3>

        <p style="color:#374151;line-height:1.6;">
          ${escapeHtml(order.deliveryAddress)}<br />
          ${escapeHtml(order.deliveryCity)},
          ${escapeHtml(order.deliveryState)}<br />
          Phone: ${escapeHtml(order.customerPhone)}
        </p>

        <p style="margin-top:30px;color:#374151;line-height:1.6;">
          Our team will process your order and contact you regarding
          delivery arrangements. You can also track your order from
          your Strong Tower Concepts customer dashboard.
        </p>

        <p style="color:#374151;">
          Thank you for choosing Strong Tower Concepts.
        </p>
      `),
    });

    return {
      success: true,
      id: result.data?.id,
    };
  } catch (error) {
    console.error("Customer order email error:", error);

    return {
      success: false,
      error: "Failed to send customer order confirmation.",
    };
  }
}

/* =========================================================
   ADMIN ORDER NOTIFICATION
   ========================================================= */

export async function sendAdminOrderNotification(
  order: OrderEmailData
) {
  const adminEmail = process.env.STC_ADMIN_EMAIL;

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");

    return {
      success: false,
      error: "RESEND_API_KEY is not configured.",
    };
  }

  if (!adminEmail) {
    console.error("STC_ADMIN_EMAIL is not configured.");

    return {
      success: false,
      error: "STC_ADMIN_EMAIL is not configured.",
    };
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `PAID ORDER – ${order.orderNumber}`,
      html: buildEmailLayout(`
        <h2 style="margin-top:0;color:#111827;">
          NEW PAID ORDER
        </h2>

        <h3>Payment Approved</h3>

        <p>
          <strong>Order:</strong>
          ${escapeHtml(order.orderNumber)}
        </p>

        <p>
          <strong>Customer:</strong>
          ${escapeHtml(order.customerFirstName)}
          ${escapeHtml(order.customerLastName)}
        </p>

        <p>
          <strong>Email:</strong>
          ${escapeHtml(order.customerEmail)}
        </p>

        <p>
          <strong>Phone:</strong>
          ${escapeHtml(order.customerPhone)}
        </p>

        <p>
          <strong>Amount Paid:</strong>
          ${formatCurrency(order.totalAmount)}
        </p>

        <p>
          <strong>Payment Reference:</strong>
          ${escapeHtml(order.paymentReference)}
        </p>

        <h3>Delivery Address</h3>

        <p>
          ${escapeHtml(order.deliveryAddress)}<br />
          ${escapeHtml(order.deliveryCity)},
          ${escapeHtml(order.deliveryState)}
        </p>

        <h3>Items</h3>

        <table style="width:100%;border-collapse:collapse;">

          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:10px;text-align:left;">
                Product
              </th>

              <th style="padding:10px;text-align:center;">
                Qty
              </th>

              <th style="padding:10px;text-align:right;">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            ${buildItemsHtml(order.items)}
          </tbody>

        </table>

        <p style="margin-top:25px;">
          <strong>Action:</strong>
          Process this paid order.
        </p>
      `),
    });

    return {
      success: true,
      id: result.data?.id,
    };
  } catch (error) {
    console.error("Admin order email error:", error);

    return {
      success: false,
      error: "Failed to send admin order notification.",
    };
  }
}