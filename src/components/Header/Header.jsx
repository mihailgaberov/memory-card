import Score from "../Score";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.heading}>
      <h2>Memory Card Game</h2>
      <Score />
    </header>
  );
}
