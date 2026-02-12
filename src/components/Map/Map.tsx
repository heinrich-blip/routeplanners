'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useUIStore } from '@/stores/uiStore';
import { useRouteStore } from '@/stores/routeStore';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);

  const { mapCenter, mapZoom } = useUIStore();
  const { stops, selectedStop, setSelectedStop } = useRouteStore();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(mapCenter, mapZoom);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers and polyline
    markersRef.current.forEach(marker => mapInstanceRef.current!.removeLayer(marker));
    markersRef.current = [];
    if (polylineRef.current) {
      mapInstanceRef.current.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }

    // Add markers for stops
    const latlngs: [number, number][] = [];
    stops.forEach((stop) => {
      if (stop.geolocation) {
        const latlng: [number, number] = [stop.geolocation.latitude, stop.geolocation.longitude];
        latlngs.push(latlng);

        const marker = L.marker(latlng)
          .addTo(mapInstanceRef.current!)
          .bindPopup(`
            <b>${stop.name}</b><br>
            Time: ${stop.scheduled_time || 'N/A'}<br>
            Duration: ${stop.duration_minutes || 0} mins<br>
            Distance: ${stop.distance_km || 0} km
          `)
          .on('click', () => setSelectedStop(stop));

        markersRef.current.push(marker);
      }
    });

    // Add polyline connecting stops
    if (latlngs.length > 1) {
      const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(mapInstanceRef.current!);
      polylineRef.current = polyline;
    }
  }, [stops, setSelectedStop]);

  useEffect(() => {
    if (!mapInstanceRef.current || !selectedStop?.geolocation) return;

    mapInstanceRef.current.setView([selectedStop.geolocation.latitude, selectedStop.geolocation.longitude], 12);
  }, [selectedStop]);

  return <div ref={mapRef} className="w-full h-full" />;
}
