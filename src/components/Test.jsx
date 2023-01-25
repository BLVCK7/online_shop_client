import axios from 'axios';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Test = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const types = [
    { id: 1, name: 'Часы' },
    { id: 2, name: 'Смартфоны' },
    { id: 3, name: 'Ноутбуки' },
    { id: 4, name: 'Холодильники' },
  ];

  const [chekBoxArr, setCheckBoxArr] = React.useState([]);

  const handleCheckBox = (e, id) => {
    setCheckBoxArr((prev) => {
      if (chekBoxArr.find((e) => e.id === id)) {
        let newarr = chekBoxArr.filter((a) => a.id !== id);
        return newarr;
      } else {
        return [...prev, { name: e.target.name, id: id, checked: true }].sort(
          (a, b) => a.id - b.id,
        );
      }
    });
  };

  console.log(chekBoxArr[0]?.id);

  // React.useEffect(() => {
  //   chekBoxArr.length > 0 && setSearchParams(chekBoxArr[0]?.id);
  // }, [chekBoxArr]);

  console.log(chekBoxArr);
  console.log(searchParams);

  return (
    <div>
      <form method="get">
        <div className="flex flex-col">
          {types.map((type) => (
            <div key={type.id}>
              <input
                name={type.name}
                value={type.id}
                type="checkbox"
                onChange={(e) => navigate('/device?typeId=' + type.id)}
              />
              <label>{type.name}</label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Test;
