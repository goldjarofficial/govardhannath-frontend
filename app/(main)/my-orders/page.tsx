"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderStatus = "Delivered" | "Processing" | "Cancelled";

type Weight = "250g" | "500g" | "1kg";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  weight?: Weight;
};

type Customer = {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
};

type PaymentMethod = "upi" | "card" | "cod";

type SavedOrder = {
  id: string;
  customer?: Customer;
  items: OrderItem[];
  paymentMethod?: PaymentMethod;
  subtotal?: number;
  deliveryCharge?: number;
  totalAmount?: number;
  createdAt?: string;
  date?: string;
  status?: OrderStatus;
  total?: number;
};

const ORDERS_KEY = "prasadam-orders";
const LAST_ORDER_KEY = "last-prasadam-order";
const ORDERS_UPDATED_EVENT = "prasadam-orders-updated";

export default function MyOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [filter, setFilter] = useState<
    "All" | "Processing" | "Delivered" | "Cancelled"
  >("All");

  const [loaded, setLoaded] = useState(false);

  // =========================================================
  // LOAD ORDERS
  // =========================================================

  useEffect(() => {
    loadOrders();

    const handleOrdersUpdated = () => {
      loadOrders();
    };

    window.addEventListener(ORDERS_UPDATED_EVENT, handleOrdersUpdated);

    window.addEventListener("storage", handleOrdersUpdated);

    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, handleOrdersUpdated);

      window.removeEventListener("storage", handleOrdersUpdated);
    };
  }, []);

  // =========================================================
  // CHECK VALID WEIGHT
  // =========================================================

  const isValidWeight = (value: unknown): value is Weight => {
    return value === "250g" || value === "500g" || value === "1kg";
  };

  // =========================================================
  // NORMALIZE ORDERS
  // =========================================================

  const normalizeOrders = (input: SavedOrder[]): SavedOrder[] => {
    const normalized: SavedOrder[] = input.map((order, orderIndex) => {
      const items = Array.isArray(order.items)
        ? order.items.map((item: any, itemIndex) => ({
            id: Number(item.id ?? item.productId ?? itemIndex + 1),

            name: String(item.name ?? "Prasadam"),

            quantity: Math.max(1, Number(item.quantity ?? 1)),

            price: Number(item.price ?? 0),

            image: item.image || undefined,

            weight: isValidWeight(item.weight) ? item.weight : undefined,
          }))
        : [];

      // Calculate subtotal from items
      const calculatedSubtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const subtotal =
        typeof order.subtotal === "number"
          ? order.subtotal
          : calculatedSubtotal;

      // Delivery = ₹50 if cart has items
      const deliveryCharge =
        typeof order.deliveryCharge === "number"
          ? order.deliveryCharge
          : subtotal > 0
            ? 50
            : 0;

      const total =
        typeof order.totalAmount === "number"
          ? order.totalAmount
          : typeof order.total === "number"
            ? order.total
            : subtotal + deliveryCharge;

      return {
        ...order,

        id: order.id || `order-${Date.now()}-${orderIndex}`,

        items,

        subtotal,

        deliveryCharge,

        totalAmount: total,

        total,

        status:
          order.status === "Delivered" || order.status === "Cancelled"
            ? order.status
            : "Processing",

        createdAt: order.createdAt || order.date || new Date().toISOString(),
      };
    });

    // =======================================================
    // REMOVE DUPLICATE ORDERS
    // =======================================================

    const uniqueOrders = Array.from(
      new Map(normalized.map((order) => [order.id, order])).values(),
    );

    // =======================================================
    // NEWEST ORDER FIRST
    // =======================================================

    uniqueOrders.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0).getTime();

      const dateB = new Date(b.createdAt || b.date || 0).getTime();

      return dateB - dateA;
    });

    return uniqueOrders;
  };

  // =========================================================
  // LOAD ALL ORDERS FROM LOCAL STORAGE
  // =========================================================

  const loadOrders = () => {
    try {
      const savedOrders = localStorage.getItem(ORDERS_KEY);

      let parsedOrders: SavedOrder[] = [];

      // Get all orders
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);

        if (Array.isArray(parsed)) {
          parsedOrders = parsed;
        }
      }

      // =====================================================
      // ALSO CHECK LAST ORDER
      // =====================================================

      const lastOrder = localStorage.getItem(LAST_ORDER_KEY);

      if (lastOrder) {
        try {
          const parsedLastOrder = JSON.parse(lastOrder);

          if (parsedLastOrder && typeof parsedLastOrder === "object") {
            const alreadyExists = parsedOrders.some(
              (order) => order.id === parsedLastOrder.id,
            );

            if (!alreadyExists) {
              parsedOrders.push(parsedLastOrder);
            }
          }
        } catch (error) {
          console.error("Failed to parse last order:", error);
        }
      }

      // Normalize
      const normalizedOrders = normalizeOrders(parsedOrders);

      // Set UI
      setOrders(normalizedOrders);

      // Save normalized list
      localStorage.setItem(ORDERS_KEY, JSON.stringify(normalizedOrders));
    } catch (error) {
      console.error("Failed to load orders:", error);

      setOrders([]);
    } finally {
      setLoaded(true);
    }
  };

  // =========================================================
  // CANCEL ONLY ONE ORDER
  // =========================================================

  const handleCancelOrder = (orderId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      // IMPORTANT:
      // Only matching orderId will be cancelled.
      // Other orders remain unchanged.

      const updatedOrders = orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "Cancelled" as OrderStatus,
            }
          : order,
      );

      // Update UI
      setOrders(updatedOrders);

      // Update localStorage
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));

      // Notify other components
      window.dispatchEvent(new Event(ORDERS_UPDATED_EVENT));
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  // =========================================================
  // VIEW DETAILS
  // =========================================================

  const handleViewDetails = (order: SavedOrder) => {
    const status = order.status || "Processing";

    const total = order.totalAmount ?? order.total ?? 0;

    alert(
      `Order ${order.id}\n\nStatus: ${status}\nTotal: ₹${total.toLocaleString(
        "en-IN",
      )}`,
    );
  };

  // =========================================================
  // REORDER
  // =========================================================

  const handleReorder = (order: SavedOrder) => {
    try {
      const cartItems = order.items.map((item) => ({
        productId: item.id,
        weight: item.weight || "500g",
        quantity: item.quantity,
      }));

      localStorage.setItem("prasadam-cart", JSON.stringify(cartItems));

      window.dispatchEvent(new Event("prasadam-cart-updated"));

      router.push("/prasadam/cart");
    } catch (error) {
      console.error("Failed to reorder:", error);
    }
  };

  // =========================================================
  // FILTER ORDERS
  // =========================================================

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => (order.status || "Processing") === filter);

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";

      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (order: SavedOrder) => {
    const dateValue = order.createdAt || order.date;

    if (!dateValue) {
      return "Date unavailable";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return String(dateValue);
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#4b2e1f]">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#ead8b8] bg-[#fffaf0]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => router.push("/prasadam")}
            className="rounded-xl border border-[#d9bc8a] bg-white px-4 py-2 text-sm font-semibold text-[#7b1e1e] transition hover:bg-[#fff6e7]"
          >
            ← Back
          </button>

          <h1 className="text-lg font-bold text-[#7b1e1e] sm:text-xl">
            My Orders
          </h1>

          <button
            type="button"
            onClick={() => router.push("/prasadam/cart")}
            className="rounded-xl bg-[#8f1d1d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#731515]"
          >
            Cart
          </button>
        </div>
      </header>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* =================================================
            INTRO
        ================================================= */}

        <section className="mb-6 rounded-2xl border border-[#ead8b8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a67c45]">
            Prasadam Orders
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#7b1e1e] sm:text-3xl">
            Your Orders
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#765f48]">
            Here you can see all the prasadam orders you have placed.
          </p>
        </section>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {["All", "Processing", "Delivered", "Cancelled"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setFilter(
                  item as "All" | "Processing" | "Delivered" | "Cancelled",
                )
              }
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === item
                  ? "border-[#8f1d1d] bg-[#8f1d1d] text-white"
                  : "border-[#d9bc8a] bg-white text-[#7b1e1e] hover:bg-[#fff6e7]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {!loaded && (
          <div className="rounded-2xl border border-[#ead8b8] bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-[#765f48]">Loading your orders...</p>
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {loaded && filteredOrders.length === 0 && (
          <div className="rounded-2xl border border-[#ead8b8] bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🛍️</div>

            <h3 className="mt-4 text-xl font-bold text-[#7b1e1e]">
              No Orders Found
            </h3>

            <p className="mt-2 text-sm text-[#765f48]">
              You haven't placed any prasadam orders yet.
            </p>

            <button
              type="button"
              onClick={() => router.push("/prasadam")}
              className="mt-5 rounded-xl bg-[#8f1d1d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#731515]"
            >
              Shop Prasadam
            </button>
          </div>
        )}

        {/* =================================================
            ALL ORDERS
        ================================================= */}

        <div className="space-y-5">
          {filteredOrders.map((order) => {
            const status = order.status || "Processing";

            const subtotal =
              order.subtotal ??
              order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
              );

            const deliveryCharge =
              order.deliveryCharge ?? (subtotal > 0 ? 50 : 0);

            const total =
              order.totalAmount ?? order.total ?? subtotal + deliveryCharge;

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-[#ead8b8] bg-white shadow-sm"
              >
                {/* =========================================
                      ORDER HEADER
                  ========================================= */}

                <div className="flex flex-col gap-4 border-b border-[#f0e2ca] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div>
                    <p className="text-xs font-medium text-[#8c7252]">
                      Order ID
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-[#7b1e1e]">
                      {order.id}
                    </p>

                    <p className="mt-1 text-xs text-[#8c7252]">
                      {formatDate(order)}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                      status,
                    )}`}
                  >
                    {status}
                  </span>
                </div>

                {/* =========================================
                      ORDER ITEMS
                  ========================================= */}

                <div className="divide-y divide-[#f0e2ca]">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.id}-${item.weight}-${index}`}
                      className="flex items-center gap-3 px-4 py-4 sm:px-5"
                    >
                      {/* Product Image */}

                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#ead8b8] bg-white">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl">
                            🙏
                          </div>
                        )}
                      </div>

                      {/* Product Info */}

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-[#4b2e1f]">
                          {item.name}
                        </h3>

                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#8c7252]">
                          <span>Qty: {item.quantity}</span>

                          {item.weight && <span>• Weight: {item.weight}</span>}
                        </div>

                        <p className="mt-1 text-sm font-semibold text-[#7b1e1e]">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </p>
                      </div>

                      {/* Item Total */}

                      <div className="text-right">
                        <p className="text-sm font-bold text-[#7b1e1e]">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* =========================================
                      FOOTER
                  ========================================= */}

                <div className="flex flex-col gap-4 border-t border-[#f0e2ca] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  {/* Total */}

                  <div>
                    <p className="text-xs text-[#8c7252]">Total Amount</p>

                    <p className="mt-1 text-xl font-bold text-[#7b1e1e]">
                      ₹{total.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Buttons */}

                  <div className="flex flex-wrap gap-2">
                    {/* View Details */}

                    <button
                      type="button"
                      onClick={() => handleViewDetails(order)}
                      className="flex-1 rounded-xl border border-[#cfae78] bg-white px-4 py-2.5 text-sm font-semibold text-[#7b1e1e] transition hover:bg-[#fff6e7] sm:flex-none"
                    >
                      View Details
                    </button>

                    {/* ===================================
                          CANCEL ONLY PROCESSING ORDER
                      =================================== */}

                    {status === "Processing" && (
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(order.id)}
                        className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 sm:flex-none"
                      >
                        Cancel Order
                      </button>
                    )}

                    {/* ===================================
                          REORDER DELIVERED ORDER
                      =================================== */}

                    {status === "Delivered" && (
                      <button
                        type="button"
                        onClick={() => handleReorder(order)}
                        className="flex-1 rounded-xl bg-[#8f1d1d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#731515] sm:flex-none"
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =================================================
            HELP SECTION
        ================================================= */}

        <section className="mt-8 rounded-2xl border border-[#ead8b8] bg-[#fff6e7] p-5 sm:p-6">
          <h3 className="text-lg font-bold text-[#7b1e1e]">Need Help?</h3>

          <p className="mt-2 text-sm leading-6 text-[#765f48]">
            If you have any questions about your order, delivery, payment, or
            cancellation, please contact our support team.
          </p>
        </section>
      </main>
    </div>
  );
}
