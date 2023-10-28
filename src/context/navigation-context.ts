import { TNavigationMenuItemData } from 'components/ui/navigation';
import { createContext, ReactNode } from 'react';

type TNavigationContext = {
    navigationMenuData: TNavigationMenuItemData[],
    navigationRightMenuData: ReactNode[]
}

const NavigationContext = createContext<TNavigationContext>({
    navigationMenuData: [],
    navigationRightMenuData: []
});

export default NavigationContext
export {type TNavigationContext}
