// import  { useEffect, useState } from "react";
// import { Map, View } from "ol";
// import { Tile as TileLayer } from "ol/layer";
// import { OSM } from "ol/source";
// import "ol/ol.css";
// import { fromLonLat } from "ol/proj";


// const UserLocation = () => {
//   const [location, setLocation] = useState<{
//     latitude: number | null;
//     longitude: number | null;
//     country: string | null;
//     state: string | null;
//     error: string | null;
//   }>({
//     latitude: null,
//     longitude: null,
//     country: null,
//     state: null,
//     error: null,
//   });

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;

//           // Fetch reverse geocoding data
//           try {
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//             );
//             const data = await response.json();

//             setLocation({
//               latitude,
//               longitude,
//               country: data.address.country || "Unknown",
//               state: data.address.state || data.address.region || "Unknown",
//               error: null,
//             });
//           } catch (error) {
//             setLocation({
//               latitude,
//               longitude,
//               country: null,
//               state: null,
//               error: "Failed to fetch location details.",
//             });
//           }
//         },
//         (error) => {
//           setLocation({
//             latitude: null,
//             longitude: null,
//             country: null,
//             state: null,
//             error: error.message,
//           });
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//       );
//     } else {
//       setLocation({
//         ...location,
//         error: "Geolocation is not supported by your browser.",
//       });
//     }
//   };

//   useEffect(() => {
//     if (location.latitude && location.longitude) {
//       const map = new Map({
//         target: "map",
//         layers: [
//           new TileLayer({
//             source: new OSM(),
//           }),
//         ],
//         view: new View({
//           center: fromLonLat([location.longitude, location.latitude]),
//           zoom: 12,
//         }),
//       });
//     }
//   }, [location.latitude, location.longitude]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-semibold mb-4">
//         Get User Location with OpenLayers
//       </h1>

//       <button
//         onClick={getLocation}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//       >
//         Get Location
//       </button>

//       {location.latitude && location.longitude && (
//         <div className="mt-4 p-4 bg-green-100 rounded-md">
//           <p>
//             <strong>Latitude:</strong> {location.latitude}
//           </p>
//           <p>
//             <strong>Longitude:</strong> {location.longitude}
//           </p>
//           <p>
//             <strong>Country:</strong> {location.country}
//           </p>
//           <p>
//             <strong>State:</strong> {location.state}
//           </p>
//         </div>
//       )}

//       {location.error && (
//         <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
//           <p>{location.error}</p>
//         </div>
//       )}

//       {/* Display Map */}
//       <div
//         id="map"
//         style={{ width: "100%", height: "400px", marginTop: "20px" }}
//       ></div>
//     </div>
//   );
// };

// export default UserLocation;
