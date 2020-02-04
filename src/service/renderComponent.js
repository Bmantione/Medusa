import React from 'react'
import Weather from "../components/Weather"
import Clock from "../components/Clock"
import News from "../components/News"
import Radio from "../components/Radio"
import Timer from "../components/Timer"

export default function RenderComponent(component, config) {
    switch (component) {
        case 'Weather':
            return <Weather Location={config.Weather.WidgetConfig.Location} />;
        case 'Clock':
            return <Clock Timezone={config.Clock.WidgetConfig.TimeZone} Format={config.Clock.WidgetConfig.Format}/>;
        case 'News':
            return <News Source={config.News.WidgetConfig.Source}/>;
        case 'Radio':
            return <Radio Source={config.Radio.WidgetConfig.Source}/>;
        case 'Timer':
            return <Timer Timer={config.Timer.WidgetConfig.Times}/>;
        default:
            return console.log("No component found")
    }
}