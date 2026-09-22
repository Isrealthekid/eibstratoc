import Image from "next/image";
import styles from "./timeline.module.css";

export interface TimelineItem {
  title: string;
  description: string;
  label: string;
  image: string;
  imageAlt: string;
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => (
        <li className={styles.item} key={item.title}>
          <div className={styles.copy}>
            <span className={styles.label}>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          <span className={styles.dot} aria-hidden="true" />
          <div className={styles.image}>
            <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 767px) 90vw, 45vw" />
          </div>
        </li>
      ))}
    </ol>
  );
}
