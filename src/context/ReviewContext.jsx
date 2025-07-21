import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  // Initialize with sample reviews or empty array
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('productReviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      // Sample reviews for initial state
      {
        id: 1,
        productId: 1,
        userId: 'user1',
        userName: 'John D.',
        rating: 5,
        title: 'Excellent quality and value',
        comment: 'This product exceeded my expectations. The quality is outstanding and it\'s exactly as described. Would definitely recommend!',
        date: '2023-12-15',
        verified: true,
        helpful: 45
      },
      {
        id: 2,
        productId: 1,
        userId: 'user2',
        userName: 'Sarah M.',
        rating: 4,
        title: 'Great product with minor issues',
        comment: 'Overall very satisfied with the purchase. The only small issue is the size runs a bit large. Consider ordering one size down.',
        date: '2023-12-10',
        verified: true,
        helpful: 28
      },
      {
        id: 3,
        productId: 1,
        userId: 'user3',
        userName: 'Mike R.',
        rating: 5,
        title: 'Perfect for my needs',
        comment: 'Exactly what I was looking for. Fast delivery and great customer service. Will buy again!',
        date: '2023-12-05',
        verified: true,
        helpful: 15
      },
      // Add more sample reviews for other products
      {
        id: 4,
        productId: 2,
        userId: 'user4',
        userName: 'Emily K.',
        rating: 5,
        title: 'Amazing sound quality',
        comment: 'These headphones have incredible sound quality and the noise cancellation works perfectly.',
        date: '2023-12-12',
        verified: true,
        helpful: 32
      }
    ];
  });

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('productReviews', JSON.stringify(reviews));
  }, [reviews]);

  // Add a new review
  const addReview = (review) => {
    const newReview = {
      ...review,
      id: Date.now(), // Simple way to generate unique IDs
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      helpful: 0,
      verified: true // Assuming all reviews are verified for simplicity
    };
    
    setReviews(prevReviews => [...prevReviews, newReview]);
    return newReview;
  };

  // Mark a review as helpful
  const markReviewHelpful = (reviewId) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 } 
          : review
      )
    );
  };

  // Get reviews for a specific product
  const getProductReviews = (productId) => {
    return reviews.filter(review => review.productId === productId);
  };

  // Calculate average rating for a product
  const getProductAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    
    const sum = productReviews.reduce((total, review) => total + review.rating, 0);
    return sum / productReviews.length;
  };

  // Get top reviews for a product (highest helpful count)
  const getTopReviews = (productId, limit = 3) => {
    return getProductReviews(productId)
      .sort((a, b) => b.helpful - a.helpful)
      .slice(0, limit);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        markReviewHelpful,
        getProductReviews,
        getProductAverageRating,
        getTopReviews
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};