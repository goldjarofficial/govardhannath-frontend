"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./prasadam.module.css";

const categories = ["All", "Sweets", "Mahaprasad", "Gifts"];

const products = [
  {
    id: 1,
    title: "Makhana Prasadam",
    price: 200,
    image: "/images/makhana-prasadam.jpg",
    category: "Mahaprasad",
  },
  {
    id: 2,
    title: "Peda",
    price: 180,
    image: "/images/peda.jpg",
    category: "Sweets",
  },
  {
    id: 3,
    title: "Dry Prasadam",
    price: 250,
    image: "/images/dry-prasadam.jpg",
    category: "Mahaprasad",
  },
  {
    id: 4,
    title: "Panchamrit",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "Mahaprasad",
  },
];

export default function Prasadam() {
  const router = useRouter();

  const [category, setCategory] = useState("All");

  const [cart, setCart] = useState<Record<number, number>>({});

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const increase = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrease = (id: number) => {
    setCart((prev) => {
      const quantity = prev[id] || 0;

      if (quantity <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }

      return {
        ...prev,
        [id]: quantity - 1,
      };
    });
  };

  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  const totalAmount = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] || 0),
    0,
  );

  return (
    <main className={styles.screen}>
      {/* HEADER */}

      <header className={styles.header}>
        <button className={styles.back} onClick={() => router.back()}>
          ‹
        </button>

        <h1>Prasadam</h1>
      </header>

      {/* CATEGORIES */}

      <div className={styles.categories}>
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? styles.selected : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}

      <section className={styles.list}>
        {filteredProducts.map((product) => {
          const quantity = cart[product.id] || 0;

          return (
            <div key={product.id} className={styles.product}>
              <img src={product.image} alt={product.title} />

              <div className={styles.info}>
                <h2>{product.title}</h2>

                <p>₹{product.price.toLocaleString("en-IN")}</p>
              </div>

              <div className={styles.quantity}>
                <button onClick={() => decrease(product.id)}>−</button>

                <span>{quantity}</span>

                <button
                  className={styles.plus}
                  onClick={() => increase(product.id)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* CART */}

      {totalItems > 0 && (
        <button
          className={styles.cart}
          onClick={() =>
            router.push(
              `/prasadam/cart?items=${totalItems}&amount=${totalAmount}`,
            )
          }
        >
          <span>View Cart ({totalItems})</span>

          <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
        </button>
      )}

      {/* DECORATION */}

      <div className={styles.decoration}>❧ ❧ ❧</div>
    </main>
  );
}
