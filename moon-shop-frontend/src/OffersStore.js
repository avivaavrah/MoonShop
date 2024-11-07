import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Offers.css';

const OffersStore = () => {
    const [offers, setOffers] = useState([]);
    const location = useLocation();
  
    // Extract userId from URL query parameters
    const userId = new URLSearchParams(location.search).get('userId') || 'defaultUser';


    useEffect(() => {
        // Fetch offers and user purchases, then merge data
        const fetchData = async () => {
          try {
            const offersResponse = await axios.get('http://localhost:5000/api/offers');
            const purchasesResponse = await axios.get(`http://localhost:5000/api/user-purchases/${userId}`);
            
            const purchases = purchasesResponse.data.reduce((acc, purchase) => {
              acc[purchase.offerId] = purchase.purchasedCount;
              return acc;
            }, {});
    
            const mergedOffers = offersResponse.data.map((offer) => ({
              ...offer,
              purchased: purchases[offer._id] || 0
            }));
    
            setOffers(mergedOffers);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };
    fetchData();
}, [userId]);

    const handlePurchase = (offerId) => {
        axios.post('http://localhost:5000/api/purchase', { userId, offerId })
          .then((response) => {
            alert(response.data.message);
            setOffers((prevOffers) =>
              prevOffers.map((offer) =>
                offer._id === offerId
                  ? { ...offer, purchased: (offer.purchased|| 0) + 1 }
                  : offer
              )
            );
          })
          .catch((error) => {
            console.error(error);
            alert(error.response?.data?.message || 'An error occurred');
          });
      };
    return (
        <div>
            <h1>Offers Store</h1>
            <div className="offers-container">
                {offers.map((offer) => (
                    <div key={offer._id} className="offer-item">
                        <button
                            onClick={() => handlePurchase(offer._id)}
                            disabled={offer.purchased >= offer.limit}
                            className="offer-button"
                        >
                            {offer.title} <br />
                            {`Limit: ${offer.purchased || 0} / ${offer.limit}`}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default OffersStore;