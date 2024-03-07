import { useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//데이터를 분리하거나 가공할때쓰임
export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  // 현재의 페이지에 Category_id와 동일하면 active는 True
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const setActive = () => {
    if (params.get("category_id")) {
      //있으면? category데이터를 수정해야함
      setCategory((current) => {
        return current.map((item) => {
          return {
            ...item,
            isActive:
              item.category_id === Number(params.get("category_id"))
                ? true
                : false,
          };
        });
      });
    } else {
      setCategory((current) => {
        return current.map((item) => {
          return { ...item, isActive: false };
        });
      });
    }
  };

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) {
        return;
      }

      const categoryWithAll = [
        { category_id: null, category_name: "전체" },
        ...category,
      ];

      setCategory(categoryWithAll);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { category };
};
/**
 *   const setActive = () => {
    const params = new URLSearchParams(location.search);

    if (params.get("category_id")) {
      // query string에서 category_id를 key로하는 value가 있냐
      setCategory((current) => {
        return current.map((item) => {
          return {
            ...item,
            isActive: item.category_id === Number(params.get(`category_id`)),
          };
        });
      });
    } else {
      setCategory((current) => {
        return current.map((item) => {
          return { ...item, isActive: false };
        });
      });
    }
  };
  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) {
        return;
      }
      const categoryWithAll = [
        { category_id: null, category_name: "전체" },
        ...category,
      ];

      setCategory(categoryWithAll);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);
 */
