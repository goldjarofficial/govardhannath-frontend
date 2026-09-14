"use client";

import { useRouter } from "next/navigation";
import styles from "./profile-drawer.module.css";

type Props = {
  onClose: () => void;
};

const menu = [
  ["⌂", "Home", "/dashboard"],
  ["▶", "Live Darshan", "/live-darshan"],
  ["♨", "Seva & Donation", "/seva-donation"],
  ["🐄", "Go Seva", "/go-seva"],
  ["◷", "Darshan Timings", "/darshan-timings"],
  ["▣", "Events & Utsav", "/events"],
  ["♨", "Prasadam", "/prasadam"],
  ["▣", "Reels & Bhakti", "/reels"],
  ["▤", "Temple Information", "/temple-information"],
  ["▣", "My Bookings", "/my-bookings"],
  ["♨", "My Donations", "/my-donations"],
  ["♡", "Notifications", "/notifications"],
  ["⚙", "Settings", "/settings"],
  ["?", "Help & Support", "/help"],
];

export default function ProfileDrawer({ onClose }: Props) {
  const router = useRouter();

  const navigate = (route: string) => {
    onClose();
    router.push(route);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* PROFILE HEADER */}

        <div className={styles.profileHeader}>
          <div className={styles.profilePhoto}>👤</div>

          <div className={styles.profileInfo}>
            <h2>Krishna Sharma</h2>
            <p>+91 8080232328</p>
          </div>

          <button className={styles.close} onClick={onClose}>
            ×
          </button>
        </div>

        {/* MENU */}

        <div className={styles.menu}>
          {menu.map(([icon, title, route]) => (
            <button
              key={title}
              className={title === "Home" ? styles.active : ""}
              onClick={() => navigate(route)}
            >
              <span className={styles.icon}>{icon}</span>

              <span className={styles.title}>{title}</span>

              <span className={styles.arrow}>›</span>
            </button>
          ))}

          {/* LOGOUT */}

          <div className={styles.separator} />

          <button className={styles.logout} onClick={() => navigate("/login")}>
            <span className={styles.icon}>↪</span>

            <span className={styles.title}>Logout</span>

            <span className={styles.arrow}>›</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
