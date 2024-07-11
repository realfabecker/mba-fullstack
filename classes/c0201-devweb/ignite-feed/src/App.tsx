import { Header } from './components/Header.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Post } from './components/Post.tsx';

import styles from './App.module.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/realfabecker.png',
      name: 'Rafael Becker',
      role: 'Web Developer',
    },
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa 👋',
      },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'link',
        content: 'jane.design/doctorcare',
      },
      {
        type: 'tags',
        content: ['#novoprojeto', '#nlw', '#rocketseat'],
      },
    ],
    publishedAt: new Date('2024-07-09 20:00:00'),
  },
];

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
