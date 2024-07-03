import { PencilLine } from '@phosphor-icons/react';

import styles from './Sidebar.module.css';
import { Avatar } from './Avatar.tsx';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src='https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=50&w=500'
      />

      <div className={styles.profile}>
        <Avatar
          className={styles.avatar}
          src='https://avatars.githubusercontent.com/u/140275759?v=4'
        />
        <strong>Rafael Becker</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href='#'>
          <PencilLine size={20} /> Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
