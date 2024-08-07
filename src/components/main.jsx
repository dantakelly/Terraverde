"use client"

import 'dotenv/config';
import maincss from "./maincss.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShouldError } from './shouldError';



function Main() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const IMAGE_LIMIT = 100; 

  const handleSearch = async (e) => {
    e.preventDefault();

    if(ShouldError.includes(search)) { 
        alert("Not a valid country, state, or city!")
        return;
    }

    const My_Pexels_API_Key = process.env.NEXT_PUBLIC_PEXELS_KEY
    // const My_Pexels_API_Key = "qmA0uxyM1fzhD3uRZmw24ZgPVtrwN3PS07muVGdEEhQ86P0gjOrAaBMO"


    try {
      const fetchImages = await fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=1`, {
        headers: {
          Authorization: My_Pexels_API_Key,
        },

      });
      if (!fetchImages.ok) {
        console.log("Fetching Pexels API error");
      }
      const data = await fetchImages.json();
      setImages(data.photos);
      // Clears the input field after clicking search
      setSearch("");

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div id="main-container">
      <div className="title-intro">
        <h1>Terraverde</h1>
        <p>Terraverde is a comprehensive platform that enables users to explore countries from around the globe. Whether you're curious about a country's culture, geography, or simply looking for beautiful imagery, Terraverde provides an intuitive search experience to discover and learn about diverse destinations worldwide.</p>
      </div>
      <form className="search-container" onSubmit={handleSearch}>
        <input
          placeholder="Enter a Country, City or State"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

        <div className="image-data">
         {images.map((photo) => (
          <Image key={photo.id}
            src={photo.src.large}
            alt="photos"
            width={400}
            height={400}
          />
            ))}
        </div>
    </div>
  );
}

export default Main;