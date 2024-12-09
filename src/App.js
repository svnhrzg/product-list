import { useState } from "react";

const productsData = [
  {
    id: 0,
    title: "Schokolade-Himbeer",
    category: "Geburtstag",
    pax: 8,
    ingredients: [
      "Dunkles Schokoladenmousse",
      "Schokoladenbiskuit",
      "Himbeer",
      "dunkle Schokoladenglasur",
      "Kakaobruch"
    ],
    price: 60,
    image: "./images/0144.jpg"
  },
  {
    id: 1,
    title: "Schokolade",
    category: "Sonstiger Anlass",
    pax: 12,
    ingredients: [
      "Karamellmousse",
      "Schokoladenbiskuit",
      "dunkle Schokoladenglasur",
      "Fondant"
    ],
    price: 90,
    image: "./images/0327.jpg"
  },
  {
    id: 2,
    title: "Käsesahne-Himbeer",
    category: "Geburtstag",
    pax: 6,
    ingredients: [
      "Käsesahnekrem",
      "Vanillebiskuit",
      "Himbeeren",
      "Marzipan",
      "Macaron"
    ],
    price: 45,
    image: "./images/0389.jpg"
  },
  {
    id: 3,
    title: "Cassiskrem",
    category: "Geburtstag",
    pax: 12,
    ingredients: [
      "Cassis Butterkrem",
      "Schokoladenbiskuit",
      "Ganache",
      "Marzipan",
      "Brombeeren"
    ],
    price: 90,
    image: "./images/0563.jpg"
  },
  {
    id: 4,
    title: "Salzkaramell",
    category: "Geburtstag",
    pax: 16,
    ingredients: [
      "Schokoladenbutterkrem",
      "Schokoladenbiskuit",
      "Salzkaramellkern"
    ],
    price: 120,
    image: "./images/0851.jpg"
  },
  {
    id: 5,
    title: "Vanillekrem",
    category: "Hochzeit",
    pax: 36,
    ingredients: [
      "Vanillebutterkrem",
      "Vanillebiskuit",
      "Himbeerkern",
      "Vanillemuffin",
      "Himbeerbutterkrem",
      "Fondant"
    ],
    price: 250,
    image: "./images/9161.jpg"
  }
]

export default function App() {
  let products = productsData;

  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleSetCategory(e) {
    setCategory(e.target.value);
  }
  function handleSetOrder(e) {
    setOrder(e.target.value);
  }
  function handleSetSearch(e) {
    setSearch(e.target.value)
  }

  function handleIsOpen() {
    setIsOpen(is => !is);
  }

  function handleSelectedProduct(product) {
    setSelectedProduct(product.id);
  }

  function handleShowPrevImage() {
    if (selectedProduct === 0) {setSelectedProduct(products.length - 1)}
    else {setSelectedProduct(selectedProduct - 1)}
}

function handleShowNextImage() {
  if (selectedProduct === products.length - 1) {setSelectedProduct(0)}
  else {setSelectedProduct(selectedProduct + 1)}
}

  if (category === "" || order === "") {
    products = products.slice();
  }
  if (category !== "") {
    products = products.slice().filter(product => (product.category === category))
  }

  if (order === "up") {
    products = products.slice().sort((a, b) => a.price - b.price);
  }
  if (order === "down") {
    products = products.slice().sort((a, b) => b.price - a.price);
  }

  if (search !== "") {
    products = products.slice().filter(product => product.title.toLowerCase().includes(search) || product.title.includes(search));
  }

  const amount = products.length;

  function handleClearAll() {
    setCategory("");
    setOrder("");
    setSearch("");
  }

  return (
    <div className="app">
      <Header onIsOpen={handleIsOpen} />
      { !isOpen && (
        <>
        <Filter category={category} onSetCategory={handleSetCategory} order={order} onSetOrder={handleSetOrder} search={search} onSetSearch={handleSetSearch} amount={amount} onClearAll={handleClearAll}/>
        <ProductsList products={products} onIsOpen={handleIsOpen} onSelectedProduct={handleSelectedProduct} />
        </>
        ) }
     { isOpen && <Modal products={products} selectedProduct={selectedProduct} onShowPrevImage={handleShowPrevImage} onShowNextImage={handleShowNextImage} /> }
    </div>
  )
}

function Header({onIsOpen}) {
  return (
    <header>
      <div className="title">
        <div className="wrapper">
          <h3 onClick={onIsOpen} >Genussmanufaktur</h3>
        </div>
      </div>
    </header>
  )
}

// function FormAddProduct() {
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!title || !image) return;

//     const id = crypto.randomUUID();
//     const newProduct = {
//       id, 
//       title,
//       image: `${image}?=${id}`,
//     };
//   };

//   return (
//     <div>
//       <div><h2>Produkt hinzufügen</h2></div>
//       <form className="form-add-product" onSubmit={handleSubmit}>
//         <label>Titel</label>
//         <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
//         <label>Bild URL</label>
//         <input type="text" value={image} onChange={e => setImage(e.target.value)}/>
//         <Button>Hinzufügen</Button>
//       </form> 
//     </div>

//   )
// }

// function Button({children, onClick}) {
//   return <button className="button" onClick={onClick}>{children}</button>
// }

function Filter({category, onSetCategory, order, onSetOrder, search, onSetSearch, amount, onClearAll}) {

  return ( 
    <div className="wrapper main">
      <div className ="add-product">
        <h1>Torten & Kuchen</h1>
        {/* <FormAddProduct /> */}
      </div>
    <div className="filter-wrapper">
      <div className="filter">
        <label>Kategorie</label>
        <select value={category} onChange={onSetCategory}>
          <option value="">Alle</option>
          <option value="Geburtstag">Geburtstag</option>
          <option value="Hochzeit">Hochzeit</option>
          <option value="Sonstiger Anlass">Sonstiger Anlass</option>
        </select>
        </div>
        <div className="filter">
        <label>Suche</label>
        <input type="search" value={search} onChange={onSetSearch}/>
      </div>
      <div className="filter">
        <label>Sortieren</label>
        <select value={order} onChange={onSetOrder}>
          <option value=""></option>
          <option value="up">Preis aufsteigend</option>
          <option value="down">Preis abfallend</option>
        </select>
        </div>
        <div className="filter">
        <button className="clear-all" onClick={onClearAll}>Alle Filter aufheben</button>
      </div>
      <div className="product-amount">{(amount > 1 && `${amount} Produkte `) || (amount === 0 && 'kein Produkt') || (amount === 1 && '1 Produkt')} gefunden</div>
    </div>
    </div>
  )
}

function ProductsList({products, onIsOpen, onSelectedProduct}) {
return (
  <>
    <ul className="products-list" onClick={onIsOpen}>
      {products.map(product => (
        <Product product={product} key={product.id} onSelectedProduct={onSelectedProduct}/>
      ))}
    </ul>
  </>
)

}
function Product({product, onSelectedProduct}) {
return (
  <li className="product" onClick={() => onSelectedProduct(product)}>
    <div className="product-image" style={{backgroundImage: `url(${product.image})`}}>
    </div>
    <div className="product-text">
      <h3>{product.title}</h3>
      <div className="product-price">€{product.price} <span className="pax"> / {product.pax} Personen</span></div>
      <span className="product-category">{product.category}</span>
    </div>
  </li>
)
}

function Modal({ products, selectedProduct, onShowPrevImage, onShowNextImage }) {

  return (
    <>
    <div className="modal-wrapper">      
      <div className="modal-header">
        <h1>{products[selectedProduct].title}</h1>
        <div className="prev" onClick={onShowPrevImage}></div>
        <div className="next" onClick={onShowNextImage}></div>
      </div> 
    
      <div className="modal-product-image" style={{backgroundImage: `url(${products[selectedProduct].image})`}}></div>

    <div className="modal-product-info">

      <div className="modal-product">
        <label>Preis</label>
        <div className="modal-product-price">€{products[selectedProduct].price} <span className="pax"> / {products[selectedProduct].pax} Personen</span>
        </div>
      </div>
    
    <div className="modal-product">
      <label>Zutaten</label>
      <div className="modal-product-ingredients">{products[selectedProduct].ingredients.join(", ")}</div>
    </div>

    <div className="modal-product">
        <label>Anlass</label>
        <div className="product-category">{products[selectedProduct].category}</div>
      </div>

    </div>
    </div>
    </>
  )
}