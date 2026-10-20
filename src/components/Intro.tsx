"use client";

import Image from "next/image";
import styles from "./Intro.module.css";
import { useContactModal } from "./ContactModalProvider";

type Tile = { title: string; body: string; image?: string; imagePosition?: string };

const TILES: Tile[] = [
  {
    title: "Consult our engineers",
    body: "Get expert advice on sourcing from India: which suppliers to choose, what parts should cost, and how to manage quality and compliance.",
    image: "/tile-consult.png",
  },
  {
    title: "Find a new supplier",
    body: "We find manufacturers who can make your part, visit their plants, and recommend the best one.",
    image: "/tile-find-supplier.png",
    imagePosition: "center 65%",
  },
  {
    title: "Develop your suppliers",
    body: "We work with your suppliers at their plants to improve their processes, quality and paperwork until they meet your standards.",
    image: "/tile-develop-suppliers.jpg",
    imagePosition: "center 65%",
  },
  {
    title: "Manage your suppliers",
    body: "We audit, inspect and follow up with your suppliers regularly. If problems come up, we find the cause and get them fixed.",
    image: "/tile-manage-suppliers.jpg",
    imagePosition: "center 65%",
  },
  {
    title: "Ship from India",
    body: "We inspect the goods before they leave, prepare the export documents and arrange delivery to you.",
    image: "/tile-ship.jpg",
    imagePosition: "center 65%",
  },
];

export default function Intro() {
  const openContact = useContactModal();

  return (
    <section id="offerings" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>What we do for you</h2>
        <p className={styles.subtitle}>
          We act as your team in India, at your suppliers&apos; plants and on
          the ground. These are the areas we cover most often.
        </p>

        <div className={styles.tiles}>
          {TILES.map((tile) => (
            <div key={tile.title} className={styles.tile}>
              <div className={styles.tileImage}>
                {tile.image && (
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className={styles.tileImagePhoto}
                    style={tile.imagePosition ? { objectPosition: tile.imagePosition } : undefined}
                  />
                )}
              </div>
              <div className={styles.tileContent}>
                <h3 className={styles.tileTitle}>{tile.title}</h3>
                <p className={styles.tileBody}>{tile.body}</p>
              </div>
            </div>
          ))}

          <button type="button" className={styles.tileMore} onClick={openContact}>
            <h3 className={styles.tileTitle}>Anything else on the ground</h3>
            <p className={styles.tileBody}>
              Plant visits, supplier meetings, technical checks: whatever
              your own team would handle in India.
            </p>
            <span className={styles.tileEnquiry}>Send an enquiry →</span>
          </button>
        </div>
      </div>
    </section>
  );
}
