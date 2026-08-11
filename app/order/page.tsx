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

/* =========================
   33 MENU ITEMS
========================= */

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
    price: 15,
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

const categories = [
  { key: "All", label: "सर्व / All", icon: "🍽️" },
  { key: "Breakfast", label: "नाश्ता", icon: "🌅" },
  { key: "Veg", label: "शाकाहारी", icon: "🥗" },
  { key: "Non-Veg", label: "नॉन-व्हेज", icon: "🍗" },
  { key: "Fish", label: "मासे", icon: "🐟" },
  { key: "Thali", label: "थाळी", icon: "🍛" },
  { key: "Specials", label: "स्पेशल", icon: "⭐" },
  { key: "Extras", label: "अॅड-ऑन्स", icon: "➕" },
];

export default function OrderPage(): import("react").JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [timeText, setTimeText] = useState("");
  const [dateText, setDateText] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");

  const [orderType, setOrderType] = useState("Dine In");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [discount, setDiscount] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [items, setItems] = useState<FoodItem[]>(
    initialItems.map((item) => ({ ...item }))
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"success" | "error">("success");

  /* =========================
     CLOCK
  ========================= */

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();

      setTimeText(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );

      setDateText(
        now.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateClock();

    const timer = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(timer);
  }, []);

  /* =========================
     ITEM FUNCTIONS
  ========================= */

  function increaseItem(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
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
              quantity: Math.max(0, item.quantity - 1),
            }
          : item
      )
    );
  }

  function resetItems() {
    setItems(initialItems.map((item) => ({ ...item })));
  }

  const selectedItems = items.filter((item) => item.quantity > 0);

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = Math.min(
    Math.max(Number(discount) || 0, 0),
    subtotal
  );

  const total = Math.max(0, subtotal - discountAmount);

  /* =========================
     FILTER MENU
  ========================= */

  const filteredFoodItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const categoryMatch =
        activeCategory === "All" ||
        item.category === activeCategory;

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [items, activeCategory, search]);

  /* =========================
     WHATSAPP MESSAGE
  ========================= */

  function createWhatsAppMessage() {
    let text = `*FOODIES TOWN*\n`;
    text += `🌴 Pure Authentic Taste 🌴\n`;
    text += `====================\n`;
    text += `*ORDER DETAILS*\n`;
    text += `====================\n\n`;

    text += `*Customer:* ${
      customerName.trim() || "Walk-in Customer"
    }\n`;

    if (customerMobile.trim()) {
      text += `*Mobile:* ${customerMobile.trim()}\n`;
    }

    text += `*Order:* ${orderType}\n`;
    text += `*Payment:* ${paymentMethod}\n\n`;

    selectedItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;

      text += `${item.name}\n`;
      text += `${item.quantity} x Rs.${item.price} = *Rs.${itemTotal}*\n\n`;
    });

    text += `====================\n`;
    text += `*SUBTOTAL: Rs.${subtotal}*\n`;

    if (discountAmount > 0) {
      text += `*DISCOUNT: -Rs.${discountAmount}*\n`;
    }

    text += `*GRAND TOTAL: Rs.${total}*\n`;
    text += `====================\n\n`;

    text += `🙏 Thank you for visiting *Foodies Town*!\n`;
    text += `❤️ Pure Authentic Taste • Family Service`;

    return encodeURIComponent(text);
  }

  /* =========================
     SAVE BILL
  ========================= */

  async function saveBill() {
    setMessage("");

    if (selectedItems.length === 0) {
      setMessageType("error");
      setMessage(
        "किमान एक dish select करा / Please select at least one food item."
      );
      return;
    }

    if (
      customerMobile.trim() &&
      customerMobile.trim().length !== 10
    ) {
      setMessageType("error");
      setMessage("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (Number(discount) < 0) {
      setMessageType("error");
      setMessage("Discount cannot be negative.");
      return;
    }

    if (Number(discount) > subtotal) {
      setMessageType("error");
      setMessage("Discount cannot be greater than subtotal.");
      return;
    }

    setLoading(true);

    try {
      /* =========================
         GET LAST BILL NUMBER
      ========================= */

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
        customerName.trim() || "Walk-in Customer";

      /* =========================
         SAVE CUSTOMER
      ========================= */

      if (customerMobile.trim()) {
        const { data: existingCustomer } =
          await supabase
            .from("customers")
            .select("id")
            .eq("mobile", customerMobile.trim())
            .maybeSingle();

        if (!existingCustomer) {
          const { error: customerError } =
            await supabase
              .from("customers")
              .insert({
                name: finalCustomerName,
                mobile: customerMobile.trim(),
              });

          if (customerError) {
            console.warn(
              "Customer save:",
              customerError.message
            );
          }
        }
      }

      /* =========================
         SAVE BILL
         status = Pending
      ========================= */

      const { data: billData, error: billError } =
        await supabase
          .from("bills")
          .insert({
            bill_number: nextBillNumber,
            customer_name: finalCustomerName,
            customer_mobile:
              customerMobile.trim() || null,
            order_type: orderType,
            table_number: null,
            grand_total: total,
            discount: discountAmount,
            payment_method: paymentMethod,
            status: "Pending",
          })
          .select()
          .single();

      if (billError) {
        throw new Error(billError.message);
      }

      /* =========================
         SAVE BILL ITEMS
      ========================= */

      const billItems = selectedItems.map((item) => ({
        bill_id: billData.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      }));

      const { error: itemError } =
        await supabase
          .from("bill_items")
          .insert(billItems);

      if (itemError) {
        throw new Error(itemError.message);
      }

      /* =========================
         WHATSAPP
      ========================= */

      const whatsappMessage =
        createWhatsAppMessage();

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${whatsappMessage}`;

      window.open(whatsappUrl, "_blank");

      /* =========================
         SUCCESS
      ========================= */

      setMessageType("success");

      setMessage(
        `Order #${nextBillNumber} confirmed successfully! ❤️`
      );

      setCustomerName("");
      setCustomerMobile("");
      setOrderType("Dine In");
      setPaymentMethod("Cash");
      setDiscount("");
      resetItems();
    } catch (error: unknown) {
      console.error(error);

      setMessageType("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving order."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     SHARE WHATSAPP
  ========================= */

  function shareCurrentOrder() {
    if (selectedItems.length === 0) {
      setMessageType("error");
      setMessage("Please select items first.");
      return;
    }

    const text = createWhatsAppMessage();

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank"
    );
  }

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        body {
          min-width: 0;
          background: #fffaf0;
        }

        button,
        input {
          max-width: 100%;
        }

        input {
          min-width: 0;
        }

        .customer-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .horizontal-scroll {
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }

        /* =========================
           ROTATING MANDALA
        ========================= */

        @keyframes mandalaClockwise {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: mandalaClockwise 18s linear infinite;
          transform-origin: center center;
        }

        @media (max-width: 640px) {
          html,
          body {
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
          }

          button,
          input {
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-spin-slow {
            animation: none;
          }
        }
      `}</style>

      <main className="customer-page bg-[#fffaf0]">

        {/* HEADER */}

        <header className="sticky top-0 z-50 w-full border-b border-[#d4af37]/60 bg-[#4a0909] text-white shadow-xl">
          <div className="mx-auto w-full max-w-6xl px-3 py-2 sm:px-5 sm:py-3">
            <div className="flex w-full items-center justify-between gap-2">

              <div className="flex min-w-0 items-center gap-2">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#691010] text-xl">
                  🪔
                </div>

                <div className="min-w-0">
                  <h1 className="truncate text-sm font-black sm:text-2xl">
                    🍴 FOODIES TOWN
                  </h1>

                  <p className="truncate text-[9px] font-semibold text-[#f7d98a] sm:text-xs">
                    अस्सल कोकणी चव • Authentic Konkan Taste
                  </p>
                </div>

              </div>

              <div className="shrink-0 text-right">

                <div className="text-[10px] font-black text-[#f7d98a] sm:text-base">
                  🕐 {mounted ? timeText : "--:--"}
                </div>

                <div className="hidden text-[10px] text-orange-100 sm:block">
                  {dateText}
                </div>

                <span className="mt-1 inline-block rounded-full bg-green-600/30 px-2 py-0.5 text-[8px] font-black text-green-200">
                  ● ONLINE
                </span>

              </div>

            </div>
          </div>
        </header>

        {/* KONKAN STRIP */}

        <div className="w-full overflow-hidden border-b border-[#d4af37]/40 bg-[#7a1515] px-2 py-2 text-center text-[10px] font-bold text-[#ffe7a3] sm:text-sm">
          🌴 🥥 🌺 🐟 🪔{" "}
          <span className="mx-1">
            कोकणची माती • घरची चव • आपुलकीची सेवा
          </span>{" "}
          🪔 🐟 🌺 🥥 🌴
        </div>

        {/* CONTENT */}

        <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-5 sm:py-7">

          {/* WELCOME */}

          <section className="mb-4 overflow-hidden rounded-2xl border border-[#d4af37]/50 bg-gradient-to-br from-[#fff8df] via-[#fffdf5] to-[#f0dfb7] p-4 shadow-lg sm:mb-6 sm:rounded-[2rem] sm:p-7">

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

              <div className="min-w-0 text-center md:text-left">

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b1e1e] sm:text-xs">
                  🙏 नमस्कार / Welcome
                </p>

                <h2 className="mt-2 text-xl font-black leading-tight text-[#4a0909] sm:text-4xl">
                  स्वादिष्ट जेवणासाठी
                  <br />
                  आपले मनःपूर्वक स्वागत!
                </h2>

                <p className="mt-2 text-xs text-[#70533b] sm:text-sm">
                  Fresh food • Family taste • Konkan tradition
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">

                  <span className="rounded-full bg-[#8b1e1e] px-3 py-1.5 text-[10px] font-bold text-white">
                    🌴 Konkan
                  </span>

                  <span className="rounded-full bg-[#d4af37] px-3 py-1.5 text-[10px] font-bold text-[#4a0909]">
                    👑 Royal Taste
                  </span>

                  <span className="rounded-full bg-[#1f6b45] px-3 py-1.5 text-[10px] font-bold text-white">
                    🌿 Traditional
                  </span>

                </div>

              </div>

              {/* =========================
                  LOGO + ROTATING MANDALA
                  Replaces 🌴🍛🐟
              ========================= */}

              <div className="relative flex h-32 w-32 shrink-0 items-center justify-center sm:h-48 sm:w-48">

                {/* Rotating Mandala */}

                <div className="absolute inset-0 animate-spin-slow">

                  <svg
                    viewBox="0 0 200 200"
                    className="h-full w-full"
                    aria-hidden="true"
                  >

                    <defs>

                      <path
                        id="mandalaPetal"
                        d="M100 12
                           C108 28 108 42 100 55
                           C92 42 92 28 100 12Z"
                      />

                    </defs>

                    <g
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="2"
                      opacity="0.9"
                    >

                      {Array.from({ length: 16 }).map(
                        (_, index) => (
                          <use
                            key={index}
                            href="#mandalaPetal"
                            transform={`rotate(${index * 22.5} 100 100)`}
                          />
                        )
                      )}

                      <circle
                        cx="100"
                        cy="100"
                        r="82"
                      />

                      <circle
                        cx="100"
                        cy="100"
                        r="72"
                      />

                      <circle
                        cx="100"
                        cy="100"
                        r="58"
                      />

                    </g>

                    <g
                      fill="none"
                      stroke="#8b1e1e"
                      strokeWidth="1.5"
                      opacity="0.7"
                    >

                      {Array.from({ length: 8 }).map(
                        (_, index) => (
                          <ellipse
                            key={index}
                            cx="100"
                            cy="35"
                            rx="8"
                            ry="18"
                            transform={`rotate(${index * 45} 100 100)`}
                          />
                        )
                      )}

                    </g>

                  </svg>

                </div>

                {/* LOGO - NOT ANIMATED */}

                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#fffdf5] p-2 shadow-xl sm:h-36 sm:w-36">

                  <img
                    src="/foodies-town-logo.png"
                    alt="Foodies Town Logo"
                    className="h-full w-full object-contain"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* MESSAGE */}

          {message && (
            <div
              className={`mb-4 rounded-2xl border px-4 py-3 text-sm font-bold ${
                messageType === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* CUSTOMER + MENU + ORDER */}

          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">

            {/* LEFT */}

            <section className="min-w-0 rounded-2xl border border-[#d4af37]/30 bg-[#fffdf7] p-3 shadow-xl sm:rounded-[2rem] sm:p-5 lg:col-span-2 lg:p-6">

              {/* CUSTOMER DETAILS */}

              <div className="mb-6">

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b1e1e]">
                  YOUR DETAILS
                </p>

                <h2 className="mt-1 text-xl font-black text-[#4a0909]">
                  👤 ग्राहक माहिती
                </h2>

                <p className="text-xs text-[#80654d]">
                  Order complete करण्यासाठी basic माहिती भरा
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <div>

                    <label className="mb-1 block text-xs font-black">
                      ग्राहकाचे नाव / Customer Name
                    </label>

                    <input
                      value={customerName}
                      onChange={(e) =>
                        setCustomerName(e.target.value)
                      }
                      placeholder="तुमचे नाव / Your Name"
                      className="w-full rounded-xl border-2 border-[#ead9b2] bg-[#fffaf0] px-3 py-3 outline-none focus:border-[#8b1e1e]"
                    />

                  </div>

                  <div>

                    <label className="mb-1 block text-xs font-black">
                      मोबाईल / Mobile Number
                    </label>

                    <input
                      value={customerMobile}
                      onChange={(e) =>
                        setCustomerMobile(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        )
                      }
                      placeholder="10 digit mobile number"
                      inputMode="numeric"
                      className="w-full rounded-xl border-2 border-[#ead9b2] bg-[#fffaf0] px-3 py-3 outline-none focus:border-[#8b1e1e]"
                    />

                  </div>

                </div>

              </div>

              {/* ORDER TYPE */}

              <div className="mb-6">

                <label className="mb-2 block text-xs font-black">
                  ऑर्डर प्रकार / Order Type
                </label>

                <div className="grid grid-cols-2 gap-2">

                  {["Dine In", "Take Away"].map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setOrderType(type)
                        }
                        className={`rounded-xl border-2 px-2 py-3 text-xs font-black sm:py-4 ${
                          orderType === type
                            ? "border-[#8b1e1e] bg-[#8b1e1e] text-white"
                            : "border-[#ead9b2] bg-white text-[#4a0909]"
                        }`}
                      >

                        {type === "Dine In"
                          ? "🍽️ Dine In"
                          : "🥡 Take Away"}

                        <span className="mt-1 block text-[9px] opacity-70">
                          {type === "Dine In"
                            ? "रेस्टॉरंटमध्ये जेवण"
                            : "पार्सल / Takeaway"}
                        </span>

                      </button>
                    )
                  )}

                </div>

              </div>

              {/* MENU */}

              <div>

                <div className="mb-4 flex items-center justify-between gap-2">

                  <div>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b1e1e]">
                      FOOD MENU
                    </p>

                    <h3 className="text-xl font-black text-[#4a0909]">
                      🍛 Menu / मेनू
                    </h3>

                  </div>

                  <button
                    type="button"
                    onClick={resetItems}
                    className="shrink-0 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[10px] font-black text-red-600"
                  >
                    🗑️ Clear
                  </button>

                </div>

                {/* CATEGORY SCROLL */}

                <div className="horizontal-scroll mb-4 flex w-full gap-2 overflow-x-auto pb-2">

                  {categories.map((category) => (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() =>
                        setActiveCategory(
                          category.key
                        )
                      }
                      className={`shrink-0 whitespace-nowrap rounded-full border-2 px-3 py-2 text-[10px] font-black sm:text-xs ${
                        activeCategory ===
                        category.key
                          ? "border-[#8b1e1e] bg-[#8b1e1e] text-white"
                          : "border-[#ead9b2] bg-white text-[#59432f]"
                      }`}
                    >
                      {category.icon}{" "}
                      {category.label}
                    </button>
                  ))}

                </div>

                {/* SEARCH */}

                <div className="mb-4">

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="🔎 Dish search करा / Search dish..."
                    className="w-full rounded-xl border-2 border-[#ead9b2] bg-[#fffaf0] px-4 py-3 outline-none focus:border-[#1f6b45]"
                  />

                </div>

                {/* FOOD GRID */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">

                  {filteredFoodItems.map((item) => (

                    <div
                      key={item.id}
                      className={`relative overflow-hidden rounded-2xl border-2 p-3 ${
                        item.quantity > 0
                          ? "border-[#1f6b45] bg-[#eff9f1]"
                          : "border-[#ead9b2] bg-white"
                      }`}
                    >

                      {item.quantity > 0 && (
                        <div className="absolute right-2 top-2 rounded-full bg-[#1f6b45] px-2 py-1 text-[10px] font-black text-white">
                          ×{item.quantity}
                        </div>
                      )}

                      <div className="mb-3 pr-8">

                        <p className="break-words text-sm font-black leading-snug text-[#3d281b]">
                          {item.name}
                        </p>

                        <p className="mt-1 text-lg font-black text-[#8b1e1e]">
                          ₹{item.price}
                        </p>

                        <p className="text-[10px] font-bold text-[#a0876d]">
                          {item.category}
                        </p>

                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-[#fffaf0] p-2">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseItem(item.id)
                          }
                          className="h-10 w-10 rounded-xl bg-slate-100 text-xl font-black"
                        >
                          −
                        </button>

                        <span className="font-black">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseItem(item.id)
                          }
                          className="h-10 w-10 rounded-xl bg-[#1f6b45] text-xl font-black text-white"
                        >
                          +
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

                {filteredFoodItems.length === 0 && (

                  <div className="rounded-2xl bg-[#fff5df] p-8 text-center">

                    <div className="text-4xl">
                      🍽️
                    </div>

                    <p className="mt-2 font-black">
                      Dish सापडली नाही
                    </p>

                  </div>

                )}

              </div>

            </section>

            {/* ORDER SUMMARY */}

            <aside className="h-fit w-full rounded-2xl border border-[#d4af37]/40 bg-[#fffdf7] p-4 shadow-xl sm:rounded-[2rem] sm:p-5 lg:sticky lg:top-24">

              <div className="mb-5 flex items-center justify-between gap-2">

                <div>

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b1e1e]">
                    YOUR ORDER
                  </p>

                  <h2 className="text-lg font-black text-[#4a0909]">
                    🧾 Order Summary
                  </h2>

                </div>

                <div className="rounded-xl border border-[#d4af37] bg-[#fff4d0] px-3 py-2 font-black text-[#691010]">
                  ₹{total}
                </div>

              </div>

              {selectedItems.length === 0 ? (

                <div className="rounded-2xl bg-[#faf4e5] p-7 text-center text-[#80654d]">

                  <div className="mb-2 text-5xl">
                    🛒
                  </div>

                  <p className="font-black">
                    No items selected
                  </p>

                  <p className="mt-1 text-xs">
                    अजून dish select केलेली नाही
                  </p>

                </div>

              ) : (

                <div className="max-h-[330px] space-y-3 overflow-y-auto">

                  {selectedItems.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-2 border-b border-[#eee2c8] pb-3"
                    >

                      <div className="min-w-0">

                        <p className="break-words text-sm font-bold leading-snug">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-[#80654d]">
                          {item.quantity} × ₹
                          {item.price}
                        </p>

                      </div>

                      <p className="shrink-0 font-black">
                        ₹
                        {item.quantity *
                          item.price}
                      </p>

                    </div>

                  ))}

                </div>

              )}

              {/* DISCOUNT */}

              <div className="mt-5">

                <label className="mb-1 block text-xs font-black">
                  💸 Discount / सवलत
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
                  placeholder="Discount amount"
                  inputMode="decimal"
                  className="w-full rounded-xl border-2 border-green-100 bg-[#fffaf0] px-3 py-3 outline-none focus:border-green-500"
                />

                <p className="mt-1 text-[10px] text-[#80654d]">
                  Maximum: ₹{subtotal}
                </p>

              </div>

              {/* PAYMENT */}

              <div className="mt-5">

                <label className="mb-2 block text-xs font-black">
                  पेमेंट / Payment
                </label>

                <div className="grid grid-cols-3 gap-1.5">

                  {["Cash", "UPI", "Card"].map(
                    (method) => (

                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setPaymentMethod(
                            method
                          )
                        }
                        className={`rounded-xl border-2 px-1 py-3 text-[10px] font-black ${
                          paymentMethod ===
                          method
                            ? "border-[#1f6b45] bg-[#1f6b45] text-white"
                            : "border-green-100 bg-white"
                        }`}
                      >

                        {method === "Cash"
                          ? "💵 Cash"
                          : method === "UPI"
                          ? "📱 UPI"
                          : "💳 Card"}

                      </button>

                    )
                  )}

                </div>

              </div>

              {/* TOTAL */}

              <div className="my-5 border-t pt-5">

                <div className="flex justify-between text-sm text-[#80654d]">

                  <span>
                    Subtotal
                  </span>

                  <span className="font-bold">
                    ₹{subtotal}
                  </span>

                </div>

                <div className="mt-2 flex justify-between text-sm text-green-600">

                  <span>
                    Discount
                  </span>

                  <span className="font-bold">
                    -₹{discountAmount}
                  </span>

                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#ead9b2] pt-4">

                  <span className="font-bold">
                    Grand Total
                  </span>

                  <span className="text-2xl font-black text-[#8b1e1e]">
                    ₹{total}
                  </span>

                </div>

              </div>

              {/* CONFIRM */}

              <button
                type="button"
                onClick={saveBill}
                disabled={
                  loading ||
                  selectedItems.length === 0
                }
                className="w-full rounded-xl bg-[#8b1e1e] px-4 py-4 text-sm font-black text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading
                  ? "⏳ Processing..."
                  : "✅ Confirm Order"}

              </button>

              {/* WHATSAPP */}

              <button
                type="button"
                onClick={shareCurrentOrder}
                disabled={
                  selectedItems.length === 0
                }
                className="mt-3 w-full rounded-xl bg-[#1f6b45] px-4 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                📱 WhatsApp Order
              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-[#80654d]">
                🔒 तुमची माहिती सुरक्षित आहे
                <br />
                🙏 Thank you for choosing Foodies Town
              </p>

            </aside>

          </div>

          {/* FOOTER */}

          <section className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#4a0909] via-[#691010] to-[#4a0909] p-5 text-center text-white shadow-xl sm:mt-8 sm:p-7">

            <div className="mb-3 text-3xl">
              🌴 🥥 🪔 🐟 🌺
            </div>

            <h3 className="text-xl font-black text-[#f7d98a]">
              FOODIES TOWN
            </h3>

            <p className="mt-1 text-xs text-orange-100 sm:text-sm">
              अस्सल कोकणी चव • घरची आठवण • मनापासून सेवा
            </p>

            <p className="mt-4 text-[10px] text-orange-200/70">
              ©{" "}
              {mounted
                ? new Date().getFullYear()
                : 2026}{" "}
              Foodies Town
            </p>

          </section>

          <footer className="py-5 text-center">

            <p className="text-[10px] font-bold text-[#8b1e1e]">
              🌺 © 2026 Athena Creations.
              All rights reserved. 🌺
            </p>

          </footer>

        </div>

      </main>
    </>
  );
}