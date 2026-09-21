"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type OrderStatus = "Delivered" | "Processing" | "Cancelled";

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
};

const orders: Order[] = [
  {
    id: "ORD-1001",
    date: "14 Sep 2026",
    status: "Delivered",
    items: [
      {
        name: "Makhana Prasadam",
        quantity: 2,
        price: 200,
      },
      {
        name: "Peda",
        quantity: 1,
        price: 180,
      },
    ],
    total: 580,
  },
  {
    id: "ORD-1002",
    date: "10 Sep 2026",
    status: "Processing",
    items: [
      {
        name: "Dry Prasadam",
        quantity: 1,
        price: 250,
      },
      {
        name: "Panchamrit",
        quantity: 1,
        price: 300,
      },
    ],
    total: 550,
  },
  {
    id: "ORD-1003",
    date: "05 Sep 2026",
    status: "Delivered",
    items: [
      {
        name: "Peda",
        quantity: 2,
        price: 180,
      },
    ],
    total: 360,
  },
  {
    id: "ORD-1004",
    date: "01 Sep 2026",
    status: "Cancelled",
    items: [
      {
        name: "Makhana Prasadam",
        quantity: 1,
        price: 200,
      },
    ],
    total: 200,
  },
];

export default function MyOrdersPage() {
  const router = useRouter();

  const [filter, setFilter] = useState<
    "All" | "Processing" | "Delivered" | "Cancelled"
  >("All");

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return {
          wrapper: "bg-green-50 border-green-200",
          text: "text-green-700",
          dot: "bg-green-500",
        };

      case "Processing":
        return {
          wrapper: "bg-orange-50 border-orange-200",
          text: "text-orange-700",
          dot: "bg-orange-500",
        };

      case "Cancelled":
        return {
          wrapper: "bg-red-50 border-red-200",
          text: "text-red-700",
          dot: "bg-red-500",
        };
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] pb-24 lg:ml-[92px] lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#ead8b8] bg-[#fffaf2]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e4cfa8] bg-white text-[#7b1e1e] shadow-sm transition hover:bg-[#fff4df]"
            aria-label="Go back"
          >
            <span className="text-xl">←</span>
          </button>

          {/* Title */}
          <div className="flex-1">
            <h1 className="text-lg font-bold text-[#6f1717] sm:text-xl">
              My Orders
            </h1>

            <p className="text-xs text-[#8a6a45] sm:text-sm">
              Your prasadam orders
            </p>
          </div>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => router.push("/prasadam/cart")}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e4cfa8] bg-white text-[#7b1e1e] shadow-sm transition hover:bg-[#fff4df]"
            aria-label="Open cart"
          >
            <span className="text-lg">🛒</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
        {/* Page Intro */}
        <section className="mb-5 rounded-2xl border border-[#ead8b8] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-[#a06b28]">
                🙏 Jai Shri Krishna
              </p>

              <h2 className="text-xl font-bold text-[#6f1717] sm:text-2xl">
                Your Orders
              </h2>

              <p className="mt-1 text-sm text-[#806746]">
                View your prasadam order history and order status.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/prasadam")}
              className="rounded-xl bg-[#8f1d1d] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#731515]"
            >
              Order Prasadam
            </button>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="mb-5">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["All", "Processing", "Delivered", "Cancelled"].map((item) => {
              const isActive = filter === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setFilter(
                      item as
                        | "All"
                        | "Processing"
                        | "Delivered"
                        | "Cancelled"
                    )
                  }
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-[#8f1d1d] bg-[#8f1d1d] text-white"
                      : "border-[#e2ceb0] bg-white text-[#765b3b] hover:bg-[#fff4df]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>

        {/* Orders */}
        {filteredOrders.length > 0 ? (
          <section className="space-y-4">
            {filteredOrders.map((order) => {
              const statusStyle = getStatusStyle(order.status);

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-[#ead8b8] bg-white shadow-sm"
                >
                  {/* Order Header */}
                  <div className="border-b border-[#f0e2ca] bg-[#fffdf8] px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-[#9b7b51]">
                          Order ID
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#6f1717]">
                          {order.id}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="text-left sm:text-right">
                          <p className="text-xs text-[#9b7b51]">
                            Order Date
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#5e4b34]">
                            {order.date}
                          </p>
                        </div>

                        <div
                          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${statusStyle.wrapper}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
                          />

                          <span
                            className={`text-xs font-semibold ${statusStyle.text}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-4 py-4 sm:px-5">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={`${order.id}-${index}`}
                          className="flex items-center justify-between gap-3 rounded-xl bg-[#fffaf2] px-3 py-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            {/* Product Icon */}
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#ead8b8] bg-white text-xl">
                              🙏
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[#5f1919]">
                                {item.name}
                              </p>

                              <p className="mt-0.5 text-xs text-[#8c7252]">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>

                          <p className="shrink-0 text-sm font-bold text-[#6f1717]">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col gap-4 border-t border-[#f0e2ca] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div>
                      <p className="text-xs text-[#8c7252]">Total Amount</p>

                      <p className="mt-1 text-xl font-bold text-[#7b1e1e]">
                        ₹{order.total}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          alert(
                            `Order ${order.id}\n\nStatus: ${order.status}\nTotal: ₹${order.total}`
                          );
                        }}
                        className="flex-1 rounded-xl border border-[#cfae78] bg-white px-4 py-2.5 text-sm font-semibold text-[#7b1e1e] transition hover:bg-[#fff6e7] sm:flex-none"
                      >
                        View Details
                      </button>

                      {order.status === "Delivered" && (
                        <button
                          type="button"
                          onClick={() => router.push("/prasadam")}
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
          </section>
        ) : (
          /* Empty State */
          <section className="rounded-2xl border border-dashed border-[#d8bd91] bg-white px-5 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff4df] text-3xl">
              📦
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#6f1717]">
              No Orders Found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#806746]">
              You don't have any orders in this category yet.
            </p>

            <button
              type="button"
              onClick={() => router.push("/prasadam")}
              className="mt-5 rounded-xl bg-[#8f1d1d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#731515]"
            >
              Explore Prasadam
            </button>
          </section>
        )}

        {/* Help Section */}
        <section className="mt-6 rounded-2xl border border-[#ead8b8] bg-[#fff4df] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
              💬
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#6f1717]">
                Need help with your order?
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#806746] sm:text-sm">
                If you have any questions regarding your prasadam order,
                please contact the temple support team.
              </p>

              <button
                type="button"
                onClick={() => router.push("/help")}
                className="mt-2 text-sm font-semibold text-[#8f1d1d] underline underline-offset-2"
              >
                Contact Support
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}