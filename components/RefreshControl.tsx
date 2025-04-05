import React, { useState } from 'react';
import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native';
import { refreshAppData } from '@/utils/dataPreloader';

interface EnhancedRefreshControlProps extends Omit<RefreshControlProps, 'refreshing' | 'onRefresh'> {
    onRefreshComplete?: (success: boolean) => void;
}

/**
 * Enhanced RefreshControl that refreshes all app data
 * 
 * Usage:
 * <ScrollView
 *   refreshControl={
 *     <RefreshControl onRefreshComplete={(success) => console.log('Refresh complete:', success)} />
 *   }
 * >
 *   ...your content
 * </ScrollView>
 */
const RefreshControl: React.FC<EnhancedRefreshControlProps> = ({
    onRefreshComplete,
    ...restProps
}) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            const success = await refreshAppData();
            setRefreshing(false);
            if (onRefreshComplete) {
                onRefreshComplete(success);
            }
        } catch (error) {
            console.error('Refresh error:', error);
            setRefreshing(false);
            if (onRefreshComplete) {
                onRefreshComplete(false);
            }
        }
    };

    return (
        <RNRefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            {...restProps}
        />
    );
};

export default RefreshControl; 