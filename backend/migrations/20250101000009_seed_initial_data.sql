-- Seed initial data

-- Insert route
INSERT INTO routes (name, description) VALUES ('Hwange Vic-Falls Route', 'Main transportation route from Hwange to Victoria Falls');

-- Insert geolocations with approximate coordinates
INSERT INTO geolocations (name, latitude, longitude, geography_point) VALUES
('BENICE', -19.2, 28.5, ST_Point(28.5, -19.2, 4326)),
('INSUZA', -19.3, 28.4, ST_Point(28.4, -19.3, 4326)),
('ST LUKES', -19.4, 28.3, ST_Point(28.3, -19.4, 4326)),
('LUPANE', -18.5314, 27.8556, ST_Point(27.8556, -18.5314, 4326)),
('JOTSHOLO', -18.5, 27.8, ST_Point(27.8, -18.5, 4326)),
('GWAYI', -18.4, 27.7, ST_Point(27.7, -18.4, 4326)),
('CROSS MABALE', -18.3, 27.6, ST_Point(27.6, -18.3, 4326)),
('CROSS DETE', -18.2, 27.5, ST_Point(27.5, -18.2, 4326)),
('LUKHOSI', -18.1, 27.4, ST_Point(27.4, -18.1, 4326)),
('DINSON', -18.0, 27.3, ST_Point(27.3, -18.0, 4326)),
('ST MARYS', -17.9, 27.2, ST_Point(27.2, -17.9, 4326)),
('VID', -17.8, 27.1, ST_Point(27.1, -17.8, 4326)),
('MAPILLAR', -17.7, 27.0, ST_Point(27.0, -17.7, 4326)),
('ROMA', -17.6, 26.9, ST_Point(26.9, -17.6, 4326)),
('G/S SHOPS', -17.5, 26.8, ST_Point(26.8, -17.5, 4326)),
('HWANGE RANK', -18.3647, 26.5019, ST_Point(26.5019, -18.3647, 4326)),
('VIC-FALLS', -17.9318, 25.8298, ST_Point(25.8298, -17.9318, 4326));

-- Insert trip_stops
INSERT INTO trip_stops (route_id, name, stop_order, scheduled_time, duration_minutes, distance_km, geolocation_id) VALUES
((SELECT id FROM routes LIMIT 1), 'BENICE', 1, '07:30:00', NULL, 41, (SELECT id FROM geolocations WHERE name = 'BENICE')),
((SELECT id FROM routes LIMIT 1), 'INSUZA', 2, '08:50:00', 5, 40, (SELECT id FROM geolocations WHERE name = 'INSUZA')),
((SELECT id FROM routes LIMIT 1), 'ST LUKES', 3, '09:45:00', 45, 60, (SELECT id FROM geolocations WHERE name = 'ST LUKES')),
((SELECT id FROM routes LIMIT 1), 'LUPANE', 4, NULL, NULL, NULL, (SELECT id FROM geolocations WHERE name = 'LUPANE')),
((SELECT id FROM routes LIMIT 1), 'JOTSHOLO', 5, '12:00:00', 5, 36, (SELECT id FROM geolocations WHERE name = 'JOTSHOLO')),
((SELECT id FROM routes LIMIT 1), 'GWAYI', 6, '12:25:00', 20, 51, (SELECT id FROM geolocations WHERE name = 'GWAYI')),
((SELECT id FROM routes LIMIT 1), 'CROSS MABALE', 7, '12:45:00', 5, 19, (SELECT id FROM geolocations WHERE name = 'CROSS MABALE')),
((SELECT id FROM routes LIMIT 1), 'CROSS DETE', 8, '13:15:00', 120, 27, (SELECT id FROM geolocations WHERE name = 'CROSS DETE')),
((SELECT id FROM routes LIMIT 1), 'LUKHOSI', 9, '15:40:00', 5, 10, (SELECT id FROM geolocations WHERE name = 'LUKHOSI')),
((SELECT id FROM routes LIMIT 1), 'DINSON', 10, '16:00:00', 5, 25, (SELECT id FROM geolocations WHERE name = 'DINSON')),
((SELECT id FROM routes LIMIT 1), 'ST MARYS', 11, '17:00:00', 5, 41, (SELECT id FROM geolocations WHERE name = 'ST MARYS')),
((SELECT id FROM routes LIMIT 1), 'VID', 12, '17:20:00', 5, 12, (SELECT id FROM geolocations WHERE name = 'VID')),
((SELECT id FROM routes LIMIT 1), 'MAPILLAR', 13, '17:40:00', 30, 2, (SELECT id FROM geolocations WHERE name = 'MAPILLAR')),
((SELECT id FROM routes LIMIT 1), 'ROMA', 14, '18:00:00', 45, 5, (SELECT id FROM geolocations WHERE name = 'ROMA')),
((SELECT id FROM routes LIMIT 1), 'G/S SHOPS', 15, NULL, 10, 2, (SELECT id FROM geolocations WHERE name = 'G/S SHOPS')),
((SELECT id FROM routes LIMIT 1), 'HWANGE RANK', 16, '23:00:00', 20, 5, (SELECT id FROM geolocations WHERE name = 'HWANGE RANK')),
((SELECT id FROM routes LIMIT 1), 'VIC-FALLS', 17, '08:00:00', 30, 100, (SELECT id FROM geolocations WHERE name = 'VIC-FALLS'));

-- Insert customers (simplified for brevity)
INSERT INTO customers (name, trip_stop_id) VALUES
('Trevor', (SELECT id FROM trip_stops WHERE name = 'BENICE')),
('Sekuru Munya', (SELECT id FROM trip_stops WHERE name = 'BENICE')),
('Willy', (SELECT id FROM trip_stops WHERE name = 'INSUZA')),
('Muchimba', (SELECT id FROM trip_stops WHERE name = 'ST LUKES')),
('Ziyabula', (SELECT id FROM trip_stops WHERE name = 'ST LUKES')),
('Aleck', (SELECT id FROM trip_stops WHERE name = 'ST LUKES')),
('Mwembwe', (SELECT id FROM trip_stops WHERE name = 'ST LUKES')),
('Given Hwange', (SELECT id FROM trip_stops WHERE name = 'JOTSHOLO')),
('GK Hwange', (SELECT id FROM trip_stops WHERE name = 'GWAYI')),
('Lukhosi', (SELECT id FROM trip_stops WHERE name = 'CROSS MABALE')),
('Mabhena', (SELECT id FROM trip_stops WHERE name = 'CROSS MABALE')),
('Mai Tiara', (SELECT id FROM trip_stops WHERE name = 'CROSS DETE')),
('Fiona', (SELECT id FROM trip_stops WHERE name = 'CROSS DETE')),
('Musandiki', (SELECT id FROM trip_stops WHERE name = 'CROSS DETE')),
('Mulosi', (SELECT id FROM trip_stops WHERE name = 'CROSS DETE')),
('Ndodana', (SELECT id FROM trip_stops WHERE name = 'LUKHOSI')),
('Khuluza', (SELECT id FROM trip_stops WHERE name = 'LUKHOSI')),
('Sibo', (SELECT id FROM trip_stops WHERE name = 'DINSON')),
('NaManyathi', (SELECT id FROM trip_stops WHERE name = 'DINSON')),
('Precious', (SELECT id FROM trip_stops WHERE name = 'ST MARYS')),
('Elias', (SELECT id FROM trip_stops WHERE name = 'ST MARYS')),
('Pretty', (SELECT id FROM trip_stops WHERE name = 'VID')),
('Ncube', (SELECT id FROM trip_stops WHERE name = 'VID')),
('Ndlovu', (SELECT id FROM trip_stops WHERE name = 'MAPILLAR')),
('Michael', (SELECT id FROM trip_stops WHERE name = 'MAPILLAR')),
('Makanaka', (SELECT id FROM trip_stops WHERE name = 'ROMA')),
('Mambo', (SELECT id FROM trip_stops WHERE name = 'ROMA')),
('Nyaradzo', (SELECT id FROM trip_stops WHERE name = 'G/S SHOPS')),
('TM Hwange', (SELECT id FROM trip_stops WHERE name = 'HWANGE RANK')),
('OK Hwange', (SELECT id FROM trip_stops WHERE name = 'HWANGE RANK')),
('Carlos', (SELECT id FROM trip_stops WHERE name = 'HWANGE RANK')),
('Flora', (SELECT id FROM trip_stops WHERE name = 'HWANGE RANK')),
('Marange', (SELECT id FROM trip_stops WHERE name = 'HWANGE RANK')),
('MaMoyo', (SELECT id FROM trip_stops WHERE name = 'HWANGE RANK')),
('Tabitha', (SELECT id FROM trip_stops WHERE name = 'HWANGE RANK')),
('TM Vic-falls', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('OK Vic-Falls', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('Ok Mart Vic-Falls', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('Zambezi trading', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('Platform trading', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('Victoria fruit', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('Novascocia', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('Wide brim', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('Ruvents Vic Falls', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('Andile fresh', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS')),
('Andile fresh 2', (SELECT id FROM trip_stops WHERE name = 'VIC-FALLS'));

-- Insert variants for HWANGE RANK
INSERT INTO variants (trip_stop_id, variant_name, start_time, end_time) VALUES
((SELECT id FROM trip_stops WHERE name = 'HWANGE RANK'), 'Slot 1', '23:00:00', '23:20:00'),
((SELECT id FROM trip_stops WHERE name = 'HWANGE RANK'), 'Slot 2', '23:40:00', '23:55:00');

-- Insert trip_instances
INSERT INTO trip_instances (route_id, instance_date, is_return_trip) VALUES
((SELECT id FROM routes LIMIT 1), CURRENT_DATE, false),
((SELECT id FROM routes LIMIT 1), CURRENT_DATE, true);
