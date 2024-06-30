//Loading.tsx
import React from 'react';
import '../CSS/Loading.css'; 

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
