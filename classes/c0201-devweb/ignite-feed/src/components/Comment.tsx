import styles from './Comment.module.css';
import * as React from 'react';
import { ThumbsUp, Trash } from '@phosphor-icons/react';
import { Avatar } from './Avatar.tsx';

export function Comment() {
  return (
    <div className={styles.comment}>
      <Avatar border={false} src='https://github.com/realfabecker.png' />

      <div className={styles.box}>
        <div className={styles.content}>
          <header>
            <div className={styles.author}>
              <strong>Rafael Becker</strong>
              <time title='11 de maio as 13h' dateTime={'2024-05-11 13:00:00'}>
                Cerca de 1h atrás
              </time>
            </div>
            <button title='Delete comentário'>
              <Trash size={24} />
            </button>
          </header>
          <p>Muito bom Devon, parabéns!! </p>
        </div>
        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
