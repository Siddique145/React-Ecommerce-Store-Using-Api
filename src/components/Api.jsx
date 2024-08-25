import { useEffect, useState } from "react";

function Api() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        console.log("Api is ready to use", setPosts);
      })
      .catch((error) => console.log("ERROR", error));
  }, []);

  let filteredPosts = posts.filter((post) => {
    const searchTerm = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm) ||
      post.price.toString().toLowerCase().includes(searchTerm)
    );
  });

  const addToCart = (post) => {
    setCart([...cart, post]);
  };

  const removeFromCart = (post) => {
    setCart(cart.filter((item) => item.id !== post.id));
  };

  const isInCart = (post) => {
    return cart.some((item) => item.id === post.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Product Search</h1>
      <div className="max-w-lg mx-auto mb-8 flex items-center">
        <input
          type="text"
          placeholder="Search by title, category or price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 text-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <span className="ml-4 bg-indigo-500 text-white rounded-full px-4 py-2 font-bold shadow-md">
          {cart.length}
        </span>
      </div>
      <section className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-40 rounded w-full object-cover object-center mb-6"
              />
              <h3 className="tracking-widest text-indigo-500 text-xs font-semibold uppercase">
                {post.category}
              </h3>
              <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">
                {post.title}
              </h2>
              <p className="leading-relaxed text-base text-gray-600">
                ${post.price}
              </p>
              {isInCart(post) ? (
                <div className="mt-4">
                  <p className="text-green-500 font-semibold mb-2">Added to Cart</p>
                  <button
                    onClick={() => removeFromCart(post)}
                    className="w-full text-white bg-red-500 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(post)}
                  className="mt-4 w-full text-white bg-indigo-500 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Api;
