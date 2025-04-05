import React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import RefreshControl from './RefreshControl';

interface RefreshableFlatListProps<T> extends FlatListProps<T> {
    onRefreshComplete?: (success: boolean) => void;
}

/**
 * FlatList with built-in refresh control that reloads app data
 * 
 * Usage:
 * <RefreshableFlatList
 *   data={items}
 *   renderItem={({ item }) => <Item {...item} />}
 *   keyExtractor={item => item.id}
 * />
 */
function RefreshableFlatList<T>({
    onRefreshComplete,
    ...restProps
}: RefreshableFlatListProps<T>) {
    return (
        <FlatList<T>
            {...restProps}
            refreshControl={
                <RefreshControl
                    onRefreshComplete={onRefreshComplete}
                    colors={['#FF6B81']}
                    tintColor="#FF6B81"
                />
            }
        />
    );
}

export default RefreshableFlatList; 