import { useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useEffect } from "react";

//데이터를 분리하거나 가공할때쓰임
export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  /*useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) {
        return;
      }
      const categoryWithAll = [{ id: null, name: "전체" }, ...category];

      setCategory(categoryWithAll);
    });
  }, []);
*/
  return { category };
};
