import { TopNav } from '../../components/topNav/TopNav';
import styles from './Results.module.scss';

export function Results(props: any) {
  const images = props.images?.map((imageData: any) => {
    return (
      <div key={imageData.image.id} className={styles.image}>
        <img src={imageData.image.url}></img>
      </div>
    );
  });

  return (
    <div className={styles.Results}>
      { images }
    </div>
  );
}