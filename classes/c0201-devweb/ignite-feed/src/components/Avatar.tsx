import styles from './Avatar.module.css';

export function Avatar({ src, border = true }) {
  return <img className={!border ? styles.avatarNoBorder : styles.avatar} src={src} />;
}
