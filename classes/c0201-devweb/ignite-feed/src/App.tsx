import { Header } from './components/Header.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Post } from './components/Post.tsx';

import styles from './App.module.css';

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post />
          <Post />
        </main>
      </div>
    </div>
  );
}

export default App;
