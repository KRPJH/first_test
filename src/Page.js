import React, { useState, useEffect } from 'react';
import './style.css';
import {
  chat,
  chatHistory,
  dalle,
  translate as translateFunction,
} from './openai'; // openai 모듈에서 필요한 함수만 import

const shopproductdata = [
  {
    id: 1,
    name: '니트1 회색',
    price: 799.99,
    discountRate: 0.0,
    color: 'gray',
    type: '니트',
  },

  {
    id: 2,
    name: '니트2 검은색',
    price: 399.99,
    discountRate: 0.0,
    color: 'black',
    type: '니트',
  },

  {
    id: 3,
    name: '니트3 파란색',
    price: 99.99,
    discountRate: 0.5,
    color: 'blue',
    type: '니트',
  },

  {
    id: 4,
    name: '셔츠1 회색',
    price: 649.99,
    discountRate: 0.2,
    color: 'gray',
    type: '셔츠',
  },

  {
    id: 5,
    name: '티셔츠1 검은색',
    price: 259.99,
    discountRate: 0.2,
    color: 'black',
    type: '티셔츠',
  },

  {
    id: 6,
    name: '팬츠1 검은색',
    price: 899.99,
    discountRate: 0.2,
    color: 'black',
    type: '팬츠',
  },

  {
    id: 7,
    name: '팬츠2 검은색',
    price: 699.99,
    discountRate: 0.2,
    color: 'black',
    type: '팬츠',
  },

  {
    id: 8,
    name: '팬츠3 검은색',
    price: 599.99,
    discountRate: 0.2,
    color: 'black',
    type: '팬츠',
  },

  {
    id: 9,
    name: '팬츠4 갈색',
    price: 599.99,
    discountRate: 0.2,
    color: 'brown',
    type: '팬츠',
  },

  {
    id: 10,
    name: '데님1 파란색',
    price: 799.99,
    discountRate: 0.2,
    color: 'blue',
    type: '데님',
  },

  {
    id: 11,
    name: '아우터1 검은색',
    price: 1899.99,
    discountRate: 0.2,
    color: 'black',
    type: '아우터',
  },

  {
    id: 12,
    name: '아우터2 흰색',
    price: 1999.99,
    discountRate: 0.2,
    color: 'white',
    type: '아우터',
  },
  {
    id: 13,
    name: '아우터3 검은색',
    price: 1899.99,
    discountRate: 0.2,
    color: 'black',
    type: '아우터',
  },
  {
    id: 14,
    name: '아우터4 회색',
    price: 2299.99,
    discountRate: 0.2,
    color: 'gray',
    type: '아우터',
  },
  {
    id: 15,
    name: '아우터5 흰색',
    price: 299.99,
    discountRate: 0.2,
    color: 'white',
    type: '아우터',
  },
  {
    id: 16,
    name: '스커트1 검은색',
    price: 539.99,
    discountRate: 0.2,
    color: 'black',
    type: '스커트',
  },
];

{
  /*Home Page Code*/
}

const HomePage = () => <div>HomePage</div>;

{
  /*Product Page Code*/
}

const Header = ({ navigateTo }) => {
  return (
    <header>
      <h1>Simple Shopping Mall</h1>
      <nav>
        <ul>
          <li onClick={() => navigateTo('home')}>Home</li>
          <li onClick={() => navigateTo('shop')}>Shop</li>
          <li onClick={() => navigateTo('sale')}>Sale</li>
          <li onClick={() => navigateTo('about')}>About</li>
        </ul>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <h6>&copy; 2023 Simple Shopping Mall</h6>
    </footer>
  );
};

const ShopProduct = ({ handleProductClick, shopfilteredProducts }) => {
  const gridItems = shopfilteredProducts.map((product) => {
    const productImageSrc = `/images/image${product.id}.jpg`;
    return (
      <div
        key={product.id}
        className="sp-product-item"
        onClick={() => handleProductClick(product.id)}
      >
        <img src={productImageSrc} alt={product.name} />
        <h3>{product.name}</h3>
        <p>
          <span className="normal-price">{product.price} $</span>
        </p>
      </div>
    );
  });

  return (
    <div className="sp-container">
      <div className="sp-grid-container">{gridItems}</div>
    </div>
  );
};

const ProductPage = ({ productId, handleBackClick }) => {
  const products = shopproductdata;
  const product = products.find((p) => p.id === productId);

  return (
    <div id="sp-product-page">
      {product ? (
        <div className="product-details">
          <div className="product-image">
            <img src={`/images/image${product.id}.jpg`} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <button className="back-to-shop-button" onClick={handleBackClick}>
              Back to Shop
            </button>
            <button className="buy-now-button">Buy Now</button>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

const Filter = ({ handleFilter, filterOptions }) => {
  const [selectedFirstOption, setSelectedFirstOption] = useState('전체');
  const [selectedSecondOptions, setSelectedSecondOptions] = useState([]);

  const handleFirstFilterClick = (category) => {
    setSelectedFirstOption(category);
    filterProducts(category, selectedSecondOptions);
  };

  const handleSecondFilterClick = (option) => {
    const updatedOptions = selectedSecondOptions.includes(option)
      ? selectedSecondOptions.filter(
          (selectedOption) => selectedOption !== option
        )
      : [...selectedSecondOptions, option];

    setSelectedSecondOptions(updatedOptions);
    filterProducts(selectedFirstOption, updatedOptions);
  };

  const filterProducts = (firstOption, secondOptions) => {
    const filteredProducts = shopproductdata.filter((product) => {
      const firstOptionMatch =
        firstOption === '전체' ? true : product.type === firstOption;
      const secondOptionsMatch =
        secondOptions.length === 0 || secondOptions.includes(product.color);
      return firstOptionMatch && secondOptionsMatch;
    });
    handleFilter(filteredProducts);
  };

  return (
    <div>
      <div className="sp-filter first-filter">
        {filterOptions.first.map((category) => (
          <button
            key={category}
            className={selectedFirstOption === category ? 'selected' : ''}
            onClick={() => handleFirstFilterClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="sp-filter second-filter">
        {filterOptions.second.map((color) => {
          return (
            <button
              key={color}
              className={
                selectedSecondOptions.includes(color) ? 'selected' : ''
              }
              style={{ backgroundColor: color }}
              onClick={() => handleSecondFilterClick(color)}
            >
              {selectedSecondOptions.includes(color) ? '✓' : '　'}
            </button>
          );
        })}
      </div>
    </div>
  );
};

{
  /*Sale Page Code*/
}

const products = [
  {
    id: 1,
    name: '호피무늬 안경',
    price: 180,
    discountedPrice: 200,
    category: '악세사리',
    imageId: 1,
  },
  {
    id: 2,
    name: '검은색 블라우스',
    price: 400,
    discountedPrice: 500,
    category: '상의',
    imageId: 4,
  },
  {
    id: 3,
    name: '흰색 블라우스',
    price: 450,
    discountedPrice: 550,
    category: '상의',
    imageId: 5,
  },
  {
    id: 4,
    name: '흰색 머리끈',
    price: 50,
    discountedPrice: 80,
    category: '악세사리',
    imageId: 6,
  },
  {
    id: 5,
    name: '빨간색 구두',
    price: 250,
    discountedPrice: 350,
    category: '신발',
    imageId: 7,
  },
  {
    id: 6,
    name: '검은색 코트',
    price: 550,
    discountedPrice: 600,
    category: '상의',
    imageId: 8,
  },
  {
    id: 7,
    name: '초록색 니트',
    price: 50,
    discountedPrice: 60,
    category: '상의',
    imageId: 9,
  },
  {
    id: 8,
    name: '회색 추리닝 바지',
    price: 30,
    discountedPrice: 35,
    category: '하의',
    imageId: 15,
  },
  {
    id: 9,
    name: '슬리퍼',
    price: 20,
    discountedPrice: 30,
    category: '신발',
    imageId: 24,
  },
  {
    id: 10,
    name: '회색 후드티',
    price: 50,
    discountedPrice: 55,
    category: '상의',
    imageId: 10,
  },
  {
    id: 11,
    name: '패딩 신발',
    price: 60,
    discountedPrice: 75,
    category: '신발',
    imageId: 23,
  },
  {
    id: 12,
    name: '분홍색 상의',
    price: 45,
    discountedPrice: 50,
    category: '상의',
    imageId: 11,
  },
  {
    id: 13,
    name: '아이보리 후드 니트',
    price: 40,
    discountedPrice: 50,
    category: '상의',
    imageId: 13,
  },
  {
    id: 14,
    name: '남자 검은색 구두',
    price: 80,
    discountedPrice: 95,
    category: '신발',
    imageId: 22,
  },
  {
    id: 15,
    name: '주황색 니트',
    price: 40,
    discountedPrice: 55,
    category: '상의',
    imageId: 12,
  },
  {
    id: 16,
    name: '흰색 진',
    price: 50,
    discountedPrice: 60,
    category: '하의',
    imageId: 14,
  },
  {
    id: 17,
    name: '검은색머리띠',
    price: 10,
    discountedPrice: 20,
    category: '악세사리',
    imageId: 25,
  },
  {
    id: 18,
    name: '갈색 어그 부츠',
    price: 35,
    discountedPrice: 60,
    category: '신발',
    imageId: 21,
  },
  {
    id: 19,
    name: '카코 팬츠',
    price: 40,
    discountedPrice: 50,
    category: '하의',
    imageId: 26,
  },
  {
    id: 20,
    name: '검은색 벨트',
    price: 35,
    discountedPrice: 45,
    category: '악세사리',
    imageId: 20,
  },
  {
    id: 21,
    name: '블랙 워싱 팬츠',
    price: 25,
    discountedPrice: 40,
    category: '하의',
    imageId: 16,
  },
  {
    id: 22,
    name: '검은색 장갑',
    price: 30,
    discountedPrice: 35,
    category: '악세사리',
    imageId: 19,
  },
  {
    id: 23,
    name: '회색 워싱 팬츠',
    price: 55,
    discountedPrice: 65,
    category: '하의',
    imageId: 17,
  },
  {
    id: 24,
    name: '흰색 목도리',
    price: 40,
    discountedPrice: 45,
    category: '악세사리',
    imageId: 18,
  },
];

const AboutPage = () => {
  const title = '한명이 없어도 괜찮아';
  const url = 'https://sae.kangnam.ac.kr/menu/';
  const ids = [
    'e4316b619fc310b322484df551584b5e.do',
    'cfb55ccdaa60e985c4e14d3983c83010.do',
    'cfb55ccdaa60e985c4e14d3983c83010.do',
  ];
  const movies = [
    '20학번 박준형 2학년 소프트웨어전공',
    '20학번 이하녕 4학년 가상현실전공',
    '21학번 장서희 3학년 건축공학전공',
  ];
  //public/img/이미지들
  const srcs = [
    'images/puppy.jpg',
    'images/guineapig.jpg',
    'images/teamImage.jpg',
  ];
  return (
    <div>
      <h1>{title}</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <img
                src={srcs[srcs.length - 1]}
                width="400"
                height="400"
                alt="team"
              />
            </td>
            <td>
              <table>
                <tbody>
                  {ids.map(function (urltail, i) {
                    return (
                      <tr key={urltail}>
                        <td>
                          <a href={url + urltail}>
                            <img
                              src={srcs[i]}
                              width="30"
                              alt={`movie${i + 1}`}
                            />
                          </a>
                        </td>
                        <td>
                          <span>{movies[i]}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default function Page() {
  // ShopPage 변수
  const [selectedPage, setSelectedPage] = useState('home');
  const [filterVisible, setFilterVisible] = useState(false);
  const [shopfilteredProducts, setshopFilteredProducts] =
    useState(shopproductdata);
  const filterOptions = {
    first: [
      '전체',
      '아우터',
      '셔츠',
      '블라우스',
      '티셔츠',
      '니트',
      '스커트',
      '팬츠',
      '데님',
    ],
    second: ['gray', 'black', 'blue', 'brown', 'white'],
  };

  const navigateTo = (page) => {
    setSelectedPage(page);
    setFilterVisible(page === 'shop');
  };

  const handleFilter = (shopfilteredProducts) => {
    setshopFilteredProducts(shopfilteredProducts);
  };

  const handleProductClick = (productId) => {
    setSelectedPage(productId);
  };

  const handleBackClick = () => {
    setSelectedPage('shop');
  };

  // SalePage 변수
  // 상태 변수들 선언
  const [amount, setAmount] = useState(0); // 금액 상태
  const [categoryFilters, setCategoryFilters] = useState([]); // 카테고리 필터 상태
  const [filteredProducts, setFilteredProducts] = useState([]); // 필터된 상품 목록 상태
  const [cart, setCart] = useState([]); // 장바구니 상태
  const [previewImages, setPreviewImages] = useState([]); // 미리보기 이미지 상태

  // 페이지 로딩 시 전체 상품을 초기 필터로 설정
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // 금액 변경 이벤트 핸들러
  const handleAmountChange = (event) => {
    const newAmount = parseInt(event.target.value, 10);
    setAmount(newAmount);
  };

  // 카테고리 필터 핸들러
  const handleCategoryFilter = (category) => {
    // 선택한 카테고리를 토글하여 업데이트
    if (categoryFilters.includes(category)) {
      setCategoryFilters(categoryFilters.filter((c) => c !== category));
    } else {
      setCategoryFilters([...categoryFilters, category]);
    }
  };

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    // 금액, 카테고리에 따라 상품 필터링
    const filteredByAmount = products.filter(
      (product) => product.discountedPrice <= amount
    );
    const filteredByCategory =
      categoryFilters.length > 0
        ? filteredByAmount.filter((product) =>
            categoryFilters.includes(product.category)
          )
        : filteredByAmount;

    // 필터링된 결과를 상품 목록에 반영
    setFilteredProducts(filteredByCategory);
  };

  // 장바구니에 상품 추가
  const addToCart = (product) => {
    setCart([
      ...cart,
      { ...product, discountedPrice: product.discountedPrice || product.price },
    ]);
  };

  // 장바구니에서 상품 제거
  const removeItemFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // 장바구니 비우기
  const clearCart = () => {
    setCart([]);
  };

  // 주문 목록 페이지 컴포넌트
  const CheckoutPage = () => {
    return (
      <div>
        <h2>장바구니</h2>
        {cart.map((item, index) => (
          <div key={index}>
            <p>
              {item.name} - 할인가: ${item.price}
            </p>
            <button onClick={() => removeItemFromCart(index)}>제거</button>
          </div>
        ))}
        {cart.length > 0 && (
          <div>
            <p>
              총 금액: ${cart.reduce((total, item) => total + item.price, 0)}
            </p>
            <button onClick={clearCart}>장바구니 비우기</button>
          </div>
        )}
      </div>
    );
  };

  // 쇼핑 페이지 상품 컴포넌트
  const ShopPageProduct = () => {
    return (
      <div className="shoppage-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={`images/test${product.imageId}.png`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>
              <span className="original-price">
                {product.discountedPrice} $
              </span>
              <span className="discounted-price">{product.price} $</span>
            </p>
            <button onClick={() => addToCart(product)}>장바구니에 담기</button>
          </div>
        ))}
      </div>
    );
  };
  // '상품 미리보기' 버튼 클릭 시 호출되는 함수
  const handlePreviewImages = () => {
    // '그리는 중..' 문장 대신 이미지를 보여주는 로직 추가
    setPreviewImages([{ url: 'path/to/loading-image.jpg' }]);

    // 장바구니에서 선택한 상품을 바탕으로 문장 생성
    const productNames = cart.map((item) => item.name);
    const sentence = `${productNames.join('와 ')}을(를) 착용하고 있습니다.`;

    // 생성된 문장을 영어로 번역
    translateFunction(sentence, (translatedSentence) => {
      // translatedSentence를 사용하여 원하는 이미지 생성 또는 처리 로직 추가
      // 예: AI 이미지 생성 로직
      console.log('영어 번역 결과:', translatedSentence);
      // 이미지 생성 또는 기타 처리 로직 추가

      // 생성된 이미지를 previewImages 상태에 업데이트
      setPreviewImages([{ url: 'path/to/generated-image.jpg' }]);
    });
  };

  return (
    <div>
      <Header navigateTo={navigateTo} />
      <main id="sp-product-list">
        <div id="sp-product">
          {selectedPage === 'home' && <HomePage />}
          {selectedPage === 'shop' && (
            <div>
              {filterVisible && (
                <Filter
                  handleFilter={handleFilter}
                  filterOptions={filterOptions}
                />
              )}
              <ShopProduct
                handleProductClick={handleProductClick}
                shopfilteredProducts={shopfilteredProducts}
              />
            </div>
          )}
          {selectedPage === 'sale' && (
            <div>
              <header>
                <h1>Time Sale</h1>
              </header>
              <main id="sp-product-list" style={{ display: 'flex' }}>
                <div
                  id="sp-filterBy"
                  style={{ position: 'fixed', left: 0, zIndex: 1000 }}
                >
                  <h2>필터</h2>
                  <label>금액 : ${amount}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <br />
                  <label>종류: </label>
                  <label>
                    <input
                      type="checkbox"
                      value="상의"
                      checked={categoryFilters.includes('상의')}
                      onChange={() => handleCategoryFilter('상의')}
                    />
                    상의
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="하의"
                      checked={categoryFilters.includes('하의')}
                      onChange={() => handleCategoryFilter('하의')}
                    />
                    하의
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="신발"
                      checked={categoryFilters.includes('신발')}
                      onChange={() => handleCategoryFilter('신발')}
                    />
                    신발
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="악세사리"
                      checked={categoryFilters.includes('악세사리')}
                      onChange={() => handleCategoryFilter('악세사리')}
                    />
                    악세사리
                  </label>
                  <div>
                    <button id="search" onClick={handleSearch}>
                      OK
                    </button>
                  </div>
                </div>
                <div
                  id="shopPageProduct"
                  style={{ marginLeft: '200px', flex: 1 }}
                >
                  <ShopPageProduct />
                </div>
              </main>

              <div>
                {cart.length > 0 && <CheckoutPage />}
                {/* '상품 미리보기' 버튼 및 미리보기 이미지 표시 */}
                <div
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: '20px',
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {/* '상품 미리보기' 버튼 */}
                  <div
                    style={{
                      position: 'fixed',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      padding: '20px',
                    }}
                  ></div>
                  {/* '그리는 중..' 이미지 또는 AI 착용 이미지 표시 */}
                  {previewImages.length > 0 ? (
                    previewImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        style={{
                          width: 128,
                          height: 128,
                          border: '2px solid black',
                          margin: '8px',
                        }}
                      />
                    ))
                  ) : (
                    <div
                      style={{
                        width: 128,
                        height: 128,
                        border: '2px solid black',
                        margin: '8px',
                      }}
                    >
                      그리는 중..
                    </div>
                  )}
                  <button onClick={handlePreviewImages}>상품 미리보기</button>
                </div>
              </div>
            </div>
          )}
          {selectedPage === 'about' && <AboutPage />}
          {typeof selectedPage === 'number' && (
            <ProductPage
              key={selectedPage}
              productId={selectedPage}
              handleBackClick={handleBackClick}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
