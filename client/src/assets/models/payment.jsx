import React, { useState, useEffect } from 'react';

const PayNowButton = ({ index }) => {

      



  return (
    <div>
      <button onClick={handlePayment} className="px-[40px] py-[10px] border-2 rounded-xl mt-5">
        Add to Order
      </button>
    </div>
  );
};

export default PayNowButton;
