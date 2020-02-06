import React from 'react'
import Clock from "../components/Clock"
import News from "../components/News"
import Radio from "../components/Radio"
import Timer from "../components/Timer"
import Weather from "../components/Weather"

export default function RenderComponent(component, config) {
    switch (component) {
        case 'Météo':
            return <Weather 
                    Location={config["Météo"].WidgetConfig.Location} 
                    Temperature={config["Météo"].WidgetConfig.Temperature}
                />;
        case 'Horloge':
            return <Clock 
                    Timezone={config.Horloge.WidgetConfig.TimeZone} 
                    FormatHorloge={config.Horloge.WidgetConfig.FormatHorloge}
                    FormatDate={config.Horloge.WidgetConfig.FormatDate}
            />;
        case 'News':
            return <News Source={config.News.WidgetConfig.Source} NewsNumber={config.News.WidgetConfig.NewsNumber}/>;
        case 'Radio':
            return <Radio Source={config.Radio.WidgetConfig.Source}/>;
        case 'Timer':
            return <Timer Timer={config.Timer.WidgetConfig.Times}/>;
        default:
            return console.log("No component found")
    }
}