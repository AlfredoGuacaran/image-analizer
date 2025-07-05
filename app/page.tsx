import styles from './page.module.css';
import { Button } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href="/image-analyzer">
        <Button type="primary">Image Analyzer</Button>
      </Link>
    </div>
  );
}
