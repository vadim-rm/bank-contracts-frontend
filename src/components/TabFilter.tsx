import {FC} from "react";
import './TabFilter.css'

interface Tab {
    name: string
    value: string
}

interface Props {
    tabs: Tab[]
    onChange: (value: string) => void
    value: string

}

const TabFilter: FC<Props> = ({tabs, onChange, value}) => (
    <div className="tab-row">
        {tabs.map((tab, index) => (
            <a key={index}
               onClick={() => onChange(tab.value)}
               className={`tab ${tab.value === value ? 'tab-active' : ''}`}
            >{tab.name}</a>
        ))}
    </div>
)

export default TabFilter