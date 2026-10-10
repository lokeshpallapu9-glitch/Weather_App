
export default async (request) => {
    const city = new URL(request.url).searchParams.get("city");

    if (!city || !city.trim()) {
        return Response.json(
            { error: "Please enter a city name." },
            { status: 400 }
        );
    }

    const apiKey = Netlify.env.get("OPENWEATHER_API_KEY");

    if (!apiKey) {
        return Response.json(
            { error: "Weather service is not configured." },
            { status: 500 }
        );
    }

    try {
        const url = new URL(
            "https://api.openweathermap.org/data/2.5/weather"
        );

        url.searchParams.set("q", city.trim());
        url.searchParams.set("units", "metric");
        url.searchParams.set("appid", apiKey);

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            return Response.json(
                { error: data.message || "Unable to fetch weather." },
                { status: response.status }
            );
        }

        return Response.json(data);
    } catch {
        return Response.json(
            { error: "Unable to connect to the weather service." },
            { status: 502 }
        );
    }
};
