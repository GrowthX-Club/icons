import { SearchIcons } from '@/modules/HomePage/components/SearchIcons';
import styles from '@/modules/HomePage/styles/HomePage.module.css';

export function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>GrowthX Icons</h1>
      </div>

      <p className={styles.paragraph}>
        Browse through the icons below to find the one you need. The search
        field supports synonyms—for example, try searching for "hamburger" or
        "logout."
      </p>

      <SearchIcons />
    </div>
  );
}
