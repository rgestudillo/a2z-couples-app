import React, { PropsWithChildren } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import RefreshControl from './RefreshControl';

interface RefreshableScrollViewProps extends ScrollViewProps {
    onRefreshComplete?: (success: boolean) => void;
}

/**
 * ScrollView with built-in refresh control that reloads app data
 * 
 * Usage:
 * <RefreshableScrollView>
 *   ... your content ...
 * </RefreshableScrollView>
 */
const RefreshableScrollView: React.FC<PropsWithChildren<RefreshableScrollViewProps>> = ({
    children,
    onRefreshComplete,
    ...restProps
}) => {
    return (
        <ScrollView
            {...restProps}
            refreshControl={
                <RefreshControl
                    onRefreshComplete={onRefreshComplete}
                    colors={['#FF6B81']}
                    tintColor="#FF6B81"
                />
            }
        >
            {children}
        </ScrollView>
    );
};

export default RefreshableScrollView; 