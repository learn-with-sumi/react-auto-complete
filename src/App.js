import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import lodash from 'lodash';
import axios from 'axios';
import './App.css';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

export default function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getItems(event) {
    const { value } = event.target;
    setValue(value);
    setIsLoading(true);
    handleSearch(value);
  };

  const handleSearch = useCallback(
    lodash.debounce((value) => {
      axios.get(`${ITEMS_API_URL}?q=${value}`)
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      })
    }, DEBOUNCE_DELAY), []
  );

  function onSelectedItem(item) {
    console.log(item);
  }
  const classNames = classnames("control", {'is-loading': isLoading});

  return (
    <div className="wrapper">
      <div className={classNames}>
        <input type="text" className="input" value={value} onChange={getItems}/>
      </div>
      {items.length > 0 &&
        <div className="list is-hoverable">
          {items.map((object, index) =>
            <a id={index} className="list-item" onClick={onSelectedItem(object)}>{object}</a>
          )}
        </div>
      }
    </div>
  );
}