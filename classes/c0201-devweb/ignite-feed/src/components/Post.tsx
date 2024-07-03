// @flow
import * as React from 'react';

import styles from './Post.module.css';
import { Comment } from './Comment.tsx';
import { Avatar } from './Avatar.tsx';

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src='https://github.com/realfabecker.png' />
          <div className={styles.authorInfo}>
            <strong>Rafael Becker</strong>
            <strong>Web Developer</strong>
          </div>
        </div>
        <time title='11 de maio as 13h' dateTime={'2024-05-11 13:00:00'}>
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        <p>
          Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento
          da Rocketseat. O nome do projeto é DoctorCare 🚀
        </p>
        <p>
          <a href=''>jane.design/doctorcare</a>
        </p>
        <p>
          <a href=''>#novoprojeto</a>
          <a href=''>#nlw</a>
          <a href=''>#rocketseat</a>
        </p>
      </div>

      <form className={styles.comments}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder='Deixe um comentário' />
        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
      </div>
    </article>
  );
}
