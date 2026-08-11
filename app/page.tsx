"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const WHATSAPP_NUMBER = "919699181372";

type FoodItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
};

type Bill = {
  id: number;
  bill_number: number;
  customer_name: string;
  customer_mobile: string | null;
  order_type: string;
  table_number: string | null;
  grand_total: number;
  discount: number;
  payment_method: string | null;
  status: string | null;
  created_at: string;
};

type BillItem = {
  id?: number;
  bill_id?: number;
  item_name: string;
  quantity: number;
  price: number;
  total: number;
};

const initialItems: FoodItem[] = [
  {
    id: 1,
    name: "घावणे (Ghavane) - 2 pcs",
    price: 80,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 2,
    name: "आलू पराठा (Aloo Paratha) - 2 pcs",
    price: 80,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 3,
    name: "उपमा (Upma)",
    price: 50,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 4,
    name: "पोहे (Poha)",
    price: 50,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 5,
    name: "वडा पाव (Vada Pav) - 1 pc",
    price: 12,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 6,
    name: "मिसळ पाव (Misal Pav)",
    price: 70,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 7,
    name: "ऑम्लेट पाव डबल (Omelette Pav Double)",
    price: 50,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 8,
    name: "शिरा (Sheera)",
    price: 70,
    quantity: 0,
    category: "Breakfast",
  },
  {
    id: 9,
    name: "व्हेज प्लेट (Veg Plate)",
    price: 200,
    quantity: 0,
    category: "Veg",
  },
  {
    id: 10,
    name: "चिकन प्लेट (Chicken Plate)",
    price: 230,
    quantity: 0,
    category: "Non-Veg",
  },
  {
    id: 11,
    name: "स्पेशल चिकन प्लेट (Special Chicken Plate)",
    price: 280,
    quantity: 0,
    category: "Non-Veg",
  },
  {
    id: 12,
    name: "फिश प्लेट (Fish Plate)",
    price: 400,
    quantity: 0,
    category: "Fish",
  },
  {
    id: 13,
    name: "सुरमई करी - 2 pcs (Surmai Curry)",
    price: 400,
    quantity: 0,
    category: "Fish",
  },
  {
    id: 14,
    name: "सुरमई फ्राय - 2 pcs (Surmai Fry)",
    price: 400,
    quantity: 0,
    category: "Fish",
  },
  {
    id: 15,
    name: "पापलेट करी - 1 Plate (Pomfret Curry)",
    price: 400,
    quantity: 0,
    category: "Fish",
  },
  {
    id: 16,
    name: "पापलेट फ्राय - 1 Plate (Pomfret Fry)",
    price: 300,
    quantity: 0,
    category: "Fish",
  },
  {
    id: 17,
    name: "सुरमई थाळी (Surmai Thali)",
    price: 400,
    quantity: 0,
    category: "Thali",
  },
  {
    id: 18,
    name: "पापलेट थाळी (Pomfret Thali)",
    price: 450,
    quantity: 0,
    category: "Thali",
  },
  {
    id: 19,
    name: "चिकन सुक्का - 10 pcs (Chicken Sukka)",
    price: 250,
    quantity: 0,
    category: "Specials",
  },
  {
    id: 20,
    name: "चिकन करी - 10 pcs (Chicken Curry)",
    price: 280,
    quantity: 0,
    category: "Specials",
  },
  {
    id: 21,
    name: "मटण प्लेट (Mutton Plate)",
    price: 500,
    quantity: 0,
    category: "Specials",
  },
  {
    id: 22,
    name: "डाळ (Dal)",
    price: 80,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 23,
    name: "भात (Rice)",
    price: 80,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 24,
    name: "मोदक (Modak)",
    price: 40,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 25,
    name: "पुरण पोळी (Puran Poli) - 1 pc",
    price: 40,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 26,
    name: "चपाती (Chapati)",
    price: 25,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 27,
    name: "भाकरी (Bhakri)",
    price: 40,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 28,
    name: "डाळ (Dal)",
    price: 80,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 29,
    name: "डाळ तडका (Dal Tadka)",
    price: 120,
    quantity: 0,
    category: "Extras",
  },
  {
    id: 30,
    name: "मटकी उसळ (Matki Usal)",
    price: 150,
    quantity: 0,
    category: "Veg",
  },
  {
    id: 31,
    name: "मिक्स भाजी (Mix Bhaji)",
    price: 200,
    quantity: 0,
    category: "Veg",
  },
  {
    id: 32,
    name: "आलू भाजी (Aloo Bhaji)",
    price: 0,
    quantity: 0,
    category: "Veg",
  },
  {
    id: 33,
    name: "डाळ खिचडी (Dal Khichdi)",
    price: 120,
    quantity: 0,
    category: "Extras",
  },
];

export default function Home() {
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [orderType, setOrderType] = useState("Dine In");
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState("");

  const [items, setItems] = useState<FoodItem[]>(initialItems);
  const [bills, setBills] = useState<Bill[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Bill[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingBills, setLoadingBills] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"success" | "error">("success");

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [selectedBillItems, setSelectedBillItems] = useState<BillItem[]>([]);
  const [showBillModal, setShowBillModal] = useState(false);

  const [pendingDiscount, setPendingDiscount] = useState("");
  const [pendingPaymentMethod, setPendingPaymentMethod] = useState("Cash");
  const [updatingPending, setUpdatingPending] = useState(false);

  const [search, setSearch] = useState("");

  const [dashboard, setDashboard] = useState({
    todaySales: 0,
    todayBills: 0,
    todayCustomers: 0,
    cash: 0,
    upi: 0,
    card: 0,
  });

  useEffect(() => {
    refreshAll();

    const timer = setInterval(() => {
      refreshAll();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  async function refreshAll() {
    await Promise.all([
      loadPendingOrders(),
      loadBills(),
      loadDashboard(),
    ]);
  }

  async function loadPendingOrders() {
    setLoadingPending(true);

    try {
      const { data, error } = await supabase
        .from("bills")
        .select(
          `
          id,
          bill_number,
          customer_name,
          customer_mobile,
          order_type,
          table_number,
          grand_total,
          discount,
          payment_method,
          status,
          created_at
        `
        )
        .order("created_at", {
          ascending: false,
        })
        .limit(200);

      if (error) {
        console.error("Pending orders error:", error);

        setMessageType("error");
        setMessage(`Pending orders load error: ${error.message}`);
        return;
      }

      const pending = ((data || []) as Bill[])
        .filter((bill) => {
          const status = String(bill.status || "")
            .trim()
            .toLowerCase();

          return status === "pending";
        })
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );

      setPendingOrders(pending);
    } catch (error) {
      console.error("Pending orders error:", error);

      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Pending orders load failed."
      );
    } finally {
      setLoadingPending(false);
    }
  }

  async function loadBills() {
    setLoadingBills(true);

    try {
      const { data, error } = await supabase
        .from("bills")
        .select(
          `
          id,
          bill_number,
          customer_name,
          customer_mobile,
          order_type,
          table_number,
          grand_total,
          discount,
          payment_method,
          status,
          created_at
        `
        )
        .order("created_at", {
          ascending: false,
        })
        .limit(100);

      if (error) {
        console.error("Bills error:", error);
        return;
      }

      const history = ((data || []) as Bill[]).filter((bill) => {
        const status = String(bill.status || "")
          .trim()
          .toLowerCase();

        return status !== "pending" && status !== "rejected";
      });

      setBills(history);
    } catch (error) {
      console.error("Bills load error:", error);
    } finally {
      setLoadingBills(false);
    }
  }

  async function loadDashboard() {
    setDashboardLoading(true);

    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from("bills")
        .select(
          `
          id,
          grand_total,
          payment_method,
          customer_name,
          customer_mobile,
          status,
          created_at
        `
        )
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());

      if (error) {
        console.error("Dashboard error:", error);
        return;
      }

      const rows = (data || []).filter((bill: any) => {
        const status = String(bill.status || "")
          .trim()
          .toLowerCase();

        return status !== "pending" && status !== "rejected";
      });

      const getTotal = (list: any[]) =>
        list.reduce(
          (sum, bill) => sum + Number(bill.grand_total || 0),
          0
        );

      const cashRows = rows.filter(
        (bill: any) =>
          String(bill.payment_method || "").toLowerCase() === "cash"
      );

      const upiRows = rows.filter(
        (bill: any) =>
          String(bill.payment_method || "").toLowerCase() === "upi"
      );

      const cardRows = rows.filter(
        (bill: any) =>
          String(bill.payment_method || "").toLowerCase() === "card"
      );

      const customers = new Set(
        rows
          .map(
            (bill: any) =>
              bill.customer_mobile || bill.customer_name
          )
          .filter(Boolean)
      );

      setDashboard({
        todaySales: getTotal(rows),
        todayBills: rows.length,
        todayCustomers: customers.size,
        cash: getTotal(cashRows),
        upi: getTotal(upiRows),
        card: getTotal(cardRows),
      });
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setDashboardLoading(false);
    }
  }

  async function getBillItems(billId: number): Promise<BillItem[]> {
    const { data, error } = await supabase
      .from("bill_items")
      .select(
        `
        id,
        bill_id,
        item_name,
        quantity,
        price,
        total
      `
      )
      .eq("bill_id", billId)
      .order("id", {
        ascending: true,
      });

    if (error) {
      console.error("Bill items error:", error);
      return [];
    }

    return (data || []) as BillItem[];
  }

  function calculateBillSubtotal(billItems: BillItem[]) {
    return billItems.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) * Number(item.quantity || 0),
      0
    );
  }

  /*
   * IMPORTANT FIX:
   * If bill_items are missing, don't throw an error.
   * Use the bill's saved grand_total + discount as fallback.
   */
  function getBillFinancials(
    bill: Bill,
    billItems: BillItem[]
  ) {
    if (billItems.length > 0) {
      const subtotal = calculateBillSubtotal(billItems);

      const safeDiscount = Math.min(
        Math.max(Number(bill.discount || 0), 0),
        subtotal
      );

      const total = Math.max(0, subtotal - safeDiscount);

      return {
        subtotal,
        discount: safeDiscount,
        total,
      };
    }

    const savedTotal = Math.max(
      0,
      Number(bill.grand_total || 0)
    );

    const savedDiscount = Math.max(
      0,
      Number(bill.discount || 0)
    );

    return {
      subtotal: savedTotal + savedDiscount,
      discount: savedDiscount,
      total: savedTotal,
    };
  }

  async function viewBill(bill: Bill) {
    const billItems = await getBillItems(bill.id);

    setSelectedBill(bill);
    setSelectedBillItems(billItems);

    setPendingDiscount(String(bill.discount || 0));
    setPendingPaymentMethod(bill.payment_method || "Cash");

    setShowBillModal(true);
  }

  async function markBillPaidAndWhatsApp(bill: Bill) {
    setMessage("");
    setUpdatingPending(true);

    try {
      const billItems = await getBillItems(bill.id);

      /*
       * FIX:
       * Do NOT throw when bill_items are missing.
       *
       * Customer order can still be marked PAID using
       * the amount already stored in bills.grand_total.
       */
      const financials = getBillFinancials(
        bill,
        billItems
      );

      const finalDiscount = financials.discount;
      const finalTotal = financials.total;
      const finalPayment = bill.payment_method || "Cash";

      const { error } = await supabase
        .from("bills")
        .update({
          status: "paid",
          discount: finalDiscount,
          grand_total: finalTotal,
          payment_method: finalPayment,
        })
        .eq("id", bill.id);

      if (error) {
        throw new Error(error.message);
      }

      const whatsappMessage = createWhatsAppMessage(
        bill.bill_number,
        billItems,
        finalTotal,
        finalDiscount,
        bill.customer_name,
        bill.customer_mobile || "",
        bill.order_type,
        bill.table_number || "",
        finalPayment,
        "PAID"
      );

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      setMessageType("success");

      setMessage(
        `Order #${bill.bill_number} marked as PAID and WhatsApp opened.`
      );

      setShowBillModal(false);
      setSelectedBill(null);
      setSelectedBillItems([]);

      await refreshAll();
    } catch (error) {
      console.error("PAID error:", error);

      setMessageType("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Bill paid करताना error आला."
      );
    } finally {
      setUpdatingPending(false);
    }
  }

  async function updatePendingDiscount() {
    if (!selectedBill) return;

    /*
     * If items exist, calculate from items.
     * If items don't exist, preserve the saved bill amount.
     */
    const billFinancials = getBillFinancials(
      selectedBill,
      selectedBillItems
    );

    const subtotal = billFinancials.subtotal;

    const enteredDiscount =
      Number(pendingDiscount) || 0;

    if (enteredDiscount < 0 || enteredDiscount > subtotal) {
      setMessageType("error");

      setMessage(
        `Discount must be between ₹0 and ₹${subtotal}.`
      );

      return;
    }

    const newTotal = Math.max(
      0,
      subtotal - enteredDiscount
    );

    setUpdatingPending(true);

    try {
      const { error } = await supabase
        .from("bills")
        .update({
          discount: enteredDiscount,
          grand_total: newTotal,
          payment_method: pendingPaymentMethod,
        })
        .eq("id", selectedBill.id);

      if (error) {
        throw new Error(error.message);
      }

      const updatedBill: Bill = {
        ...selectedBill,
        discount: enteredDiscount,
        grand_total: newTotal,
        payment_method: pendingPaymentMethod,
      };

      setSelectedBill(updatedBill);

      setMessageType("success");

      setMessage(
        `Order #${updatedBill.bill_number} updated successfully.`
      );

      await refreshAll();
    } catch (error) {
      setMessageType("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Update failed."
      );
    } finally {
      setUpdatingPending(false);
    }
  }

  async function rejectOrder(bill: Bill) {
    const ok = window.confirm(
      `Order #${bill.bill_number} reject करायची आहे का?`
    );

    if (!ok) return;

    const { error } = await supabase
      .from("bills")
      .update({
        status: "rejected",
      })
      .eq("id", bill.id);

    if (error) {
      setMessageType("error");
      setMessage(error.message);
      return;
    }

    setMessageType("success");

    setMessage(
      `Order #${bill.bill_number} rejected.`
    );

    setShowBillModal(false);

    await refreshAll();
  }

  function increaseItem(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseItem(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                0,
                item.quantity - 1
              ),
            }
          : item
      )
    );
  }

  function resetItems() {
    setItems(
      initialItems.map((item) => ({
        ...item,
        quantity: 0,
      }))
    );
  }

  const selectedItems = items.filter(
    (item) => item.quantity > 0
  );

  const subtotal = selectedItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const discountAmount = Math.min(
    Math.max(Number(discount) || 0, 0),
    subtotal
  );

  const total = Math.max(
    0,
    subtotal - discountAmount
  );

  const filteredBills = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return bills;

    return bills.filter(
      (bill) =>
        String(bill.bill_number).includes(query) ||
        String(bill.customer_name || "")
          .toLowerCase()
          .includes(query) ||
        String(bill.customer_mobile || "").includes(query)
    );
  }, [bills, search]);

  function createWhatsAppMessage(
    billNumber: number,
    finalItems: FoodItem[] | BillItem[],
    finalTotal: number,
    finalDiscount = 0,
    customer = customerName,
    mobile = customerMobile,
    order = orderType,
    table = tableNumber,
    payment = paymentMethod,
    status = "PAID"
  ) {
    let text =
      `*FOODIES TOWN*\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `*Restaurant Bill*\n` +
      `━━━━━━━━━━━━━━━━━━\n\n`;

    if (billNumber > 0) {
      text += `*Bill No:* ${billNumber}\n`;
    }

    text += `*Customer:* ${
      customer || "Walk-in Customer"
    }\n`;

    if (mobile) {
      text += `*Mobile:* ${mobile}\n`;
    }

    text += `*Order:* ${order}\n`;

    if (order === "Dine In" && table) {
      text += `*Table:* ${table}\n`;
    }

    text += `*Payment:* ${payment}\n`;
    text += `*Status:* ${status}\n\n`;

    const originalSubtotal = finalItems.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );

    if (finalItems.length > 0) {
      finalItems.forEach((item) => {
        const isBillItem = "item_name" in item;

        const itemName = isBillItem
          ? item.item_name
          : item.name;

        const itemPrice = Number(item.price || 0);

        const itemQuantity = Number(
          item.quantity || 0
        );

        const itemTotal = isBillItem
          ? Number(item.total || 0)
          : itemPrice * itemQuantity;

        text += `${itemName}\n`;
        text += `${itemQuantity} x ₹${itemPrice} = *₹${itemTotal}*\n\n`;
      });
    } else {
      /*
       * No bill_items fallback.
       */
      text += `*Item details:* Not available\n`;
      text += `*Saved order amount:* ₹${finalTotal + finalDiscount}\n\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━\n`;

    text += `Subtotal: ₹${originalSubtotal || finalTotal + finalDiscount}\n`;

    if (finalDiscount > 0) {
      text += `Discount: -₹${finalDiscount}\n`;
    }

    text += `*GRAND TOTAL: ₹${finalTotal}*\n`;
    text += `*STATUS: ${status}*\n`;

    text += `━━━━━━━━━━━━━━━━━━\n\n`;

    text += `Thank you for visiting *Foodies Town*! ❤️`;

    return encodeURIComponent(text);
  }

  async function saveBill() {
    setMessage("");

    if (selectedItems.length === 0) {
      setMessageType("error");

      setMessage(
        "Please select at least one food item."
      );

      return;
    }

    if (
      orderType === "Dine In" &&
      !tableNumber.trim()
    ) {
      setMessageType("error");

      setMessage(
        "Please enter table number."
      );

      return;
    }

    if (
      customerMobile.trim() &&
      customerMobile.trim().length !== 10
    ) {
      setMessageType("error");

      setMessage(
        "Please enter a valid 10 digit mobile number."
      );

      return;
    }

    if (Number(discount) < 0) {
      setMessageType("error");

      setMessage(
        "Discount cannot be negative."
      );

      return;
    }

    if (Number(discount) > subtotal) {
      setMessageType("error");

      setMessage(
        "Discount cannot be greater than subtotal."
      );

      return;
    }

    setLoading(true);

    try {
      const { data: lastBill, error: lastBillError } =
        await supabase
          .from("bills")
          .select("bill_number")
          .order("bill_number", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

      if (lastBillError) {
        throw new Error(lastBillError.message);
      }

      const nextBillNumber = lastBill?.bill_number
        ? Number(lastBill.bill_number) + 1
        : 1;

      const finalCustomerName =
        customerName.trim() ||
        "Walk-in Customer";

      if (customerMobile.trim()) {
        const {
          data: existingCustomer,
        } = await supabase
          .from("customers")
          .select("id")
          .eq(
            "mobile",
            customerMobile.trim()
          )
          .maybeSingle();

        if (!existingCustomer) {
          await supabase
            .from("customers")
            .insert({
              name: finalCustomerName,
              mobile: customerMobile.trim(),
            });
        }
      }

      const {
        data: billData,
        error,
      } = await supabase
        .from("bills")
        .insert({
          bill_number: nextBillNumber,
          customer_name: finalCustomerName,
          customer_mobile:
            customerMobile.trim() || null,
          order_type: orderType,
          table_number:
            orderType === "Dine In"
              ? tableNumber.trim() || null
              : null,
          grand_total: total,
          discount: discountAmount,
          payment_method: paymentMethod,
          status: "paid",
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      const billItems = selectedItems.map(
        (item) => ({
          bill_id: billData.id,
          item_name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })
      );

      const {
        error: itemError,
      } = await supabase
        .from("bill_items")
        .insert(billItems);

      if (itemError) {
        throw new Error(itemError.message);
      }

      const whatsappMessage =
        createWhatsAppMessage(
          nextBillNumber,
          selectedItems,
          total,
          discountAmount,
          finalCustomerName,
          customerMobile,
          orderType,
          tableNumber,
          paymentMethod,
          "PAID"
        );

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
        "_blank",
        "noopener,noreferrer"
      );

      setMessageType("success");

      setMessage(
        `Bill #${nextBillNumber} saved successfully!`
      );

      setCustomerName("");
      setCustomerMobile("");
      setTableNumber("");
      setOrderType("Dine In");
      setPaymentMethod("Cash");
      setDiscount("");

      resetItems();

      await refreshAll();
    } catch (error) {
      console.error(error);

      setMessageType("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function shareCurrentBill() {
    if (selectedItems.length === 0) {
      setMessageType("error");

      setMessage(
        "Please select items first."
      );

      return;
    }

    const text = createWhatsAppMessage(
      0,
      selectedItems,
      total,
      discountAmount,
      customerName,
      customerMobile,
      orderType,
      tableNumber,
      paymentMethod,
      "PAID"
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  /*
   * Pending bill financial values.
   *
   * If bill_items exist:
   *   subtotal = items total
   *
   * If bill_items do not exist:
   *   subtotal = saved grand_total + discount
   */
  const pendingFinancials = selectedBill
    ? getBillFinancials(
        selectedBill,
        selectedBillItems
      )
    : {
        subtotal: 0,
        discount: 0,
        total: 0,
      };

  const pendingSubtotal =
    pendingFinancials.subtotal;

  const pendingDiscountNumber = Math.min(
    Math.max(
      Number(pendingDiscount) || 0,
      0
    ),
    pendingSubtotal
  );

  const pendingFinalTotal = Math.max(
    0,
    pendingSubtotal -
      pendingDiscountNumber
  );

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
          <div>
            <h1 className="text-2xl font-black">
              🍴 Foodies Town
            </h1>

            <p className="text-sm text-slate-300">
              Restaurant Billing System
            </p>
          </div>

          <div className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold">
            ● POS Online
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                🔔 Pending Orders
              </h2>

              <p className="text-sm text-slate-500">
                Customer page वरून आलेल्या नवीन orders
              </p>
            </div>

            <button
              onClick={loadPendingOrders}
              className="rounded-xl border bg-white px-4 py-2 text-sm font-bold shadow-sm"
            >
              ↻ Refresh
            </button>
          </div>

          {loadingPending ? (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
              Loading pending orders...
            </div>
          ) : pendingOrders.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="text-5xl">🛎️</div>

              <p className="mt-3 font-bold text-slate-700">
                No Pending Orders
              </p>

              <p className="text-sm text-slate-500">
                नवीन customer order आली की इथे दिसेल.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingOrders.map((order) => (
                <PendingOrderCard
                  key={order.id}
                  order={order}
                  formatDate={formatDate}
                  onView={() => viewBill(order)}
                  onPaid={() =>
                    markBillPaidAndWhatsApp(order)
                  }
                  onReject={() =>
                    rejectOrder(order)
                  }
                />
              ))}
            </div>
          )}
        </section>

        {message && (
          <div
            className={`mb-5 rounded-xl border px-4 py-3 font-medium ${
              messageType === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <section className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                Dashboard
              </h2>

              <p className="text-sm text-slate-500">
                Today's restaurant performance
              </p>
            </div>

            <button
              onClick={refreshAll}
              className="rounded-xl border bg-white px-4 py-2 text-sm font-bold"
            >
              ↻ Refresh
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Today's Sales"
              value={
                dashboardLoading
                  ? "..."
                  : `₹${dashboard.todaySales.toFixed(0)}`
              }
              className="text-orange-600"
            />

            <DashboardCard
              title="Today's Bills"
              value={
                dashboardLoading
                  ? "..."
                  : String(dashboard.todayBills)
              }
            />

            <DashboardCard
              title="Today's Customers"
              value={
                dashboardLoading
                  ? "..."
                  : String(
                      dashboard.todayCustomers
                    )
              }
            />

            <DashboardCard
              title="Average Bill"
              value={
                dashboard.todayBills > 0
                  ? `₹${(
                      dashboard.todaySales /
                      dashboard.todayBills
                    ).toFixed(0)}`
                  : "₹0"
              }
              className="text-blue-600"
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <DashboardCard
              title="💵 Cash Sales"
              value={`₹${dashboard.cash.toFixed(0)}`}
            />

            <DashboardCard
              title="📱 UPI Sales"
              value={`₹${dashboard.upi.toFixed(0)}`}
            />

            <DashboardCard
              title="💳 Card Sales"
              value={`₹${dashboard.card.toFixed(0)}`}
            />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  New Bill
                </h2>

                <p className="text-sm text-slate-500">
                  Enter customer and order details
                </p>
              </div>

              <div className="rounded-lg bg-orange-100 px-3 py-2 text-sm font-bold text-orange-700">
                ₹{total}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Customer Name"
                value={customerName}
                onChange={setCustomerName}
                placeholder="Enter customer name"
              />

              <Input
                label="Customer Mobile"
                value={customerMobile}
                onChange={(value) =>
                  setCustomerMobile(
                    value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                placeholder="10 digit mobile number"
              />

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Order Type
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Dine In",
                    "Take Away",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setOrderType(type)
                      }
                      className={`rounded-xl border px-4 py-3 font-semibold ${
                        orderType === type
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {type === "Dine In"
                        ? "🍽️"
                        : "🥡"}{" "}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Table Number"
                value={tableNumber}
                onChange={setTableNumber}
                placeholder={
                  orderType === "Dine In"
                    ? "Example: 1"
                    : "Not required"
                }
                disabled={
                  orderType !== "Dine In"
                }
              />

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Payment Method
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    "Cash",
                    "UPI",
                    "Card",
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() =>
                        setPaymentMethod(method)
                      }
                      className={`rounded-xl border px-4 py-3 font-bold ${
                        paymentMethod === method
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {method === "Cash"
                        ? "💵"
                        : method === "UPI"
                        ? "📱"
                        : "💳"}{" "}
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold">
                  💸 Discount Amount
                </label>

                <input
                  value={discount}
                  onChange={(e) =>
                    setDiscount(
                      e.target.value.replace(
                        /[^\d.]/g,
                        ""
                      )
                    )
                  }
                  placeholder="Enter discount amount"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
                />

                <p className="mt-1 text-xs text-slate-500">
                  Maximum discount: ₹{subtotal}
                </p>
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">
                  Food Items
                </h3>

                <button
                  onClick={resetItems}
                  className="text-sm font-semibold text-red-600"
                >
                  Clear Items
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-xl border p-4 ${
                      item.quantity > 0
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="min-w-0 pr-3">
                      <p className="font-bold">
                        {item.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() =>
                          decreaseItem(item.id)
                        }
                        className="h-9 w-9 rounded-lg bg-slate-200 text-lg font-bold"
                      >
                        −
                      </button>

                      <span className="w-6 text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseItem(item.id)
                        }
                        className="h-9 w-9 rounded-lg bg-orange-500 text-lg font-bold text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">
              Bill Summary
            </h2>

            <p className="text-sm text-slate-500">
              Review before saving
            </p>

            <div className="mt-5 space-y-3">
              {selectedItems.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
                  <div className="text-4xl">🛒</div>

                  <p className="mt-2">
                    No items selected
                  </p>
                </div>
              ) : (
                selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.quantity} × ₹
                        {item.price}
                      </p>
                    </div>

                    <p className="font-bold">
                      ₹
                      {item.quantity *
                        item.price}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="my-5 border-t pt-5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <b>₹{subtotal}</b>
              </div>

              <div className="mt-2 flex justify-between text-green-600">
                <span>Discount</span>

                <b>
                  -₹{discountAmount}
                </b>
              </div>

              <div className="mt-4 flex justify-between border-t pt-4">
                <span className="font-semibold">
                  Grand Total
                </span>

                <span className="text-3xl font-black text-orange-600">
                  ₹{total}
                </span>
              </div>
            </div>

            <button
              onClick={saveBill}
              disabled={
                loading ||
                selectedItems.length === 0
              }
              className="w-full rounded-xl bg-orange-500 px-5 py-4 text-lg font-bold text-white disabled:opacity-50"
            >
              {loading
                ? "Saving Bill..."
                : "💾 Save Bill & WhatsApp"}
            </button>

            <button
              onClick={shareCurrentBill}
              disabled={
                selectedItems.length === 0
              }
              className="mt-3 w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white disabled:opacity-50"
            >
              📱 Share on WhatsApp
            </button>
          </aside>
        </div>

        <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Bill History
              </h2>

              <p className="text-sm text-slate-500">
                Previous bills
              </p>
            </div>

            <div className="flex gap-2">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search bill/customer/mobile"
                className="w-full rounded-xl border px-4 py-2 md:w-auto"
              />

              <button
                onClick={() => {
                  loadBills();
                  loadDashboard();
                }}
                className="rounded-xl border px-4 py-2 font-bold"
              >
                ↻
              </button>
            </div>
          </div>

          {loadingBills ? (
            <div className="py-8 text-center">
              Loading bills...
            </div>
          ) : filteredBills.length === 0 ? (
            <div className="rounded-xl bg-slate-50 py-8 text-center text-slate-500">
              No bills found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="px-4 py-3">
                      Bill
                    </th>
                    <th className="px-4 py-3">
                      Date
                    </th>
                    <th className="px-4 py-3">
                      Customer
                    </th>
                    <th className="px-4 py-3">
                      Order
                    </th>
                    <th className="px-4 py-3">
                      Payment
                    </th>
                    <th className="px-4 py-3">
                      Discount
                    </th>
                    <th className="px-4 py-3">
                      Total
                    </th>
                    <th className="px-4 py-3">
                      Status
                    </th>
                    <th className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBills.map((bill) => (
                    <tr
                      key={bill.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-bold">
                        #{bill.bill_number}
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {formatDate(
                          bill.created_at
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {bill.customer_name}
                      </td>

                      <td className="px-4 py-3">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {bill.order_type}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {bill.payment_method || "-"}
                      </td>

                      <td className="px-4 py-3 font-semibold text-green-600">
                        -₹{bill.discount || 0}
                      </td>

                      <td className="px-4 py-3 font-black">
                        ₹{bill.grand_total}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            String(
                              bill.status || "paid"
                            ).toLowerCase() ===
                            "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {String(
                            bill.status || "paid"
                          ).toUpperCase()}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              viewBill(bill)
                            }
                            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                          >
                            👁 View
                          </button>

                          <button
                            onClick={() =>
                              markBillPaidAndWhatsApp(
                                bill
                              )
                            }
                            disabled={
                              updatingPending
                            }
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                          >
                            📱 PAID
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Foodies Town • Restaurant POS
        </footer>
      </div>

      {showBillModal && selectedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-xl font-black">
                  Foodies Town
                </h2>

                <p className="text-sm text-slate-500">
                  Order #{selectedBill.bill_number}
                </p>
              </div>

              <button
                onClick={() =>
                  setShowBillModal(false)
                }
                className="rounded-lg bg-slate-100 px-3 py-2 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                <p>
                  <b>Customer:</b>{" "}
                  {selectedBill.customer_name}
                </p>

                <p>
                  <b>Mobile:</b>{" "}
                  {selectedBill.customer_mobile ||
                    "-"}
                </p>

                <p>
                  <b>Order:</b>{" "}
                  {selectedBill.order_type}
                </p>

                <p>
                  <b>Table:</b>{" "}
                  {selectedBill.table_number ||
                    "-"}
                </p>

                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={
                      String(
                        selectedBill.status || ""
                      ).toLowerCase() ===
                      "pending"
                        ? "font-bold text-orange-600"
                        : "font-bold text-green-600"
                    }
                  >
                    {String(
                      selectedBill.status || ""
                    ).toUpperCase()}
                  </span>
                </p>

                <p>
                  <b>Payment:</b>{" "}
                  {selectedBill.payment_method ||
                    "-"}
                </p>
              </div>

              <div className="mt-5 overflow-x-auto">
                {selectedBillItems.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="px-2 py-3">
                          Item
                        </th>
                        <th className="px-2 py-3">
                          Qty
                        </th>
                        <th className="px-2 py-3">
                          Price
                        </th>
                        <th className="px-2 py-3">
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedBillItems.map(
                        (item, index) => (
                          <tr
                            key={
                              item.id ??
                              index
                            }
                            className="border-b"
                          >
                            <td className="px-2 py-3 font-semibold">
                              {item.item_name}
                            </td>

                            <td className="px-2 py-3">
                              {item.quantity}
                            </td>

                            <td className="px-2 py-3">
                              ₹{item.price}
                            </td>

                            <td className="px-2 py-3 font-bold">
                              ₹{item.total}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <div className="text-3xl">
                      🧾
                    </div>

                    <p className="mt-2 font-bold text-slate-700">
                      Item details unavailable
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      या order साठी bill_items मध्ये
                      items save झालेले नाहीत.
                    </p>

                    <p className="mt-3 text-lg font-black text-orange-600">
                      Saved Total: ₹
                      {selectedBill.grand_total}
                    </p>
                  </div>
                )}
              </div>

              {String(
                selectedBill.status || ""
              ).toLowerCase() === "pending" && (
                <div className="mt-6 rounded-2xl border-2 border-orange-200 bg-orange-50 p-4">
                  <h3 className="text-lg font-black text-orange-800">
                    💸 Order Payment
                  </h3>

                  <p className="mt-1 text-sm text-orange-700">
                    Discount आणि payment method check करा.
                  </p>

                  <label className="mt-4 mb-1 block text-sm font-bold">
                    Discount Amount
                  </label>

                  <input
                    value={pendingDiscount}
                    onChange={(e) =>
                      setPendingDiscount(
                        e.target.value.replace(
                          /[^\d.]/g,
                          ""
                        )
                      )
                    }
                    className="w-full rounded-xl border border-orange-300 bg-white px-4 py-3 font-bold"
                  />

                  <p className="mt-1 text-xs text-slate-500">
                    Subtotal: ₹
                    {pendingSubtotal}
                  </p>

                  <label className="mt-4 mb-2 block text-sm font-bold">
                    Payment Method
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Cash",
                      "UPI",
                      "Card",
                    ].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setPendingPaymentMethod(
                            method
                          )
                        }
                        className={`rounded-xl border px-3 py-3 font-bold ${
                          pendingPaymentMethod ===
                          method
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {method === "Cash"
                          ? "💵"
                          : method === "UPI"
                          ? "📱"
                          : "💳"}{" "}
                        {method}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-white p-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>

                      <b>
                        ₹{pendingSubtotal}
                      </b>
                    </div>

                    <div className="mt-2 flex justify-between text-green-600">
                      <span>Discount</span>

                      <b>
                        -₹
                        {
                          pendingDiscountNumber
                        }
                      </b>
                    </div>

                    <div className="mt-3 flex justify-between border-t pt-3">
                      <span className="font-bold">
                        GRAND TOTAL
                      </span>

                      <span className="text-2xl font-black text-orange-600">
                        ₹{pendingFinalTotal}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={
                      updatePendingDiscount
                    }
                    disabled={
                      updatingPending
                    }
                    className="mt-4 w-full rounded-xl border-2 border-orange-500 bg-white px-4 py-3 font-black text-orange-600 disabled:opacity-50"
                  >
                    💾 Update Discount & Total
                  </button>

                  <button
                    onClick={() =>
                      markBillPaidAndWhatsApp({
                        ...selectedBill,
                        discount:
                          pendingDiscountNumber,
                        grand_total:
                          pendingFinalTotal,
                        payment_method:
                          pendingPaymentMethod,
                      })
                    }
                    disabled={
                      updatingPending
                    }
                    className="mt-3 w-full rounded-xl bg-green-600 px-5 py-4 text-lg font-black text-white disabled:opacity-50"
                  >
                    {updatingPending
                      ? "Processing..."
                      : `✅ Give Bill & Mark PAID — ₹${pendingFinalTotal}`}
                  </button>

                  <button
                    onClick={() =>
                      rejectOrder(
                        selectedBill
                      )
                    }
                    disabled={
                      updatingPending
                    }
                    className="mt-3 w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white disabled:opacity-50"
                  >
                    ❌ Reject Order
                  </button>
                </div>
              )}

              {String(
                selectedBill.status || ""
              ).toLowerCase() !== "pending" && (
                <div className="mt-5 border-t pt-5">
                  <div className="flex justify-between">
                    <span>Discount</span>

                    <span className="font-bold text-green-600">
                      -₹
                      {selectedBill.discount ||
                        0}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="font-semibold">
                      Grand Total
                    </span>

                    <span className="text-2xl font-black text-orange-600">
                      ₹
                      {
                        selectedBill.grand_total
                      }
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      markBillPaidAndWhatsApp(
                        selectedBill
                      )
                    }
                    disabled={updatingPending}
                    className="mt-4 w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white disabled:opacity-50"
                  >
                    📱 Send Bill on WhatsApp
                  </button>

                  <div className="mt-4 rounded-xl bg-green-50 p-4 text-center font-black text-green-700">
                    ✅ PAID
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function DashboardCard({
  title,
  value,
  className = "",
}: {
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">
        {title}
      </p>

      <p
        className={`mt-2 text-3xl font-black ${className}`}
      >
        {value}
      </p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 disabled:bg-slate-100"
      />
    </div>
  );
}

function PendingOrderCard({
  order,
  formatDate,
  onView,
  onPaid,
  onReject,
}: {
  order: Bill;
  formatDate: (date: string) => string;
  onView: () => void;
  onPaid: () => void;
  onReject: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-black">
            Order #{order.bill_number}
          </p>

          <p className="text-xs text-slate-500">
            {formatDate(order.created_at)}
          </p>
        </div>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
          PENDING
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          👤{" "}
          <b>{order.customer_name}</b>
        </p>

        {order.customer_mobile && (
          <p>
            📱 {order.customer_mobile}
          </p>
        )}

        <p>
          {order.order_type === "Dine In"
            ? "🍽️"
            : "🥡"}{" "}
          {order.order_type}
        </p>

        {order.table_number && (
          <p>
            🪑 Table {order.table_number}
          </p>
        )}
      </div>

      <div className="mt-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold">
              Total
            </span>

            {Number(order.discount || 0) > 0 && (
              <p className="text-xs font-semibold text-green-600">
                Discount: -₹
                {order.discount}
              </p>
            )}
          </div>

          <span className="text-2xl font-black text-orange-600">
            ₹{order.grand_total}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button
          onClick={onView}
          className="rounded-xl bg-slate-900 px-2 py-3 text-sm font-bold text-white"
        >
          👁 View
        </button>

        <button
          onClick={onPaid}
          className="rounded-xl bg-green-600 px-2 py-3 text-sm font-bold text-white"
        >
          ✅ PAID
        </button>

        <button
          onClick={onReject}
          className="rounded-xl bg-red-600 px-2 py-3 text-sm font-bold text-white"
        >
          ✕ Reject
        </button>
      </div>
    </div>
  );
}