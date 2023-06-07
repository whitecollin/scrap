import React, { useState,useRef } from 'react';

const ImageSelector = () => {
  const [images, setImages] = useState([]);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages([...images,e.target.result]);
    };
    reader.readAsDataURL(file);
  }

  const handleDragStart = (e, index) => {
    setDraggedImageIndex(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    if (draggedImageIndex !== null) {
      const newIndex = calculateNewIndex(e.clientY);
      if (newIndex !== draggedImageIndex) {
        const newImages = [...images];
        const draggedImage = newImages.splice(draggedImageIndex, 1)[0];
        newImages.splice(newIndex, 0, draggedImage);
        setImages(newImages);
        setDraggedImageIndex(newIndex);
      }
    }
  };
  
  const calculateNewIndex = (clientY) => {
    const { top: boxTop, height: boxHeight } = imageBoxRef.current.getBoundingClientRect();
    const relativeY = clientY - boxTop;
    const newIndex = Math.round(relativeY / (boxHeight / images.length));
    return Math.max(0, Math.min(images.length - 1, newIndex));
  };
  const handleDragEnd = () => {
    setDraggedImageIndex(null);
  };
  const imageBoxRef = useRef();

  return (
    <>
    
       <input type="file" onChange={handleImageChange} accept="image/*" />
    <div ref={imageBoxRef} style={{ border: '1px solid black' }}>

        {images.map((image,index) => (
          <img alt='adsf'
          src={image}
        draggable
        style={{ width: '200px', height: '200px', margin: '10px' }}
        onDragStart={(e) => handleDragStart(e, index)}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      />
        ))}
    </div>
    </>
  );
};

export default ImageSelector;