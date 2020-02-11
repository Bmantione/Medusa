import React from 'react'
import Clock from "../components/Clock"
import News from "../components/News"
import Radio from "../components/Radio"
import Timer from "../components/Timer"
import Weather from "../components/Weather"

export default function RenderComponent(component) {
    switch (Object.keys(component)[0]) {
        case 'Météo':
            return <Weather
                Location={component["Météo"].Location}
                Temperature={component["Météo"].Temperature}
            />;
        case 'Horloge':
            return <Clock
                TimeZone={component.Horloge.TimeZone}
                FormatHorloge={component.Horloge.FormatHorloge}
                FormatDate={component.Horloge.FormatDate}
            />;
        case 'News':
            return <News Source={component.News.Source} NewsNumber={component.News.NewsNumber} />;
        case 'Radio':
            return <Radio Source={component.Radio.Source} />;
        case 'Timer':
            return <Timer Timer={component.Timer.Times} />;
        default:
            return console.log("No component found")
    }
}