import React, { createContext, useContext, Children } from 'react';

// Styles & Assets
import './Tabs.css';

// Model
export interface TabsProps {
    value: number
    onChange: (id: number) => void
    children: React.ReactElement<TabProps>[]
}
interface ITabsContext {
    activeTab: number
    setActiveTab: (id: number) => void
}

const TabsContext = createContext<ITabsContext | undefined>(undefined);

const Tabs = ({ value, onChange, children }: TabsProps) => {

    const uniqueValues = new Set<number>();

    children.forEach(child => {
        const tabValue = child.props.value;
        if (uniqueValues.has(tabValue)) {
            throw new Error(`Duplicate value "${tabValue}" found in Tabs. Each Tab must have a unique value.`);
        }
        uniqueValues.add(tabValue);
    })

    const indexTab = children.findIndex(child => child.props.value === value);

    if(indexTab === -1) throw new Error('No tab matches the value provided.')

    const length = children.length;

    const left = (100 / length) * indexTab;

    const activeTab = value;
    const setActiveTab = onChange;


    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={'tabsContainer'}>
                {Children.map(children, (child) => {
                    if (!React.isValidElement(child) || (child.type as React.JSXElementConstructor<unknown>).name !== 'Tab') {
                        throw new Error('Tabs children must be Tab components');
                    }
                    return child;
                })}
                <div
                    className={'line'}
                    style={{
                        left: `${left}%`,
                        width: (100 / length) + '%'
                    }}
                />
            </div>
        </TabsContext.Provider>
    );
};

export interface TabProps {
    label: string
    value: number
}

const Tab = ({ label, value }: TabProps) => {

    const { activeTab, setActiveTab } = useTabsContext();

    const active = activeTab === value;

    const onClick = () => setActiveTab(value)


    return (
        <button
            className={`${'tab'} ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

Tabs.Tab = Tab;

export default Tabs;

const useTabsContext = () => {

    const context = useContext(TabsContext);

    if (!context) {
        throw new Error('useTabsContext must be used within the scope of a Tabs Components')
    }

    return context;

}