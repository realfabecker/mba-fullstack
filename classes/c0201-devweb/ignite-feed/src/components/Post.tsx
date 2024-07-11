// @flow
import * as React from 'react';

import styles from './Post.module.css';
import { Comment } from './Comment.tsx';
import { Avatar } from './Avatar.tsx';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { useState } from 'react';

export function Post({ id, author, content, publishedAt }) {
  const [comments, setComments] = useState([
    { id: Math.random(), content: 'Muito bom Devon, parabéns!!' },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' H:mm'h'", {
    locale: ptBR,
  });
  const publishedDateRelative = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event) {
    event.preventDefault();
    setComments((prevState) => [...prevState, { id: Math.random(), content: newCommentText }]);
    setNewCommentText('');
  }

  function handleChangeNewCommentText(event) {
    setNewCommentText(event.target.value);
  }

  function deleteComment(idx) {
    setComments(comments.filter(({ id }) => id !== idx));
  }

  return (
    <article key={id} className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src='https://github.com/realfabecker.png' />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <strong>{author.role}</strong>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelative}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((c) => {
          if (c.type === 'paragraph') {
            return <p key={c.content}>{c.content}</p>;
          }
          if (c.type === 'link') {
            return (
              <p key={c.content}>
                <a href=''>{c.content}</a>
              </p>
            );
          }
          if (c.type === 'tags') {
            return (
              <p key={c.content}>
                {c.content.map((tag) => (
                  <a key={tag} href=''>
                    {tag}
                  </a>
                ))}
              </p>
            );
          }
          return null;
        })}
      </div>

      <form className={styles.comments} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder='Deixe um comentário'
          onChange={handleChangeNewCommentText}
          value={newCommentText}
          required
        />
        <footer>
          <button type='submit' disabled={!newCommentText.length}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment key={comment.content} deleteComment={deleteComment} {...comment} />
        ))}
      </div>
    </article>
  );
}
