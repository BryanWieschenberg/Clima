package com.example.demo;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
public class FetchWeather {

    private final WebClient webClient = WebClient.create();

    @GetMapping("/weather")
    public Map<String, Object> getWeather(@RequestParam double lat, @RequestParam double lng) {
        String url = String.format(
                "https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f&hourly=temperature_2m,weathercode,relativehumidity_2m,windspeed_10m&timezone=auto",
                lat, lng
        );

        String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode times = root.at("/hourly/time");
            JsonNode temps = root.at("/hourly/temperature_2m");
            JsonNode codes = root.at("/hourly/weathercode");
            JsonNode humidities = root.at("/hourly/relativehumidity_2m");
            JsonNode winds = root.at("/hourly/windspeed_10m");

            String todayDate = java.time.ZonedDateTime.now(java.time.ZoneOffset.UTC).toLocalDate().toString();
            double maxToday = Double.NEGATIVE_INFINITY;
            System.out.println("Today (UTC): " + todayDate);
            System.out.println("First time in array: " + times.get(0).asText());
            String condition = "Unknown";
            double humidity = 0;
            double wind = 0;
            String targetDate = todayDate;
            boolean foundToday = false;

            for (int i = 0; i < times.size(); i++) {
                String timeStr = times.get(i).asText();

                if (!foundToday && timeStr.startsWith(todayDate)) {
                    targetDate = todayDate;
                    foundToday = true;
                } else if (!foundToday) {
                    // fallback to date of first available data
                    targetDate = timeStr.substring(0, 10);
                    foundToday = true;
                }

                if (timeStr.startsWith(targetDate)) {
                    double temp = temps.get(i).asDouble();
                    if (temp > maxToday) {
                        maxToday = temp;
                        condition = mapWeatherCode(codes.get(i).asInt());
                        humidity = humidities.get(i).asDouble();
                        wind = winds.get(i).asDouble();
                    }
                }
            }

            Map<String, Object> result = new HashMap<>();
            result.put("high", maxToday);
            result.put("feelsLike", maxToday);
            result.put("condition", condition);
            result.put("humidity", humidity);
            result.put("wind", wind);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("error", "Failed to parse weather data");
        }
    }

    private String mapWeatherCode(int code) {
        switch (code) {
            case 0:
                return "Sunny";
            case 1:
            case 2:
            case 3:
                return "Partly Cloudy";
            case 45:
            case 48:
                return "Fog";
            case 51:
            case 53:
            case 55:
                return "Drizzle";
            case 61:
            case 63:
            case 65:
                return "Rain";
            case 71:
            case 73:
            case 75:
            case 77:
                return "Snow";
            case 80:
            case 81:
            case 82:
                return "Showers";
            case 95:
                return "Thunderstorm";
            default:
                return "Unknown";
        }
    }
}
