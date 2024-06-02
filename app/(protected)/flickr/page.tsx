import React from 'react';

const FlickrPage = () => {
  const images = [
    {
      src: "http://www.sobi.org/photos/Cat/Mottle/OciCatB_004.jpg",
      title: "My cat",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    // Repeat as needed...
  ];

  return (
    <div id="dashboard">
      <h3>Earn money from your Flickr photos</h3>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      <div className="rainbow bar"></div>
      
      <div id="import-grid">
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <img src={image.src} alt={image.title} />
              <h4>{image.title}</h4>
              <p>{image.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlickrPage;
