import { FC } from "react";
import styles from "./index.module.scss";

interface CategoryTabProps {
  category: CategoryModel;
  selected: boolean;
  onClick: () => void;
}

const CategoryTab: FC<CategoryTabProps> = ({ category, selected, onClick }) => {
  return (
    <div className={`${styles.categoryTab} ${selected ? styles["categoryTab--selected"] : ""}`} onClick={onClick}>
      <p className={styles.categoryTab__text}>{category.title}</p>
    </div>
  );
}

export default CategoryTab;
