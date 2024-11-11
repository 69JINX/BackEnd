import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function App() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const product = await axios.get('https://dummyjson.com/products');
    setProducts(product.data.products)
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  useEffect(() => {
    console.log(products);
  }, [products])


  return (
    <>
      {
        products && products.map((product) => (
          <div style={{ padding: '20px' }}>
            <Link to={`/singleProduct/${product.id}`} >{product.title}</Link>
          </div>

        ))
      }


    </>
  )
}

export default App
